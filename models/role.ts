import { Permission } from './permission.ts'

export interface Role {
    description: string;
    name: string;
    permissions: Permission[];
}