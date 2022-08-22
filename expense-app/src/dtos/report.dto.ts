import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID} from "class-validator";
import {ReportType} from "../data";
import {Expose, Exclude} from "class-transformer";

export class CreateReportDto {
    @IsNotEmpty()
    @IsString()
    source: string;

    @IsNumber()
    @IsPositive()
    amount: number;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    source: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;
}

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;

    @Exclude()
    created_at: Date;

    @Expose({name: 'createdAt'})
    createdAt() {
        return this.created_at;
    }

    @Exclude()
    updated_at: Date;

    @Exclude()
    report_type: ReportType;

    @Expose({name: 'reportType'})
    reportType() {
        return this.report_type;
    }

    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}
