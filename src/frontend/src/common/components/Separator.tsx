import * as React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import { PrimaryGreenColor, WhiteColor } from '../theme/colors';

/**
 * Props
 */

type SeparatorProps = {
  label: string,
  width?: number,
  height?: number,
};

/**
 * Style
 */

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: PrimaryGreenColor,
  },
  label: {
    paddingHorizontal: 10,
  }
});

/**
 * Separator
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-255&mode=design&t=G0WN8D6m416029bq-4
 */

export default function Separator({ label, width, height }: SeparatorProps) {
  return (
    <View style={[style.container, { width, height }]}>
      <View style={style.separator}></View>
      <Text style={style.label}>{label}</Text>
      <View style={style.separator}></View>
    </View>
  );
}