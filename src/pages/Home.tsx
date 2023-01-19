import { FunctionComponent, useEffect } from 'react';
import BottomNav from '../layout/BottomNav'
import useFeeds from '../hooks/useFeeds';
import FeedList from '../components/FeedList/index';
import { useNavigation } from '@react-navigation/native';

const Home: FunctionComponent = () => {
  const navigation = useNavigation()
  const [ feeds, setFeeds, forceUpdate ] = useFeeds()

  // Instead of doing this maybe I should be using a reducer
  useEffect(() => {
    navigation.addListener('focus', () => {
      forceUpdate()
    })
  }, [])

  useEffect(() => {
    forceUpdate() 
  }, [])

  return <BottomNav>
    <FeedList feeds={feeds} setFeeds={setFeeds} />
  </BottomNav>
}

export default Home

