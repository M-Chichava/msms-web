import {Role} from './role.ts'

export interface User {
    token: string;
    refreshToken: string;
    username: string;
    fullName: string;
    email: string;
    role: Role;
}

