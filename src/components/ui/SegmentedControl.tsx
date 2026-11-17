import { Pressable, Text, View } from "react-native";

type Segment<T extends string> = {
  value: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <View className="h-[52px] flex-row rounded-[16px] bg-light-card p-1 dark:bg-dark-card">
      {segments.map((segment) => (
        <Pressable
          key={segment.value}
          accessibilityRole="button"
          accessibilityLabel={segment.label}
          onPress={() => onChange(segment.value)}
          className={`flex-1 items-center justify-center rounded-[14px] ${
            value === segment.value ? "bg-light-fg dark:bg-dark-fg" : ""
          }`}
        >
          <Text
            className={`font-bricolage-bold text-[16px] ${
              value === segment.value
                ? "text-light-bg dark:text-dark-bg"
                : "text-light-fg dark:text-dark-fg"
            }`}
          >
            {segment.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
