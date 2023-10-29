import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GreyColor, InputLabelGreenColor } from '../theme/colors';

/**
 * Props
 */

type InputProps = {
  value?: string,
  width?: number,
  height?: number,
  label: string,
  placeholder?: string,
  style?: Object,
  secureTextEntry?: boolean,
  onChangeText?: (value: string) => void,
  error?: boolean,
  messageError?: string,
  editable?: boolean 
};

/**
 * Style
 */

const InputStyle = StyleSheet.create({
  label: {
    borderRadius: 12,
    color: InputLabelGreenColor,
    fontSize: 14,
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: GreyColor,
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

/**
 * Input
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-256&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function Input({ style, value = "", label, placeholder, secureTextEntry, onChangeText, error = false, messageError = "", editable = true }: InputProps) {
  return (
    <View style={style}>
      <Text style={InputStyle.label}>{label}</Text>
      <View style={InputStyle.inputContainer}>
        <TextInput
          style={[error && { borderColor: 'red', borderWidth: 2 }, InputStyle.input]}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onChangeText={onChangeText}
          defaultValue={value}
          editable = {editable}
        />
      </View>
      <Text style={[error == true && { fontSize: 14, color: 'red', opacity: 1 }, error == false && { opacity: 0 }]}>{messageError}</Text>
    </View>
  );
}