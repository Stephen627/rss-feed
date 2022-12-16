
export default interface CacheInterface<T> {
  set: (key: string, value: T) => void
  get: (key: string) => T|false
}
