import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: ReactNode;
  className?: string;
};

export default function Screen({ children, className = "" }: ScreenProps) {
  return (
    <SafeAreaView className={`flex-1 bg-light-bg dark:bg-dark-bg ${className}`}>
      {children}
    </SafeAreaView>
  );
}
