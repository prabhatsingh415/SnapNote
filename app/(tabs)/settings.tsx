import React, { useState } from "react";
import { Pressable, ScrollView, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronRight, RefreshCw } from "lucide-react-native";
import AppText from "../../components/general/AppText";
import useThemeStore from "../../src/store/themeStore";

const Settings = () => {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useThemeStore();

  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [saveToGallery, setSaveToGallery] = useState(false);
  const [compress, setCompress] = useState(true);
  const [appLock, setAppLock] = useState(false);
  const [hidePreview, setHidePreview] = useState(false);

  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg">
      <AppText
        className="p-8 mt-8 text-[22px] leading-[28px] text-light-text dark:text-dark-text"
        style={{ fontFamily: "Inter-Bold" }}
      >
        Settings
      </AppText>
      <ScrollView
        className="flex-1 px-4 mb-20"
        contentContainerStyle={{
          //paddingTop: insets.top + 2,
          paddingBottom: 32 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="ACCOUNT">
          <SettingsRow label="Profile" onPress={() => {}} />
          <SettingsRow
            label="Dark mode"
            toggle={{ value: theme === "dark", onChange: toggleTheme }}
          />
        </SettingsSection>

        <SettingsSection title="CAMERA & PHOTOS">
          <SettingsRow
            label="Save copy to gallery"
            toggle={{ value: saveToGallery, onChange: setSaveToGallery }}
          />
          <SettingsRow
            label="Compress photos"
            toggle={{ value: compress, onChange: setCompress }}
          />
          <SettingsRow
            label="Photo quality"
            rightText="High"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="STORAGE">
          <SettingsRow
            label="Photo library"
            rightText="344MB free"
            onPress={() => {}}
          />
          <SettingsRow
            label="Clear cache"
            rightText="12MB"
            onPress={() => {}}
          />
        </SettingsSection>

        <SettingsSection title="SYNC">
          <SettingsRow
            label="Auto sync"
            toggle={{ value: autoSync, onChange: setAutoSync }}
          />
          <SettingsRow
            label="Sync on Wi-Fi only"
            toggle={{ value: wifiOnly, onChange: setWifiOnly }}
          />
          <SettingsRow
            label="Sync status"
            rightText="Up to date"
            onPress={() => {}}
          />
          <SettingsRow label="Sync now" showSyncIcon onPress={() => {}} />
        </SettingsSection>

        <SettingsSection title="BACKUP & DATA">
          <SettingsRow label="Export notes" onPress={() => {}} />
          <SettingsRow label="Import from backup" onPress={() => {}} />
        </SettingsSection>

        <SettingsSection title="PRIVACY & SECURITY">
          <SettingsRow
            label="App lock (Face ID / PIN)"
            toggle={{ value: appLock, onChange: setAppLock }}
          />
          <SettingsRow
            label="Hide previews in app switcher"
            toggle={{ value: hidePreview, onChange: setHidePreview }}
          />
        </SettingsSection>

        <SettingsSection title="SUPPORT">
          <SettingsRow label="Help center" onPress={() => {}} />
          <SettingsRow
            label="About SnapNote"
            rightText="v1.0.0"
            onPress={() => {}}
          />
        </SettingsSection>

        <Pressable
          className="self-start rounded-[8px] border border-red-300 bg-red-50 px-4 py-2 active:opacity-70 dark:border-red-900 dark:bg-red-950"
          onPress={() => {}}
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
  toggle?: { value: boolean; onChange: (v: boolean) => void };
};

const SettingsRow = ({
  label,
  rightText,
  showSyncIcon,
  onPress,
  toggle,
}: SettingsRowProps) => {
  const isDark = useThemeStore((s) => s.theme) === "dark";
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
          style={{ transform: [{ scale: 0.8 }] }}
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
