import DefaultTheme from 'vitepress/theme'
import NadaMap from './components/NadaMap.vue'
import GetNada from './components/GetNada.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NadaMap', NadaMap)
    app.component('GetNada', GetNada)
  }
}
