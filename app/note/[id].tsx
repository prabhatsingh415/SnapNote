import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
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

  useEffect(() => {
    const loadNote = async () => {
      if (!id) return;

      try {
        const data = await getNoteById(id);
        setNote(data);
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id, getNoteById]);

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
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-dark-bg">
      <NoteDetail note={note} onBack={() => router.back()} />
    </SafeAreaView>
  );
}
