import dayjs from 'dayjs';
import { FunctionComponent, useMemo, memo } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Item from '../../interface/item';
import { __ } from '../../lang';
import { VIEW_FEED } from '../../pages';
import { theme } from '../../theme';
const DOMParser = require('react-native-html-parser').DOMParser

export interface Props {
  item: Item 
  navigation: any
}

const ListItem: FunctionComponent<Props> = ({ item, navigation }) => {
  const pubDate = useMemo(() => dayjs(item.pubDate), [])

  const img = useMemo(() => {
    const doc = new DOMParser().parseFromString(item.description, 'text/html')
    const imgTagList = doc.getElementsByTagName('img')

    if (imgTagList.length > 0)
      return imgTagList[0].getAttribute('src')

    return false
  }, [])

  return <TouchableHighlight
    onPress={() => {
      const tmp: any = { ...item }
      if (tmp.pubDate.format)
        tmp.pubDate = tmp.pubDate.format('YYYY-MM-DD HH:mm:ss')

      navigation.navigate(VIEW_FEED, { feed: tmp })
    }}
  >
    <View style={styles.main}>
      {img &&
        <Image
          style={styles.image}
          source={{
            uri: img,
          }}
        />
      }
      <View style={styles.contents}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{pubDate.format('DD/MM/YYYY HH:mm:ss')}</Text>
      </View>
    </View>
  </TouchableHighlight>
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    backgroundColor: theme.darkSecondary,
    marginVertical: 10,
    borderRadius: 5,
    minHeight: 65,
    overflow: 'hidden',
  },
  title: {
    flexGrow: 1,
    color: theme.darkText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 200,
  },
  date: {
    color: theme.darkText,
    fontSize: 12,
  },
  contents: {
    padding: 10,
  }
})

export default memo(ListItem)

