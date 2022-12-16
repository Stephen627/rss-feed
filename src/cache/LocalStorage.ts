import CacheInterface from './CacheInterface';

export default class LocalStorage<T> implements CacheInterface<T> {

  public get(key: string): T|false {
    const item = localStorage.getItem(key) ?? false

    if (!item) {
      return false
    }

    return JSON.parse(item) as T
  }

  public set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

