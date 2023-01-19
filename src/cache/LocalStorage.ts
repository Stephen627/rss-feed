import CacheInterface from './CacheInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @classdesc Uses the local storage for caching
 */
export default class LocalStorage<T> implements CacheInterface<T> {
  /**
   * @inheritdoc
   */
  public async get(key: string): Promise<T|false> {
    const data = await AsyncStorage.getItem(key)
    if (!data)
      return false

    return JSON.parse(data)
  }

  /**
   * @inheritdoc
   */
  public async set(key: string, value: T): Promise<void> {
    return await AsyncStorage.setItem(key, JSON.stringify(value))
  }
}

