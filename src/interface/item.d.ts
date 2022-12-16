import { Dayjs } from 'dayjs'

export interface Item {
  title: string
  link: string
  description: string
  author: string
  pubDate: Dayjs 
}

export default Item

