import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import IconButton from "../ui/IconButton";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import ConfirmDialog from "../ui/ConfirmDialog";
import { Note } from "../../types/note";
import { useNotes } from "../../db/useNotes";
import { useEffect, useState } from "react";
import {
  Bookmark,
  ChevronLeft,
  Share as ShareIcon,
  X,
} from "lucide-react-native";

type NoteDetailProps = {
  note: Note;
  onBack: () => void;
  onEdit: () => void;
};

export default function NoteDetail({ note, onBack, onEdit }: NoteDetailProps) {
  const { deleteNote, getNotes, setPinned } = useNotes();
  const [displayNumber, setDisplayNumber] = useState(1);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [pinned, setPinnedState] = useState(note.pinned);

  const date = new Date(note.createdAt);
  const meta = `NO.${String(displayNumber).padStart(3, "0")} · ${String(
    date.getDate()
  ).padStart(2, "0")} ${date
    .toLocaleString("en", { month: "short" })
    .toUpperCase()} ${date.getFullYear()}`;

  useEffect(() => {
    getNotes().then((notes) => {
      const ordered = [...notes].sort(
        (first, second) => first.createdAt - second.createdAt
      );
      setDisplayNumber(
        Math.max(1, ordered.findIndex((item) => item.id === note.id) + 1)
      );
    });
  }, [getNotes, note.id]);

  const remove = async () => {
    await deleteNote(note.id);
    onBack();
  };

  const togglePinned = async () => {
    const nextPinned = !pinned;
    try {
      await setPinned(note.id, nextPinned);
      setPinnedState(nextPinned);
    } catch {
      Alert.alert("Unable to update pin", "Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-light-sheet dark:bg-dark-sheet">
      <View className="absolute left-0 right-0 top-0 h-[440px] bg-light-card dark:bg-dark-card">
        {note.imageUri ? (
          <Pressable
            onPress={() => setPreviewVisible(true)}
            className="absolute inset-0"
          >
            <Image
              source={{ uri: note.imageUri }}
              resizeMode="cover"
              className="absolute inset-0"
            />
          </Pressable>
        ) : null}

        <LinearGradient
          colors={["rgba(0,0,0,.35)", "transparent"]}
          className="absolute inset-x-0 top-0 h-[140px]"
          pointerEvents="none"
        />
      </View>

      <IconButton
        overlay
        label="Back"
        onPress={onBack}
        className="absolute left-4 top-[56px]"
      >
        <ChevronLeft size={28} color="#ffffff" />
      </IconButton>

      <IconButton
        overlay
        label={pinned ? "Unpin note" : "Pin note"}
        onPress={togglePinned}
        className="absolute right-[72px] top-[56px]"
      >
        <Bookmark
          size={24}
          strokeWidth={1.9}
          color={pinned ? "#3DDC84" : "#ffffff"}
          fill={pinned ? "#3DDC84" : "transparent"}
        />
      </IconButton>

      <IconButton
        overlay
        label="Share note"
        onPress={() =>
          Share.share({
            message: `${note.title}\n${note.description ?? ""}`,
          })
        }
        className="absolute right-4 top-[56px]"
      >
        <ShareIcon size={24} color="#ffffff" />
      </IconButton>

      <ScrollView
        className="absolute inset-x-0 top-[360px] bottom-0 rounded-t-[32px] bg-light-sheet dark:bg-dark-sheet"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 26,
          paddingBottom: 34,
        }}
      >
        <Text className="font-mono text-[12px] text-light-muted dark:text-dark-muted">
          {meta}
        </Text>

        <Text className="mt-3 font-bricolage-bold text-[34px] leading-[36px] tracking-[-0.03em] text-light-fg dark:text-dark-fg">
          {note.title}
        </Text>

        <Text className="mt-4 font-bricolage-medium text-[16px] leading-6 text-light-body dark:text-dark-body">
          {note.description}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
        >
          {note.imageUri ? (
            <Pressable onPress={() => setPreviewVisible(true)}>
              <Image
                source={{ uri: note.imageUri }}
                className="h-[72px] w-[72px] rounded-[14px]"
              />
            </Pressable>
          ) : null}

          <View className="ml-3 h-[72px] w-[72px] items-center justify-center rounded-[14px] border border-light-line dark:border-dark-line">
            <Text className="font-mono text-[12px] text-light-muted dark:text-dark-muted">
              +2
            </Text>
          </View>
        </ScrollView>

        <View className="-bottom-24 flex-row gap-2">
          <PrimaryButton
            label="Edit note"
            onPress={onEdit}
            className="flex-1 "
          />
          <SecondaryButton
            label="Delete"
            danger
            onPress={() => setDeleteDialogVisible(true)}
            className="w-[110px] h-[56px]"
          />
        </View>
      </ScrollView>

      <Modal
        visible={previewVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black">
          <Pressable
            onPress={() => setPreviewVisible(false)}
            className="absolute right-5 top-14 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/20"
          >
            <X size={26} color="white" />
          </Pressable>

          {note.imageUri ? (
            <Image
              source={{ uri: note.imageUri }}
              resizeMode="contain"
              className="h-full w-full"
            />
          ) : null}
        </View>
      </Modal>

      <ConfirmDialog
        visible={deleteDialogVisible}
        title="Delete note?"
        message="This note will be permanently deleted."
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={() => setDeleteDialogVisible(false)}
        onConfirm={remove}
      />
    </View>
  );
}
