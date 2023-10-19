import * as React from 'react';
import { View, Image, TextInput, StyleSheet } from "react-native";
import { GreyColor, InputLabelGreenColor } from '../theme/colors';
import Assets from '../theme/assets';

/**
 * Props
 */

type SearchInputProps = {
  value?: string,
  placeholder?: string,
  style?: Object,
  onChange?: (value: string) => void,
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
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

/**
 * SearchInput
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-302&mode=design&t=G0WN8D6m416029bq-4
 */

export default function SearchInput({ value = "", placeholder, style, onChange }: SearchInputProps) {
  const [size, setSize] = React.useState<{ width?: number, height?: number }>({});

  React.useEffect(() => {
    Image.getSize(Assets.IcSearchIcon, (w, h) => {
      setSize({ width: w * .6, height: h * .6 })
    });
  }, []);

  return (
    <View style={style}>
      <View style={SearchInputStyle.inputContainer}>
        <Image source={{ uri: Assets.IcSearchIcon, width: size.width, height: size.height }} />
        <TextInput
          style={SearchInputStyle.input}
          placeholder={placeholder}
          placeholderTextColor='#777777'
          defaultValue={value}
          onChangeText={onChange} />
      </View>
    </View>
  );
}