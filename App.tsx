import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import BottomNav from './src/layout/BottomNav'
import mainStyles from './src/styles'
import { theme } from './src/theme'

export default function App() {
  return <BottomNav>
    <Text style={mainStyles.text}>Open up App.tsx to start working on your app!</Text>
    <StatusBar
      animated={true}
      backgroundColor={theme.darkPrimary}
      style="inverted"
    />
  </BottomNav>
}

