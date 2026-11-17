import { Text, TextInput, TextInputProps } from "react-native";

type FieldProps = TextInputProps & {
  label: string;
};

export default function Field({ label, ...props }: FieldProps) {
  return (
    <>
      <Text className="mb-2 font-mono text-[11px] uppercase text-light-muted dark:text-dark-muted">
        {label}
      </Text>
      <TextInput
        {...props}
        className={`h-[52px] rounded-[18px] border border-light-line bg-light-card px-4 font-bricolage-medium text-[16px] text-light-fg dark:border-dark-line dark:bg-dark-card dark:text-dark-fg ${
          props.className ?? ""
        }`}
      />
    </>
  );
}
