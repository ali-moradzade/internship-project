import {Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import {ReportService} from "./report.service";
import {ReportType} from "../data";
import {CreateReportDto, UpdateReportDto} from "../dtos/report.dto";

@Controller('report/:reportType')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    private getReportType(reportType: string) {
        return reportType.toLowerCase() === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    }

    @Get()
    getAllReports(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
    ) {
        return this.reportService.getAllReports(this.getReportType(reportType));
    }

    @Get('/:id')
    getReportById(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Param('id', new ParseUUIDPipe()) id: string,
    ) {
        return this.reportService.getReportById(this.getReportType(reportType), id);
    }

    @Post()
    createReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Body() {source, amount}: CreateReportDto,
    ) {
        return this.reportService.createReport(this.getReportType(reportType), {source, amount});
    }

    @Put('/:id')
    updateReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateReportDto,
    ) {
        return this.reportService.updateReport(this.getReportType(reportType), id, body);
    }

    @Delete('/:id')
    deleteReport(
        @Param('id', new ParseUUIDPipe()) id: string,
    ) {
        return this.reportService.deleteReport(id);
    }
}
