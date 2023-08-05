<template>
  <div class="widget-card">
    <div class="card-header">
      <h2 class="card-header__title">{{ `${info.name}, ${info.sys.country}` }}</h2>
    </div>
    <div class="card-body">
      <div class="header-items">
        <div class="weather-status">
          <div class="weather__icon">
            <img :src="`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`" alt="" />
          </div>
          <h3 class="weather__degree">{{ Math.round(info.main.temp) }}°C</h3>
        </div>
        <p class="header__subtitle">
          {{ subtitle }}
        </p>
      </div>
      <div class="body-items">
        <div class="body-info">
          <div class="body__icon">
            <div class="icon__wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" id="wind-direction">
                <path fill="#003166"
                  d="M55.76,31.68c-.11.1-3.22,2.78-13.51-.93-6-2.12-12.67,3.54-18.75,3.34A15.45,15.45,0,0,0,25,28.82c.49-4.46.59-11-1.43-15,4.14-.25,15.17-.41,20.19,4.16C49.4,23.08,54.37,22.47,56,22.09,57.8,24.85,58.46,29,55.76,31.68Zm-33.06.86a6.23,6.23,0,0,1-.64,1.21h0a.05.05,0,0,1,0,0h0l-.09-.1h0l-.12-.09h0l-.48-.38-.63-.49-9-7.26v-.8l0,0,0,0v0l1.38-1.39v0l9-9.13,0-.05a1.41,1.41,0,0,1,.14.18,3,3,0,0,1,.34.59c.07.16.14.33.2.51C24.16,19.16,24.43,28.26,22.7,32.54Zm-2.23-1.75a32.06,32.06,0,0,1-.67-6.9,39.37,39.37,0,0,1,.49-6.08l-7.13,7.24Zm-14-20.25a3.79,3.79,0,0,0,7.58,0A3.79,3.79,0,0,0,6.44,10.54Zm2.45,5.17V57.22h2.78V24.66l0,0,0,0v-8.9Z">
                </path>
              </svg>
            </div>
            <p class="icon__text">{{ info.wind.speed }}m/s</p>
          </div>
          <p class="body__text">Humditiy: {{ info.main.humidity }}%</p>
        </div>
        <div class="body-info">
          <div class="body__icon">
            <div class="icon__wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Wind">
                <path style="
                    line-height: normal;
                    text-indent: 0;
                    text-align: start;
                    text-decoration-line: none;
                    text-decoration-style: solid;
                    text-decoration-color: #000;
                    text-transform: none;
                    block-progression: tb;
                    white-space: normal;
                    isolation: auto;
                    mix-blend-mode: normal;
                    solid-color: #000;
                    solid-opacity: 1;
                  "
                  d="M16 2C8.274 2 2 8.274 2 16s6.274 14 14 14 14-6.274 14-14S23.726 2 16 2zm0 1c7.186 0 13 5.814 13 13s-5.814 13-13 13S3 23.186 3 16 8.814 3 16 3zm-2.508 5.994A.5.5 0 0 0 13 9.5v13a.5.5 0 1 0 1 0v-7.99l1.283 1.937a.5.5 0 0 0 .424.223.5.5 0 0 0 .068.012l6.055.588a.5.5 0 0 0 .531-.37l.776-2.898a.5.5 0 0 0-.276-.584l-5.537-2.52a.5.5 0 0 0-.238-.043.5.5 0 0 0-.104-.01.5.5 0 0 0-.18.044L14 12.094V9.5a.5.5 0 0 0-.508-.506zm3.955 3.06.924.42-.902 3.366-1.01-.1.988-3.685zm-1.062.104-.791 2.947-1.346-2.03 2.137-.917zm2.908.737.924.42-.73 2.722-1.01-.098.816-3.044zm1.846.837.922.42-.557 2.08-1.01-.097.645-2.403z"
                  color="#000" enable-background="accumulate" font-family="sans-serif" font-weight="400"
                  overflow="visible" fill="#595bd4" class="color000000 svgShape"></path>
              </svg>
            </div>
            <p class="icon__text">{{ info.main.pressure }}hPa</p>
          </div>
          <p class="body__text">Visibility: {{ visibility }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  info: {
    type: Object,
    required: true
  }
})

const subtitle = computed(() => {
  return `FeeIs like ${Math.round(props.info.main.feels_like)}°C. ${props.info.weather[0].description}`
})

const visibility = computed(() => Math.floor(props.info.visibility / 100))
</script>

<style lang="scss">
.widget-card {
  width: 100%;
  background-color: #fefefe;
  border-radius: 10px;
  border: 1px solid #787676;
  padding: 15px;

  .card {
    &-header {
      &__title {
        text-align: start;
        color: rgb(104, 98, 98);
      }
    }

    &-body {
      margin-top: 25px;
      width: 100%;

      .weather {
        &-status {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        &__icon {
          svg {
            width: 95px;
            height: 95px;
          }
        }

        &__degree {
          font-size: 45px;
        }
      }

      .header__subtitle {
        margin: 25px 0 20px 0;
      }

      .body-items {
        display: flex;
        align-items: flex-start;
        gap: 20px;
      }

      .body-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .body__icon {
        display: flex;
        align-items: center;

        .icon__wrapper {
          width: 20px;
          height: 20px;

          svg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }

    &-footer {
      margin-top: 40px;
    }
  }
}
</style>
