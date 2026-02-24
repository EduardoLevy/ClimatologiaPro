import { defineComponent, ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weather'
import { 
  QInput, 
  QBtn, 
  QSpinner, 
  QIcon
} from 'quasar'

export default defineComponent({
  name: 'WeatherCard',
  setup() {
    const weatherStore = useWeatherStore()
    const cityInput = ref('')

    const handleSearch = () => {
      weatherStore.fetchWeather(cityInput.value)
      cityInput.value = ''
    }

    const currentCity = computed(() => weatherStore.weatherResults[0] || null)

    const weatherMapping = {
      0: { label: 'Céu Limpo', icon: 'wb_sunny', color: 'from-orange-400 via-amber-600 to-red-700' },
      1: { label: 'Principalmente Limpo', icon: 'wb_cloudy', color: 'from-orange-300 via-amber-500 to-orange-700' },
      2: { label: 'Parcialmente Nublado', icon: 'cloud', color: 'from-slate-400 via-gray-500 to-slate-700' },
      3: { label: 'Encoberto', icon: 'filter_drama', color: 'from-slate-500 via-gray-600 to-slate-800' },
      45: { label: 'Neblina', icon: 'waves', color: 'from-gray-300 via-zinc-400 to-neutral-600' },
      48: { label: 'Neblina com Gelo', icon: 'ac_unit', color: 'from-gray-400 via-slate-500 to-zinc-700' },
      51: { label: 'Chuvisco Leve', icon: 'umbrella', color: 'from-blue-400 via-indigo-500 to-slate-800' },
      53: { label: 'Chuvisco Moderado', icon: 'umbrella', color: 'from-blue-500 via-indigo-600 to-slate-900' },
      55: { label: 'Chuvisco Denso', icon: 'umbrella', color: 'from-blue-600 via-indigo-700 to-black' },
      61: { label: 'Chuva Leve', icon: 'water_drop', color: 'from-blue-500 via-indigo-700 to-slate-900' },
      63: { label: 'Chuva Moderada', icon: 'water_drop', color: 'from-blue-600 via-indigo-800 to-indigo-950' },
      65: { label: 'Chuva Forte', icon: 'water_drop', color: 'from-blue-800 via-blue-900 to-black' },
      80: { label: 'Aguaceiros Leves', icon: 'grain', color: 'from-indigo-400 via-indigo-600 to-blue-900' },
      81: { label: 'Aguaceiros Moderados', icon: 'grain', color: 'from-indigo-600 via-blue-800 to-slate-950' },
      82: { label: 'Aguaceiros Violentos', icon: 'thunderstorm', color: 'from-blue-900 via-slate-900 to-black' },
      95: { label: 'Tempestade', icon: 'flash_on', color: 'from-purple-900 via-slate-900 to-black' },
      default: { label: 'Desconhecido', icon: 'help_outline', color: 'from-slate-700 to-slate-900' }
    }

    const getWeatherData = (code) => {
      return weatherMapping[code] || weatherMapping.default
    }

    return () => (
      <div class={`min-h-screen w-full transition-all duration-1000 ease-in-out ${getWeatherData(currentCity.value?.weather_code).color} relative overflow-hidden flex flex-col`}>
        
        {/* Decorative Elements */}
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content Container */}
        <div class="relative z-10 flex-1 flex flex-col p-6 sm:p-12 max-w-7xl mx-auto w-full gap-8">
          
          {/* Top Bar / Search */}
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center shadow-2xl">
                <QIcon name="cloud" class="text-white text-xl" />
              </div>
              <h1 class="text-white text-2xl font-black tracking-tighter uppercase">Climatologia<span class="opacity-50">Pro</span></h1>
            </div>

            <div class="w-full max-w-md group">
              <div class="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 shadow-2xl transition-all group-focus-within:border-white/30 group-focus-within:bg-white/15">
                <QInput
                  v-model={cityInput.value}
                  placeholder="Pesquisar cidade..."
                  class="flex-1 px-4"
                  dark
                  borderless
                  dense
                  onKeyup={(e) => e.key === 'Enter' && handleSearch()}
                />
                <QBtn
                  round
                  flat
                  color="white"
                  icon="search"
                  onClick={handleSearch}
                  class="hover:bg-white/10"
                />
              </div>
            </div>
          </div>

          {!currentCity.value && !weatherStore.loading && (
            <div class="flex-1 flex flex-col items-center justify-center text-white/40 gap-6 animate-pulse">
              <QIcon name="location_on" size="120px" />
              <p class="text-2xl font-light tracking-widest uppercase">Aguardando localização</p>
            </div>
          )}

          {weatherStore.loading && (
            <div class="flex-1 flex flex-col items-center justify-center gap-6">
              <QSpinner size="80px" color="white" thickness={2} />
              <p class="text-white/60 tracking-widest uppercase font-bold animate-pulse">Sincronizando Dados</p>
            </div>
          )}

          {weatherStore.error && (
            <div class="bg-red-500/20 backdrop-blur-xl border border-red-500/30 p-4 rounded-2xl text-white text-center max-w-md mx-auto">
              <p class="font-medium flex items-center justify-center gap-2">
                <QIcon name="error_outline" /> {weatherStore.error}
              </p>
            </div>
          )}

          {currentCity.value && !weatherStore.loading && (
            <div class="flex-1 flex flex-col lg:flex-row gap-8 items-stretch animate-fade-in">
              
              {/* Main Display */}
              <div class="flex-1 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl">
                <div>
                  <div class="flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-sm mb-2">
                    <QIcon name="place" size="xs" />
                    <span>{currentCity.value.country}</span>
                  </div>
                  <h2 class="text-6xl sm:text-8xl font-black text-white tracking-tight leading-none mb-4">
                    {currentCity.value.city}
                  </h2>
                  <div class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <span class="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                    <span class="text-white font-bold uppercase tracking-wider text-xs">Tempo Real</span>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row items-end sm:items-center gap-10 mt-12">
                  <div class="text-[120px] sm:text-[180px] font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                    {Math.round(currentCity.value.temp_c)}°
                  </div>
                  <div class="flex flex-col gap-4 mb-4">
                    <QIcon 
                      name={getWeatherData(currentCity.value.weather_code).icon} 
                      size="120px" 
                      class="text-white filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" 
                    />
                    <span class="text-3xl font-bold text-white uppercase tracking-tighter">
                      {getWeatherData(currentCity.value.weather_code).label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Side Panels */}
              <div class="lg:w-80 flex flex-col gap-6">
                {/* Stats Card */}
                <div class="bg-black/20 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 flex flex-col gap-8 shadow-xl">
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                        <QIcon name="water_drop" size="sm" />
                      </div>
                      <div>
                        <p class="text-white/40 text-xs font-bold uppercase tracking-widest">Umidade</p>
                        <p class="text-white text-2xl font-black">{currentCity.value.humidity}%</p>
                      </div>
                   </div>
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
                        <QIcon name="air" size="sm" />
                      </div>
                      <div>
                        <p class="text-white/40 text-xs font-bold uppercase tracking-widest">Vento</p>
                        <p class="text-white text-2xl font-black">{currentCity.value.wind_kph} <span class="text-sm opacity-40">km/h</span></p>
                      </div>
                   </div>
                   <div class="h-px bg-white/10"></div>
                   <div class="flex justify-between items-center text-white/40 text-[10px] font-black uppercase tracking-widest">
                      <span>Local: {currentCity.value.localTime}</span>
                      <span>v4.3 (OM)</span>
                   </div>
                </div>

                {/* History Mini */}
                <div class="flex-1 bg-white/5 backdrop-blur-sm border border-white/5 rounded-[32px] p-6 overflow-hidden flex flex-col gap-4">
                  <p class="text-white/60 text-[10px] font-black uppercase tracking-widest px-2">Recentes</p>
                  <div class="flex-1 overflow-y-auto custom-scroll pr-2 flex flex-col gap-2">
                    {weatherStore.weatherResults.slice(1, 5).map((history, idx) => (
                      <div key={idx} class="bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-2xl flex items-center justify-between group cursor-pointer">
                        <div class="flex flex-col">
                          <span class="text-white font-bold text-sm truncate w-24">{history.city}</span>
                          <span class="text-white/40 text-[10px] uppercase font-bold">{Math.round(history.temp_c)}°C</span>
                        </div>
                        <QBtn 
                          flat round size="xs" color="white" icon="close" 
                          class="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => { e.stopPropagation(); weatherStore.removeCard(idx + 1); }}
                        />
                      </div>
                    ))}
                    {weatherStore.weatherResults.length <= 1 && (
                      <div class="flex-1 flex items-center justify-center text-white/20 text-xs font-bold uppercase py-10">
                        Sem Histórico
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
        
        <style v-shadow-none>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </div>
    )
  }
})
