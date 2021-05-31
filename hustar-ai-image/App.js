import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import {fetch} from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';

export default function App() {
  const [readyMediaLibrary, setReadyMediaLibrary] = useState(false);
  const [image, setImage] = useState(null);
  const [readyTF, setReadyTF] = useState(false);
  const [readyMobileNet, setReadyMobileNet] = useState(false);
  const [predictions, setPredictions] = useState(false);
  let model = null;
  useEffect(()=> {
    (async () =>{
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setReadyMediaLibrary(status === 'granted');
    })();
    (async () => {
      await tf.ready();
      setReadyTF(true);
    })();
    (async()=>{
      model = await mobilenet.load();
      setReadyMobileNet(true);
    })();
});
  const pickImage = async()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes : ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });
    if(result.cancelled === false)
      setImage(result.uri);
      setPredictions(null);
      predict(result);
  }
  const predict = async (resultImage) => {
    try{
    const imagePath = Image.resolveAssetSource(resultImage);
    const result = await fetch(imagePath.uri, {}, {isBinary: true});
    const rawImage = await result.arrayBuffer();
    const {width, height, data} = jpeg.decode(rawImage, {useTArray : true});
    const buffer = new Uint8Array(width * height * 3);
    for(let i = 0, offset = 0; i < buffer.length;i+=3, offset+=4){
      buffer[i] = data[offset];
      buffer[i+1] = data[offset+1];
      buffer[i+2] = data[offset+2];
    }
    const imageTensor = tf.tensor3d(buffer, [height, width, 3]);
    const predictions = await model.classify(imageTensor);
    setPredictions(predictions);
      }catch(err){
        setPredictions({error:err});
      }
    }
  if(image !== null){
    return(
      <View style={styles.container}>
        <Image source = {{uri : image}} style = {{width:200, height:200}} />
        <TouchableOpacity onPress = {()=>{
          setImage(null);
        }}>
          <Text style={{fontSize : 40}}>닫기</Text>
        </TouchableOpacity>
        <Text>{predictions === null ? "predicting,,," : JSON.stringify(predictions)}</Text>
        <StatusBar style="auto"/>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Tensorflow Ready?: {readyTF ? "YES" : "NO"}</Text>
      <Text>MobileNet Ready?: {readyMobileNet ? "YES" : "NO"}</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text style={{fontSize : 40}}>사진열기</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
