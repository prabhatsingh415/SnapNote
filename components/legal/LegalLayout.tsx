import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className={`mb-7`}>
      <View className={`mb-2 flex-row items-center`}>
        <Text
          className={`mr-3 font-inter-semibold text-[12px] text-light-brand dark:text-dark-brand`}
        >
          {number}
        </Text>

        <Text
          className={`flex-1 font-inter-semibold text-[16px] leading-[22px] text-light-text dark:text-dark-text`}
        >
          {title}
        </Text>
      </View>

      <Text
        className={`font-inter text-[13px] leading-[21px] text-light-textSecondary dark:text-dark-textSecondary`}
      >
        {children}
      </Text>
    </View>
  );
}

type LegalScreenProps = {
  title: string;
  heading: string;
  intro: string;
  footerNote: string;
  children: React.ReactNode;
};

export default function LegalScreen({
  title,
  heading,
  intro,
  footerNote,
  children,
}: LegalScreenProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-light-bg dark:bg-dark-bg`}
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View
        className={`flex-row items-center border-b border-light-border px-[18px] py-4 dark:border-dark-border`}
      >
        <Pressable
          onPress={() => router.back()}
          className={`h-10 w-10 items-center justify-center rounded-full bg-light-surface dark:bg-dark-surface`}
          hitSlop={8}
        >
          <ArrowLeft
            size={20}
            strokeWidth={2.2}
            className={`text-light-text dark:text-dark-text`}
          />
        </Pressable>

        <Text
          className={`ml-3 font-inter-semibold text-[17px] text-light-text dark:text-dark-text`}
        >
          {title}
        </Text>
      </View>

      <ScrollView
        className={`flex-1`}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 28,
          paddingBottom: insets.bottom + 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          className={`font-inter-bold text-[28px] leading-[34px] text-light-text dark:text-dark-text`}
        >
          {heading}
        </Text>

        <Text
          className={`mt-3 font-inter text-[13px] leading-[20px] text-light-textSecondary dark:text-dark-textSecondary`}
        >
          {intro}
        </Text>

        <View
          className={`mt-5 rounded-2xl border border-light-border bg-light-surface px-4 py-3 dark:border-dark-border dark:bg-dark-surface`}
        >
          <Text
            className={`font-inter text-[11px] text-light-textMuted dark:text-dark-textMuted`}
          >
            Last updated
          </Text>

          <Text
            className={`mt-1 font-inter-semibold text-[13px] text-light-text dark:text-dark-text`}
          >
            October 2026
          </Text>
        </View>

        <View className={`mt-8`}>{children}</View>

        <Text
          className={`mt-2 text-center font-inter text-[11px] leading-[17px] text-light-textMuted dark:text-dark-textMuted`}
        >
          {footerNote}
        </Text>
      </ScrollView>
    </View>
  );
}
