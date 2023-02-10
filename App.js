import * as React from 'react';
import { useState } from 'react';
import ScannerScreen from './assets/ScannerScreen';
import { View, Button, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const HomeScreen = (props) => {

  return (
    <View>
      <Button
        title="Zeskanuj produkt"
        onPress={() =>
          props.navigation.navigate('Scan', {name: 'Jane'})
        }
      />
      {props.products &&
        props.products.map((product, i)=>{ 
          return (<Text key={i}>{product.weight}</Text>)
        })
      }
    </View>
  );
};

const MyStack = () => {
  const [products, setProducts] = useState([
    {
      id:1,
      weight:100,
      barcode:4833820
    },
    {
      id:2,
      weight:100,
      barcode:4833820
    },
    {
      id:3,
      weight:100,
      barcode:4833820
    },
    {
      id:4,
      weight:100,
      barcode:4833820
    },
  ])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{title: 'App'}}
        >
          {(props) => <HomeScreen {...props} products={products} />}
        </Stack.Screen>
        <Stack.Screen name="Scan">
          {(props) => <ScannerScreen {...props} products={products} setProducts={setProducts} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {

  // Return the View
  return (
    <MyStack />
  );
}