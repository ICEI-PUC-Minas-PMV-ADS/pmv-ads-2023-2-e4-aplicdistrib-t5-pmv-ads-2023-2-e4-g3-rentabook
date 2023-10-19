import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PrimaryGreenColor, WhiteColor } from '../theme/colors';

/**
 * Props
 */

type PrimaryButtonProps = {
  label: string,
  style?: Object,
  onPress: () => void,
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
  },
  text: {
    color: WhiteColor,
    fontSize: 16,
  },
});

/**
 * PrimaryButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-259&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function PrimaryButton({ label, style, onPress }: PrimaryButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[ButtonStyle.background, style]}>
        <Text style={ButtonStyle.text}>{label}</Text>
      </View>
    </Pressable>
  );
}