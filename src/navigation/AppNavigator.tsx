import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LoginForm } from '../screens/LoginForm'; // Add this import

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'transparent',
                },
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                animation: 'fade',
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            {/* Add the new LoginForm screen here */}
            <Stack.Screen
                name="LoginForm"
                component={LoginForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Dashboard', headerBackVisible: false }}
            />
        </Stack.Navigator>
    );
};