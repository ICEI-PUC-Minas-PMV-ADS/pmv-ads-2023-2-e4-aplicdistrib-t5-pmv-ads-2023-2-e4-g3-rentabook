import * as React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, LayoutChangeEvent, Platform, FlatList, ScrollView } from "react-native";
import { WhiteColor } from '../theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Props
 */

type LazyDropdownProps<T> = {
  style?: Object,
  placeholder?: string,
  items: T[],
  value?: T | null,
  maxHeight?: number,
  keyExtractor?: (item: T) => any,
  renderItem: (item: T) => JSX.Element,
  getItemLabel?: (item: T) => string,
  onEndReached?: () => void,
  onSelect?: (item: T) => void,
};

/**
 * LazyDropdownLayout
 */

type LazyDropdownLayout = {
  width?: number,
  height?: number,
  x?: number,
  y?: number,
};

/**
 * Style
 */

const LazyDropdownStyle = StyleSheet.create({
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
 * LazyDropdown
 * https://www.figma.com/file/2lR8urPO212OkkhvDTmmgF/Untitled?type=design&node-id=32-279&mode=design&t=ZkwebBuGnnQ715v7-4
 */

export default function LazyDropdown<T>({ placeholder, style, items, value, maxHeight = 500, keyExtractor, renderItem, onEndReached, getItemLabel, onSelect }: LazyDropdownProps<T>) {
  const [selectedItem, setSelectedItem] = React.useState<T | undefined>();
  const [opened, setOpened] = React.useState<boolean>(false);
  const [layout, setLayout] = React.useState<LazyDropdownLayout>({});
  const [dropdownValue] = React.useState<string>(placeholder ?? "");

  const dropdownRef = React.useRef<View>(null);

  const onLayout = (event: LayoutChangeEvent) => {
    if (Platform.OS === "web") {
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
      if (getItemLabel && itemSelected) {
        return <Text>{getItemLabel(itemSelected)}</Text>
      }
      return renderItem(itemSelected);
    }
    return <Text>{dropdownValue}</Text>;
  };

  return (
    <View style={[style]}>
      <Pressable onPress={() => {
        if (Platform.OS === 'android') {
          dropdownRef.current?.measureInWindow((x, y, width, height) => {
            setLayout({ width, height, x, y: y + height });
          });
        }
        setOpened(opened => !opened);
      }} onLayout={onLayout}>
        <View ref={dropdownRef} style={LazyDropdownStyle.dropdownContainer}>
          {renderValue(selectedItem)}
          <Ionicons name="chevron-down-outline" size={20} />
        </View>
      </Pressable>

      <Modal visible={opened} transparent animationType='none'>
        <Pressable style={{ flex: 1 }} onPress={() => setOpened(false)}>
          <View style={{ position: 'absolute', width: layout.width, maxHeight: maxHeight, left: layout.x ?? 0, top: layout.y ?? 0 }}>
            <ScrollView>
              <FlatList
                data={items}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                keyExtractor={keyExtractor}
                renderItem={({ item }) => (
                  <Pressable onPress={() => onHandleSelect(item)}>
                    {renderItem(item)}
                  </Pressable>
                )}
                onEndReached={() => { onEndReached?.() }}
                onEndReachedThreshold={0.1} />
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}