import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { features } from "../constants";
import { themeColors } from "../theme";
import { Phone, X } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { emptyCart } from "../slices/cartSlice";

const DeliveryScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cancelOrder = () => {
    navigation.navigate("Home");
    dispatch(emptyCart());
  };
  return (
    <View className="flex-1">
      <MapView
        className="flex-1"
        mapType="standar"
        initialRegion={{
          latitud: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitud: restaurant.lat, longitude: restaurant.lng }}
          title={restaurant.name}
          description={restaurant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View className="rounded-t-3xl -mt-12 bg-white relative">
        <View className="flex-row justify-between px-5 pt-10">
          <View>
            <Text className="text-lg font-semibold text-gray-700">
              Estimated arrival
            </Text>
            <Text className="text-3xl font-extrabold text-gray-700">
              20-30 minutes
            </Text>
            <Text className="mt-2 text-gray-700 font-semibold">
              Your order is own its way
            </Text>
          </View>
          <Image
            className="w-24 h-24"
            source={require("../assets/images/order.gif")}
          />
        </View>
        <View
          className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2"
          style={{
            backgroundColor: themeColors.bgColor(0.8),
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
            className="p-1 rounded-full"
          >
            <Image
              className="w-12 h-12 rounded-full"
              source={require("../assets/images/repartidor.png")}
            />
          </View>
          <View className="flex-1 ml-3">
            <Text className="text-lg font-bold text-white">Esau Alvarez</Text>
            <Text className="font-semibold text-white">Your rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-2">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Phone
                fill={themeColors.bgColor(1)}
                strokeWidth={1}
                stroke={themeColors.bgColor(1)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white p-2 rounded-full"
              onPress={cancelOrder}
            >
              <X fill={themeColors.bgColor(1)} strokeWidth={5} stroke="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;
