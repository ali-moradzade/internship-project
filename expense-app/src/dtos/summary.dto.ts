import {IsNumber, IsPositive} from "class-validator";

export class SummaryResponseDto {
    @IsNumber()
    @IsPositive()
    totalIncome: number;

    @IsNumber()
    @IsPositive()
    totalExpense: number;

    @IsNumber()
    netIncome: number;
}
