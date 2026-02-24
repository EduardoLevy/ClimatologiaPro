import { defineComponent } from 'vue'
import WeatherCard from '../components/WeatherCard'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return () => (
      <main class="flex min-h-screen">
        <WeatherCard />
      </main>
    )
  }
})
