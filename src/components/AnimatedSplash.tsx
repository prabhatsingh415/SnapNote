import { useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";

type AnimatedSplashProps = {
  onFinish?: () => void;
  duration?: number;
};

export default function AnimatedSplash({
  onFinish,
  duration = 1600,
}: AnimatedSplashProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onFinish?.());
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish, opacity]);

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute inset-0 items-center justify-center bg-light-bg dark:bg-dark-bg"
      style={{ opacity }}
    >
      <Image
        source={require("../../assets/splash-icon.png")}
        resizeMode="contain"
        className="h-[144px] w-[144px]"
      />
      <Text className="mt-6 font-bricolage-bold text-[44px] text-light-fg dark:text-dark-fg">
        SnapNote
      </Text>
      <View className="absolute bottom-[72px] flex-row gap-[10px]">
        {[0, 1, 2].map((item) => (
          <View key={item} className="h-[10px] w-[10px] rounded-full bg-accent" />
        ))}
      </View>
    </Animated.View>
  );
}
