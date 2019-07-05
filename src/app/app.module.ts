import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
   imports: [
      BrowserModule,
      HttpClientModule,
      FlightBookingModule,
      AppRoutingModule,
      SharedModule,
   ],
   declarations: [
      AppComponent,
      SidebarComponent,
      NavbarComponent,
      HomeComponent
   ],
   providers: [ /* FlightService */ ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
