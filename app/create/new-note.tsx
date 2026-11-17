import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Screen from "../../src/components/ui/Screen";
import IconButton from "../../src/components/ui/IconButton";
import Field from "../../src/components/ui/Field";
import TextArea from "../../src/components/ui/TextArea";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import { useNotes } from "../../src/db/useNotes";
import { saveImagePermanently } from "../../src/utils/saveImagePermanently";
import { noteSchema } from "../../src/validation/noteValidation";

export default function NewNote() {
  const { imageUri, noteId } = useLocalSearchParams<{
    imageUri?: string;
    noteId?: string;
  }>();
  const router = useRouter();
  const { createNote, getNoteById, updateNote } = useNotes();
  const editNoteId = Array.isArray(noteId) ? noteId[0] : noteId;
  const isEditing = Boolean(editNoteId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isLoadingEdit, setIsLoadingEdit] = useState(isEditing);
  const [loadError, setLoadError] = useState("");

  const [photo, setPhoto] = useState(
    Array.isArray(imageUri) ? (imageUri[0] ?? "") : (imageUri ?? "")
  );

  useEffect(() => {
    if (!editNoteId) return;

    let active = true;
    const loadNote = async () => {
      try {
        const note = await getNoteById(editNoteId);
        if (!active) return;
        if (!note) {
          setLoadError("Note not found.");
          return;
        }

        setTitle(note.title);
        setDescription(note.description ?? "");
        setPhoto(note.imageUri ?? "");
      } catch (error) {
        if (active) {
          setLoadError(
            error instanceof Error ? error.message : "Unable to load note."
          );
        }
      } finally {
        if (active) setIsLoadingEdit(false);
      }
    };

    void loadNote();

    return () => {
      active = false;
    };
  }, [editNoteId, getNoteById]);

  const changePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
    });

    if (result.canceled) return;

    const permanentUri = await saveImagePermanently(result.assets[0].uri);

    setPhoto(permanentUri);
  };

  const save = async () => {
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

    setTitleError("");
    setDescriptionError("");

    const updatedNote = {
      title: result.data.title,
      description: result.data.description ?? "",
      imageUri: photo || undefined,
    };

    if (editNoteId) {
      await updateNote(editNoteId, updatedNote);
      router.back();
    } else {
      await createNote({
        ...updatedNote,
        imageUri: photo,
      });
      router.replace("/(tabs)/home");
    }
  };

  if (isLoadingEdit || loadError) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center px-5">
          {isLoadingEdit ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text className="text-center font-bricolage-medium text-[16px] text-light-fg dark:text-dark-fg">
                {loadError}
              </Text>
              <PrimaryButton
                label="Go back"
                onPress={() => router.back()}
                className="mt-5 w-full"
              />
            </>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="h-[44px] flex-row items-center justify-between px-5 ">
        <IconButton label="Close new note" onPress={() => router.back()}>
          <X
            size={24}
            strokeWidth={1.9}
            className="text-light-fg dark:text-dark-fg"
          />
        </IconButton>
        <Text className="font-bricolage-bold text-[17px] text-light-fg dark:text-dark-fg">
          {isEditing ? "Edit note" : "New note"}
        </Text>
        <View className="h-[44px] w-[44px]" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-5 pt-[25px]"
      >
        <View className="h-[240px] overflow-hidden rounded-[24px] bg-light-card dark:bg-dark-card">
          {photo ? (
            <Image
              source={{ uri: photo }}
              resizeMode="cover"
              onLoad={() => console.log("NEW NOTE IMAGE LOADED:", photo)}
              onError={(event) =>
                console.log(
                  "NEW NOTE IMAGE ERROR:",
                  event.nativeEvent.error,
                  photo
                )
              }
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          ) : null}
          <Text className="absolute left-4 top-4 font-mono text-[12px] text-white">
            NO.015
          </Text>
          {!photo ? (
            <Pressable
              onPress={changePhoto}
              accessibilityRole="button"
              accessibilityLabel="Add photo"
              className="absolute inset-0 items-center justify-center"
            >
              <Text className="font-bricolage-bold text-[16px] text-light-muted dark:text-dark-muted">
                Add photo
              </Text>
            </Pressable>
          ) : null}
          <Image
            source={{ uri: photo }}
            resizeMode="cover"
            onLoad={() => console.log("NEW NOTE IMAGE LOADED:", photo)}
            onError={(event) =>
              console.log(
                "NEW NOTE IMAGE ERROR:",
                event.nativeEvent.error,
                photo
              )
            }
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />

          <Pressable
            onPress={changePhoto}
            accessibilityRole="button"
            accessibilityLabel={photo ? "Change photo" : "Choose photo"}
            className={
              photo
                ? "absolute bottom-4 right-4 h-[44px] items-center justify-center rounded-full bg-accent px-4"
                : "absolute bottom-4 right-4 h-[44px]"
            }
          >
            {photo ? (
              <Text className="font-bricolage-bold text-[16px] text-accent-ink">
                Change photo
              </Text>
            ) : null}
          </Pressable>
        </View>
        <View className="mt-[18px]">
          <Field
            label="Title *"
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              if (titleError) setTitleError("");
            }}
          />
          {titleError ? (
            <Text className="mt-1 text-sm text-red-500">{titleError}</Text>
          ) : null}
        </View>
        <View className="mt-[18px]">
          <TextArea
            label="Description (Optional)"
            value={description}
            onChangeText={(value) => {
              setDescription(value);
              if (descriptionError) setDescriptionError("");
            }}
          />
          {descriptionError ? (
            <Text className="mt-1 text-sm text-red-500">
              {descriptionError}
            </Text>
          ) : null}
        </View>
        <View className="mt-4 flex-row gap-3">
          {photo ? (
            <Image
              source={{ uri: photo }}
              className="h-[56px] w-[56px] rounded-[14px]"
            />
          ) : null}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add another photo"
            onPress={changePhoto}
            className="h-[56px] w-[56px] items-center justify-center rounded-[14px] border border-dashed border-light-muted dark:border-dark-muted"
          >
            <Plus size={24} className="text-light-muted dark:text-dark-muted" />
          </Pressable>
        </View>
      </ScrollView>
      <PrimaryButton
        label={isEditing ? "Save changes" : "Save note"}
        onPress={save}
        className="absolute bottom-[60px] left-5 right-5"
      />
    </Screen>
  );
}
