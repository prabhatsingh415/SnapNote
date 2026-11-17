import { Pressable, View } from "react-native";

type ShutterButtonProps = {
  onPress: () => void;
  disabled?: boolean;
};

export default function ShutterButton({
  onPress,
  disabled = false,
}: ShutterButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Take photo"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className="h-[76px] w-[76px] rounded-full bg-accent p-[2px]"
    >
      <View className="flex-1 items-center justify-center rounded-full bg-dark-bg p-[6px]">
        <View className="h-full w-full rounded-full bg-accent" />
      </View>
    </Pressable>
  );
}
