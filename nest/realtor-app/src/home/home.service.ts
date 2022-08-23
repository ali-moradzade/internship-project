import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {PropertyType} from "@prisma/client";
import {HomeResponseDto} from "./dtos/home.dto";

interface GetHomesParams {
    city?: string;
    price?: {
        gte?: number;
        lte?: number;
    };
    property_type?: PropertyType;
}

const homeSelect = {
    id: true,
    address: true,
    city: true,
    price: true,
    property_type: true,
    number_of_bathrooms: true,
    number_of_bedrooms: true,
}

@Injectable()
export class HomeService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async getHomes(filters: GetHomesParams) {
        const homes = await this.prismaService.home.findMany({
            select: {
                ...homeSelect,
                images: {
                    select: {
                        url: true,
                    },
                    take: 1,
                }
            },
            where: filters,
        });

        if (!homes) {
            throw new NotFoundException();
        }

        return homes.map(home => {
            const fetchedHome = {...home, image: home.images[0].url};
            delete fetchedHome.images;
            return new HomeResponseDto(fetchedHome);
        });
    }
}
