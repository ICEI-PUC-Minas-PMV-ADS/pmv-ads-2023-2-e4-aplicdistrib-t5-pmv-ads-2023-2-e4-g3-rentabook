import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PrimaryGreenColor, WhiteColor } from '../theme/colors';


/**
 * Props
 */

type PrimaryButtonProps = {
  label: string,
  style?: Object,
  textStyle?: Object,
  onPress: () => void,
  activeStyle?: boolean
};

/**
 * Style
 */

const ButtonStyle = StyleSheet.create({
  background: {
    borderRadius: 8,
    backgroundColor: PrimaryGreenColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: PrimaryGreenColor,
  },
  text: {
    color: WhiteColor,
    fontSize: 16,
  },
  notActiveStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: WhiteColor,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: PrimaryGreenColor,
  },
  notActiveText: {
    color: PrimaryGreenColor,
    fontSize: 16,
  },
});

/**
 * PrimaryButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-259&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function PrimaryButton({ label, style, onPress, textStyle, activeStyle = true }: PrimaryButtonProps) {
  const [currentStyle, setCurrentStyle]: [any, any] = React.useState(ButtonStyle.background)
  const [currentTextStyle, setCurrentTextStyle]: [any, any] = React.useState(ButtonStyle.text)

  React.useEffect(() => {
    if (activeStyle == true) {
      setCurrentStyle(ButtonStyle.background)
      setCurrentTextStyle(ButtonStyle.text)
    } else {
      setCurrentStyle(ButtonStyle.notActiveStyle)
      setCurrentTextStyle(ButtonStyle.notActiveText)
    }

  }, [activeStyle])

  return (
    <Pressable onPress={onPress}>
      <View style={[currentStyle, style]}>
        <Text style={[currentTextStyle, textStyle]}>{label}</Text>
      </View>
    </Pressable>
  );
}