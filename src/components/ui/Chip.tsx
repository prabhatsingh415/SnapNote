import { Pressable, Text } from "react-native";

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-[44px] items-center justify-center rounded-full px-4 ${
        selected
          ? "bg-light-fg dark:bg-dark-fg"
          : "bg-light-card dark:bg-dark-card"
      }`}
    >
      <Text
        className={`text-[14px] font-medium ${
          selected
            ? "text-light-bg dark:text-dark-bg"
            : "text-light-fg dark:text-dark-fg"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
