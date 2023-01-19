
/**
 * Cache interface to make sure that all caching methods will be consistent
 */
export default interface CacheInterface<T> {
  /**
   * Set a key in the cache with the provided value
   *
   * @param {string} key   - Key to store the data against
   * @param {T}      value - Value to store
   *
   * @return {Promise<void>} Promise that resolves when key has been set
   */
  set: (key: string, value: T) => Promise<void>
  /**
   * Gets a value from the cache that has a key
   *
   * @param {string} key - Key to use to obtain the value
   *
   * @return {Promise<T|false} Either the value or false if the key is not present
   */
  get: (key: string) => Promise<T|false>
}
