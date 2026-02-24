import { defineComponent } from 'vue'
import { QPage } from 'quasar'
import WeatherCard from 'components/WeatherCard'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    return () => (
      <QPage class="flex">
        <WeatherCard />
      </QPage>
    )

  }
})
