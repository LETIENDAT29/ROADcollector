import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import { Detection, loadModel, runYOLO } from '../modelload/yolo';
import DetectionOverlay from '@/components/DetectionOverlay';


export default function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  const [detections, setDetections] = useState<Detection[]>([]);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadModel();
      setModelLoaded(true);
    })();
  }, []);

  const onFrame = async (frame: any) => {
    if (!modelLoaded) return;
    const result = await runYOLO(frame, frame.width, frame.height);
    setDetections(result);
  };

  const frameProcessor = useFrameProcessor((frame) => {
    runOnJS(onFrame)(frame);
  }, [modelLoaded]);

  if (!device) return null;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}           // ✅ device bắt buộc
        isActive={true}
        frameProcessor={frameProcessor} // ✅ frameProcessor sync
      />
      <DetectionOverlay
        detections={detections}
        width={device.previewWidth || 400}
        height={device.previewHeight || 300}
      />
    </View>
  );
}
