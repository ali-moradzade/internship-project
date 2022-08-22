import {Body, Controller, Delete, Get, Param, ParseEnumPipe, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import {ReportService} from "./report.service";
import {ReportType} from "../data";
import {CreateReportDto, UpdateReportDto} from "../dtos/report.dto";

@Controller('report/:reportType')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get()
    getAllReports(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
    ) {
        return this.reportService.getAllReports(
            reportType.toLowerCase() === 'income' ?
                ReportType.INCOME : ReportType.EXPENSE);
    }

    @Get('/:id')
    getReportById(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Param('id', new ParseUUIDPipe()) id: string,
    ) {
        return this.reportService.getReportById(
            reportType.toLowerCase() === 'income' ?
                ReportType.INCOME : ReportType.EXPENSE,
            id);
    }

    @Post()
    createReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Body() body: CreateReportDto,
    ) {
        return this.reportService.createReport();
    }

    @Put('/:id')
    updateReport(
        @Param('reportType', new ParseEnumPipe(ReportType)) reportType: string,
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateReportDto,
    ) {
        return this.reportService.updateReport();
    }

    @Delete('/:id')
    deleteReport(
        @Param('id', new ParseUUIDPipe()) id: string,
    ) {
        return this.reportService.deleteReport();
    }
}
