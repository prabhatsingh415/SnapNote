import { Image, LayoutChangeEvent, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Bookmark } from "lucide-react-native";
import { Note } from "../../types/note";
import { useState } from "react";

type PhotoTileProps = {
  note: Note;
  height: number;
  onPress: () => void;
  displayNumber: number;
};

export default function PhotoTile({
  note,
  height,
  onPress,
  displayNumber,
}: PhotoTileProps) {
  const date = new Date(note.createdAt);
  const [tileHeight, setTileHeight] = useState(height);
  const [imageFailed, setImageFailed] = useState(false);
  const meta = `NO.${String(displayNumber).padStart(3, "0")} · ${String(
    date.getDate()
  ).padStart(
    2,
    "0"
  )} ${date.toLocaleString("en", { month: "short" }).toUpperCase()}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={note.title}
      onPress={onPress}
      className="overflow-hidden rounded-[20px] bg-light-card dark:bg-dark-card"
      style={{ height: tileHeight }}
      onLayout={(event: LayoutChangeEvent) => {
        const tileWidth = event.nativeEvent.layout.width;
        if (!tileWidth || !note.imageUri) return;
        Image.getSize(
          note.imageUri,
          (width, imageHeight) => {
            if (width > 0 && imageHeight > 0) {
              setTileHeight(
                Math.max(
                  110,
                  Math.min(250, Math.round((tileWidth * imageHeight) / width))
                )
              );
            }
          },
          () => undefined
        );
      }}
    >
      {note.imageUri && !imageFailed ? (
        <Image
          source={{ uri: note.imageUri }}
          resizeMode="cover"
          className="absolute inset-0 h-full w-full"
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          onError={(event) => {
            console.log("IMAGE LOAD ERROR:", event.nativeEvent.error);
            console.log("IMAGE URI:", note.imageUri);
            setImageFailed(true);
          }}
        />
      ) : null}
      {note.imageUri && !imageFailed ? (
        <LinearGradient
          colors={["transparent", "rgba(10,10,8,.74)"]}
          locations={[0.45, 1]}
          className="absolute inset-x-0 bottom-0 h-[55%]"
        />
      ) : null}
      {note.pinned ? (
        <View
          className="absolute right-3 top-3 h-7 w-7 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(15,16,13,.55)" }}
        >
          <Bookmark
            size={14}
            strokeWidth={2}
            color="#3DDC84"
            fill="#3DDC84"
          />
        </View>
      ) : null}
      <View className="absolute bottom-[11px] left-3 right-3">
        <Text
          numberOfLines={2}
          className="font-bricolage-bold text-[15px] leading-[17px] text-white"
        >
          {note.title}
        </Text>
        <Text className="mt-1 font-mono text-[10px] text-white opacity-90">
          {meta}
        </Text>
      </View>
    </Pressable>
  );
}
