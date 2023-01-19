import { faBars, faBookBookmark, faPlus, faRss } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FunctionComponent } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { ADD_FEED, HOME } from '../pages'
import { theme } from '../theme'

function getIconStyles (routeName: string, activeRouteName: string)  {
  const style = { ...styles.icon}

  if (routeName === activeRouteName)
    style.color = theme.primary

  return style
}

const Navigation: FunctionComponent = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()

  return <View style={styles.nav}>
    <Pressable
      style={styles.btn}
      onPress={() => console.debug('Open side menu')}
    >
      <FontAwesomeIcon icon={ faBars } />
    </Pressable>
    <Pressable
      style={styles.btn}
      onPress={() => navigation.navigate(HOME)}
    >
      <FontAwesomeIcon icon={ faRss } style={getIconStyles(HOME, route.name)} />
    </Pressable>
    <Pressable
      style={styles.btn}
      onPress={() => navigation.navigate(ADD_FEED)}
    >
      <FontAwesomeIcon icon={ faPlus } style={getIconStyles(ADD_FEED, route.name)} />
    </Pressable>
    <Pressable
      style={styles.btn}
      onPress={() => console.debug('Open bookmarked page')}
    >
      <FontAwesomeIcon icon={ faBookBookmark } />
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  btn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    height: '100%',
  },
  icon: {
    color: theme.darkText,
    height: '100%',
  }
})

export default Navigation

