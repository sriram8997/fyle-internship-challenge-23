// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { AuthenticationComponent } from './authentication/authentication.component';

// Import your components that you want to route to


// Define your routes
const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DetailsComponent },
  { path: '', component: AuthenticationComponent  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
