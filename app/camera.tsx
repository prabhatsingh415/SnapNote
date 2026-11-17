import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X } from "lucide-react-native";

import CameraPermissionView from "../src/components/camera/CameraPermissionView";
import ShutterButton from "../src/components/camera/ShutterButton";
import IconButton from "../src/components/ui/IconButton";
import { saveImagePermanently } from "../src/utils/saveImagePermanently";

export default function CameraScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const [busy, setBusy] = useState(false);

  const close = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/home");
    }
  };

  const capture = async () => {
    if (busy || !cameraReady || !cameraRef.current) return;
    setBusy(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      const imageUri = await saveImagePermanently(photo.uri);

      router.replace({
        pathname: "/create/new-note",
        params: { imageUri: encodeURIComponent(imageUri) },
      });
    } catch {
      Alert.alert("Couldn't take the photo", "Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-light-bg dark:bg-dark-bg">
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <CameraPermissionView
        canAskAgain={permission.canAskAgain}
        onAllow={requestPermission}
        onOpenSettings={() => Linking.openSettings()}
        onClose={close}
      />
    );
  }

  return (
    <View className="flex-1 bg-dark-bg">
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
        onCameraReady={() => setCameraReady(true)}
      />
      <IconButton
        overlay
        label="Close camera"
        onPress={close}
        className="absolute left-3"
        style={{ top: insets.top + 12 }}
      >
        <X size={24} strokeWidth={2} color="#ffffff" />
      </IconButton>
      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between"
        style={{ paddingBottom: insets.bottom + 34 }}
      >
        <View className="h-12 w-12" />
        <ShutterButton onPress={capture} disabled={busy || !cameraReady} />
        <View className="h-12 w-12" />
      </View>
    </View>
  );
}
