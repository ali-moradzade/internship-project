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
            id: "2d256586-6931-4f67-a63f-16207acef5cc",
            source: 'Salary',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: "56e62afa-2250-49d4-8b74-ae0fd1ac83d6",
            source: 'Udemy',
            amount: 15000,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.INCOME,
        },
        {
            id: "8a188757-1d6e-4730-86bf-c9e2dd484680",
            source: 'Food',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        },
        {
            id: "04f80873-0b67-49ad-82f1-2b03d8d9cbfe",
            source: 'Clothes',
            amount: 7500,
            created_at: new Date(),
            updated_at: new Date(),
            type: ReportType.EXPENSE,
        },
    ]
};
