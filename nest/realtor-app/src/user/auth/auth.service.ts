import {ConflictException, HttpException, Injectable} from '@nestjs/common';
import {UserType} from "@prisma/client";
import {PrismaService} from "../../prisma/prisma.service";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
    email: string;
    password: string;
    name: string;
    phone: string;
}

interface SigninParams {
    email: string;
    password: string;
}

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {
    }

    async generateProductKey(email: string, userType: UserType) {
        const str = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

        return bcrypt.hash(str, 10);
    }

    private async generateJWT(name: string, id: number) {
        return jwt.sign({
            name,
            id,
        }, process.env.JSON_TOKEN_KEY, {
            expiresIn: 3600000
        });
    }

    async signup(userType: UserType, {email, password, name, phone}: SignupParams) {
        const userExists = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        });

        if (userExists) {
            throw new ConflictException();
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaService.user.create({
            data: {
                email,
                name,
                phone,
                password: hashedPassword,
                user_type: userType,
            }
        });

        return this.generateJWT(name, user.id);
    }

    async signin({email, password}: SigninParams) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            throw new HttpException("Invalid credentials", 400);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new HttpException("Invalid credentials", 400);
        }

        return this.generateJWT(user.name, user.id);
    }
}
