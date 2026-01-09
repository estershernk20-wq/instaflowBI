
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StrategyService, ContentPlanItem } from '../../../services/strategy.service';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-strategy-generator',
  imports: [ReactiveFormsModule, DatePipe],
  template: `
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Gerador de Estratégia Semanal</h2>
        <p class="text-gray-500">Nossa IA analisará seu nicho e criará um plano focado em vendas.</p>
      </div>

      <!-- Formulário de Entrada -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <form [formGroup]="form" (ngSubmit)="generate()" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Seu Nicho</label>
              <input type="text" formControlName="niche" placeholder="Ex: Nutrição Esportiva, Moda Feminina..." 
                class="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Produto Principal</label>
              <input type="text" formControlName="product" placeholder="Ex: Consultoria Online, Vestido de Festa..."
                class="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Objetivo da Semana</label>
            <select formControlName="goal" class="w-full rounded-lg border-gray-300 border p-2">
              <option value="Vendas Diretas">Gerar Vendas Imediatas</option>
              <option value="Captura de Leads">Capturar Leads (Topo de Funil)</option>
              <option value="Autoridade">Aumentar Autoridade/Branding</option>
              <option value="Engajamento">Recuperar Engajamento</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Descreva seu Cliente Ideal (Persona)</label>
            <textarea formControlName="personaData" rows="3" placeholder="Ex: Mulheres de 25-35 anos, buscam praticidade, sofrem com falta de tempo..."
              class="w-full rounded-lg border-gray-300 border p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>

          <div class="flex justify-end">
            <button type="submit" [disabled]="form.invalid || loading()" 
              class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
              @if (loading()) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gerando Estratégia...
              } @else {
                ✨ Gerar Calendário com IA
              }
            </button>
          </div>
        </form>
      </div>

      <!-- Resultado da IA -->
      @if (strategyResult()) {
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-gray-900 flex items-center">
            <span class="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">📅</span>
            Seu Plano de Ação
          </h3>

          <div class="grid grid-cols-1 gap-6">
            @for (item of strategyResult(); track $index) {
              <div class="bg-white border-l-4 border-indigo-500 rounded-r-xl shadow-sm p-6 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      {{ item.day }}
                    </span>
                    <span class="ml-2 text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {{ item.format }}
                    </span>
                  </div>
                  <span class="text-xs text-gray-400 font-medium">{{ item.goal }}</span>
                </div>

                <h4 class="text-lg font-bold text-gray-900 mb-2">"{{ item.headline }}"</h4>
                
                <div class="space-y-4">
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-semibold text-gray-700 mb-1">🎥 Roteiro Visual:</p>
                    <p class="text-sm text-gray-600">{{ item.script }}</p>
                  </div>
                  
                  <div class="bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm font-semibold text-gray-700 mb-1">✍️ Legenda & Copy:</p>
                    <p class="text-sm text-gray-600 whitespace-pre-line">{{ item.caption }}</p>
                  </div>
                </div>
                
                <div class="mt-4 flex gap-2">
                   <button class="text-sm text-indigo-600 font-medium hover:text-indigo-800">Copiar Texto</button>
                   <button class="text-sm text-gray-500 font-medium hover:text-gray-700">Agendar Post</button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class StrategyGeneratorComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private strategyService: StrategyService = inject(StrategyService);
  
  loading = signal(false);
  strategyResult = signal<ContentPlanItem[] | null>(null);

  form = this.fb.group({
    niche: ['', Validators.required],
    product: ['', Validators.required],
    goal: ['Vendas Diretas', Validators.required],
    personaData: ['', Validators.required]
  });

  generate() {
    if (this.form.invalid) return;

    this.loading.set(true);
    this.strategyResult.set(null); // Limpar anterior

    this.strategyService.generateStrategy(this.form.value).subscribe({
      next: (data) => {
        this.strategyResult.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        alert('Erro ao gerar estratégia. Verifique o console.');
      }
    });
  }
}
