import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Needed for template-driven forms
import { AppRoutingModule } from './app-routing.module'; // Import routing module

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // Add routing module here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
