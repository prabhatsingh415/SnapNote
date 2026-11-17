import { Directory, File, Paths } from "expo-file-system";

export const saveImagePermanently = async (uri: string) => {
  try {
    console.log("SOURCE URI:", uri);

    const sourceFile = new File(uri);

    console.log("SOURCE EXISTS:", sourceFile.exists);

    if (!sourceFile.exists) {
      throw new Error("Selected image source does not exist");
    }

    const directory = new Directory(Paths.document, "photos");

    if (!directory.exists) {
      directory.create({
        intermediates: true,
        idempotent: true,
      });
    }

    const file = new File(directory, `${Date.now()}.jpg`);

    await sourceFile.copy(file);

    console.log("DESTINATION URI:", file.uri);
    console.log("DESTINATION EXISTS:", file.exists);

    if (!file.exists) {
      throw new Error("Permanent image copy failed");
    }

    return file.uri;
  } catch (error) {
    console.error("PERMANENT IMAGE SAVE ERROR:", error);
    throw error;
  }
};
