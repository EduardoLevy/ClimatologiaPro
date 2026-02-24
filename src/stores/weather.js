import { defineStore } from 'pinia'
import axios from 'axios'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    city: '',
    weatherResults: [],
    loading: false,
    error: '',
    // Open-Meteo is free and doesn't require a key for basic usage
    geoApiUrl: 'https://geocoding-api.open-meteo.com/v1/search',
    weatherApiUrl: 'https://api.open-meteo.com/v1/forecast',
  }),

  actions: {
    async fetchWeather(cityName) {
      if (!cityName) {
        this.error = 'Por favor, digite o nome de uma cidade.'
        return
      }

      this.loading = true
      this.error = ''

      try {
        // 1. Geocoding skip city to coordinates
        const geoResponse = await axios.get(`${this.geoApiUrl}?name=${cityName}&count=1&language=pt&format=json`)
        
        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
          throw new Error('Cidade não encontrada.')
        }

        const location = geoResponse.data.results[0]
        const { latitude, longitude, name, admin1, country } = location

        // 2. Fetch Weather Data
        const weatherResponse = await axios.get(`${this.weatherApiUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&timezone=auto`)
        
        const current = weatherResponse.data.current

        const newWeather = {
          temp_c: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          wind_kph: current.wind_speed_10m,
          weather_code: current.weather_code,
          is_day: current.is_day,
          city: name,
          state: admin1,
          country: country,
          localTime: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          lastUpdated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        }

        // Add to the beginning of the list
        this.weatherResults.unshift(newWeather)
        this.city = '' // Clear input
      } catch (err) {
        console.error(err)
        this.error = err.message || 'Erro ao buscar dados do clima.'
      } finally {
        this.loading = false
      }
    },

    removeCard(index) {
      this.weatherResults.splice(index, 1)
    }
  }
})
