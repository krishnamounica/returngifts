import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'; // Use useSelector here
import { View, Text, StyleSheet } from 'react-native';

import LoginScreen from './LoginScreen'; // Update with your file path
import RegisterScreen from './RegisterScreen'; // Update with your file path
import HomeScreen from './HomeScreen'; // Update with your file path
import ProductDetails from './ProductDetails'; // Update with your file path
import CartScreen from './CartScreen'; // Update with your file path
import SettingsScreen from './SettingsScreen'; // Update with your file path
import ProfileScreen from './ProfileScreen'; // Update with your file path
import RequestsScreen from './RequestsScreen';

// Create Navigators
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const TabNavigator = () => {
  const cartItems = useSelector((state) => state.cart.items); // Access cart items from Redux
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate the total item count

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          
          } else if (route.name === 'Requests') {
            iconName = 'paw';
          }

          return (
            <>
              <Icon name={iconName} size={size} color={color} />
              {route.name === 'Cart' && cartItemCount > 0 && (
                <View style={styles.cartItemCount}>
                  <Text style={styles.cartItemCountText}>{cartItemCount}</Text>
                </View>
              )}
            </>
          );
        },
        tabBarActiveTintColor: '#6200ea',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Requests" component={RequestsScreen}  options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
};

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Tabs" component={TabNavigator} options={{ title: 'Wish and surprise' }} />
  </Drawer.Navigator>
);

// Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cartItemCount: {
    position: 'absolute',
    top: 0,
    right: -5,
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
 