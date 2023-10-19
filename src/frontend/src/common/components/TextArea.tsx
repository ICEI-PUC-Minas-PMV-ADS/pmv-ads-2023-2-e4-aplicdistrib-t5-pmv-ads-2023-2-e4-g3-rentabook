import * as React from 'react';
import { TextInput, View, StyleSheet } from "react-native";
import { BlackColor, DarkGreyColor } from '../theme/colors';

/**
 * Props
 */

type TextAreaProps = {
  value?: string,
  width?: number,
  height?: number,
  placeholder?: string,
  onChange?: (value: string) => void,
};

/**
 * Style
 */

const style = StyleSheet.create({
  input: {
    borderRadius: 4,
    backgroundColor: DarkGreyColor,
    color: BlackColor,
    padding: 8,
    fontSize: 16,
  },
});

/**
 * TextArea
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-288&mode=design&t=466y1e8lbnY8yoon-4
 */

export default function TextArea({ width, height, value, placeholder, onChange }: TextAreaProps) {
  const [inputValue, setInputValue] = React.useState(value ?? "");
  return (
    <View style={{ width, height }}>
      <TextInput
        style={style.input}
        multiline={true}
        placeholder={placeholder}
        onChangeText={(cvalue) => {
          onChange?.(cvalue);
          setInputValue(cvalue);
        }}
        defaultValue={inputValue ?? placeholder} />
    </View>
  );
}