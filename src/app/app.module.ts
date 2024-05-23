import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';
import bootstrap from '../main.server';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieDetailsCardComponent } from './movie-details-card/movie-details-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DirectorInfoComponent } from './director-info/director-info.component';
import { GenreCardComponent } from './genre-card/genre-card.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToolbarComponent } from './toolbar/toolbar.component';



const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'movies', component: MovieCardComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix'},
    { path: 'profile', component: UserProfileComponent}
    
];


@NgModule({
    declarations: [
        AppComponent,
        UserRegistrationFormComponent,
        UserLoginFormComponent,
        MovieCardComponent, 
        WelcomePageComponent,
        DirectorInfoComponent,
        GenreCardComponent,
        MovieDetailsCardComponent,
        UserProfileComponent,
        ToolbarComponent
        
        
       
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSnackBarModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
       
        
     
    ],
    
    providers: [
        provideHttpClient(withFetch())
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]

})

export class AppModule { } 