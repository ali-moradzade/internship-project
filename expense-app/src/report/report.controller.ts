import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ReportService} from "./report.service";
import {ReportType} from "../data";

@Controller('report/:reportType')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get()
    getAllReports(
        @Param('reportType') reportType: string,
    ) {
        return this.reportService.getAllReports(
            reportType.toLowerCase() === 'income' ?
                ReportType.INCOME : ReportType.EXPENSE);
    }

    @Get('/:id')
    getReportById(
        @Param('reportType') reportType: string,
        @Param('id') id: string,
    ) {
        return this.reportService.getReportById(
            reportType.toLowerCase() === 'income' ?
                ReportType.INCOME : ReportType.EXPENSE,
            id);
    }

    @Post()
    createReport() {
        return this.reportService.createReport();
    }

    @Put('/:id')
    updateReport() {
        return this.reportService.updateReport();
    }

    @Delete('/:id')
    deleteReport() {
        return this.reportService.deleteReport();
    }
}
