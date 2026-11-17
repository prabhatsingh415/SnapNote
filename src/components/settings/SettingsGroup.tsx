import { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsGroupProps = {
  title: string;
  children: ReactNode;
};

export default function SettingsGroup({ title, children }: SettingsGroupProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-mono text-[11px] text-light-muted dark:text-dark-muted">{title}</Text>
      <View className="overflow-hidden rounded-[20px] bg-light-card dark:bg-dark-card">
        {children}
      </View>
    </View>
  );
}
