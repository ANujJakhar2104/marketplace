import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import type { RootTabParamList } from './types';
import { colors } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { EMIDuesScreen } from '../screens/EMIDuesScreen';
import { LimitScreen } from '../screens/LimitScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ShopStackNavigator } from './ShopStackNavigator';

const Tab = createBottomTabNavigator<RootTabParamList>();

const ICONS: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Shop: 'storefront-outline',
  EMIDues: 'document-text-outline',
  Limit: 'trending-up-outline',
  Profile: 'person-outline',
};

function TabIcon({
  name,
  focused,
  color,
}: {
  name: keyof RootTabParamList;
  focused: boolean;
  color: string;
}) {
  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.activeIndicator} />}
      <Ionicons name={ICONS[name]} size={22} color={color} />
    </View>
  );
}

export function RootTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: (props) => <TabIcon name="Home" {...props} /> }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStackNavigator}
        options={{ tabBarIcon: (props) => <TabIcon name="Shop" {...props} /> }}
      />
      <Tab.Screen
        name="EMIDues"
        component={EMIDuesScreen}
        options={{ title: 'EMI Dues', tabBarIcon: (props) => <TabIcon name="EMIDues" {...props} /> }}
      />
      <Tab.Screen
        name="Limit"
        component={LimitScreen}
        options={{ tabBarIcon: (props) => <TabIcon name="Limit" {...props} /> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: (props) => <TabIcon name="Profile" {...props} /> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: colors.card,
    borderTopColor: colors.border,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
  },
  activeIndicator: {
    position: 'absolute',
    top: -10,
    width: 18,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
