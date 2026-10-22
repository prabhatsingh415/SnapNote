import { Modal, Pressable, View } from "react-native";
import { Camera, Image, X } from "lucide-react-native";
import AppText from "../general/AppText";

type ImagePermissionPopUpProps = {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickImage: () => void;
  isDark: boolean;
};

export default function ImagePermissionPopUp({
  visible,
  onClose,
  onTakePhoto,
  onPickImage,
  isDark,
}: ImagePermissionPopUpProps) {
  const iconColor = isDark ? "#9C9792" : "#615E5B";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="w-full max-w-[380px] rounded-2xl border border-light-border bg-light-surface p-5 dark:border-dark-border dark:bg-dark-surface">
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <AppText className="text-[18px] font-inter-semibold text-light-text dark:text-dark-text">
                Add a photo
              </AppText>

              <AppText className="mt-1 text-[12px] text-light-textSecondary dark:text-dark-textSecondary">
                Choose how you want to add your photo
              </AppText>
            </View>

            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-light-bg dark:bg-dark-bg"
            >
              <X size={18} color={iconColor} />
            </Pressable>
          </View>

          <Pressable
            onPress={onTakePhoto}
            className="mb-3 flex-row items-center rounded-xl border border-light-border bg-light-bg p-4 active:opacity-70 dark:border-dark-border dark:bg-dark-bg"
          >
            <View className="h-11 w-11 items-center justify-center rounded-lg bg-light-surface dark:bg-dark-surface">
              <Camera size={21} color={iconColor} />
            </View>

            <View className="ml-3 flex-1">
              <AppText className="text-[14px] font-inter-semibold text-light-text dark:text-dark-text">
                Take a photo
              </AppText>

              <AppText className="mt-1 text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
                Use your camera
              </AppText>
            </View>
          </Pressable>

          <Pressable
            onPress={onPickImage}
            className="mb-4 flex-row items-center rounded-xl border border-light-border bg-light-bg p-4 active:opacity-70 dark:border-dark-border dark:bg-dark-bg"
          >
            <View className="h-11 w-11 items-center justify-center rounded-lg bg-light-surface dark:bg-dark-surface">
              <Image size={21} color={iconColor} />
            </View>

            <View className="ml-3 flex-1">
              <AppText className="text-[14px] font-inter-semibold text-light-text dark:text-dark-text">
                Choose from gallery
              </AppText>

              <AppText className="mt-1 text-[11px] text-light-textSecondary dark:text-dark-textSecondary">
                Select an existing photo
              </AppText>
            </View>
          </Pressable>

          <Pressable
            onPress={onClose}
            className="items-center rounded-xl py-3 active:opacity-70"
          >
            <AppText className="text-[13px] font-inter-medium text-light-textSecondary dark:text-dark-textSecondary">
              Cancel
            </AppText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
