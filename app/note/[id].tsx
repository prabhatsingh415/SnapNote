import { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNotes } from "../../src/db/useNotes";
import { Note } from "../../src/types/note";
import NoteDetail from "../../src/components/note/NoteDetail";
import AppText from "../../src/components/general/AppText";

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { getNoteById } = useNotes();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);

      const loadNote = async () => {
        try {
          if (!id) {
            setNote(null);
            return;
          }

          const data = await getNoteById(id);
          if (active) setNote(data);
        } finally {
          if (active) setLoading(false);
        }
      };

      void loadNote();

      return () => {
        active = false;
      };
    }, [getNoteById, id])
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-light-bg dark:bg-dark-bg">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!note) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-light-bg dark:bg-dark-bg">
        <AppText>Note not found</AppText>
      </SafeAreaView>
    );
  }

  return (
    <NoteDetail
      note={note}
      onBack={() => router.back()}
      onEdit={() =>
        router.push({
          pathname: "/create/new-note",
          params: { noteId: note.id },
        })
      }
    />
  );
}
