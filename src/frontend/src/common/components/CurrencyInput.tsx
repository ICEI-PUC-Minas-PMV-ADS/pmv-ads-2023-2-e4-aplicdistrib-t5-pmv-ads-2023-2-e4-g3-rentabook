import * as React from 'react';
import { View, Text, TextInput, StyleSheet } from "react-native";
import { GreyColor, InputLabelGreenColor } from '../theme/colors';

/**
 * CurrencyInputProps
 */

type CurrencyInputProps = {
  value?: string | null,
  width?: number,
  height?: number,
  label: string,
  placeholder?: string,
  style?: Object,
  onChangeText?: (value: string) => void,
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

export default function CurrencyInput({ style, value = "", label, placeholder, onChangeText, editable = true }: CurrencyInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (value) {
      const fixedInputValue = value
        .replaceAll("R$ ", "")
        .replaceAll(",", "");

      if (new RegExp(/[0-9]+$/).test(fixedInputValue)) {
        setInputValue((parseFloat(fixedInputValue) * 100).toString())
      } else {
        setInputValue("")
      }
    } else {
      setInputValue("");
    }
  }, [value]);

  const formatCurrency = (val: string): string => {
    if (val.length === 0) {
      return "";
    }
    return ("R$ " + (parseFloat(inputValue) / 100).toFixed(2)).replaceAll(".", ",");
  };

  return (
    <View style={style}>
      <Text style={InputStyle.label}>{label}</Text>
      <View style={InputStyle.inputContainer}>
        <TextInput
          style={[InputStyle.input]}
          keyboardType='numeric'
          placeholder={placeholder}
          onChangeText={(strValue) => {
            const fixedInputValue = strValue
              .replaceAll("R$ ", "")
              .replaceAll(",", "");

            if (new RegExp(/[0-9]+$/).test(fixedInputValue)) {
              if (parseInt(fixedInputValue) !== 0) {
                setInputValue(fixedInputValue);
                onChangeText?.((parseInt(fixedInputValue) / 100).toString());
              } else {
                setInputValue("");
                onChangeText?.("");
              }
            }
          }}
          value={formatCurrency(inputValue)}
          editable={editable}
        />
      </View>
    </View>
  );
}