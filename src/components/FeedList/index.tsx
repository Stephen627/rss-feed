import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { FunctionComponent, useMemo, useState, useCallback } from 'react'
import { FlatList, RefreshControl, StyleSheet} from 'react-native'
import Channel from '../../interface/channel'
import Item from '../../interface/item'
import { fetchFeed, FeedResponse } from '../../service/rss'
import ListItem from './ListItem'

export interface Props {
  feeds: {[key: string]: Channel}
  setFeeds: (feeds: {[key: string]: Channel}) => void
}

const FeedList: FunctionComponent<Props> = ({ feeds, setFeeds }) => {
  const [ refreshing, setRefreshing ] = useState<boolean>(false)
  const navigation = useNavigation()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    const promises: Promise<FeedResponse | false>[] = []

    Object.keys(feeds).forEach(feed => {
      promises.push(fetchFeed(feed))
    })

    Promise.all(promises).then(allData => {
      const tmp: {[key: string]: Channel} = {}

      allData.forEach(data => {
        if (!data)
          return

        tmp[data.url] = data.channel
      })

      setFeeds(tmp)
      setRefreshing(false)
    })
  }, [ feeds ])

  const childParentMap: {[key: string]: string} = {}

  const items = useMemo(() => {
    const itemList: Item[] = []

    Object.keys(feeds).forEach(key => {
      const channel = feeds[key]

      channel.items.forEach(item => {
        itemList.push(item)
        childParentMap[item.link] = key
      })
    })

    const sortedItemList = itemList.sort((a, b) => {
      const aDay = dayjs(a.pubDate)
      const bDay = dayjs(b.pubDate)

      const diff = bDay.diff(aDay, 'h')
      if (diff > 0)
        return 1
      if (diff < 0)
        return -1

      return 0
    })

    return sortedItemList 
  }, [ feeds ])

  return <FlatList
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }
    initialNumToRender={7}
    style={styles.main}
    data={items}
    renderItem={({item}) => <ListItem item={item} navigation={navigation} />}
    keyExtractor={item => item.link}
  />
}

const styles = StyleSheet.create({
  main: {
    width: '95%',
    marginHorizontal: 'auto',
  }
})

export default FeedList

