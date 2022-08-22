import {IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';
import {UserType} from '@prisma/client';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        {message: "phone must be a valid phone number"})
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}

export class SigninDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class GenerateProductKeyDto {
    @IsEmail()
    email: string;

    @IsEnum(UserType)
    userType: UserType;
}