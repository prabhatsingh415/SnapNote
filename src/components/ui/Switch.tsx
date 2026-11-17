import { Pressable, View } from "react-native";

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
};

export default function Switch({ value, onValueChange, label }: SwitchProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      className={`h-[32px] w-[52px] justify-center rounded-full ${
        value ? "bg-accent" : "bg-light-card dark:bg-dark-card"
      }`}
    >
      <View
        className={`h-[26px] w-[26px] rounded-full bg-white ${
          value ? "ml-[23px]" : "ml-[3px]"
        }`}
      />
    </Pressable>
  );
}
