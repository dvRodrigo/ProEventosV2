import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { EventoDetalheComponent } from './components/eventos/evento-detalhe/evento-detalhe.component';
import { EventoListaComponent } from './components/eventos/evento-lista/evento-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

const routes: Routes = [
  {
    path: 'user', component:UserComponent,
    children: [
      {path:'login', component: LoginComponent},
      {path:'registration', component: RegistrationComponent},
    ]
  },
  {path:'user/perfil',component: PerfilComponent},
  {path:'contatos',component: ContatosComponent},
  {path:'dashboard',component: DashboardComponent},
  {path:'palestrantes',component: PalestrantesComponent},
  {path:'eventos',redirectTo: 'eventos/lista', pathMatch: 'full'},
  {path:'eventos',component: EventosComponent,
    children:[
      {path:'detalhe/:id',component: EventoDetalheComponent },
      {path:'detalhe',component: EventoDetalheComponent },
       {path:'lista',component: EventoListaComponent}
    ]},
  {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
