import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { OpenWeatherApiService } from '../services/openweatherapi.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeBackgroundComponent } from './components/home-background/home-background.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarFormComponent } from './components/navbar/navbar-form/navbar-form.component';
import { NavbarLinksComponent } from './components/navbar/navbar-links/navbar-links.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherComponent } from './components/weather-component/weather-component.component';
import { MaterialModule } from './material.module';
import { FooterLoadingIndicator } from '../app/components/footer/footer-loading-indicator/footer-loading-indicator.component';
import { ComponentTodoMenuFooter } from './components/footer/footer-todo-menu/footer-todo-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeBackgroundComponent,
    ClockComponent,
    NavbarFormComponent,
    FooterComponent,
    NavbarLinksComponent,
    WeatherComponent,
    LoginComponent,
    FooterLoadingIndicator,
    ComponentTodoMenuFooter,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [OpenWeatherApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
