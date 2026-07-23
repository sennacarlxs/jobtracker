const STAGES = [
    "Aplicado",
    "Triagem",
    "Entrevista técnica",
    "Entrevista final",
    "Oferta",
    "Recusado",
] as const;

type ApplicationStage = (typeof STAGES)[number];

type Application = {
    id: string;
    userId: string;
    companyName: string;
    role: string;
    jobUrl: string | null;
    estimatedSalary: string | null;
    currentStage: ApplicationStage;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

type CreateApplicationInput = {
    companyName: string;
    role: string;
    currentStage: ApplicationStage;
    jobUrl?: string;
    estimatedSalary?: string;
    tags?: string[];
    createdAt?: string;
};

const APPLICATIONS_KEY = "jobtracker:applications";

function getAll(): Application[] {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveAll(applications: Application[]) {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

function listApplications(userId: string): Application[] {
    return getAll()
        .filter((application) => application.userId === userId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function createApplication(userId: string, input: CreateApplicationInput): Application {
    const now = new Date().toISOString();
    const application: Application = {
        id: crypto.randomUUID(),
        userId,
        companyName: input.companyName,
        role: input.role,
        jobUrl: input.jobUrl || null,
        estimatedSalary: input.estimatedSalary || null,
        currentStage: input.currentStage,
        tags: input.tags ?? [],
        createdAt: input.createdAt || now,
        updatedAt: now,
    };

    const applications = getAll();
    applications.push(application);
    saveAll(applications);
    return application;
}

export { STAGES, listApplications, createApplication };
export type { Application, ApplicationStage, CreateApplicationInput };
