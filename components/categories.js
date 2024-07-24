import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { categories } from "../constants";
import { useState } from "react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((cat, i) => {
          let isActive = cat.id == activeCategory;
          let btnClass = isActive ? " bg-gray-500" : " bg-gray-200";
          let textClass = isActive
            ? "font-semibold text-gray-800"
            : "text-gray-500";
          return (
            <View key={i} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                onPress={() => setActiveCategory(cat.id)}
                className={`p-1 rounded-full shadow ${btnClass}`}
              >
                <Image style={{ width: 45, height: 45 }} source={cat.image} />
              </TouchableOpacity>
              <Text className={`text-sm ${textClass}`}>{cat.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
