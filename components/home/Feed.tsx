import { View, FlatList, Image } from "react-native";
import AppText from "../general/AppText";

export const dummySnapNotes = [
  {
    id: "1",
    title: "Weekend escape",
    description: "A little fresh air and a view worth keeping.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    date: "Today",
    photoCount: 1,
  },
  {
    id: "2",
    title: "Coffee shop find",
    description: "Quiet corner table near the window.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    date: "Yesterday",
    photoCount: 1,
  },
  {
    id: "3",
    title: "Plant shelf",
    description: "New potting mix and watering notes.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    date: "Mon",
    photoCount: 1,
  },
  {
    id: "4",
    title: "Morning walk",
    description: "Cool air and a quiet street before work.",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8",
    date: "Sun",
    photoCount: 2,
  },
  {
    id: "5",
    title: "New workspace",
    description: "Finally got the desk setup feeling right.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    date: "Sat",
    photoCount: 3,
  },
  {
    id: "6",
    title: "Dinner experiment",
    description: "Tried a new recipe and it actually worked.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    date: "Fri",
    photoCount: 2,
  },
  {
    id: "7",
    title: "Evening sky",
    description: "Stopped for a minute to capture this.",
    image: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
    date: "Thu",
    photoCount: 1,
  },
  {
    id: "8",
    title: "Bookshelf update",
    description: "A few new books for the weekend.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    date: "Wed",
    photoCount: 4,
  },
];

const Feed = () => {
  return (
    <FlatList
      data={dummySnapNotes}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-3 pb-[110px]"
      renderItem={({ item }) => (
        <View
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
              source={{ uri: item.image }}
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
              {item.date} • {item.photoCount} photo
              {item.photoCount > 1 ? "s" : ""}
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
              {item.title}
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
              {item.description}
            </AppText>
          </View>
        </View>
      )}
    />
  );
};

export default Feed;
