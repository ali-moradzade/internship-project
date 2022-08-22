import {Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {OnModuleDestroy, OnModuleInit} from "@nestjs/common";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    async onModuleDestroy() {
        await this.$disconnect();
    }

    async onModuleInit() {
        await this.$connect();
    }
}
