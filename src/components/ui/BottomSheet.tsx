import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type BottomSheetProps = {
  visible: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function BottomSheet({
  visible,
  title,
  subtitle,
  onClose,
  children,
}: BottomSheetProps) {
  if (!visible) return null;

  return (
    <View
      className="flex-1 justify-end mb-8"
      style={{ backgroundColor: "rgba(8,9,7,.55)" }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close add sheet"
        className="flex-1"
        onPress={onClose}
      />
      <View className="rounded-t-[32px] bg-light-sheet px-5 pb-8 pt-3 dark:bg-dark-sheet">
        <View className="mx-auto mb-4 h-1 w-10 rounded-full bg-light-line dark:bg-dark-line" />
        {title ? (
          <Text className="font-bricolage-bold text-[26px] tracking-[-0.02em] text-light-fg dark:text-dark-fg">
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text className="mt-2 font-bricolage-medium text-[16px] leading-6 text-light-muted dark:text-dark-muted">
            {subtitle}
          </Text>
        ) : null}
        <View className="mt-5">{children}</View>
      </View>
    </View>
  );
}
