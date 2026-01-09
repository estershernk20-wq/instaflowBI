
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface para o plano de conteúdo
export interface ContentPlanItem {
  day: string;
  format: string;
  headline: string;
  script: string;
  caption: string;
  goal: string;
}

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'; // Ajustar para URL de produção

  generateStrategy(data: any): Observable<ContentPlanItem[]> {
    return this.http.post<ContentPlanItem[]>(`${this.apiUrl}/generate-strategy`, data);
  }

  analyzeProfile(data: any): Observable<{ analysis: string }> {
    return this.http.post<{ analysis: string }>(`${this.apiUrl}/analyze-profile`, data);
  }
}
