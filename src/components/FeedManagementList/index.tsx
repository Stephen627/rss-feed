import { FunctionComponent, useMemo } from 'react';
import { FlatList } from 'react-native';
import Channel from '../../interface/channel';
import FeedManagementListItem, { FeedItem } from './ListItem';

export interface Props {
  feeds: { [key: string]: Channel }
  removeFromList: (feed: FeedItem) => void
}

const FeedManagementList: FunctionComponent<Props> = ({ feeds, removeFromList }) => {

  const feedList = useMemo(() => {
    return Object.keys(feeds).map(key => {
      return {
        url: key,
        channel: feeds[key],
      }
    })
  }, [ feeds ])

  return <FlatList
    data={feedList}
    renderItem={({item}) => <FeedManagementListItem feed={item} removeFromList={removeFromList} />}
    initialNumToRender={7}
    keyExtractor={item => item.url}
  />
}

export default FeedManagementList

