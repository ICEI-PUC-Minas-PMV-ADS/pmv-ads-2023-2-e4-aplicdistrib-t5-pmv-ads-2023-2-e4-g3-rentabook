import * as React from 'react';
import { View, Text } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import PrimaryButton from './common/components/PrimaryButton';
import SecondaryButton from './common/components/SecondaryButton';
import DestructiveButton from './common/components/DestructiveButton';
import Input from './common/components/Input';
import Dropdown from './common/components/Dropdown';
import './App.css';
import TextArea from './common/components/TextArea';

const items = [
  { title: 'Item #1', value: 1 },
  { title: 'Item #2', value: 2 },
  { title: 'Item #3', value: 3 },
];

function App() {
  return (
    <View style={{ flex: 1 }}>
      <ClickOutsideProvider>
        <View style={{ padding: 10 }}>
          <PrimaryButton label='Confirmar' onClick={() => { }} />
          <View style={{ height: 10 }} />
          <SecondaryButton label='Pesquisar' onClick={() => { console.log('click') }} />
          <View style={{ height: 10 }} />
          <DestructiveButton label='Cancelar' onClick={() => { }} />
          <View style={{ height: 10 }} />
          <Input label='Nome' />
          <View style={{ height: 10 }} />
          <Dropdown placeholder='Ordenar por' items={items}>
            {(value) => <Text>{value.title}</Text>}
          </Dropdown>
          <View style={{ height: 10 }} />
          <TextArea placeholder='Texto' />
        </View>
      </ClickOutsideProvider>
    </View>
  );
}

export default App;
