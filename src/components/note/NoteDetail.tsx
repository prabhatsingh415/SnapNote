import { View, Image, Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import AppText from "../general/AppText";
import { Note } from "../../types/note";

type NoteDetailProps = {
  note: Note;
  onBack: () => void;
};

const formatDate = (value: string | number | Date) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export default function NoteDetail({ note, onBack }: NoteDetailProps) {
  return (
    <View className="flex-1 bg-light-bg dark:bg-dark-bg">
      {/* Header */}
      <View className="flex-row items-center px-4 pb-3 pt-2">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full"
        >
          <ArrowLeft size={22} color="#1C1917" />
        </Pressable>

        <AppText className="ml-2 font-inter-semibold text-[18px] text-light-text dark:text-dark-text">
          Note
        </AppText>
      </View>

      {/* Content */}
      <View className="px-4">
        {/* Image */}
        <Image
          source={{ uri: note.imageUri }}
          resizeMode="cover"
          className="h-[300px] w-full rounded-[16px]"
        />

        {/* Date */}
        <AppText className="mt-3 text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
          {formatDate(note.createdAt)}
        </AppText>

        {/* Title */}
        <AppText className="mt-2 font-inter-bold text-[24px] leading-[30px] text-light-text dark:text-dark-text">
          {note.title}
        </AppText>

        {/* Description */}
        {!!note.description && (
          <AppText className="mt-3 text-[14px] leading-[22px] text-light-textSecondary dark:text-dark-textSecondary">
            {note.description}
          </AppText>
        )}
      </View>
    </View>
  );
}
