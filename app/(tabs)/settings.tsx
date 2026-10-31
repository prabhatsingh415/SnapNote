import React from "react";
import { Alert, Pressable, ScrollView, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight, RefreshCw } from "lucide-react-native";

import AppText from "../../src/components/general/AppText";
import useThemeStore from "../../src/store/themeStore";
import useSettingsStore from "../../src/store/settingsStore";
import { useSync } from "../../src/sync/useSync";

const Settings = () => {
  const insets = useSafeAreaInsets();

  const { theme, toggleTheme } = useThemeStore();

  const {
    autoSync,
    wifiOnly,
    saveToGallery,
    compressPhotos,
    photoQuality,
    setAutoSync,
    setWifiOnly,
    setSaveToGallery,
    setCompressPhotos,
    setPhotoQuality,
  } = useSettingsStore();

  const { sync, canSync } = useSync();

  const handlePhotoQuality = () => {
    Alert.alert("Photo quality", "Choose the quality for captured photos.", [
      {
        text: "High",
        onPress: () => setPhotoQuality("high"),
      },
      {
        text: "Medium",
        onPress: () => setPhotoQuality("medium"),
      },
      {
        text: "Low",
        onPress: () => setPhotoQuality("low"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const handleSyncNow = async () => {
    if (!canSync) {
      Alert.alert(
        "Cannot sync",
        wifiOnly
          ? "Internet is unavailable or Wi-Fi is required."
          : "Internet is unavailable."
      );

      return;
    }

    await sync();

    Alert.alert("Sync complete", "Your pending changes have been synced.");
  };

  const handleSignOut = () => {
    Alert.alert("Sign out", "Authentication is not connected yet.", [
      { text: "OK" },
    ]);
  };

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg">
      <AppText
        className="mt-8 p-8 text-[22px] leading-[28px] text-light-text dark:text-dark-text"
        style={{ fontFamily: "Inter-Bold" }}
      >
        Settings
      </AppText>

      <ScrollView
        className="mb-20 flex-1 px-4"
        contentContainerStyle={{
          paddingBottom: 32 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="ACCOUNT">
          <SettingsRow
            label="Profile"
            onPress={() =>
              Alert.alert(
                "Profile",
                "Profile settings will be available after authentication."
              )
            }
          />

          <SettingsRow
            label="Dark mode"
            toggle={{
              value: theme === "dark",
              onChange: toggleTheme,
            }}
          />
        </SettingsSection>

        <SettingsSection title="CAMERA & PHOTOS">
          <SettingsRow
            label="Save copy to gallery"
            toggle={{
              value: saveToGallery,
              onChange: setSaveToGallery,
            }}
          />

          <SettingsRow
            label="Compress photos"
            toggle={{
              value: compressPhotos,
              onChange: setCompressPhotos,
            }}
          />

          <SettingsRow
            label="Photo quality"
            rightText={
              photoQuality.charAt(0).toUpperCase() + photoQuality.slice(1)
            }
            onPress={handlePhotoQuality}
          />
        </SettingsSection>

        <SettingsSection title="STORAGE">
          <SettingsRow
            label="Photo library"
            rightText="Coming soon"
            onPress={() =>
              Alert.alert(
                "Storage",
                "Detailed storage usage will be added with the cache manager."
              )
            }
          />

          <SettingsRow
            label="Clear cache"
            rightText="Coming soon"
            onPress={() =>
              Alert.alert(
                "Clear cache",
                "Cache management will be enabled after the image cache layer is added."
              )
            }
          />
        </SettingsSection>

        <SettingsSection title="SYNC">
          <SettingsRow
            label="Auto sync"
            toggle={{
              value: autoSync,
              onChange: setAutoSync,
            }}
          />

          <SettingsRow
            label="Sync on Wi-Fi only"
            toggle={{
              value: wifiOnly,
              onChange: setWifiOnly,
            }}
          />

          <SettingsRow
            label="Sync status"
            rightText={canSync ? "Ready" : "Offline"}
            onPress={() =>
              Alert.alert(
                "Sync status",
                canSync
                  ? "SnapNote can currently sync."
                  : "SnapNote cannot currently sync."
              )
            }
          />

          <SettingsRow label="Sync now" showSyncIcon onPress={handleSyncNow} />
        </SettingsSection>

        <SettingsSection title="BACKUP & DATA">
          <SettingsRow
            label="Export notes"
            onPress={() =>
              Alert.alert(
                "Export notes",
                "Export will be implemented with the backup system."
              )
            }
          />

          <SettingsRow
            label="Import from backup"
            onPress={() =>
              Alert.alert(
                "Import backup",
                "Import will be implemented with the backup system."
              )
            }
          />
        </SettingsSection>

        <SettingsSection title="PRIVACY & SECURITY">
          <SettingsRow
            label="App lock (Face ID / PIN)"
            rightText="Coming soon"
            onPress={() =>
              Alert.alert(
                "App lock",
                "This will be implemented using native device authentication."
              )
            }
          />

          <SettingsRow
            label="Hide previews in app switcher"
            rightText="Coming soon"
            onPress={() =>
              Alert.alert(
                "Hide preview",
                "This will be implemented with AppState/native screen protection."
              )
            }
          />
        </SettingsSection>

        <SettingsSection title="SUPPORT">
          <SettingsRow
            label="Help center"
            onPress={() =>
              Alert.alert(
                "Help center",
                "Help center will be added before release."
              )
            }
          />

          <SettingsRow
            label="About SnapNote"
            rightText="v1.0.0"
            onPress={() =>
              Alert.alert(
                "SnapNote",
                "Offline-first notes with photo capture and cloud sync."
              )
            }
          />
        </SettingsSection>

        <Pressable
          className="self-start rounded-[8px] border border-red-300 bg-red-50 px-4 py-2 active:opacity-70 dark:border-red-900 dark:bg-red-950"
          onPress={handleSignOut}
        >
          <AppText
            className="text-[12px] leading-[16px] text-red-500 dark:text-red-400"
            style={{ fontFamily: "Inter-Medium" }}
          >
            Sign Out
          </AppText>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const SettingsSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View className="mb-4 rounded-[12px] border border-light-border bg-light-surface px-3 py-2.5 dark:border-dark-border dark:bg-dark-surface">
    <AppText
      className="mb-1 text-[11px] leading-[14px] tracking-[0.4px] text-light-textMuted dark:text-dark-textMuted"
      style={{ fontFamily: "Inter-Medium" }}
    >
      {title}
    </AppText>

    {children}
  </View>
);

type SettingsRowProps = {
  label: string;
  rightText?: string;
  showSyncIcon?: boolean;
  onPress?: () => void;
  toggle?: {
    value: boolean;
    onChange: (value: boolean) => void;
  };
};

const SettingsRow = ({
  label,
  rightText,
  showSyncIcon,
  onPress,
  toggle,
}: SettingsRowProps) => {
  const isDark = useThemeStore((state) => state.theme) === "dark";

  const iconColor = isDark ? "#66625E" : "#A39E98";

  const Icon = showSyncIcon ? RefreshCw : ChevronRight;

  return (
    <Pressable
      onPress={toggle ? () => toggle.onChange(!toggle.value) : onPress}
      className="min-h-[36px] flex-row items-center justify-between py-1.5 active:opacity-60"
    >
      <AppText className="flex-1 pr-3 text-[13px] leading-[18px] text-light-textSecondary dark:text-dark-textSecondary">
        {label}
      </AppText>

      {toggle ? (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onChange}
          trackColor={{
            false: isDark ? "#2E2B29" : "#E9E6DF",
            true: isDark ? "#1E834F" : "#0F5132",
          }}
          thumbColor="#FFFFFF"
          style={{
            transform: [{ scale: 0.8 }],
          }}
        />
      ) : (
        <View className="flex-row items-center gap-1.5">
          {rightText ? (
            <AppText className="text-[12px] leading-[16px] text-light-textMuted dark:text-dark-textMuted">
              {rightText}
            </AppText>
          ) : null}

          <Icon size={14} color={iconColor} strokeWidth={1.8} />
        </View>
      )}
    </Pressable>
  );
};

export default Settings;
