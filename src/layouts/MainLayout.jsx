import { defineComponent } from 'vue'
import { QLayout, QPageContainer } from 'quasar'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    return () => (
      <QLayout view="lHh Lpr lFf" class="bg-slate-900">
        <QPageContainer class="p-0">
          <RouterView />
        </QPageContainer>
      </QLayout>
    )
  }
})
