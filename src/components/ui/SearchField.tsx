import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { Search, X } from "lucide-react-native";

type SearchFieldProps = Pick<
  TextInputProps,
  "autoFocus" | "onChangeText" | "value"
> & {
  className?: string;
};

export default function SearchField({
  autoFocus,
  className = "",
  onChangeText,
  value,
}: SearchFieldProps) {
  return (
    <View
      className={`h-[52px] flex-row items-center rounded-[26px] border border-light-line bg-light-card px-1 dark:border-dark-line dark:bg-dark-card ${className}`}
    >
      <Search
        size={20}
        strokeWidth={1.9}
        className="ml-3 text-light-muted dark:text-dark-muted"
      />
      <TextInput
        accessibilityLabel="Search your notes"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        placeholder="Search your notes"
        returnKeyType="search"
        value={value}
        className="h-full flex-1 px-3 font-bricolage-medium text-[16px] text-light-fg placeholder:text-light-muted dark:text-dark-fg dark:placeholder:text-dark-muted"
      />
      {value ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText?.("")}
          className="h-11 w-11 items-center justify-center rounded-full"
        >
          <X
            size={18}
            strokeWidth={1.9}
            className="text-light-muted dark:text-dark-muted"
          />
        </Pressable>
      ) : null}
    </View>
  );
}
