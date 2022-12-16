import { FunctionComponent, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Navigation from '../components/Navigation'
import mainStyles from '../styles'
import { theme } from '../theme'

interface Props {
  children: ReactNode
}

const BottomNav: FunctionComponent<Props> = ({ children }) => {
  return <View style={styles.container}>
    <View style={styles.main}>
      <Text style={mainStyles.text}>Hello World!!</Text>
      {children}
    </View>
    <View style={styles.nav}>
      <Navigation />
    </View>
  </View>
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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  nav: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.darkSecondary,
  }
})

export default BottomNav

