import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useThemeStore from "../../src/store/themeStore";
import { XLogo } from "../../src/components/auth/XLogo";
import { GoogleLogo } from "../../src/components/auth/GoogleLogo";
import { useColorScheme as useDeviceColorScheme } from "react-native";

export default function AuthScreen() {
  const router = useRouter();
  const selectedTheme = useThemeStore((state) => state.theme);
  const deviceTheme = useDeviceColorScheme();

  const theme =
    selectedTheme === "system" ? (deviceTheme ?? "dark") : selectedTheme;

  return (
    <SafeAreaView className="flex-1 bg-light-bg dark:bg-dark-bg">
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <Image
        source={
          theme === "dark"
            ? require("../../assets/logo-dark-mode.png")
            : require("../../assets/logo-light-mode.png")
        }
        resizeMode="contain"
        className="h-[40px] w-[150px] ml-5"
      />

      <View className="mt-[8px] h-[340px] flex-row gap-[10px] px-5">
        <View className="mt-[40px] h-[280px] flex-1 overflow-hidden rounded-[20px]">
          <Image
            source={require("../../assets/onboarding/welcome-1.jpg")}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
          />
        </View>
        <View className="h-[320px] flex-1 overflow-hidden rounded-[20px]">
          <Image
            source={require("../../assets/onboarding/welcome-2.jpg")}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
          />
        </View>
        <View className="mt-[70px] h-[250px] flex-1 overflow-hidden rounded-[20px]">
          <Image
            source={require("../../assets/onboarding/welcome-3.jpg")}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
          />
        </View>
      </View>
      <Text className="px-6 font-bricolage-bold text-[35px] leading-[41px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
        Every photo{"\n"}has a story.
      </Text>
      <Text className="mt-2 px-6 font-bricolage-medium text-[16px] leading-[27px] text-light-muted dark:text-dark-muted">
        Capture the frame, write the story, keep it all in one place.{" "}
      </Text>
      <View className="mt-5 gap-[10px] px-6 pb-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          onPress={() => router.replace("/(tabs)/home")}
          className="h-[54px] items-center justify-start flex-row gap-8  px-12 rounded-full bg-light-fg dark:bg-dark-fg"
        >
          <GoogleLogo />
          <Text className="font-bricolage-bold text-[17px] text-light-bg dark:text-dark-bg">
            Continue with Google
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Continue with X"
          onPress={() => router.replace("/(tabs)/home")}
          className="h-[54px] items-center justify-start flex-row gap-8  px-12 rounded-full bg-accent"
        >
          <XLogo />
          <Text className="font-bricolage-bold text-[17px] text-accent-ink">
            Continue with X
          </Text>
        </Pressable>
        <View className="mt-1 items-center px-5">
          <Text className="text-center font-mono text-[10px] leading-[16px] text-light-muted dark:text-dark-muted">
            By continuing you accept the and
          </Text>

          <View className="flex-row items-center">
            <Pressable onPress={() => router.push("/legal/terms")}>
              <Text className="font-mono text-[10px] leading-[16px] text-light-muted underline dark:text-dark-muted">
                Terms
              </Text>
            </Pressable>
            <Text className="font-mono text-[10px] leading-[16px] text-light-muted dark:text-dark-muted">
              {" and "}
            </Text>
            <Pressable onPress={() => router.push("/legal/privacy")}>
              <Text className="font-mono text-[10px] leading-[16px] text-light-muted underline dark:text-dark-muted">
                Privacy Policy
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
