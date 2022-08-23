import {Module} from '@nestjs/common';
import {HomeService} from './home.service';
import {HomeController} from './home.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [HomeService],
    controllers: [HomeController],
})
export class HomeModule {
}
