import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { MapPin, Star } from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({ restaurant }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", restaurant)}
    >
      <View
        style={{
          shadowColor: themeColors.bgColor(0.2),
          shadowRadius: 7,
        }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <Image className="h-36 w-64 rounded-3xl " source={restaurant.image} />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{restaurant.name}</Text>
          <View className="flex-row items-center space-x-1">
            <Star stroke="orange" fill="orange" width={15} height={15} />
            <Text className="text-xs">
              <Text className="text-green-700">{restaurant.stars}</Text>
              <Text className="text-gray-700">
                ({restaurant.reviews}) review
              </Text>{" "}
              · <Text className="font-semibold">{restaurant.category}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <MapPin stroke="gray" height={15} width={15} />
            <Text className="text-gray-700 text-xs">
              Nearby · {restaurant.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantCard;
