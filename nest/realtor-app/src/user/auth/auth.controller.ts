import {Body, Controller, Param, ParseEnumPipe, Post, UnauthorizedException} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignupDto} from "../dtos/auth.dto";
import {UserType} from "@prisma/client";
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/signup/:userType')
    async signup(
        @Body() body: SignupDto,
        @Param('id', new ParseEnumPipe(UserType)) userType: UserType,
    ) {
        console.log('HELLO BUYER!');
        if (userType !== UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException();
            }

            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;
            const isValid = await bcrypt.compare(validProductKey, body.productKey);

            if (!isValid) {
                throw new UnauthorizedException();
            }
        } else {
            console.log('HELLO BUYER!');
        }

        return this.authService.signup(userType, body);
    }
}
