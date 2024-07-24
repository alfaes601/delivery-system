import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { MapPin, Search, Sliders } from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import { features } from "../constants";
import FeautureRow from "../components/feautureRow";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content"></StatusBar>
      {/* Search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Search stroke="gray" fill="#fff" width={25} height={25} />
          <TextInput placeholder="Restauranta" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <MapPin width={20} height={20} stroke="gray" />
            <Text className="text-gray-600">CDMX</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 bg-gray-300 rounded-full"
        >
          <Sliders
            height={20}
            width={20}
            strokeWidth={2.5}
            stroke="white"
          ></Sliders>
        </View>
      </View>

      {/* Main */}
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Categories */}
        <Categories />

        {/* Feautures */}
        <View className="mt-5">
          {[features, features].map((fea, i) => {
            return (
              <FeautureRow
                key={i}
                title={fea.title}
                description={fea.description}
                restaurants={fea.restaurants}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
