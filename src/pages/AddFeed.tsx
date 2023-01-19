import { FunctionComponent, useEffect } from 'react';
import BottomNav from '../layout/BottomNav'
import { StyleSheet, View } from 'react-native';
import useFeeds from '../hooks/useFeeds';
import FeedManagementList from '../components/FeedManagementList/index';
import { FeedItem } from '../components/FeedManagementList/ListItem';
import { useNavigation } from '@react-navigation/native';
import AddFeedForm from '../components/AddFeedForm';

const AddFeed: FunctionComponent = () => {
  const navigation = useNavigation()
  const [ feeds, setFeeds, forceUpdate ] = useFeeds()

  useEffect(() => {
    navigation.addListener('focus', () => {
      forceUpdate()
    })
  }, [])


  return <BottomNav>
    <View style={styles.main}>
      <AddFeedForm
        feeds={feeds}
        setFeeds={setFeeds}
      />
      <View style={styles.list}>
        <FeedManagementList
          feeds={feeds}
          removeFromList={(feed: FeedItem) => {
            const tmp = { ...feeds }
            delete tmp[feed.url]
            setFeeds(tmp)
          }}
        />
      </View>
    </View>
  </BottomNav>
}

const styles = StyleSheet.create({
  main: {
    width: '95%',
    flexGrow: 1,
    marginHorizontal: 'auto',
  },
  list: {
    flexGrow: 1,
    overflow: 'visible',
  }
})

export default AddFeed

