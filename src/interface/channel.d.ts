import { Dayjs } from 'dayjs'
import ChannelImage from './channel-image'
import Item from './item'

export interface Channel {
  title: string
  link: string
  description: string
  lastBuildDate: Dayjs
  image?: ChannelImage
  generator?: string
  copyright?: string
  language?: string
  ttl?: number
  items: Item[]
}

export default Channel;

