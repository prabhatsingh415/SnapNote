import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Polygon,
  Rect,
} from "react-native-svg";

const ACCENT = "#3DDC84";
const ACCENT_FOLD = "#1F9C58";
const SCREEN_BG = { light: "#F2EEE6", dark: "#0F100D" } as const;
const SHADOW = {
  light: "rgba(22,21,15,0.12)",
  dark: "rgba(255,255,255,0.08)",
} as const;

const VIEWBOX = { x: 128, y: 104, w: 256, h: 304 };
const FLOAT_DISTANCE = 10;
const HALF_CYCLE_MS = 1800;

type EmptyIllustrationProps = {
  size?: number;
  scheme: "light" | "dark";
};

export default function EmptyIllustration({
  size = 140,
  scheme,
}: EmptyIllustrationProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      progress.setValue(0);
      return;
    }
    const half = (toValue: number) =>
      Animated.timing(progress, {
        toValue,
        duration: HALF_CYCLE_MS,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      });
    const loop = Animated.loop(Animated.sequence([half(1), half(0)]));
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -FLOAT_DISTANCE],
  });
  const shadowScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.82],
  });

  const cutout = SCREEN_BG[scheme];
  const height = (size * VIEWBOX.h) / VIEWBOX.w;

  return (
    <View
      className="items-center"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Svg
          width={size}
          height={height}
          viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
        >
          <Defs>
            <ClipPath id="snapnote-empty-window">
              <Rect x={164} y={212} width={184} height={104} rx={18} />
            </ClipPath>
          </Defs>

          <Path
            d="M172 112H306L376 182V364a36 36 0 0 1-36 36H172a36 36 0 0 1-36-36V148a36 36 0 0 1 36-36Z"
            fill={ACCENT}
          />
          <Path d="M306 112V146a36 36 0 0 0 36 36H376Z" fill={ACCENT_FOLD} />

          <Rect x={164} y={152} width={84} height={14} rx={7} fill={cutout} />
          <Rect
            x={164}
            y={340}
            width={150}
            height={13}
            rx={6.5}
            fill={cutout}
          />
          <Rect x={164} y={364} width={96} height={13} rx={6.5} fill={cutout} />

          <Rect
            x={164}
            y={212}
            width={184}
            height={104}
            rx={18}
            fill={cutout}
          />
          <G clipPath="url(#snapnote-empty-window)">
            <Circle cx={308} cy={240} r={13} fill={ACCENT} />
            <Polygon
              points="150,304 214,248 252,276 282,262 370,304"
              fill={ACCENT}
            />
          </G>
        </Svg>
      </Animated.View>

      <Animated.View
        style={{
          width: size * 0.5,
          height: 10,
          marginTop: 12,
          borderRadius: 5,
          backgroundColor: SHADOW[scheme],
          transform: [{ scaleX: shadowScale }],
        }}
      />
    </View>
  );
}
