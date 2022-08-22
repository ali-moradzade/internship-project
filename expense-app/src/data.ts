import {v4 as uuid} from 'uuid';

export enum ReportType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        updated_at: Date;
        type: ReportType;
    }[];
}

export const data: Data = {
    report: [
        {
            id: uuid(),
            source: 'Salary',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: uuid(),
            source: 'Udemy',
            amount: 15000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: uuid(),
            source: 'Food',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        },
        {
            id: uuid(),
            source: 'Clothes',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        },
    ]
};

console.log(data);
