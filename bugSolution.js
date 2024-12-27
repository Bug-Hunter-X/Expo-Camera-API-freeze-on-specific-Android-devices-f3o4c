// bugSolution.js
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraRelease = () => {
    if (cameraRef.current) {
      cameraRef.current.pausePreview();
    }
  };

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef} >
        {/* ... your camera components ... */}
      </Camera>
      <Button title="Release Camera" onPress={handleCameraRelease} />
    </View>
  );
};

export default App;