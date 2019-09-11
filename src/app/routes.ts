import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CombinedComponent } from './combined/combined.component';
const appRoutes: Routes = [
    { path: '', redirectTo: 'Combined', pathMatch: 'full' },
    { path: 'Default', component: CombinedComponent },
    { path: 'Combined', component: CombinedComponent }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);