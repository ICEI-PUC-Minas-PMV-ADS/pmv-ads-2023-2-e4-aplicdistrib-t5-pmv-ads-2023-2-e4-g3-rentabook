import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { DestructiveColor, WhiteColor } from '../theme/colors';

/**
 * Props
 */

type DestructiveButtonProps = {
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
    border: `2px solid ${DestructiveColor}`,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    color: DestructiveColor,
    fontSize: 16,
  },
});

/**
 * DestructiveButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-258&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function DestructiveButton({ label, width, height, onClick }: DestructiveButtonProps) {
  return (
    <Pressable onPress={() => onClick()}>
      <View style={[style.background, { width, height }]}>
        <Text style={style.text}>{label}</Text>
      </View>
    </Pressable>
  );
}