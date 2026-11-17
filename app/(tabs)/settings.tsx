import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

import Screen from "../../src/components/ui/Screen";
import SettingsGroup from "../../src/components/settings/SettingsGroup";
import SettingsRow from "../../src/components/settings/SettingsRow";
import SegmentedControl from "../../src/components/ui/SegmentedControl";
import Switch from "../../src/components/ui/Switch";
import useThemeStore from "../../src/store/themeStore";
import useSettingsStore from "../../src/store/settingsStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const { theme, setTheme } = useThemeStore();
  const { autoSync, photoQuality, setAutoSync } = useSettingsStore();
  const insets = useSafeAreaInsets();

  return (
    <Screen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 72 + 16 + 24 }}
        className="px-5"
      >
        <Text className="font-bricolage-bold text-[46px] leading-[46px] tracking-[-0.035em] text-light-fg dark:text-dark-fg">
          Settings
        </Text>
        <SettingsGroup title="ACCOUNT">
          <SettingsRow label="Signed in with" value="Google" />
          <SettingsRow label="Plan" value="Free" />
        </SettingsGroup>
        <SettingsGroup title="APPEARANCE">
          <View className="p-3">
            <SegmentedControl
              value={theme}
              onChange={setTheme}
              segments={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
                { value: "system", label: "System" },
              ]}
            />
          </View>
        </SettingsGroup>
        <SettingsGroup title="STORAGE">
          <SettingsRow
            label="Photo quality"
            value={photoQuality.toUpperCase()}
          />
          <SettingsRow
            label="Cloud backup"
            accessory={
              <Switch
                label="Cloud backup"
                value={autoSync}
                onValueChange={setAutoSync}
              />
            }
          />
        </SettingsGroup>
        <SettingsGroup title="ABOUT">
          <SettingsRow label="Version" value="1.0.0" />
          <SettingsRow
            label="Terms and Privacy"
            accessory={<ChevronRight size={20} className="text-light-muted dark:text-dark-muted" />}
          />
        </SettingsGroup>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log out"
          onPress={() => Alert.alert("Log out", "Authentication is not connected yet.")}
          className="h-[48px] items-center justify-center rounded-full border border-light-dangerLine dark:border-dark-dangerLine"
        >
          <Text className="font-bricolage-bold text-[16px] text-light-danger dark:text-dark-danger">
            Log out
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
