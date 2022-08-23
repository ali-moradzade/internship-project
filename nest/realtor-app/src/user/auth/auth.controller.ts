import {Body, Controller, Param, ParseEnumPipe, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninDto, SignupDto} from "../dtos/auth.dto";
import {UserType} from "@prisma/client";
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/signup/:userType')
    async signup(
        @Body() body: SignupDto,
        @Param('userType', new ParseEnumPipe(UserType)) userType: UserType,
    ) {
        if (userType !== UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException();
            }

            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
            const isValid = await bcrypt.compare(validProductKey, body.productKey);

            if (!isValid) {
                throw new UnauthorizedException();
            }
        }
        return this.authService.signup(userType, body);
    }

    @Post('/signin')
    signin(
        @Body() body: SigninDto,
    ) {
        return this.authService.signin(body);
    }
}
