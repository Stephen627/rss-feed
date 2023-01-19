import { FunctionComponent, useState } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface Props extends TextInputProps {
}

const Input: FunctionComponent<Props> = (props) => {
  const [ focused, setFocused ] = useState<boolean>(false)

  const style = { ...styles.input }
  if (focused)
    style.borderColor = theme.primary

  return <TextInput
    style={style}
    onBlur={() => setFocused(false)}
    onFocus={() => setFocused(true)}
    {...props}
  />
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    marginVertical: 12,
    borderBottomWidth: 2,
    padding: 10,
    color: theme.darkText,
    borderColor: theme.darkSecondary,
  }
})

export default Input

