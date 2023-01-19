import { useEffect, useMemo, useState } from 'react'
import cache from '../cache'
import Channel from '../interface/channel'

export type ReturnType = [
  {[key: string]: Channel},
  (feeds: {[key: string]: Channel}) => void,
  () => void,
]


/**
 * Hook to pull the feeds from the chosen cache resource
 *
 * @param {any[]} dependencies - When an element in the array changes it forces the feed list to refresh
 *
 * @return {ReturnType}
 */
const useFeeds = (dependencies: any[] = []): ReturnType => {
  const [ feeds, setFeeds ] = useState<{[key: string]: Channel} | false>(false)
  useEffect(() => {
    forceUpdate()
  }, dependencies)

  const setCacheFeeds = useMemo(() => {
    return (feeds: {[key: string]: Channel}): void => {
      cache.set('feeds', feeds)
      setFeeds(feeds)
    }
  }, [])

  const forceUpdate = (): void => {
    cache.get('feeds').then(data => {
      if (!data)
        return

      setFeeds(data)
    })
  }

  return [
    feeds || {},
    setCacheFeeds,
    forceUpdate,
  ]
}

export default useFeeds

