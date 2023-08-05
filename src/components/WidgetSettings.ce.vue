<template>
  <div :class="['widget-settings', { 'is-hidden': isHidden }]">
    <div class="settings-wrapper">
      <div class="settings-header">
        <h4 class="settings__title">Settings</h4>
        <button class="settings__btn" @click="isHidden = !isHidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" enable-background="new 0 0 512 512"
            viewBox="0 0 512 512" id="close">
            <line x1="486.21" x2="26.739" y1="26.814" y2="486.139" fill="none" stroke="#000" stroke-linecap="round"
              stroke-linejoin="round" stroke-miterlimit="2.613" stroke-width="13.417"></line>
            <line x1="486.21" x2="26.739" y1="486.139" y2="26.814" fill="none" stroke="#000" stroke-linecap="round"
              stroke-linejoin="round" stroke-miterlimit="2.613" stroke-width="13.417"></line>
          </svg>
        </button>
      </div>
      <div class="settings-body">
        <draggable v-model="cities">
          <template #item="{ element: city, index }">
            <div class="settings-city">
              <button class="city__btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="menu">
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
              </button>
              <p class="city__title">{{ city.name }}</p>
              <button class="city__btn trash" @click="emit('settings:remove', index)">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" id="trash">
                  <path
                    d="M400 113.3h-80v-20c0-16.2-13.1-29.3-29.3-29.3h-69.5C205.1 64 192 77.1 192 93.3v20h-80V128h21.1l23.6 290.7c0 16.2 13.1 29.3 29.3 29.3h141c16.2 0 29.3-13.1 29.3-29.3L379.6 128H400v-14.7zm-193.4-20c0-8.1 6.6-14.7 14.6-14.7h69.5c8.1 0 14.6 6.6 14.6 14.7v20h-98.7v-20zm135 324.6v.8c0 8.1-6.6 14.7-14.6 14.7H186c-8.1 0-14.6-6.6-14.6-14.7v-.8L147.7 128h217.2l-23.3 289.9z">
                  </path>
                  <path d="M249 160h14v241h-14zM320 160h-14.6l-10.7 241h14.6zM206.5 160H192l10.7 241h14.6z"></path>
                </svg>
              </button>
            </div>
          </template>
        </draggable>
        <form class="settings-form" @submit.prevent="submit">
          <label class="input-wrapper">
            <p class="form__title">Add Location:</p>
            <input class="form__input" type="search" v-model="location" />
          </label>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update:modelValue', 'settings:add', 'settings:remove'])

const isHidden = ref(true)
const location = ref('')
const cities = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

function submit() {
  location.value = location.value.trim()
  if (!location.value) return

  emit('settings:add', location.value)
  location.value = ''
}
</script>

<style lang="scss">
.widget-settings {
  transition: 0.2s ease-in-out;

  &.is-hidden {
    .settings {
      &-body {
        display: none;
      }

      &__btn {
        transform: rotate(45deg);
      }
    }
  }

  .settings {
    &-wrapper {
      width: 100%;
      background-color: #fefefe;
      border-radius: 10px;
      border: 1px solid #787676;
      padding: 15px;
    }

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-body {
      margin-top: 15px;
    }

    &__title {
      font-size: 23px;
      font-weight: 500;
    }

    &__btn {
      width: 20px;
      height: 20px;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: 0.2s;

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-city {
      position: relative;
      display: flex;
      align-items: center;
      padding: 8px;
      margin-bottom: 20px;
      background-color: #edebe9;

      .city {
        &__title {
          font-size: 18px;
          font-weight: 400;
          margin-left: 5px;
        }

        &__btn {
          width: 20px;
          height: 20px;
          background: transparent;
          border: none;
          cursor: pointer;

          &.trash {
            position: absolute;
            right: 2%;
            top: 0%;
            transform: translate(0%, 50%);
          }

          svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }

    &-form {
      display: flex;
      align-items: flex-end;
      margin: 30px 0;

      .form {
        .input-wrapper {
          display: flex;
          flex-direction: column;
        }

        &__title {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        &__input {
          width: 280px;
          padding: 10px;
          border: 1px solid #449ce0;
          border-radius: 3px;
          outline: none;
        }

        &__btn {
          width: 40px;
          height: 30px;
          margin-bottom: 8px;
          background: transparent;
          border: none;
          cursor: pointer;

          svg {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>
