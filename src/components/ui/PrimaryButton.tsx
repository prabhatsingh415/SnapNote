import { Pressable, Text } from "react-native";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  className?: string;
};

export default function PrimaryButton({
  label,
  onPress,
  className = "",
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-[56px] items-center justify-center rounded-full bg-accent px-5 ${className}`}
    >
      <Text className="font-bricolage-bold text-[16px] text-accent-ink">{label}</Text>
    </Pressable>
  );
}
