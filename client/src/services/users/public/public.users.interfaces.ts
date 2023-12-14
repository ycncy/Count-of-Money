export type UpdateProfileDto = {
    username: string;
    email: string;
    password: string;
    baseCurrency: string;
}

export type AddKeywordsDto = {
    keywords: string[];
}