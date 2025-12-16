import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = '/api/suggestions';

  constructor(private http: HttpClient) { }

  // GET /suggestions - Récupère toutes les suggestions
  getSuggestions(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.apiUrl);
  }

  // GET /suggestions/:id - Récupère une suggestion par ID
  getSuggestionById(id: number): Observable<{ success: boolean; suggestion: Suggestion }> {
    return this.http.get<{ success: boolean; suggestion: Suggestion }>(`${this.apiUrl}/${id}`);
  }

  // POST /suggestions - Crée une nouvelle suggestion
  addSuggestion(suggestion: Suggestion): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.post<{ success: boolean; message: string; id: number }>(this.apiUrl, suggestion);
  }

  // PUT /suggestions/:id - Met à jour une suggestion
  updateSuggestion(id: number, suggestion: Suggestion): Observable<{ success: boolean; message: string }> {
    return this.http.put<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`, suggestion);
  }

  // DELETE /suggestions/:id - Supprime une suggestion
  deleteSuggestion(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }

  // POST /suggestions/:id/like - Incrémente le nombre de likes
  likeSuggestion(id: number): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/${id}/like`, {});
  }

  // GET /suggestions/category/:category - Récupère par catégorie
  getSuggestionsByCategory(category: string): Observable<{ success: boolean; count: number; suggestions: Suggestion[] }> {
    return this.http.get<{ success: boolean; count: number; suggestions: Suggestion[] }>(`${this.apiUrl}/category/${category}`);
  }

  // GET /suggestions/status/:status - Récupère par statut
  getSuggestionsByStatus(status: string): Observable<{ success: boolean; count: number; suggestions: Suggestion[] }> {
    return this.http.get<{ success: boolean; count: number; suggestions: Suggestion[] }>(`${this.apiUrl}/status/${status}`);
  }
}
