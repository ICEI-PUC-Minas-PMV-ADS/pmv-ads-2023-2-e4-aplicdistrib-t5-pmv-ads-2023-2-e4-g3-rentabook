import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PrimaryGreenColor, WhiteColor } from '../theme/colors';

/**
 * Props
 */

type SecondaryButtonProps = {
  label: string,
  width?: number,
  height?: number,
  onClick: () => void,
};

/**
 * Style
 */

const style = StyleSheet.create({
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
    fontSize: 16,
  },
});

/**
 * SecondaryButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-257&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function SecondaryButton({ label, width, height, onClick }: SecondaryButtonProps) {
  return (
    <Pressable onPress={() => onClick()}>
      <View style={[style.background, { width, height }]}>
        <Text style={style.text}>{label}</Text>
      </View>
    </Pressable>
  );
}