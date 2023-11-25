import * as React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, LayoutChangeEvent, Platform } from "react-native";
import { WhiteColor } from '../theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

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
  const [selectedItem, setSelectedItem] = React.useState<T | undefined>();
  const [opened, setOpened] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<DropdownLayout>({});
  const [dropdownValue] = React.useState<string>(placeholder ?? "");

  const dropdownRef = React.useRef<View>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    if (Platform.OS == "web") {
      const { width, height, x, y, top, left } = event.nativeEvent.layout as any;
      setLayout({ width, height, x: x + left, y: y + top + height + 2 });
    }
  };

  const onHandleSelect = (item: T) => {
    onSelect?.(item);
    setSelectedItem(item);
    setOpened(false);
  };

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
      <Pressable onPress={() => {
        dropdownRef.current?.measureInWindow((x, y, width, height) => {
          setLayout({ width, height, x, y: y + height });
        });
        setOpened(opened => !opened)
      }} onLayout={onLayout}>
        <View ref={dropdownRef} style={DropdownStyle.dropdownContainer}>
          {renderValue(selectedItem)}
          <Ionicons name="chevron-down-outline" size={20} />
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