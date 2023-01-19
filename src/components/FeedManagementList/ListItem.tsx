import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FunctionComponent, memo } from 'react';
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Channel from '../../interface/channel';
import { theme } from '../../theme';

export interface FeedItem {
  url: string
  channel: Channel
}

export interface Props {
  feed: FeedItem
  removeFromList: (feed: FeedItem) => void
}


const FeedManagementListItem: FunctionComponent<Props> = ({ feed, removeFromList }) => {
  return <View style={styles.main}>
    <Text style={styles.title}>{feed.channel.title}</Text>
    <TouchableHighlight
      onPress={() => removeFromList(feed)}
    >
      <FontAwesomeIcon
        style={styles.icon}
        icon={faCircleXmark}
      />
    </TouchableHighlight>
  </View>
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    backgroundColor: theme.darkSecondary,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    flexGrow: 1,
    color: theme.darkText,
  },
  icon: {
    color: theme.darkText,
  },
  item: {
    
  }
})

export default memo(FeedManagementListItem)

