import { Text, TextProps } from "react-native";

export default function AppText({ children, style, ...props }: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: "inter",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
