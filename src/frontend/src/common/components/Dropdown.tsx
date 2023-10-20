import * as React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet, LayoutChangeEvent } from "react-native";
import { WhiteColor } from '../theme/colors';
import Assets from '../theme/assets';

/**
 * Props
 */

type DropdownProps<T> = {
  style?: Object,
  placeholder?: string,
  items: T[],
  onSelect?: (item: T) => void,
  children: (item: T) => JSX.Element,
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

const DropdownStyle = StyleSheet.create({
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

export default function Dropdown<T>({ placeholder, style, items, onSelect, children }: DropdownProps<T>) {
  const [size, setSize] = React.useState<{ width?: number, height?: number }>({});
  const [selectedItem, setSelectedItem] = React.useState<T | undefined>();
  const [opened, setOpened] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<DropdownLayout>({});
  const [dropdownValue, setDropdownValue] = React.useState<string>(placeholder ?? "");

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setLayout({ width, height, x, y });
  };

  const onHandleSelect = (item: T) => {
    onSelect?.(item);
    setSelectedItem(item);
    setOpened(false);
  };

  React.useEffect(() => {
    Image.getSize(Assets.IcDropdownArrow, (w, h) => {
      setSize({ width: w * 0.6, height: h * 0.6 })
    });
  }, []);

  return (
    <View style={style} onLayout={onLayout}>
      <Pressable onPress={() => setOpened(opened => !opened)}>
        <View style={DropdownStyle.dropdownContainer}>
          {selectedItem ? children(selectedItem) : <Text>{dropdownValue}</Text>}
          <Image
            source={{ uri: Assets.IcDropdownArrow, width: size.width, height: size.height }}
          />
        </View>
      </Pressable>

      <Modal visible={opened} transparent animationType='none'>
        <Pressable style={{ flex: 1 }} onPress={() => setOpened(false)}>
          <View style={{ position: 'absolute', width: layout.width, top: layout.y! + layout.height!, right: layout.x }}>
            {items.map((value, index) =>
              <Pressable key={index} onPress={() => onHandleSelect(value)}>
                {children(value)}
              </Pressable>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}