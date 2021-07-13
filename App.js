import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Linking, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';

const App = () => {

  const [barcode, setBarcode] = useState(null);

  const urlhandle = async() => {
    const urlsupported = await Linking.canOpenURL(barcode.data);
    // console.log(urlsupported)
    if(urlsupported){
      await Linking.openURL(barcode.data);
    }else{
      Alert.alert(`can't open the url, may be it not valid`)
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitleText}>React Native Scanner</Text>
      </View>
      <View style={styles.caption}>
        <Text style={styles.captionTitleText}>Welcome to React native camera</Text>
      </View>

      {barcode ? (
        <View style={[styles.rnCamera, styles.rmCameraResult]}>
          <TouchableOpacity onPress={() => urlhandle()}>
            <Text style={styles.rmCameraResultText}>{barcode.data}</Text>
            <Text style={styles.rmCameraResultText}>{barcode.type}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <RNCamera
          style={styles.rnCamera}
          onBarCodeRead={setBarcode}
        />
      )}

      <View style={styles.cameraControl}>
        <TouchableOpacity style={styles.btn} onPress={() => setBarcode(null)} >
          <Text style={styles.btnText}>Scan QR Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2FC',
  },
  topBar: {
    height: 50,
    backgroundColor: '#62d1bc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitleText: {
    color: '#ffffff',
    fontSize: 20,
  },
  caption: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionTitleText: {
    color: '#121B0D',
    fontSize: 16,
    fontWeight: '600'
  },
  btn: {
    width: 240,
    borderRadius: 4,
    backgroundColor: '#62d1bc',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginVertical: 8,
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  rnCamera: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
  rmCameraResult: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  rmCameraResultText: {
    fontSize: 20,
    color: '#62d1bc'
  },
  cameraControl: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
