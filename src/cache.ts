import LocalStorage from './cache/LocalStorage';
import Channel from './interface/channel';

const cache = new LocalStorage<{[key: string]: Channel}>()
export default cache

