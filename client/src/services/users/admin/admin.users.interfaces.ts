export type UpdateUserDto = {
    username: string;
    email: string;
    password: string;
    baseCurrency: string;
}

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    baseCurrency: string;
    role: string;
    keywords: string[];
    favorites: []
}