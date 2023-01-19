import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ADD_FEED, HOME, VIEW_FEED } from './src/pages'
import AddFeed from './src/pages/AddFeed'
import Home from './src/pages/Home'
import ViewFeed from './src/pages/ViewFeed'
import { theme } from './src/theme'

const Stack = createNativeStackNavigator()
const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: theme.darkSecondary,
    border: theme.darkSecondary,
    card: theme.darkSecondary,
    notification: theme.darkSecondary,
    primary: theme.darkPrimary,
    text: theme.darkText,
  },
}

export default function App() {
  return <NavigationContainer theme={navTheme}>
    <Stack.Navigator initialRouteName={'home'}>
      <Stack.Screen
        name={HOME}
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ADD_FEED}
        component={AddFeed}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={VIEW_FEED}
        component={ViewFeed}
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerTitle: 'Feed',
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
}
