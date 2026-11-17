import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type SettingsRowProps = {
  label: string;
  value?: string;
  accessory?: ReactNode;
  onPress?: () => void;
};

export default function SettingsRow({
  label,
  value,
  accessory,
  onPress,
}: SettingsRowProps) {
  const content = (
    <>
      <Text className="font-bricolage-bold text-[20px] text-light-fg dark:text-dark-fg">{label}</Text>
      {accessory ?? (
        <Text className="font-mono text-[12px] text-light-muted dark:text-dark-muted">{value}</Text>
      )}
    </>
  );

  if (!onPress) {
    return (
      <View className="min-h-[48px] flex-row items-center justify-between border-b border-light-line px-5 dark:border-dark-line">
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="min-h-[48px] flex-row items-center justify-between border-b border-light-line px-5 dark:border-dark-line"
    >
      {content}
    </Pressable>
  );
}
