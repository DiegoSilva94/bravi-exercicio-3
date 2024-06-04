import { Routes } from '@angular/router';
import {PessoasComponent} from "./pessoas/pessoas.component";
import {PessoaViewComponent} from "./pessoa-view/pessoa-view.component";
import {PessoaFormComponent} from "./pessoa-form/pessoa-form.component";

export const routes: Routes = [
  { path:'pessoa', component: PessoasComponent },
  { path:'pessoa/criar', component: PessoaFormComponent },
  { path:'pessoa/:id', component: PessoaViewComponent },
  { path:'pessoa/:id/editar', component: PessoaFormComponent },
  { path:'', redirectTo:'pessoa', pathMatch: 'full' }
];
