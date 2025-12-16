import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = '/api/users';

    constructor(private http: HttpClient) { }

    // GET /users - Récupère tous les utilisateurs
    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // GET /users/:id - Récupère un utilisateur par ID
    getUserById(id: number): Observable<{ success: boolean; user: User }> {
        return this.http.get<{ success: boolean; user: User }>(`${this.apiUrl}/${id}`);
    }

    // POST /users - Crée un nouvel utilisateur
    addUser(user: User): Observable<{ success: boolean; message: string; id: number }> {
        return this.http.post<{ success: boolean; message: string; id: number }>(this.apiUrl, user);
    }

    // PUT /users/:id - Met à jour un utilisateur
    updateUser(id: number, user: User): Observable<{ success: boolean; message: string }> {
        return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`, user);
    }

    // DELETE /users/:id - Supprime un utilisateur
    deleteUser(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
    }

    // GET /users/role/:role - Récupère les utilisateurs par rôle
    getUsersByRole(role: string): Observable<{ success: boolean; count: number; users: User[] }> {
        return this.http.get<{ success: boolean; count: number; users: User[] }>(`${this.apiUrl}/role/${role}`);
    }

    // GET /users/status/:status - Récupère les utilisateurs par statut
    getUsersByStatus(status: string): Observable<{ success: boolean; count: number; users: User[] }> {
        return this.http.get<{ success: boolean; count: number; users: User[] }>(`${this.apiUrl}/status/${status}`);
    }
}
