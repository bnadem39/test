/**
 * Interface pour les utilisateurs
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at?: Date | string;
    updated_at?: Date | string;
}
