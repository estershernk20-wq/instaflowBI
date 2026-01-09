
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Header -->
      <header class="bg-white border-b border-gray-100 fixed w-full z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Estratégia.ai
              </span>
            </div>
            <nav class="hidden md:flex space-x-8">
              <a href="#funcionalidades" class="text-gray-500 hover:text-gray-900">Funcionalidades</a>
              <a href="#precos" class="text-gray-500 hover:text-gray-900">Planos</a>
              <a href="#blog" class="text-gray-500 hover:text-gray-900">Blog SEO</a>
            </nav>
            <div class="flex items-center space-x-4">
              <a routerLink="/app" class="text-indigo-600 font-medium hover:text-indigo-500">Login</a>
              <a routerLink="/app" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Começar Grátis
              </a>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <main class="flex-grow pt-24 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Seu novo <span class="text-indigo-600">Gestor de Marketing</span><br>é uma Inteligência Artificial.
          </h1>
          <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Automatize sua estratégia de conteúdo, análise de concorrência e vendas. 
            O app que substitui uma agência inteira por uma fração do preço.
          </p>
          <div class="mt-8 flex justify-center gap-4">
            <a routerLink="/app" class="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition">
              Gerar Estratégia Agora
            </a>
            <a href="#demo" class="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg md:px-10">
              Ver Demo
            </a>
          </div>
        </div>

        <!-- Features Grid -->
        <section id="funcionalidades" class="py-16 bg-white mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Recursos</h2>
              <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Tudo o que você precisa para escalar
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Feature 1 -->
              <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition">
                <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  📅
                </div>
                <h3 class="text-lg font-medium text-gray-900">Calendário Editorial IA</h3>
                <p class="mt-2 text-gray-500">Planejamento de 7 dias criado em segundos, focado na jornada de compra do seu cliente.</p>
              </div>
              
              <!-- Feature 2 -->
              <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition">
                <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  📊
                </div>
                <h3 class="text-lg font-medium text-gray-900">Análise de Concorrência</h3>
                <p class="mt-2 text-gray-500">Espione legalmente o que está funcionando para seus concorrentes e adapte para o seu negócio.</p>
              </div>

              <!-- Feature 3 -->
              <div class="p-6 bg-gray-50 rounded-xl hover:shadow-md transition">
                <div class="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 text-2xl">
                  💰
                </div>
                <h3 class="text-lg font-medium text-gray-900">Foco em Vendas</h3>
                <p class="mt-2 text-gray-500">Scripts de vendas e legendas persuasivas criadas por uma IA treinada em copywriting.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer Simples -->
      <footer class="bg-gray-800 text-white py-8">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Estratégia do Empreendedor. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  `
})
export class LandingPageComponent {}
