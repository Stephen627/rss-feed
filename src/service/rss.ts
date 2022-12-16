import FeedFetchError from '../error/FeedFetchError'
import Channel from '../interface/channel'
import { __ } from '../lang'
import xml2js from 'xml2js'
import dayjs from 'dayjs'
import Item from '../interface/item'

function handleError(err: unknown): void {
  console.error(err)
  if (!(err instanceof Error)) {
    throw new FeedFetchError(__('rss.error.unknown'))
  }

  throw new FeedFetchError(__(`rss.error.${err.name.replace(' ', '-').toLowerCase()}`))
}

export async function fetchFeed(url: string): Promise<false | Channel> {
  try {
    const response = await fetch(url);
    const data = await response.text();

    const jsonObj = await xml2js.parseStringPromise(data, {
      trim: true,
      explicitRoot: false,
      explicitArray: false,
    })

    return castTypesForChannel(jsonObj.channel)
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

