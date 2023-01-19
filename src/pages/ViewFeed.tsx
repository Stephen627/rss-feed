import { useNavigation, useRoute } from '@react-navigation/native';
import { FunctionComponent, useEffect } from 'react';
import { Platform, Linking, Share, Text, StyleSheet, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import Item from '../interface/item';
import BottomNav from '../layout/BottomNav';
import RenderHtml from 'react-native-render-html'
import { theme } from '../theme';
import mainStyles from '../styles';

export interface ParamOptions {
  feed: Item
}

const ViewFeed: FunctionComponent = () => {
  const route = useRoute()
  const { feed } = route.params as ParamOptions
  const navigation = useNavigation()
  const { width } = useWindowDimensions()

  useEffect(() => {
    navigation.setOptions({ headerTitle: feed.title })
  }, [])

  const onShare = async () => {
    await Share.share({
      url: feed.link,
      message: feed.link,
      title: feed.title,
    }, {
      dialogTitle: feed.title,
      subject: feed.title,
    })
  }

  const goToArticle = () => {
    Linking.openURL(feed.link)
  }

  return <BottomNav>
    <View style={styles.feed}>
      <RenderHtml
        contentWidth={width}
        source={{
          html: `<div style="color: ${theme.darkText};">${feed.description}</div>`,
        }}
      />
    </View>
    <View style={styles.actions}>
      {Platform.OS === 'ios' || Platform.OS === 'android' &&
        <TouchableHighlight
          style={mainStyles.btnOutline}
          onPress={onShare}
        >
          <Text style={mainStyles.btnOutlineText}>Share</Text>
        </TouchableHighlight>
      }
      <TouchableHighlight
        style={mainStyles.btnOutline}
        onPress={goToArticle}
      >
        <Text style={mainStyles.btnOutlineText}>View Website</Text>
      </TouchableHighlight>
    </View>
  </BottomNav>
}

const styles = StyleSheet.create({
  feed: {
    width: '95%',
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 'auto',
    justifyContent: 'center',
    width: '70%',
  },
})

export default ViewFeed

