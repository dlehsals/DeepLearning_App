import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import 


export default function App() {
  const [readyCamera, setReadyCamera] = useState(null);
  const [readyMediaLibrary, setReadyMediaLibrary] = useState(false);
  const [viewCamera, setViewCamera] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  let camera = null;
  useEffect(()=> {
    (async ()=> {
      const {status} = await Camera.requestPermissionsAsync();
      setReadyCamera(status === 'granted');
    })();
    (async() => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setReadyMediaLibrary(status === 'granted');
    })();
  })
  if(readyCamera === null){
    return <View><Text>ERROR</Text></View>;
  }
  if(readyCamera === false){
    return <View><Text>카메라 사용 권한 없음</Text></View>;
  }
  if(previewPhoto !== null){
    return (
      <View style={{flex : 1}}>
        <ImageBackground source = {{uri : previewPhoto.uri}} style = {{flex:1}}>
          <View style={{flex : 1, backgroundColor : 'transparent', flexDirection : 'row'}}>
        <TouchableOpacity style = {styles.cameraButton} onPress={() => {setPreviewPhoto(null)}}>
        <Text style={styles.text}>돌아가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.cameraButton} onPress={ async () => {
          if(readyMediaLibrary === true)
            await MediaLibrary.saveToLibraryAsync(previewPhoto.uri);
          setPreviewPhoto(null);
        }}>
        <Text style={styles.text}>저장</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      </View>
    );
  }
  if(viewCamera === false)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {() => setViewCamera(true)}>
      <Text style={styles.text}>사진 촬영</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
  else
    return(
      <View style={styles.container}>
        <Camera style={styles.camera} ref = {r => camera = r}
                type={cameraType}>
        <View style={{flex : 1, backgroundColor : 'transparent', flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{
            setCameraType(cameraType ===  Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back);
          }} style = {styles.cameraButton}>
            <Text style={styles.text}>FLIP</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.cameraButton} 
            onPress={async ()=>{
            if(camera === null) return;
            const captured = await camera.takePictureAsync();
            setPreviewPhoto(captured);
          }}>
            <Text style={styles.text}>촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButton} onPress={()=> {setViewCamera(false)}}>
            <Text style={styles.text}>취소</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
/*
switchCameraType = () =>{
  const {cameraType} = this.state
  if(cameraType === Camera.Constants.Type.back){
    this.setCameraType({
      cameraType : Camera.Constants.Type.front,
    })
  }
    else{
      this.setCameraType({
        cameraType : Camera.Constants.Type.back,
      })
    }
  }
}
*/
const styles = StyleSheet.create({
    camera : { flex : 1, width: '100%'},
    cameraButton: {flex:0.2, alignSelf:'flex-end', fontSize : 10, flexDirection:'column', margin: 40},
    text: {fontSize : 40},
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
