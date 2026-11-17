import { ReactNode } from "react";
import { Pressable, ViewStyle } from "react-native";

type IconButtonProps = {
  children: ReactNode;
  onPress: () => void;
  label: string;
  overlay?: boolean;
  className?: string;
  style?: ViewStyle;
};

export default function IconButton({
  children,
  onPress,
  label,
  overlay = false,
  className = "",
  style,
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className={`h-[44px] w-[44px] items-center justify-center rounded-full ${
        overlay ? "" : "bg-light-card dark:bg-dark-card"
      } ${className}`}
      style={overlay ? [{ backgroundColor: "rgba(15,16,13,.55)" }, style] : style}
    >
      {children}
    </Pressable>
  );
}
