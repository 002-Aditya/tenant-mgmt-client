import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

export const HomeScreen = () => {
    const { isDark } = useTheme();

    return (
        <ScrollView
            className="flex-1 bg-gray-50 dark:bg-gray-900"
        >
            <View className="p-5">
                <View className="mb-6 flex-row items-center justify-between">
                    <View>
                        <Text className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</Text>
                        <Text className="text-gray-500 dark:text-gray-400 mt-1">
                            React Native Reusables showcase
                        </Text>
                    </View>
                    <Badge variant="outline"><Text className="text-gray-400">v1.0.0</Text></Badge>
                </View>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle><Text className="text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100">Welcome Back</Text></CardTitle>
                        <CardDescription>
                            <Text className="text-sm text-gray-500 dark:text-gray-400">
                                This app demonstrates Shadcn UI philosophy built natively for iOS and Android using NativeWind.
                            </Text>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="flex-row items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/50">
                            <Text className="text-blue-800 dark:text-blue-300 font-medium">
                                Active Theme: {isDark ? 'Dark Mode' : 'Light Mode'}
                            </Text>
                        </View>

                        <View className="mt-6">
                            <Text className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Appearance Settings
                            </Text>
                            <ThemeToggle />
                        </View>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle><Text className="text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100">Shadcn Forms</Text></CardTitle>
                        <CardDescription><Text className="text-sm text-gray-500 dark:text-gray-400">Example of reusable inputs and buttons</Text></CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex-row">Email Address</Text>
                            <Input placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
                        </View>

                        <View>
                            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex-row">Password</Text>
                            <Input placeholder="Enter your password" secureTextEntry />
                        </View>
                    </CardContent>
                    <CardFooter className="flex-col space-y-3">
                        <Button className="w-full" onPress={() => Alert.alert('Action', 'Login Pressed')}>
                            <Text className="font-bold text-center text-white text-base">Sign In</Text>
                        </Button>
                        <Button variant="outline" className="w-full" onPress={() => Alert.alert('Action', 'Create Account Pressed')}>
                            <Text className="font-bold text-center text-gray-900 dark:text-gray-100 text-base">Create Account</Text>
                        </Button>
                    </CardFooter>
                </Card>

                <View className="h-10" />
            </View>
        </ScrollView>
    );
};
