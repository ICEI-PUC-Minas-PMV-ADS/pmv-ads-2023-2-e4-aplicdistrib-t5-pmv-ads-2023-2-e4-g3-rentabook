import * as React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet, LayoutChangeEvent } from "react-native";
import { WhiteColor } from '../theme/colors';
import Assets from '../theme/assets';

/**
 * Props
 */

type DropdownProps = {
  value?: string,
  width?: number,
  height?: number,
  onClick?: (state: boolean) => void,
  content?: () => JSX.Element,
};

/**
 * DropdownLayout
 */

type DropdownLayout = {
  width?: number,
  height?: number,
  x?: number,
  y?: number,
};

/**
 * Style
 */

const style = StyleSheet.create({
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    backgroundColor: WhiteColor,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

/**
 * Dropdown
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-279&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function Dropdown({ value, width, height, onClick, content }: DropdownProps) {
  const [size, setSize] = React.useState<{ width?: number, height?: number }>({});
  const [opened, setOpened] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<DropdownLayout>({});

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setLayout({ width, height, x, y });
  };

  React.useEffect(() => {
    Image.getSize(Assets.IcDropdownArrow, (w, h) => {
      setSize({ width: w * 0.6, height: h * 0.6 })
    });
  }, []);

  return (
    <View style={{ width, height }} onLayout={onLayout}>
      <Pressable onPress={() => setOpened(opened => !opened)}>
        <View style={style.dropdownContainer}>
          <Text>{value}</Text>
          <Image
            source={{ uri: Assets.IcDropdownArrow, width: size.width, height: size.height }}
          />
        </View>
      </Pressable>

      <Modal visible={opened} transparent animationType='none'>
        <Pressable style={{ flex: 1 }} onPress={() => setOpened(false)}>
          <View style={{ position: 'absolute', width: layout.width, top: layout.y! + layout.height!, right: layout.x }}>
            {content?.()}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}