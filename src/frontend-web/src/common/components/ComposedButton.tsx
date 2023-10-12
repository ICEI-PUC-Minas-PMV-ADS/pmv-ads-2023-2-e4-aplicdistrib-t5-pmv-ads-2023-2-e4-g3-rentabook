import * as React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { BlackColor, PrimaryGreenColor, WhiteColor } from "../theme/colors";

/**
 * Props
 */

type ComposedButtonProps = {
  title: string;
  subtitle?: string;
  width?: number;
  height?: number;
  onClick: () => void;
};

/**
 * Style
 */

const style = StyleSheet.create({
  background: {
    borderRadius: 50,
    backgroundColor: WhiteColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    border: `2px solid ${PrimaryGreenColor}`,
  },
  title: {
    color: BlackColor,
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: BlackColor,
    fontSize: 14,
  },
});

/**
 * ComposedButton
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-292&mode=design&t=zo5JuzOpjwxyNwko-4
 */

export default function ComposedButton({
  title,
  subtitle,
  width,
  height,
  onClick,
}: ComposedButtonProps) {
  return (
    <Pressable onPress={() => onClick()}>
      <View style={[style.background, { width, height }]}>
        <Text style={style.title}>{title}</Text>
        {subtitle && <Text style={style.subtitle}>{subtitle}</Text>}
      </View>
    </Pressable>
  );
}
