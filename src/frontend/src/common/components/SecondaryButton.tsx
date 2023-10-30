import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PrimaryGreenColor, WhiteColor } from '../theme/colors';

/**
 * Props
 */

type SecondaryButtonProps = {
  label: string,
  style?: Object,
  fontSize?: number,
  onClick: () => void,
};

/**
 * Style
 */

const SecondaryButtonStyle = StyleSheet.create({
  background: {
    borderRadius: 8,
    backgroundColor: WhiteColor,
    border: `2px solid ${PrimaryGreenColor}`,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    color: PrimaryGreenColor,
  },
});

/**
 * SecondaryButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-257&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function SecondaryButton({ label, style, fontSize, onClick }: SecondaryButtonProps) {
  return (
    <Pressable onPress={onClick} style={style}>
      <View style={[SecondaryButtonStyle.background, style]}>
        <Text style={[SecondaryButtonStyle.text, { fontSize: fontSize ?? 16 }]}>{label}</Text>
      </View>
    </Pressable>
  );
}