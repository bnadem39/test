import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { UpdateSuggestionComponent } from './update-suggestion/update-suggestion.component';
import { UserListBenaliAdemComponent } from './user-list-benali-adem/user-list-benali-adem.component';
import { ListUserComponent } from './core/list-user/list-user.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListSuggestionComponent,
    HomeComponent,
    NotFoundComponent,
    SuggestionFormComponent,
    SuggestionDetailsComponent,
    UpdateSuggestionComponent,
    UserListBenaliAdemComponent,
    ListUserComponent,
    UserFormComponent,
    UserDetailsComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

