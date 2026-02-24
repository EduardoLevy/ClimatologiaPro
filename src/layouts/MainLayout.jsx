import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return () => (
      <div class="bg-slate-900 min-h-screen">
        <RouterView />
      </div>
    )
  }
})
