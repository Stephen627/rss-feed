import { StatusBar } from 'expo-status-bar'
import { FunctionComponent, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import Navigation from '../components/Navigation'
import Notifications from '../components/Notifications'
import Store from '../components/Store'
import { theme } from '../theme'

interface Props {
  children: ReactNode
}

const BottomNav: FunctionComponent<Props> = ({ children }) => {
  return <Store>
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={theme.darkPrimary}
      />
      <View style={styles.main}>
        {children}
      </View>
      <View style={styles.nav}>
        <Navigation />
      </View>
    </View>
    <Notifications />
  </Store>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.darkPrimary,
    overflow: 'hidden',
  },
  main: {
    flexGrow: 1,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
    overflow: 'visible',
    flexBasis: '90%',
  },
  nav: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.darkSecondary,
    zIndex: 100,
    backgroundColor: theme.darkPrimary,
  }
})

export default BottomNav

