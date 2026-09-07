import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { ShopStackParamList } from './types';
import { ShopHomeScreen } from '../screens/shop/ShopHomeScreen';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ReviewOrderScreen } from '../screens/shop/ReviewOrderScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopHome" component={ShopHomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="ReviewOrder" component={ReviewOrderScreen} />
    </Stack.Navigator>
  );
}
