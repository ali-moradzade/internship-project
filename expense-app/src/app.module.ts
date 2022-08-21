import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ReportModule],
})
export class AppModule {}
