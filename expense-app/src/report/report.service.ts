import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
    getAllReports() {
        return ['all the reports'];
    }

    getReportById() {
        return {record: 'one record'};
    }

    createReport() {
        return 'report created!';
    }

    updateReport() {
        return 'report updated!';
    }

    deleteReport() {
        return 'report deleted!';
    }
}
