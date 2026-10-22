import { NotebookPen } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { cssInterop } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import useThemeStore from "../../src/store/themeStore";

// lucide icon pe className se color lagane ke liye
cssInterop(NotebookPen, {
  className: { target: "style", nativeStyleToProp: { color: true } },
});

function GoogleLogo() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Path
        fill="#4285F4"
        d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
      />
      <Path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
      />
      <Path
        fill="#FBBC05"
        d="M6.54 13.84a5.86 5.86 0 0 1 0-3.68V7.63H3.29a9.75 9.75 0 0 0 0 8.74l3.25-2.53Z"
      />
      <Path
        fill="#EA4335"
        d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.24 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.85 9.46 6.13 12 6.13Z"
      />
    </Svg>
  );
}

function XLogo() {
  return (
    <Svg width={25} height={25} viewBox="0 0 24 24">
      <Path
        fill="#FFFFFF"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      />
    </Svg>
  );
}

export default function AuthScreen() {
  const router = useRouter();
  const theme = useThemeStore((state) => state.theme);
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-light-bg dark:bg-dark-bg`}
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <View className={`flex-1 px-[25px] pt-[28px] pb-[20px]`}>
        {/* Brand */}
        <View className={`items-start`}>
          <Text
            className={`font-inter-bold text-[22px] leading-[29px] text-light-text dark:text-dark-text`}
          >
            FieldNote
          </Text>
          <Text
            className={`mt-[1px] font-inter text-[13px] leading-[18px] text-light-textSecondary dark:text-dark-textSecondary`}
          >
            Photo notes, saved.
          </Text>
        </View>

        {/* Main */}
        <View className={`flex-1 items-center justify-center pb-[90px]`}>
          {/* App Icon */}
          <View
            className={`mb-[24px] h-[80px] w-[80px] items-center justify-center rounded-full bg-light-iconBg dark:bg-dark-iconBg`}
          >
            <NotebookPen
              size={32}
              strokeWidth={1.7}
              className={`text-light-brand dark:text-dark-brand`}
            />
          </View>

          {/* Title */}
          <Text
            className={`text-center font-inter-bold text-[24px] leading-[32px] text-light-text dark:text-dark-text`}
          >
            Sign up or log in
          </Text>

          {/* Description */}
          <Text
            className={`mt-[7px] text-center font-inter text-[14px] leading-[21px] text-light-textSecondary dark:text-dark-textSecondary`}
          >
            Add photos and notes together. One tap to save, one{"\n"}
            home for your memories.
          </Text>

          {/* Provider Buttons */}
          <View className={`mt-[24px] w-full gap-[11px]`}>
            {/* Google */}
            <Pressable
              onPress={() => router.replace("/(tabs)/home")}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
              className={`h-[58px] w-full flex-row items-center justify-center rounded-[13px] border border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface`}
            >
              <GoogleLogo />
              <Text
                className={`ml-[14px] font-inter-medium text-[15px] leading-[22px] text-light-text dark:text-dark-text`}
              >
                Continue with Google
              </Text>
            </Pressable>

            {/* X */}
            <Pressable
              onPress={() => router.replace("/(tabs)/home")}
              accessibilityRole="button"
              accessibilityLabel="Continue with X"
              className={`h-[58px] w-full flex-row items-center justify-center rounded-[13px] bg-light-brand dark:bg-dark-brand`}
            >
              <XLogo />
              <Text
                className={`ml-[14px] font-inter-medium text-[15px] leading-[22px] text-white`}
              >
                Continue with X (Twitter)
              </Text>
            </Pressable>
          </View>

          {/* Account Hint */}
          <Text
            className={`mt-[24px] text-center font-inter text-[11px] leading-[17px] text-light-textSecondary dark:text-dark-textSecondary`}
          >
            New here? We’ll create your account.{"\n"}
            Already registered? Use the same provider to log in.
          </Text>
        </View>

        {/* Footer */}
        <View className={`items-center gap-[6px]`}>
          <Text
            className={`font-inter text-[11px] leading-[17px] text-light-textMuted dark:text-dark-textMuted`}
          >
            By continuing, you agree to our
          </Text>

          <View className={`flex-row items-center gap-[7px]`}>
            <Pressable
              onPress={() => router.push("/legal/terms")}
              accessibilityRole="link"
            >
              <Text
                className={`font-inter-semibold text-[11px] leading-[17px] text-light-brand dark:text-dark-brand`}
              >
                Terms of Service
              </Text>
            </Pressable>

            <Text
              className={`font-inter text-[13px] text-light-textMuted dark:text-dark-textMuted`}
            >
              ·
            </Text>

            <Pressable
              onPress={() => router.push("/legal/privacy")}
              accessibilityRole="link"
            >
              <Text
                className={`font-inter-semibold text-[11px] leading-[17px] text-light-brand dark:text-dark-brand`}
              >
                Privacy Policy
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
