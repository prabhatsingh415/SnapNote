import { View } from "react-native";
import { useRouter } from "expo-router";
import { Note } from "../../types/note";
import PhotoTile from "./PhotoTile";

type PhotoGridProps = {
  notes: Note[];
};

export default function PhotoGrid({ notes }: PhotoGridProps) {
  const router = useRouter();
  const left = notes.filter((_, index) => index % 2 === 0);
  const right = notes.filter((_, index) => index % 2 === 1);
  const creationOrder = [...notes].sort((a, b) => a.createdAt - b.createdAt);
  const numbers = new Map(creationOrder.map((note, index) => [note.id, index + 1]));

  const tileHeight = (note: Note, index: number) =>
    [250, 160, 220, 190, 140][(index + note.title.length) % 5];

  const renderColumn = (column: Note[], offset: number) => (
    <View className="flex-1 gap-[10px]">
      {column.map((note, index) => (
        <PhotoTile
          key={note.id}
          note={note}
          height={tileHeight(note, index + offset)}
          displayNumber={numbers.get(note.id) ?? 1}
          onPress={() => router.push(`/note/${note.id}`)}
        />
      ))}
    </View>
  );

  return (
    <View className="flex-row gap-[10px] px-5">
      {renderColumn(left, 0)}
      {renderColumn(right, 1)}
    </View>
  );
}
