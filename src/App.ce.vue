<template>
  <div class="weather-widget">
    <div class="widget__container">
      <widget-settings v-model="weathers" class="widget__settings" @settings:add="addWeather"
        @settings:remove="removeWeather" />

      <div class="widget-card-list">
        <template v-for="weather in weathers" :key="weather.id">
          <widget-card class="widget__card" :info="weather" />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import WidgetCard from "~/components/WidgetCard.ce.vue";
import WidgetSettings from "~/components/WidgetSettings.ce.vue";
import { WeatherStorage } from '~/common/utils.js'
import { WeatherServiceImpl } from "~/services/weather-service";

const weathers = ref([])

onMounted(() => {
  init()
})

async function addWeather(location) {
  try {
    const { data } = await WeatherServiceImpl.getCoords({ q: location, units: 'metric' })
    WeatherStorage.add(data.coord)
    weathers.value.push(data)
  } catch (error) {
    alert('Invalid location')
  }
}

function removeWeather(index) {
  weathers.value.splice(index, 1)
  WeatherStorage.remove(index)
}

function init() {
  const coords = WeatherStorage.get()

  Promise.allSettled(coords.map((coord) => WeatherServiceImpl.getWeather({ ...coord, units: 'metric' })))
    .then((res) => {
      weathers.value = res.filter(({ status }, index) => {
        if (status === 'fulfilled') return true

        WeatherStorage.remove(index)
        return false
      }).map(({ value }) => value.data)
    })
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.weather-widget {
  max-width: 350px;
  min-width: 350px;

  .widget {
    &__container {
      width: 100%;
      padding: 15px;
    }

    &__settings {
      margin-bottom: 20px;
    }

    &-card-list {
      display: flex;
      flex-direction: column;
      grid-gap: 12px;
    }
  }
}
</style>
