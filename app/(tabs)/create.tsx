import {
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../../src/components/general/AppText";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useRouter } from "expo-router";
import useThemeStore from "../../src/store/themeStore";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ImagePermissionPopUp from "../../src/components/create/ImagePermissionPopUp";
import { noteSchema } from "../../src/validation/noteValidation";
import { useNotes } from "../../src/db/useNotes";

export default function Create() {
  const router = useRouter();
  const theme = useThemeStore();
  const isDark = theme.theme === "dark";

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imagePopUp, setImagePopUp] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const { createNote } = useNotes();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      //Todo add custom popup
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    const result = noteSchema.safeParse({
      title,
      description,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      setTitleError(errors.title?.[0] ?? "");
      setDescriptionError(errors.description?.[0] ?? "");

      return;
    }

    console.log(result.data);

    // TODO: SQLite mein save karna'
    await createNote({
      title: title,
      description: description,
      imageUri: image,
    });

    router.push("home");
  };

  return (
    <SafeAreaView className="flex-1 p-4 gap-8 bg-light-bg dark:bg-dark-bg">
      <View className="flex-row items-center justify-start gap-20">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center gap-1"
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
          <AppText
            className="text-[12px] leading-[16px] text-light-text dark:text-dark-text"
            style={{ fontFamily: "inter-medium" }}
          >
            Cancel
          </AppText>
        </TouchableOpacity>
        <AppText
          className="text-[16px] leading-[20px] text-light-text dark:text-dark-text"
          style={{ fontFamily: "inter-bold" }}
        >
          New Note
        </AppText>
      </View>
      <KeyboardAvoidingView
        className="flex-1 gap-6"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="gap-2">
          <AppText
            onPress={() => console.log(title)}
            className="text-light-text dark:text-dark-text"
          >
            Note Title
          </AppText>
          <TextInput
            value={title}
            onChangeText={(txt) => {
              setTitle(txt);
              setTitleError("");
            }}
            className="text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg p-4"
            placeholder="Add a title for this note..."
            placeholderTextColor={isDark ? "#66625E" : "#1C1917"}
            onBlur={() => {
              const result = noteSchema.shape.title.safeParse(title);

              if (!result.success) {
                setTitleError(result.error.issues[0].message);
              }
            }}
          />

          {titleError && (
            <AppText className="text-xs text-red-500">{titleError}</AppText>
          )}
        </View>

        <View className=" border border-light-border dark:border-dark-border rounded-lg">
          {image ? (
            <Pressable
              onPress={() => setImagePopUp(true)}
              className="flex flex-row items-center gap-2 p-4"
            >
              <Image
                source={{ uri: image }}
                height={100}
                width={120}
                className="rounded-xl border border-light-border dark:border-dark-border"
              />
              <View className="flex-1 gap-1">
                <AppText className="font-inter-bold text-md text-light-text dark:text-dark-text">
                  Attached Photo
                </AppText>

                <AppText className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                  Tap to remove or replace this photo.
                </AppText>
              </View>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => setImagePopUp(true)}
              className="flex justify-center items-center p-8"
            >
              <Camera color={isDark ? "#9C9792" : "#615E5B"} size={32} />
              <AppText className="text-sm text-light-textSecondary dark:text-dark-textSecondary">
                Click here to upload image.
              </AppText>
            </Pressable>
          )}
        </View>
        <View className="gap-2">
          <AppText
            onPress={() => console.log(title)}
            className="text-light-text dark:text-dark-text"
          >
            Description
          </AppText>
          <TextInput
            value={description}
            onChangeText={(txt) => {
              setDescription(txt);
              setDescriptionError("");
            }}
            className="text-light-text dark:text-dark-text border border-light-border dark:border-dark-border rounded-lg p-4"
            placeholder="Add details for this note."
            placeholderTextColor={isDark ? "#66625E" : "#A39E98"}
            multiline
            onBlur={() => {
              const result =
                noteSchema.shape.description.safeParse(description);

              if (!result.success) {
                setDescriptionError(result.error.issues[0].message);
              }
            }}
          />

          {descriptionError && (
            <AppText className="text-xs text-red-500">
              {descriptionError}
            </AppText>
          )}
        </View>
        <Pressable
          onPress={handleSave}
          className="w-[30%] p-2 items-center bg-light-brand dark:bg-dark-brand rounded-lg"
        >
          <AppText className="text-light-text dark:text-dark-text">
            Save Note
          </AppText>
        </Pressable>
      </KeyboardAvoidingView>
      <ImagePermissionPopUp
        visible={imagePopUp}
        onClose={() => setImagePopUp(false)}
        onTakePhoto={takePhoto}
        onPickImage={pickImage}
        isDark={isDark}
      />
    </SafeAreaView>
  );
}
