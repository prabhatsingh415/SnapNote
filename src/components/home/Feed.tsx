import { View, FlatList, Image } from "react-native";
import { useNotes } from "../../db/useNotes";
import { useEffect, useState } from "react";
import { Note } from "../../types/note";
import NoteCard from "../note/NoteCard";

const Feed = () => {
  const { getNotes } = useNotes();

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    loadNotes();
  }, [getNotes]);

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerClassName="gap-3 pb-[110px]"
      renderItem={({ item }) => <NoteCard note={item} />}
    />
  );
};

export default Feed;
