
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div class="p-6 border-b border-gray-100">
          <h1 class="text-xl font-bold text-indigo-600">Estratégia App</h1>
        </div>
        <nav class="flex-1 p-4 space-y-2">
          <a routerLink="/app/strategy" routerLinkActive="bg-indigo-50 text-indigo-600" class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition">
            <span class="mr-3">🚀</span> Gerador de Conteúdo
          </a>
          <a href="#" class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition opacity-50 cursor-not-allowed" title="Em breve">
            <span class="mr-3">🕵️</span> Espião de Concorrentes
          </a>
          <a href="#" class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition opacity-50 cursor-not-allowed" title="Em breve">
            <span class="mr-3">📈</span> Métricas & Vendas
          </a>
          <a href="#" class="flex items-center px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-50 transition opacity-50 cursor-not-allowed" title="Em breve">
            <span class="mr-3">🎓</span> Academia (Cursos)
          </a>
        </nav>
        <div class="p-4 border-t border-gray-100">
          <div class="bg-indigo-50 p-4 rounded-lg">
            <p class="text-sm font-semibold text-indigo-900">Plano Gratuito</p>
            <p class="text-xs text-indigo-700 mt-1">Faça upgrade para acessar o Espião de Concorrentes.</p>
            <button class="mt-3 w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded hover:bg-indigo-700">
              Assinar PRO
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm p-4 flex justify-between items-center md:hidden">
          <span class="font-bold text-indigo-600">Estratégia App</span>
          <button class="text-gray-500">☰</button>
        </header>
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class DashboardLayoutComponent {}
