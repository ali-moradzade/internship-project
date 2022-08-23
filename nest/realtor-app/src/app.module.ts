import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {APP_INTERCEPTOR} from "@nestjs/core";
import { PrismaModule } from './prisma/prisma.module';
import {PrismaService} from "./prisma/prisma.service";
import { HomeModule } from './home/home.module';

@Module({
    imports: [UserModule, PrismaModule, HomeModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor,

    }, PrismaService],
})
export class AppModule {
}
