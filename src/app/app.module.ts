import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
