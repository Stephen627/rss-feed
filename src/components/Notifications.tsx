import { FunctionComponent, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { Context, REMOVE_ALL_NOTIFICATIONS, REMOVE_NOTIFICATION } from './Store';


const Notifications: FunctionComponent = () => {
  const [state, dispatch] = useContext<any>(Context)

  const errs = state.map((err: string) => {
    return <Text style={styles.text} key={err}>{err}</Text>
  })

  if (state.length > 0)
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALL_NOTIFICATIONS,
      })
    }, 2000)

  return <View style={styles.notifications}>
    {errs}
  </View>
}

const styles = StyleSheet.create({
  notifications: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  text: {
    backgroundColor: theme.error,
    color: theme.lightText,
    width: '85%',
    marginHorizontal: 'auto',
    borderRadius: 5,
    padding: 10,
  }
})

export default Notifications

