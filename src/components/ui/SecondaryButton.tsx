import { Pressable, Text } from "react-native";

type SecondaryButtonProps = {
  label: string;
  onPress: () => void;
  danger?: boolean;
  className?: string;
};

export default function SecondaryButton({
  label,
  onPress,
  danger = false,
  className = "",
}: SecondaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-[52px] items-center justify-center rounded-full border ${
        danger
          ? "border-light-dangerLine dark:border-dark-dangerLine"
          : "border-light-line dark:border-dark-line"
      } ${className}`}
    >
      <Text
        className={`font-bricolage-bold text-[16px] ${
          danger
            ? "text-light-danger dark:text-dark-danger"
            : "text-light-muted dark:text-dark-muted"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
