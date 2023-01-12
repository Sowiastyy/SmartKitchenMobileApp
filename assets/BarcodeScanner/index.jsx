import styles from './style'
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import productData from '../product_data.json'
import Connection from '../Connection';
export default function BarcodeScanner(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    var connection = new Connection();
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
    }, []);
    const handleBarcode = (barcode) => {
      let i = 0
      let productRepeated = false
      props.products.forEach(element => {
        if(barcode==element.barcode) {
          console.log("Already taken")
          return productRepeated=true

        }
      });
      if (productRepeated) 
        return
      
      productData["products"].forEach(element => {
        i++;
        if(barcode==element.barcode) {
          let product = {
            id:i,
            weight:600,
            barcode:barcode
          }
          props.setProducts([...props.products, product])
          connection.input(barcode);
          return productRepeated=true
        }
        
      });

      if (productRepeated) 
        return
      console.log("Nie ma w bazie")
    }
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data)
      console.log('Type: ' + type + '\nData: ' + data)
      handleBarcode(data)

    };
    
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
  
    // Return the View
    return (
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>
      
        {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
      </View>
    );
}