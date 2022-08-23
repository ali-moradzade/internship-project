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

interface CreateHomeParams {
    address: string;
    numberOfBathrooms: number;
    numberOfBedrooms: number;
    city: string;
    landSize: number;
    propertyType: PropertyType;
    price: number;
    images: {
        url: string;
    }[];
}

interface UpdateHomeParams {
    address?: string;
    numberOfBathrooms?: number;
    numberOfBedrooms?: number;
    city?: string;
    landSize?: number;
    propertyType?: PropertyType;
    price?: number;
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

    async getHomeById(id: number) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id
            },
            select: {
                ...homeSelect,
                images: {
                    select: {
                        url: true,
                    },
                },
                realtor: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });

        if (!home) {
            throw new NotFoundException();
        }

        return new HomeResponseDto(home);
    }

    async createHome({
                         address,
                         numberOfBathrooms,
                         numberOfBedrooms,
                         city,
                         landSize,
                         propertyType,
                         price,
                         images,
                     }: CreateHomeParams) {
        const home = await this.prismaService.home.create({
            data: {
                address,
                number_of_bathrooms: numberOfBathrooms,
                number_of_bedrooms: numberOfBedrooms,
                city,
                land_size: landSize,
                property_type: propertyType,
                price,
                realtor_id: 4,
            }
        });

        const homeImages = images.map(image => {
            return {
                ...image,
                home_id: home.id,
            }
        });

        await this.prismaService.image.createMany({
            data: homeImages,
        });

        return new HomeResponseDto(home);
    }

    async updateHomeById(id: number, data: UpdateHomeParams) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id
            },
        });

        if (!home) {
            throw new NotFoundException();
        }

        const updatedHome = await this.prismaService.home.update({
            where: {
                id,
            },
            data,
        });

        return new HomeResponseDto(updatedHome);
    }

    async deleteHomeById(id: number) {
        await this.prismaService.image.deleteMany({
            where: {
                home_id: id,
            },
        });

        return await this.prismaService.home.delete({
            where: {
                id,
            },
        });
    }
}
