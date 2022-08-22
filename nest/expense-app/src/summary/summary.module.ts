import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';
import {ReportService} from "../report/report.service";
import {ReportModule} from "../report/report.module";

@Module({
  imports: [ReportModule],
  providers: [SummaryService],
  controllers: [SummaryController]
})
export class SummaryModule {}
