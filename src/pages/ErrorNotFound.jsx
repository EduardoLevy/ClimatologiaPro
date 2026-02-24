import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorNotFound',
  setup() {
    return () => (
      <div class="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
        <h1 class="text-9xl font-black opacity-10">404</h1>
        <p class="text-2xl font-light tracking-widest uppercase mt-4">Página não encontrada</p>
        <a href="/" class="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all font-bold">
          Voltar para Home
        </a>
      </div>
    )
  }
})
