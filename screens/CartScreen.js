import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Minus } from "react-native-feather";
import { themeColors } from "../theme";
import { features } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
  removeFromCart,
  selectCartTotal,
  selectedCartItems,
} from "../slices/cartSlice";

const CartScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectedCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const deliveryFee = 2;
  const [groupedItems, setGroupedItems] = useState({});

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1">
      {/* back button */}
      <TouchableOpacity
        style={{ backgroundColor: themeColors.bgColor(1) }}
        onPress={() => navigation.goBack()}
        className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
      >
        <ArrowLeft strokeWidth={3} stroke="white" />
      </TouchableOpacity>
      <View>
        <Text className="text-center font-bold text-xl">You cart</Text>
        <Text className="text-center text-gray-500 ">{restaurant.name}</Text>
      </View>

      {/* delivery time */}
      <View
        className="flex-row px-4 items-center"
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
      >
        <Image
          source={require("../assets/images/repartidor.png")}
          className="h-24 w-24 rounded-full"
        />
        <Text className="flex-1 pl-4">Delivery in 20 - 30 minutes</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView>
        {Object.entries(groupedItems).map(([key, items]) => {
          const dish = items[0];
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold" style={{ color: themeColors.text }}>
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={dish.image} />
              <Text className="flex-1 font-bold text-gray-700">
                {dish.name}
              </Text>
              <Text className="font-semibold text-base">$ {dish.price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Minus stroke="white" strokeWidth={2} height={20} width={20} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* totals */}
      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{
          backgroundColor: themeColors.bgColor(0.2),
        }}
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">$ {cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery fee</Text>
          <Text className="text-gray-700">$ {deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order total</Text>
          <Text className="text-gray-700 font-extrabold">
            $ {cartTotal + deliveryFee}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPrepairing")}
            className="p-3 rounded-full"
            style={{
              backgroundColor: themeColors.bgColor(1),
            }}
          >
            <Text className="text-white text-center font-bold text-lg">
              Place order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
