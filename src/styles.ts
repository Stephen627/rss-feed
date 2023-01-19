import { StyleSheet } from 'react-native'
import { theme } from './theme'

const mainStyles = StyleSheet.create({
  text: {
    color: theme.darkText,
  },
  btnOutline: {
    borderColor: theme.primary,
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  btnOutlineText: {
    color: theme.primary,
    fontWeight: 'bold',
  }
})

export default mainStyles

