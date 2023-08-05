import { defineCustomElement } from 'vue';
import { combineStyles } from '~/common/utils'
import App from '~/App.ce.vue';
import WidgetCard from '~/components/WidgetCard.ce.vue';
import WidgetSettings from '~/components/WidgetSettings.ce.vue'


// Defining custom elements
const AppElement = defineCustomElement({
  ...App,
  styles: combineStyles(App.styles, WidgetCard.styles, WidgetSettings.styles)
})

// registering custom elements
customElements.define('weather-widget', AppElement)

