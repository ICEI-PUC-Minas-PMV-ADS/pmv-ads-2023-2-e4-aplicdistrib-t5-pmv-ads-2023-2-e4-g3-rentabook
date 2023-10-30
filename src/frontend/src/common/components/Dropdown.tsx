import * as React from 'react';
import { Modal, View, Text, Image, Pressable, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import { WhiteColor } from '../theme/colors';
import Assets from '../theme/assets';

/**
 * Props
 */

type DropdownProps<T> = {
  style?: Object,
  placeholder?: string,
  items: T[],
  value?: T | null,
  getValue?: (item: T) => string,
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

export default function Dropdown<T>({ placeholder, style, items, value, getValue, onSelect, children }: DropdownProps<T>) {
  const [size, setSize] = React.useState<{ width?: number, height?: number }>({});
  const [selectedItem, setSelectedItem] = React.useState<T | undefined>();
  const [opened, setOpened] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<DropdownLayout>({});
  const [dropdownValue] = React.useState<string>(placeholder ?? "");

  const onLayout = (event: LayoutChangeEvent) => {
    if (Platform.OS == "web") {
      const { width, height, x, y, top, left } = event.nativeEvent.layout as any;
      setLayout({ width, height, x: x + left, y: y + top + height + 2 });
    } else {
      const { width, height, x, y } = event.nativeEvent.layout;
      setLayout({ width, height, x, y });
    }
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

  React.useEffect(() => {
    if (value) { setSelectedItem(value); }
  }, [value]);

  const renderValue = (itemSelected: T | undefined): JSX.Element => {
    if (itemSelected) {
      if (getValue && itemSelected) {
        return <Text>{getValue(itemSelected)}</Text>
      }
      return children(itemSelected);
    }
    return <Text>{dropdownValue}</Text>;
  };

  return (
    <View style={[style]}>
      <Pressable onPress={() => setOpened(opened => !opened)} onLayout={onLayout}>
        <View style={DropdownStyle.dropdownContainer}>
          {renderValue(selectedItem)}
          <Image
            source={{ uri: Assets.IcDropdownArrow, width: size.width, height: size.height }}
          />
        </View>
      </Pressable>

      <Modal visible={opened} transparent animationType='none'>
        <Pressable style={{ flex: 1 }} onPress={() => setOpened(false)}>
          <View style={{ position: 'absolute', width: layout.width, left: layout.x ?? 0, top: layout.y ?? 0 }}>
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