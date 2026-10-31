import { View } from "react-native";
import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import * as SplashScreen from "expo-splash-screen";

import { SQLiteProvider } from "expo-sqlite";
import AnimatedSplash from "../src/components/AnimatedSplash";
import useThemeStore from "../src/store/themeStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { migrateDB } from "../src/db/migration";
import SyncManager from "../src/sync/SyncManager";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("../assets/fonts/Inter_24pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_24pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_24pt-Bold.ttf"),
  });

  const theme = useThemeStore((state) => state.theme);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const [showSplash, setShowSplash] = useState(true);

  const onLayout = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="SnapNoteDB" onInit={migrateDB}>
      <SafeAreaProvider>
        <SyncManager />
        <View
          style={{ flex: 1, backgroundColor: "#0A0A0A" }}
          onLayout={onLayout}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#000000",
              },
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>

          {showSplash && (
            <AnimatedSplash onFinish={() => setShowSplash(false)} />
          )}
        </View>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
