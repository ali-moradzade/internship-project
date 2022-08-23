import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {HomeService} from "./home.service";
import {PropertyType} from "@prisma/client";
import {CreateHomeDto, UpdateHomeDto} from "./dtos/home.dto";

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

    @Get('/:id')
    getHomeById(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return this.homeService.getHomeById(id);
    }

    @Post()
    createHome(
        @Body() body: CreateHomeDto,
    ) {
        return this.homeService.createHome(body);
    }

    @Put('/:id')
    updateHomeById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateHomeDto,
    ) {
        return this.homeService.updateHomeById(id, body);
    }
}
