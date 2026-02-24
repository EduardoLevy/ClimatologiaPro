import { defineComponent, ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weather'

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
      0: { label: 'Céu Limpo', icon: 'Sun', color: 'from-orange-400 via-amber-600 to-red-700' },
      1: { label: 'Principalmente Limpo', icon: 'CloudSun', color: 'from-orange-300 via-amber-500 to-orange-700' },
      2: { label: 'Parcialmente Nublado', icon: 'Cloud', color: 'from-slate-400 via-gray-500 to-slate-700' },
      3: { label: 'Encoberto', icon: 'Cloud', color: 'from-slate-500 via-gray-600 to-slate-800' },
      45: { label: 'Neblina', icon: 'CloudFog', color: 'from-gray-300 via-zinc-400 to-neutral-600' },
      48: { label: 'Neblina com Gelo', icon: 'ThermometerSnowflake', color: 'from-gray-400 via-slate-500 to-zinc-700' },
      51: { label: 'Chuvisco Leve', icon: 'CloudDrizzle', color: 'from-blue-400 via-indigo-500 to-slate-800' },
      53: { label: 'Chuvisco Moderado', icon: 'CloudDrizzle', color: 'from-blue-500 via-indigo-600 to-slate-900' },
      55: { label: 'Chuvisco Denso', icon: 'CloudRain', color: 'from-blue-600 via-indigo-700 to-black' },
      61: { label: 'Chuva Leve', icon: 'CloudRain', color: 'from-blue-500 via-indigo-700 to-slate-900' },
      63: { label: 'Chuva Moderada', icon: 'CloudRain', color: 'from-blue-600 via-indigo-800 to-indigo-950' },
      65: { label: 'Chuva Forte', icon: 'CloudRain', color: 'from-blue-800 via-blue-900 to-black' },
      80: { label: 'Aguaceiros Leves', icon: 'CloudRain', color: 'from-indigo-400 via-indigo-600 to-blue-900' },
      81: { label: 'Aguaceiros Moderados', icon: 'CloudRain', color: 'from-indigo-600 via-blue-800 to-slate-950' },
      82: { label: 'Aguaceiros Violentos', icon: 'CloudLightning', color: 'from-blue-900 via-slate-900 to-black' },
      95: { label: 'Tempestade', icon: 'CloudLightning', color: 'from-purple-900 via-slate-900 to-black' },
      default: { label: 'Desconhecido', icon: 'HelpCircle', color: 'from-slate-700 to-slate-900' }
    }

    const getWeatherData = (code) => {
      return weatherMapping[code] || weatherMapping.default
    }

    // Lucide Icons (Minimal SVG implementation for build efficiency)
    const Icons = {
      Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
      Cloud: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.3-1.7-4.2-3.9-4.5-1.1-2.7-3.8-4.5-6.8-4.5-3.8 0-7 2.8-7.7 6.5C1.6 13 0 15 0 17.5 0 20 2 22 4.5 22h13z"/></svg>,
      Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
      Droplets: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4.5-8.8-4.5-8.8S2 9 2 12.3c0 2.2 1.8 4 4 4z"/><path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4.5-8.8-4.5-8.8S12 9 12 12.3c0 2.2 1.8 4 4 4z"/></svg>,
      Wind: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>,
      Close: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
      MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    }

    return () => (
      <div class={`min-h-screen w-full transition-all duration-1000 ease-in-out ${getWeatherData(currentCity.value?.weather_code).color} relative overflow-hidden flex flex-col font-sans antialiased`}>
        
        {/* Decorative Elements */}
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-black/20 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content Container */}
        <div class="relative z-10 flex-1 flex flex-col p-6 sm:p-12 max-w-7xl mx-auto w-full gap-8">
          
          {/* Top Bar / Search */}
          <div class="flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center shadow-2xl text-white">
                <Icons.Cloud />
              </div>
              <h1 class="text-white text-2xl font-black tracking-tighter uppercase">Climatologia<span class="opacity-50">Pro</span></h1>
            </div>

            <div class="w-full max-w-md group">
              <div class="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-1.5 flex items-center gap-2 shadow-2xl transition-all group-focus-within:border-white/30 group-focus-within:bg-white/15">
                <input
                  value={cityInput.value}
                  onInput={(e) => cityInput.value = e.target.value}
                  placeholder="Pesquisar cidade..."
                  class="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder-white/40 text-sm"
                  onKeyup={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button
                  onClick={handleSearch}
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10 text-white"
                >
                  <Icons.Search />
                </button>
              </div>
            </div>
          </div>

          {!currentCity.value && !weatherStore.loading && (
            <div class="flex-1 flex flex-col items-center justify-center text-white/40 gap-6 animate-pulse">
              <Icons.MapPin size="120" class="w-24 h-24 mb-4" />
              <p class="text-2xl font-light tracking-widest uppercase">Aguardando localização</p>
            </div>
          )}

          {weatherStore.loading && (
            <div class="flex-1 flex flex-col items-center justify-center gap-6">
              <div class="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <p class="text-white/60 tracking-widest uppercase font-bold animate-pulse">Sincronizando Dados</p>
            </div>
          )}

          {weatherStore.error && (
            <div class="bg-red-500/20 backdrop-blur-xl border border-red-500/30 p-4 rounded-2xl text-white text-center max-w-md mx-auto">
              <p class="font-medium flex items-center justify-center gap-2">
                {weatherStore.error}
              </p>
            </div>
          )}

          {currentCity.value && !weatherStore.loading && (
            <div class="flex-1 flex flex-col lg:flex-row gap-8 items-stretch animate-fade-in">
              
              {/* Main Display */}
              <div class="flex-1 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 sm:p-12 flex flex-col justify-between shadow-2xl">
                <div>
                  <div class="flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-sm mb-2">
                    <Icons.MapPin />
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
                    <div class="text-white scale-[3] origin-left my-10 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                      {/* Using the icon name from mapping to render SVG */}
                      {(() => {
                        const iconName = getWeatherData(currentCity.value.weather_code).icon
                        const IconComponent = Icons[iconName] || Icons.Cloud
                        return <IconComponent />
                      })()}
                    </div>
                    <span class="text-3xl font-bold text-white uppercase tracking-tighter mt-4">
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
                        <Icons.Droplets />
                      </div>
                      <div>
                        <p class="text-white/40 text-xs font-bold uppercase tracking-widest">Umidade</p>
                        <p class="text-white text-2xl font-black">{currentCity.value.humidity}%</p>
                      </div>
                   </div>
                   <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
                        <Icons.Wind />
                      </div>
                      <div>
                        <p class="text-white/40 text-xs font-bold uppercase tracking-widest">Vento</p>
                        <p class="text-white text-2xl font-black">{currentCity.value.wind_kph} <span class="text-sm opacity-40">km/h</span></p>
                      </div>
                   </div>
                   <div class="h-px bg-white/10"></div>
                   <div class="flex justify-between items-center text-white/40 text-[10px] font-black uppercase tracking-widest">
                      <span>Local: {currentCity.value.localTime}</span>
                      <span>v5.0 (VITE)</span>
                   </div>
                </div>

                {/* History Mini */}
                <div class="flex-1 bg-white/5 backdrop-blur-sm border border-white/5 rounded-[32px] p-6 overflow-hidden flex flex-col gap-4">
                  <p class="text-white/60 text-[10px] font-black uppercase tracking-widest px-2">Recentes</p>
                  <div class="flex-1 overflow-y-auto custom-scroll pr-2 flex flex-col gap-2">
                    {weatherStore.weatherResults.slice(1, 5).map((history, idx) => (
                      <div key={idx} class="bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-2xl flex items-center justify-between group cursor-pointer overflow-hidden backdrop-blur-md">
                        <div class="flex flex-col">
                          <span class="text-white font-bold text-sm truncate w-24">{history.city}</span>
                          <span class="text-white/40 text-[10px] uppercase font-bold">{Math.round(history.temp_c)}°C</span>
                        </div>
                        <button 
                          class="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all focus:outline-none"
                          onClick={(e) => { e.stopPropagation(); weatherStore.removeCard(idx + 1); }}
                        >
                          <Icons.Close />
                        </button>
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
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        `}</style>
      </div>
    )
  }
})
