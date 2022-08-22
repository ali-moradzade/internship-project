import {Injectable} from '@nestjs/common';
import {data, ReportType} from "../data";
import {ReportResponseDto} from "../dtos/report.dto";
import {v4 as uuid} from 'uuid';

interface CreateReport {
    source: string;
    amount: number;
}

// interface UpdateReport {
//     source?: string;
//     amount?: number;
// }

@Injectable()
export class ReportService {
    getAllReports(reportType: ReportType): ReportResponseDto[] {
        return data.report.filter(report => report.type === reportType).map(report => new ReportResponseDto(report));
    }

    getReportById(reportType: ReportType, id: string): ReportResponseDto {
        const record = data.report.filter(report => report.type === reportType).find(report => report.id === id);

        if (record) {
            return new ReportResponseDto(record);
        } else {
            return;
        }
    }

    createReport(reportType: ReportType, {source, amount}: CreateReport): ReportResponseDto {
        const record = {
            id: uuid(),
            source,
            amount,
            created_at: new Date(),
            updated_at: new Date(),
            type: reportType,
        };

        data.report.push(record);
        return new ReportResponseDto(record);
    }

    // updateReport(body: UpdateReport): ReportResponseDto {
    //
    // }
    //
    // deleteReport(): ReportResponseDto {
    //
    // }
}
