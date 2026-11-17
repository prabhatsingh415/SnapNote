import { Text, TextInput, TextInputProps } from "react-native";

type TextAreaProps = TextInputProps & {
  label: string;
};

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <>
      <Text className="mb-2 font-mono text-[11px] uppercase text-light-muted dark:text-dark-muted">
        {label}
      </Text>
      <TextInput
        {...props}
        multiline
        textAlignVertical="top"
        className={`h-[104px] rounded-[18px] border border-light-line bg-light-card px-4 py-3 font-bricolage-medium text-[16px] leading-6 text-light-fg dark:border-dark-line dark:bg-dark-card dark:text-dark-fg ${
          props.className ?? ""
        }`}
      />
    </>
  );
}
