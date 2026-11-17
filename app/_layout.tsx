import { View } from "react-native";
import "../global.css";
import { Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import * as SplashScreen from "expo-splash-screen";
import {
  BricolageGrotesque_500Medium,
  BricolageGrotesque_700Bold,
  useFonts as useBricolageGrotesqueFonts,
} from "@expo-google-fonts/bricolage-grotesque";
import {
  DMMono_400Regular,
  useFonts as useDMMonoFonts,
} from "@expo-google-fonts/dm-mono";

import { SQLiteProvider } from "expo-sqlite";
import AnimatedSplash from "../src/components/AnimatedSplash";
import useThemeStore from "../src/store/themeStore";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { migrateDB } from "../src/db/migration";
import SyncManager from "../src/sync/SyncManager";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [bricolageLoaded] = useBricolageGrotesqueFonts({
    BricolageGrotesque_500Medium,
    BricolageGrotesque_700Bold,
  });
  const [dmMonoLoaded] = useDMMonoFonts({ DMMono_400Regular });
  const fontsLoaded = bricolageLoaded && dmMonoLoaded;

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
          style={{ flex: 1 }}
          onLayout={onLayout}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
              },
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="camera" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ headerShown: false }} />
            <Stack.Screen
              name="add"
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
              }}
            />
            <Stack.Screen name="note/[id]" options={{ headerShown: false }} />
          </Stack>

          {showSplash && (
            <AnimatedSplash onFinish={() => setShowSplash(false)} />
          )}
        </View>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}
