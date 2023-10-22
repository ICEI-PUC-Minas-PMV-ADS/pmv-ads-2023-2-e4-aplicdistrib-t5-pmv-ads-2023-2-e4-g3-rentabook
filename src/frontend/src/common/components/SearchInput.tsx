import * as React from 'react';
import { View, Image, TextInput, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { GreyColor, InputLabelGreenColor, DarkGreen } from '../theme/colors';
import Assets from '../theme/assets';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Props
 */

type SearchInputProps = {
  value?: string,
  placeholder?: string,
  style?: Object,
  onChange?: (value: string) => void,
  onFocus?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void),
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
};

/**
 * Style
 */

const SearchInputStyle = StyleSheet.create({
  label: {
    borderRadius: 12,
    color: InputLabelGreenColor,
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: GreyColor,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 3
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
});

/**
 * SearchInput
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-302&mode=design&t=G0WN8D6m416029bq-4
 */

export default function SearchInput({ value, placeholder, style, onChange, onFocus, onBlur }: SearchInputProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <View style={style}>
      <View style={SearchInputStyle.inputContainer}>
        <Ionicons name="search" size={35} color={DarkGreen} style={{ marginLeft: 5 }} />
        <TextInput
          style={SearchInputStyle.input}
          placeholder={placeholder}
          placeholderTextColor='#777777'
          onChangeText={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
        />
      </View>
    </View>
  );
}