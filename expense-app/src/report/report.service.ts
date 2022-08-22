import {Injectable} from '@nestjs/common';
import {ReportType, data} from "../data";
import {ReportResponseDto} from "../dtos/report.dto";

@Injectable()
export class ReportService {
    getAllReports(reportType: ReportType) {
        return data.report.filter(report => report.type === reportType).map(report => new ReportResponseDto(report));
    }

    getReportById(reportType: ReportType, id: string) {
        const record = data.report.filter(report => report.type === reportType).find(report => report.id === id);

        if (record) {
            return new ReportResponseDto(record);
        } else {
            return;
        }
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
