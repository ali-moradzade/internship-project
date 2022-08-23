/*
    Run this file just once, at the beginning, to insert initial data into the database.
 */
import {PrismaService} from "../src/prisma/prisma.service";
import {PropertyType, UserType} from "@prisma/client";

const prismaService = new PrismaService();

// Adding all of our users
prismaService.user.create({
    data: {
        email: "first@gmail.com",
        name: "first_user_name",
        phone: "(111) 111 1111",
        password: "12345678",
        user_type: UserType.BUYER,
    }
})
    .then((user) => {
        console.log(user);
        return prismaService.user.create({
            data: {
                email: "second@gmail.com",
                name: "second_user_name",
                phone: "(222) 222 2222",
                password: "12345678",
                user_type: UserType.BUYER,
            }
        });
    })
    .then((user) => {
        console.log(user);
        return prismaService.user.create({
            data: {
                email: "third@gmail.com",
                name: "third_user_name",
                phone: "(333) 333 3333",
                password: "12345678",
                user_type: UserType.REALTOR,
            }
        });
    })
    .then((user) => {
        console.log(user);
        return prismaService.user.create({
            data: {
                email: "fourth@gmail.com",
                name: "fourth_user_name",
                phone: "(444) 444 4444",
                password: "12345678",
                user_type: UserType.REALTOR,
            }
        });
    })
    .then((user) => {
        console.log(user);
        console.log('All users created successfully!');

        // Adding all of our homes
        return prismaService.home.create({
            data: {
                address: "first home address",
                number_of_bathrooms: 2,
                number_of_bedrooms: 2,
                city: "first home city",
                land_size: 200,
                property_type: PropertyType.RESIDENTIAL,
                price: 100000,
                realtor_id: 3,
            }
        });
    })
    .then((home) => {
        console.log(home);
        return prismaService.home.create({
            data: {
                address: "second home address",
                number_of_bathrooms: 2,
                number_of_bedrooms: 2,
                city: "second home city",
                land_size: 200,
                property_type: PropertyType.RESIDENTIAL,
                price: 200000,
                realtor_id: 4,
            }
        });
    })
    .then((home) => {
        console.log(home);
        return prismaService.home.create({
            data: {
                address: "third home address",
                number_of_bathrooms: 2,
                number_of_bedrooms: 2,
                city: "third home city",
                land_size: 200,
                property_type: PropertyType.CONDO,
                price: 300000,
                realtor_id: 4,
            }
        });
    })
    .then((home) => {
        console.log(home);
        console.log('All homes created successfully!');

        return prismaService.image.create({
            data: {
                home_id: 1,
                url: "img1",
            }
        });
    })
    .then((image) => {
        console.log(image);
        return prismaService.image.create({
            data: {
                home_id: 2,
                url: "img2",
            }
        });
    })
    .then((image) => {
        console.log(image);
        return prismaService.image.create({
            data: {
                home_id: 3,
                url: "img3",
            }
        });
    })
    .then((image) => {
        console.log(image);

        console.log('All images created successfully!');
    });
