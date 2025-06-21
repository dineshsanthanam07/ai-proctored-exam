import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/auth.interceptor';
import { BaseLoginComponent } from './login/base-login/base-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { StudentsTestComponent } from './student/student-test/student-test.component';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
    BaseLoginComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,CommonModule, BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
