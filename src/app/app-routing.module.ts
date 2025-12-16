import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { UpdateSuggestionComponent } from './update-suggestion/update-suggestion.component';
import { ListUserComponent } from './core/list-user/list-user.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Routes Suggestions
  { path: 'suggestions', component: ListSuggestionComponent },
  { path: 'suggestion/add', component: SuggestionFormComponent },
  { path: 'suggestions/details/:id', component: SuggestionDetailsComponent },
  { path: 'suggestions/update/:id', component: UpdateSuggestionComponent },
  // Routes Utilisateurs
  { path: 'list-users', component: ListUserComponent },
  { path: 'user/add', component: UserFormComponent },
  { path: 'user/details/:id', component: UserDetailsComponent },
  { path: 'user/update/:id', component: UpdateUserComponent },
  // Module Users (login)
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

