import {Injectable} from '@nestjs/common';
import {ReportType} from "../data";
import {ReportService} from "../report/report.service";
import {SummaryResponseDto} from "../dtos/summary.dto";

@Injectable()
export class SummaryService {
    constructor(private readonly reportService: ReportService) {
    }

    getSummary(): SummaryResponseDto {
        const totalIncome = this.reportService.getAllReports(ReportType.INCOME)
            .reduce((sum, report) => sum + report.amount, 0);

        const totalExpense = this.reportService.getAllReports(ReportType.EXPENSE)
            .reduce((sum, report) => sum + report.amount, 0);

        return {
            totalIncome,
            totalExpense,
            netIncome: totalIncome - totalExpense,
        }
    }
}
