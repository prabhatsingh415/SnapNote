import { useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import Screen from "../../src/components/ui/Screen";
import Chip from "../../src/components/ui/Chip";
import PhotoGrid from "../../src/components/photo/PhotoGrid";
import { useNotes } from "../../src/db/useNotes";
import { Note } from "../../src/types/note";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeStore from "../../src/store/themeStore";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import EmptyIllustration from "../../src/components/ui/EmptyIllustration";
import { filterPinned } from "../../src/utils/filterPinned";

const Home = () => {
  const { getNotes } = useNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const selectedTheme = useThemeStore((state) => state.theme);
  const deviceTheme = useDeviceColorScheme();

  const theme =
    selectedTheme === "system" ? (deviceTheme ?? "light") : selectedTheme;
  const displayedNotes = filter === "Pinned" ? filterPinned(notes) : notes;

  useFocusEffect(
    useCallback(() => {
      getNotes().then((data) => {
        setNotes(data);
        setLoading(false);
      });
    }, [getNotes])
  );
  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 72 + 16 + 24 }}
      >
        <View className="px-5">
          <View className="h-[44px] flex-row items-center justify-between">
            <Image
              source={
                theme === "dark"
                  ? require("../../assets/logo-dark-mode.png")
                  : require("../../assets/logo-light-mode.png")
              }
              resizeMode="contain"
              className="h-[40px] w-[150px]"
            />

            <View className="h-[44px] w-[44px] items-center justify-center rounded-full bg-light-fg dark:bg-dark-fg">
              <Text className="font-bricolage-bold text-[16px] text-light-bg dark:text-dark-bg">
                ME
              </Text>
            </View>
          </View>
          <Text className="mt-4 font-bricolage-bold text-[46px] leading-[46px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
            Library
          </Text>
          <Text className="mt-3 font-mono text-[12px] text-light-muted dark:text-dark-muted">
            {notes.length} notes · {notes.length} photos
          </Text>
        </View>
        <View className="mt-4 flex-row gap-2 px-5 pb-4">
          {["All", "Pinned", "Recent"].map((label) => (
            <Chip
              key={label}
              label={label}
              selected={filter === label}
              onPress={() => setFilter(label)}
            />
          ))}
        </View>
        {loading ? (
          <ActivityIndicator className="mt-10 text-light-fg dark:text-dark-fg" />
        ) : filter === "Pinned" && displayedNotes.length === 0 ? (
          <View className="mt-12 flex-1 items-center justify-center px-5">
            <Text className="text-center font-bricolage-medium text-[16px] text-light-muted dark:text-dark-muted">
              No pinned notes yet
            </Text>
          </View>
        ) : displayedNotes.length > 0 ? (
          <PhotoGrid notes={displayedNotes} />
        ) : (
          <View className="mt-12 items-center px-5">
            <EmptyIllustration
              size={140}
              scheme={theme === "dark" ? "dark" : "light"}
            />

            <Text className="mt-6 text-center font-bricolage-bold text-[32px] leading-[36px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
              Your library is empty
            </Text>

            <Text className="mt-3 text-center font-bricolage-medium text-[16px] leading-6 text-light-muted dark:text-dark-muted">
              Add a photo and a line about it. It will show up here.
            </Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

export default Home;
