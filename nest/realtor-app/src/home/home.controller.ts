import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {HomeService} from "./home.service";
import {PropertyType, UserType} from "@prisma/client";
import {CreateHomeDto, UpdateHomeDto} from "./dtos/home.dto";
import {User, UserInfo} from "../user/decorators/user.decorator";
import {Roles} from "../user/decorators/roles.decorator";

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

    @Roles(UserType.REALTOR)
    @Post()
    createHome(
        @Body() body: CreateHomeDto,
        @User() user: UserInfo,
    ) {
        return this.homeService.createHome(user.id, body);
    }

    @Roles(UserType.REALTOR)
    @Put('/:id')
    updateHomeById(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() body: UpdateHomeDto,
    ) {
        return this.homeService.updateHomeById(id, body);
    }

    @Roles(UserType.REALTOR)
    @Delete('/:id')
    deleteHomeById(
        @Param('id', new ParseIntPipe()) id: number,
    ) {
        return this.homeService.deleteHomeById(id);
    }
}
