import { View, Pressable, Text } from "react-native";
import { House, Settings, Plus } from "lucide-react-native";
import { useRouter } from "expo-router";
import useThemeStore from "../../store/themeStore";

type CustomTabBarProps = {
  state: any;
};

export default function CustomTabBar({ state }: CustomTabBarProps) {
  const router = useRouter();

  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const colors = isDark
    ? {
        surface: "#1E1C1A",
        border: "#2E2B29",
        muted: "#66625E",
        brand: "#1E834F",
      }
    : {
        surface: "#FFFFFF",
        border: "#E9E6DF",
        muted: "#A39E98",
        brand: "#0F5132",
      };

  const currentRoute = state.routes[state.index]?.name;

  return (
    <View
      className="absolute bottom-0 left-0 right-0 pb-3"
      pointerEvents="box-none"
    >
      <View
        className="h-[110px] flex-row items-center justify-between rounded-[28px] border px-8"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {/* HOME */}
        <Pressable
          onPress={() => router.push("/(tabs)/home")}
          className="items-center justify-center"
        >
          <House
            size={22}
            color={currentRoute === "home" ? colors.brand : colors.muted}
            strokeWidth={2.2}
          />

          <Text
            className="mt-1 text-[11px] font-semibold"
            style={{
              color: currentRoute === "home" ? colors.brand : colors.muted,
              fontFamily: "Inter-SemiBold",
            }}
          >
            Home
          </Text>
        </Pressable>

        {/* CREATE */}
        <Pressable
          onPress={() => router.push("/(tabs)/create")}
          className="absolute top-4 h-16 w-16 items-center justify-center rounded-full"
          style={{
            left: "59%",
            marginLeft: -28,
            backgroundColor: colors.brand,
            elevation: 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: {
              width: 0,
              height: 4,
            },
          }}
        >
          <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
        </Pressable>

        {/* SETTINGS */}
        <Pressable
          onPress={() => router.push("/(tabs)/settings")}
          className="items-center justify-center"
        >
          <Settings
            size={22}
            color={currentRoute === "settings" ? colors.brand : colors.muted}
            strokeWidth={2.2}
          />

          <Text
            className="mt-1 text-[11px] font-semibold"
            style={{
              color: currentRoute === "settings" ? colors.brand : colors.muted,
              fontFamily: "Inter-SemiBold",
            }}
          >
            Settings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
