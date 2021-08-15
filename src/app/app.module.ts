import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SettingsComponent } from './pages/settings/settings.component';

const components = [
  AppComponent,
  HomeComponent,
];

const materialModules = [
  MatButtonModule
];

@NgModule({
  declarations: [...components, SettingsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ...materialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
