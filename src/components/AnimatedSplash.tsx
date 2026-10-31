import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import useThemeStore from "../store/themeStore";

type AnimatedSplashProps = {
  onFinish?: () => void;
  duration?: number;
};

export default function AnimatedSplash({
  onFinish,
  duration = 2600,
}: AnimatedSplashProps) {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === "dark";

  const iconScale = useRef(new Animated.Value(0.5)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconTilt = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(16)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;

  const dots = useRef([0, 1, 2].map(() => new Animated.Value(0.25))).current;

  useEffect(() => {
    // 1. Icon pops in with a small tilt
    // 2. Name slides up
    // 3. Tagline fades in
    Animated.sequence([
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),

        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),

        Animated.spring(iconTilt, {
          toValue: 1,
          friction: 4,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(titleY, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(tagOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Loading dots pulse
    const pulse = Animated.loop(
      Animated.stagger(
        160,
        dots.map((d) =>
          Animated.sequence([
            Animated.timing(d, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),

            Animated.timing(d, {
              toValue: 0.25,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        )
      )
    );

    pulse.start();

    // Fade out and finish
    const timer = setTimeout(() => {
      Animated.timing(exitOpacity, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(() => {
        pulse.stop();
        onFinish?.();
      });
    }, duration);

    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, [
    duration,
    onFinish,
    dots,
    exitOpacity,
    iconOpacity,
    iconScale,
    iconTilt,
    tagOpacity,
    titleOpacity,
    titleY,
  ]);

  const rotate = iconTilt.interpolate({
    inputRange: [0, 1],
    outputRange: ["-12deg", "0deg"],
  });

  const colors = isDark
    ? {
        bg: "#121110",
        text: "#EDEDEA",
        muted: "#66625E",
        brand: "#1E834F",
      }
    : {
        bg: "#FAF9F5",
        text: "#1C1917",
        muted: "#A39E98",
        brand: "#0F5132",
      };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: exitOpacity,
          backgroundColor: colors.bg,
        },
      ]}
    >
      <View style={styles.center}>
        <Animated.Image
          source={require("../assets/splash-icon.png")}
          style={[
            styles.icon,
            {
              opacity: iconOpacity,
              transform: [{ scale: iconScale }, { rotate }],
            },
          ]}
          resizeMode="contain"
        />

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleY }],
              color: colors.text,
            },
          ]}
        >
          Snapnote
        </Animated.Text>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: tagOpacity,
              color: colors.muted,
            },
          ]}
        >
          Notes, with the picture.
        </Animated.Text>
      </View>

      <View style={styles.dots}>
        {dots.map((d, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                opacity: d,
                backgroundColor: colors.brand,
              },
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    alignItems: "center",
    marginTop: -40,
  },

  icon: {
    width: 144,
    height: 144,
    marginBottom: 28,
  },

  title: {
    fontSize: 44,
    fontWeight: "700",
    letterSpacing: -1,
  },

  tagline: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },

  dots: {
    position: "absolute",
    bottom: 72,
    flexDirection: "row",
    gap: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
