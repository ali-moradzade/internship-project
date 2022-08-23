import {Controller, Get, Query} from '@nestjs/common';
import {HomeService} from "./home.service";
import {PropertyType} from "@prisma/client";

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {
    }

    @Get()
    getHomes(
        @Query('city') city?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('propertyType') propertyType?: PropertyType,
    ) {
        const price = minPrice || maxPrice ? {
            ...(minPrice && {gte: parseFloat(minPrice)}),
            ...(maxPrice && {lte: parseFloat(maxPrice)}),
        } : undefined;

        const filters = {
            ...(city && {city}),
            ...(price && {price}),
            ...(propertyType && {property_type: propertyType}),
        };

        return this.homeService.getHomes(filters);
    }
}
