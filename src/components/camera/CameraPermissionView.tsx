import { Text, View } from "react-native";
import { X } from "lucide-react-native";

import IconButton from "../ui/IconButton";
import PrimaryButton from "../ui/PrimaryButton";
import Screen from "../ui/Screen";
import SecondaryButton from "../ui/SecondaryButton";

type CameraPermissionViewProps = {
  canAskAgain: boolean;
  onAllow: () => void | Promise<unknown>;
  onOpenSettings: () => void;
  onClose: () => void;
};

export default function CameraPermissionView({
  canAskAgain,
  onAllow,
  onOpenSettings,
  onClose,
}: CameraPermissionViewProps) {
  return (
    <Screen>
      <IconButton
        label="Close camera"
        onPress={onClose}
        className="absolute left-3 top-3"
      >
        <X
          size={24}
          strokeWidth={2}
          className="text-light-fg dark:text-dark-fg"
        />
      </IconButton>
      <View className="flex-1 justify-center px-6">
        <Text className="text-center font-bricolage-bold text-[26px] text-light-fg dark:text-dark-fg">
          Camera access is needed
        </Text>
        <Text className="mt-3 text-center font-bricolage-medium text-[16px] leading-6 text-light-body dark:text-dark-body">
          Allow camera access to take a photo for your note.
        </Text>
        <PrimaryButton
          label="Allow camera"
          onPress={() => void onAllow()}
          className="mt-7"
        />
        {!canAskAgain ? (
          <SecondaryButton
            label="Open settings"
            onPress={onOpenSettings}
            className="mt-3"
          />
        ) : null}
      </View>
    </Screen>
  );
}
