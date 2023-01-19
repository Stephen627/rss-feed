import FeedFetchError from '../error/FeedFetchError'
import Channel from '../interface/channel'
import { __ } from '../lang'
import dayjs from 'dayjs'
import Item from '../interface/item'
import { XMLParser} from 'fast-xml-parser'

function handleError(err: unknown): void {
  console.error(err)
  if (!(err instanceof Error)) {
    throw new FeedFetchError(__('rss.error.unknown'))
  }

  throw new FeedFetchError(__(`rss.error.${err.name.replace(' ', '-').toLowerCase()}`))
}

export interface FeedResponse {
  url: string
  channel: Channel
}

export async function fetchFeed(url: string): Promise<false | FeedResponse> {
  try {
    const response = await fetch(url);
    const data = await response.text();
    
    const parser = new XMLParser()
    const jsObj = parser.parse(data)

    return {
      url,
      channel: castTypesForChannel(jsObj?.rss?.channel)
    }
  } catch (err) { handleError(err) }

  return false
}

function castTypesForChannel(channel: Channel): Channel {
  const tmp = { ...channel }
  tmp.ttl = parseInt(tmp.ttl as any) // Value is a integer but comes in as a string
  tmp.lastBuildDate = dayjs(tmp.lastBuildDate)


  tmp.items = (tmp as any).item.map((item: Item) => {
    return {
      ...item,
      pubDate: dayjs(item.pubDate),
    }
  })

  delete (tmp as any).item

  return tmp
}

