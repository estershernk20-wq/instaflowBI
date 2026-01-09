
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing/landing-page.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { StrategyGeneratorComponent } from './pages/dashboard/strategy-generator/strategy-generator.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Home | Estratégia do Empreendedor'
  },
  {
    path: 'app',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'strategy', pathMatch: 'full' },
      { path: 'strategy', component: StrategyGeneratorComponent, title: 'Gerador de Estratégia' }
    ]
  },
  { path: '**', redirectTo: '' }
];
