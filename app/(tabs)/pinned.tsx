import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PhotoGrid from "../../src/components/photo/PhotoGrid";
import Screen from "../../src/components/ui/Screen";
import { useNotes } from "../../src/db/useNotes";
import { Note } from "../../src/types/note";
import { filterPinned } from "../../src/utils/filterPinned";

export default function PinnedNotes() {
  const { getNotes } = useNotes();
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const pinnedNotes = filterPinned(notes);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getNotes().then((data) => {
        setNotes(data);
        setLoading(false);
      });
    }, [getNotes]),
  );

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 72 + 16 + 24,
        }}
      >
        <View className="px-5">
          <Text className="font-bricolage-bold text-[46px] leading-[46px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
            Pinned
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator className="mt-10 text-light-fg dark:text-dark-fg" />
        ) : pinnedNotes.length > 0 ? (
          <PhotoGrid notes={pinnedNotes} />
        ) : (
          <View className="flex-1 items-center justify-center px-5">
            <Text className="text-center font-bricolage-bold text-[28px] text-light-fg dark:text-dark-fg">
              No pinned notes yet
            </Text>
            <Text className="mt-3 text-center font-bricolage-medium text-[16px] leading-6 text-light-muted dark:text-dark-muted">
              Open a note and tap the bookmark to pin it.
            </Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
