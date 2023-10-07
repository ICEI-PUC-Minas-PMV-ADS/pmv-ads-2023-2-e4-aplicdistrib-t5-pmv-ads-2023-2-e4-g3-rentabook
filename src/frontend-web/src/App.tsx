import * as React from 'react';
import { View, Text } from 'react-native';
import { ClickOutsideProvider } from 'react-native-click-outside';
import PrimaryButton from './common/components/PrimaryButton';
import SecondaryButton from './common/components/SecondaryButton';
import DestructiveButton from './common/components/DestructiveButton';
import Input from './common/components/Input';
import Dropdown from './common/components/Dropdown';
import './App.css';

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
          <Dropdown
            value='Ordenar por'
            content={() => (
              <View style={{ backgroundColor: "#703030" }}>
                <Text>Item #1</Text>
                <Text>Item #2</Text>
                <Text>Item #3</Text>
                <Text>Item #4</Text>
              </View>
            )}
          />
        </View>
      </ClickOutsideProvider>
    </View>
  );
}

export default App;
