import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/home/Header";
import Feed from "../../components/home/Feed";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 p-4 bg-light-bg dark:bg-dark-bg font-inter">
      <Header />
      <Feed />
    </SafeAreaView>
  );
};

export default Home;
