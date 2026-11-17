import { Modal, Pressable, Text, View } from "react-native";

import SecondaryButton from "./SecondaryButton";

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function ConfirmDialog({
  visible,
  title,
  message,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center px-6">
        <Pressable
          onPress={onCancel}
          className="absolute inset-0 bg-black/50"
          accessibilityLabel="Dismiss confirmation"
        />
        <View className="w-full rounded-[24px] bg-light-sheet p-6 dark:bg-dark-sheet">
          <Text className="font-bricolage-bold text-[22px] text-light-fg dark:text-dark-fg">
            {title}
          </Text>
          <Text className="mt-2 font-bricolage-medium text-[16px] leading-6 text-light-body dark:text-dark-body">
            {message}
          </Text>
          <View className="mt-6 flex-row gap-3">
            <SecondaryButton
              label={cancelLabel}
              onPress={onCancel}
              className="flex-1"
            />
            <SecondaryButton
              label={confirmLabel}
              onPress={onConfirm}
              danger
              className="flex-1"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
