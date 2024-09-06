
export type User = {
    id?: number;
    username: string;
    password: string;
    departmentId: number;
};

export type LoginCredentials = {
    username: string;
    password: string;
};