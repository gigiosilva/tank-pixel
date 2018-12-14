import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [

    { path:'', component: HomeComponent },

];

export const routing = RouterModule.forRoot(appRoutes);