import {ClassSerializerInterceptor, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ReportModule} from './report/report.module';
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: ClassSerializerInterceptor,
    }],
    imports: [ReportModule],
})

export class AppModule {
}
