import { View, Image, Pressable } from "react-native";
import { Note } from "../../types/note";
import AppText from "../general/AppText";
import { useRouter } from "expo-router";

type Props = {
  note: Note;
};

const formatCreatedAt = (value: string | number | Date) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const daysAgo = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / 86_400_000
  );

  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo >= 2 && daysAgo < 7) return "This week";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}-${month}-${year}`;
};

const NoteCard = ({ note }: Props) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/note/${note.id}`)}
      className="
      w-full
      flex-row
      rounded-[12px]
      border
      border-light-border
      bg-light-surface
      p-2
      dark:border-dark-border
      dark:bg-dark-surface
    "
    >
      {/* Image */}
      <View className="w-[120px]">
        <Image
          source={{ uri: note.imageUri }}
          className="h-[100px] w-[120px] rounded-[8px]"
          resizeMode="cover"
        />

        <AppText
          className="
          mt-1
          text-[9px]
          leading-[12px]
          text-light-textSecondary
          dark:text-dark-textSecondary
        "
        >
          {formatCreatedAt(note.createdAt)}
        </AppText>
      </View>

      {/* Content */}
      <View className="ml-2 flex-1 justify-center">
        <AppText
          className="
          text-[16px]
          leading-[21px]
          text-light-text
          dark:text-dark-text
          font-inter-semibold
        "
        >
          {note.title}
        </AppText>

        <AppText
          className="
          mt-[3px]
          text-[11px]
          leading-[15px]
          text-light-textSecondary
          dark:text-dark-textSecondary
          font-inter
        "
          numberOfLines={3}
        >
          {note.description}
        </AppText>
      </View>
    </Pressable>
  );
};

export default NoteCard;
