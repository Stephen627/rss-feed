import { FunctionComponent, useState } from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { theme } from '../theme'

export interface Props {}

const Navigation: FunctionComponent<Props> = () => {
  const [ showAdd, setShowAdd ] = useState<boolean>(false)

  return <View style={styles.nav}>
    <Pressable
      style={styles.mainBtn}
      onPress={() => setShowAdd(!showAdd)}
    >
      <Text style={styles.btnText}>+</Text>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    alignItems: 'center',
  },
  mainBtn: {
    backgroundColor: theme.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    lineHeight: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10
  },
  btnText: {
    top: -3,
    color: theme.lightText,
    fontSize: 40,
    fontWeight: 'bold',
  }
})

export default Navigation

