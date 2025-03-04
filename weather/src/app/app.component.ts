import { NgIf , CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  city: string = 'Nashik'; // Default city
  alertMessage: string = '';
  weatherData: any = null;
  forecastData: any[] = [];

  private apiKey: string = 'a95d5b528ae85d68a710298f1cdd38f6';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/';

  ngOnInit() {
    this.getWeather(this.city);
  }

  async getWeather(city: string) {
    try {
      this.alertMessage = '';
      const weatherResponse = await fetch(`${this.apiUrl}weather?q=${city}&units=metric&appid=${this.apiKey}`);
      const forecastResponse = await fetch(`${this.apiUrl}forecast?q=${city}&units=metric&appid=${this.apiKey}`);

      if (weatherResponse.ok && forecastResponse.ok) {
        this.weatherData = await weatherResponse.json();
        const forecast = await forecastResponse.json();
        this.forecastData = forecast.list.filter((item: any) => item.dt_txt.includes('12:00:00'));
      } else {
        this.alertMessage = 'City not found. Please try again.';
        this.weatherData = null;
        this.forecastData = [];
      }
    } catch (error) {
      this.alertMessage = 'Failed to fetch weather data. Please try again later.';
      this.weatherData = null;
      this.forecastData = [];
    }
  }

  onSearch() {
    if (this.city.trim()) {
      this.getWeather(this.city.trim());
    } else {
      this.alertMessage = 'Please enter a valid city name.';
    }
  }
}
