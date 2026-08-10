import { IContact } from "./contacts";

export interface IApplication {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    companyName: string;
    role: string;
    jobUrl: string;
    estimatedSalary: number;
    tags: string[];
    currentStage: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
    nextStage?: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
    nextStageDate?: string;
    notes?: string;
    contacts: IContact[];
}