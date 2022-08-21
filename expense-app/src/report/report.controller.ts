import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {ReportService} from "./report.service";

@Controller('report/:reportType')
export class ReportController {
    constructor(private readonly reportService: ReportService) {
    }

    @Get()
    getAllReports() {
        return this.reportService.getAllReports();
    }

    @Get('/:id')
    getReportById() {
        return this.reportService.getReportById();
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
