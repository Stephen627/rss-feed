import { FunctionComponent, useContext, useMemo, useState } from "react";
import { Button } from 'react-native'
import Channel from "../interface/channel";
import { __ } from "../lang";
import { fetchFeed } from "../service/rss";
import { theme } from "../theme";
import Input from "./Input";
import { ADD_NOTIFICATION, Context } from "./Store";

export interface Props {
  feeds: {[key: string]: Channel}
  setFeeds: any
}

const AddFeedForm: FunctionComponent<Props> = ({ feeds, setFeeds }) => {
  const [ feedUrl, setFeedUrl ] = useState<string>('https://feed.laravel-news.com')
  const [ , dispatch ] = useContext(Context)

  const checkAndAddFeed = useMemo(() => {
    return async () => {
      try {
        const data = await fetchFeed(feedUrl)

        if (!data) {
          dispatch({
            type: ADD_NOTIFICATION,
            data: __('feed.no-data'),
          })
          return
        }

        const tmp = { ...feeds }
        tmp[feedUrl] = data.channel

        setFeeds(tmp)
      } catch (err: any) {
        dispatch({
          type: ADD_NOTIFICATION,
          data: err.message,
        })
      }
    }
  }, [ feedUrl ])
  return <>
    <Input
      value={feedUrl}
      onChange={(evt) => setFeedUrl(evt.nativeEvent.text)}
      placeholder={'Paste the URL of the feed'}
      placeholderTextColor={theme.darkText}
    />
    <Button
      title={'Add Feed'}
      color={theme.primary}
      onPress={checkAndAddFeed}
    />
  </>
}

export default AddFeedForm

