import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';


import { AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";



@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
