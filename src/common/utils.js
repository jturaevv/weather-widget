export function combineStyles() {
  return Object.values(arguments).flat();
}

export class WeatherStorage {
  constructor() {}

  static add(coord) {
    const list = WeatherStorage.get();
    WeatherStorage.set([...list, coord]);
  }

  static remove(index) {
    const list = WeatherStorage.get();
    list.splice(index, 1)
    WeatherStorage.set(list);
  }

  static set(value) {
    localStorage.setItem("coords", JSON.stringify(value));
  }

  static get() {
    return JSON.parse(localStorage.getItem("coords")) ?? [];
  }
}
