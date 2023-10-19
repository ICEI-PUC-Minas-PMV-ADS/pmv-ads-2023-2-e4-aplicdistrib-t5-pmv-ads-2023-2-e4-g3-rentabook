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
  onChange?: (value: string) => void,
};

/**
 * Style
 */

const style = StyleSheet.create({
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

export default function Input({ value = "", label, width, height, onChange }: InputProps) {
  return (
    <View style={{ width, height }}>
      <Text style={style.label}>{label}</Text>
      <View style={style.inputContainer}>
        <TextInput style={style.input} onChangeText={onChange} defaultValue={value} />
      </View>
    </View>
  );
}