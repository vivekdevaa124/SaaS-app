export interface CreateCompanion {
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}

export interface GetAllCompanions {
    limit?: number;
    page?: number;
    subject?: string;
    topic?: string;
}

export interface Companion {
    id: string;
    author: string;
    name: string;
    subject: string;
    topic: string;
    voice: string;
    style: string;
    duration: number;
}
