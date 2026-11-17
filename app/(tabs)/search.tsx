import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PhotoGrid from "../../src/components/photo/PhotoGrid";
import SearchField from "../../src/components/ui/SearchField";
import Screen from "../../src/components/ui/Screen";
import { useNotes } from "../../src/db/useNotes";
import { Note } from "../../src/types/note";

export default function Search() {
  const { getNotes } = useNotes();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const matchingNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(normalizedQuery) ||
      (note.description ?? "").toLowerCase().includes(normalizedQuery),
  );

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
      <View className="flex-1">
        <View className="px-5">
          <Text className="font-bricolage-bold text-[46px] leading-[46px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
            Search
          </Text>
          <SearchField
            value={query}
            onChangeText={setQuery}
            autoFocus
            className="mt-4"
          />
        </View>
        <ScrollView
          className="mt-5 flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + 72 + 16 + 24,
          }}
        >
          {!trimmedQuery ? (
            <View className="flex-1 items-center justify-center px-5">
              <Text className="text-center font-bricolage-medium text-[16px] text-light-muted dark:text-dark-muted">
                Search by title or description
              </Text>
            </View>
          ) : loading ? (
            <ActivityIndicator className="mt-10 text-light-fg dark:text-dark-fg" />
          ) : matchingNotes.length > 0 ? (
            <PhotoGrid notes={matchingNotes} />
          ) : (
            <View className="flex-1 items-center justify-center px-5">
              <Text className="text-center font-bricolage-medium text-[16px] text-light-muted dark:text-dark-muted">
                No notes match "{trimmedQuery}"
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}
