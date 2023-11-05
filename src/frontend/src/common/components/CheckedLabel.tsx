import * as React from 'react';
import { View, Text, StyleSheet } from "react-native";
import { BlackColor, PrimaryGreenColor } from '../theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Props
 */

type CheckedLabelProps = {
  label?: string,
  style?: Object,
};

/**
 * Style
 */

const CheckedLabelStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  label: {
    borderRadius: 12,
    color: BlackColor,
    fontSize: 14,
    marginBottom: 4,
    marginStart: 8,
  },
});

/**
 * CheckedLabel
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-254&mode=design&t=G0WN8D6m416029bq-4
 */

export default function CheckedLabel({ label, style }: CheckedLabelProps) {
  return (
    <View style={style}>
      <View style={CheckedLabelStyle.container}>
        <Ionicons name="checkmark-circle" size={20} style={{ color: PrimaryGreenColor }} />
        <Text style={CheckedLabelStyle.label}>{label}</Text>
      </View>
    </View>
  );
}