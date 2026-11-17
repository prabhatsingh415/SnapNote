import { BackHandler, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera, Image as ImageIcon } from "lucide-react-native";

import BottomSheet from "../src/components/ui/BottomSheet";
import SecondaryButton from "../src/components/ui/SecondaryButton";
import { saveImagePermanently } from "../src/utils/saveImagePermanently";

export default function AddNote() {
  const router = useRouter();

  const close = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/(tabs)/home");
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        close();
        return true;
      },
    );
    return () => subscription.remove();
  }, []);

  const openGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled || !result.assets[0]) return;

    try {
      const permanentUri = await saveImagePermanently(result.assets[0].uri);

      router.replace({
        pathname: "/create/new-note",
        params: { imageUri: encodeURIComponent(permanentUri) },
      });
    } catch (error) {
      console.error("IMAGE SAVE FAILED:", error);
    }
  };

  const openCamera = () => {
    router.replace("/camera");
  };

  return (
    <View className="flex-1" style={{ backgroundColor: "transparent" }}>
      <BottomSheet
        visible
        title="Add to SnapNote"
        subtitle="Start with a photo, then give it a title and description."
        onClose={close}
      >
        <Pressable
          onPress={openGallery}
          accessibilityRole="button"
          accessibilityLabel="Choose from gallery"
          className="h-[80px] flex-row items-center rounded-[22px] bg-light-card px-3 dark:bg-dark-card"
        >
          <View className="h-12 w-12 items-center justify-center rounded-full bg-accent">
            <ImageIcon size={24} strokeWidth={1.9} className="text-accent" />
          </View>
          <View className="ml-4">
            <Text className="font-bricolage-bold text-[22px] text-light-fg dark:text-dark-fg">
              Choose from gallery
            </Text>
            <Text className="mt-1 font-mono text-[10px] text-light-muted dark:text-dark-muted">
              PICK ONE OR MORE PHOTOS
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={openCamera}
          accessibilityRole="button"
          accessibilityLabel="Take a photo"
          className="mt-4 h-[80px] flex-row items-center rounded-[22px] bg-light-card px-3 dark:bg-dark-card"
        >
          <View className="h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Camera size={24} strokeWidth={1.9} className="text-accent" />
          </View>
          <View className="ml-4">
            <Text className="font-bricolage-bold text-[22px] text-light-fg dark:text-dark-fg">
              Take a photo
            </Text>
            <Text className="mt-1 font-mono text-[10px] text-light-muted dark:text-dark-muted">
              OPEN THE CAMERA
            </Text>
          </View>
        </Pressable>
        <SecondaryButton label="Cancel" onPress={close} className="mt-4" />
      </BottomSheet>
    </View>
  );
}
