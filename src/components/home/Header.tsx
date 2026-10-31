import { useState } from "react";
import { TextInput, View } from "react-native";
import useThemeStore from "../../store/themeStore";
import AppText from "../general/AppText";
import { Search } from "lucide-react-native";

const Header = () => {
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const isLightTheme = theme === "light";

  return (
    <View className="flex mt-[12px] mb-[12px]">
      <>
        <AppText
          className={`text-[24px] ${
            isLightTheme ? "text-light-text" : "text-dark-text"
          } font-inter-semibold`}
        >
          Snap Note
        </AppText>

        <AppText
          className={`text-[10px] ${
            isLightTheme
              ? "text-light-textSecondary"
              : "text-dark-textSecondary"
          }`}
        >
          Capture what matters, anywhere
        </AppText>
      </>
      <View
        className={`flex-row items-center h-[40px] mt-[18px] mr-5 rounded-[10px] border px-3 ${
          isLightTheme
            ? "bg-light-surface border-light-border"
            : "bg-dark-surface border-dark-border"
        }`}
      >
        <Search
          size={22}
          strokeWidth={2}
          className={
            isLightTheme
              ? "text-light-textSecondary"
              : "text-dark-textSecondary"
          }
        />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search field logs..."
          placeholderTextColor={isLightTheme ? "#A39E98" : "#66625E"}
          cursorColor={isLightTheme ? "#0F5132" : "#1E834F"}
          accessibilityLabel="Search field logs"
          className={`flex-1 ml-2 p-0 text-[14px] ${
            isLightTheme ? "text-light-text" : "text-dark-text"
          }`}
        />
      </View>
    </View>
  );
};

export default Header;
