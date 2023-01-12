import React from 'react'
import { View } from 'react-native'
export default function ScanScreen() {
  return (
    <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BarcodeScanner />
        <AppNavigator />
      </View>
  )
}