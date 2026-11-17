import { Alert, Pressable, View } from "react-native";
import {
  Bookmark,
  LayoutGrid,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabBarProps = {
  state: {
    index: number;
    routes: Array<{ name: string }>;
  };
};

export default function TabBar({ state }: TabBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const currentRoute = state.routes[state.index]?.name;

  const iconColor = (active: boolean) => (active ? "#3DDC84" : "#C9C4B8");

  return (
    <View
      pointerEvents="box-none"
      className="absolute left-4 right-4 h-[72px]"
      style={{ bottom: insets.bottom + 16 }}
    >
      <View className="h-[72px] flex-row items-center justify-between rounded-full bg-light-bar px-4 dark:bg-dark-bar">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Library"
          onPress={() => router.replace("/(tabs)/home")}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <LayoutGrid
            color={iconColor(currentRoute === "home")}
            size={24}
            strokeWidth={1.9}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search"
          onPress={() => router.replace("/(tabs)/search")}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <Search
            color={iconColor(currentRoute === "search")}
            size={24}
            strokeWidth={1.9}
          />
        </Pressable>

        <View className="h-12 w-[60px]" />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Pinned notes"
          onPress={() =>
            Alert.alert("Pinned notes", "Pinned notes are not available yet.")
          }
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <Bookmark color={iconColor(false)} size={24} strokeWidth={1.9} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={() => router.replace("/(tabs)/settings")}
          className="h-12 w-12 items-center justify-center rounded-full"
        >
          <SlidersHorizontal
            color={iconColor(currentRoute === "settings")}
            size={24}
            strokeWidth={1.9}
          />
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add note"
        onPress={() => router.push("/add")}
        className="absolute -top-[8px] left-1/2 h-[70px] w-[70px] items-center justify-center rounded-full bg-accent border-light-bg"
        style={{
          marginLeft: -30,
          shadowColor: "rgba(242,238,230,1)",
          shadowOpacity: 1,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
          elevation: 8,
          borderWidth: 6,
        }}
      >
        <Plus size={28} strokeWidth={2.4} className="text-accent-ink" />
      </Pressable>
    </View>
  );
}
