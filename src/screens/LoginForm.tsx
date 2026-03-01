import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Platform, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export const LoginForm = () => {
    const navigation = useNavigation();
    const { theme, setTheme, isDark } = useTheme();
    const { width } = useWindowDimensions();

    // We use this boolean instead of Tailwind's 'md:' prefix to guarantee the layout doesn't break
    const isDesktopWeb = width >= 768;

    const [role, setRole] = useState(null);

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-[#1F2937]">
            {/* Top Navigation */}
            <View className="w-full py-6 px-6 md:px-12 flex-row justify-between items-center max-w-7xl mx-auto">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => navigation.navigate('Home')} className="relative group">
                        <Text className="font-serif text-[30px] font-bold text-[#111827] dark:text-white tracking-tight">Kutumb</Text>
                        <View className="h-1 w-8 bg-[#111827] dark:bg-white mt-0.5 rounded-full" />
                    </Pressable>
                </View>

                {isDesktopWeb && (
                    <View className="flex-row items-center gap-8">
                        <Text className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Features</Text>
                        <Text className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Pricing</Text>
                        <Text className="text-[14px] font-medium text-[#4B5563] dark:text-[#D1D5DB]">Contact</Text>
                    </View>
                )}

                <View className="flex-row items-center gap-4">
                    <Pressable
                        onPress={toggleTheme}
                        className="p-2 rounded-full border border-gray-200 dark:border-gray-700 bg-transparent"
                    >
                        <Image
                            source={{ uri: isDark ? 'https://cdn-icons-png.flaticon.com/512/3288/3288108.png' : 'https://cdn-icons-png.flaticon.com/512/581/581426.png' }}
                            style={{ width: 18, height: 18, tintColor: isDark ? '#D1D5DB' : '#4B5563' }}
                        />
                    </Pressable>
                    {isDesktopWeb && (
                        <Pressable onPress={() => navigation.navigate('Login')} className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-full">
                            <Text className="text-[14px] font-medium text-[#111827] dark:text-white">Log in</Text>
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Main Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 24 }}>
                <View className="w-full max-w-3xl">

                    {/* Header */}
                    <View className="items-center mb-10 w-full">
                        <Text className="font-serif text-[36px] md:text-[48px] font-bold text-[#111827] dark:text-white mb-3 text-center">
                            Create your account
                        </Text>
                        <Text className="text-[#4B5563] dark:text-[#D1D5DB] text-[16px] md:text-[18px] max-w-xl text-center font-light">
                            Join thousands of communities managing their properties seamlessly. Tell us a bit about yourself.
                        </Text>
                    </View>

                    {/* Role Selection (Forced Grid Layout) */}
                    <View className="mb-8 w-full">
                        <Text className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center">
                            Select your role
                        </Text>

                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, width: '100%' }}>
                            {/* Landlord Card */}
                            <Pressable
                                onPress={() => setRole('landlord')}
                                style={{ flex: 1 }}
                                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative ${role === 'landlord'
                                        ? 'border-[#111827] dark:border-white bg-gray-50 dark:bg-gray-700/50'
                                        : 'bg-white dark:bg-[#374151] border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <View className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2635/2635063.png' }} style={{ width: 28, height: 28, tintColor: '#2563eb' }} />
                                </View>
                                <Text className="font-serif text-[20px] font-bold text-gray-900 dark:text-white mb-2 text-center">Landlord</Text>
                                <Text className="text-[14px] text-gray-500 dark:text-gray-300 text-center leading-5">I own or manage properties and want to streamline operations.</Text>

                                {role === 'landlord' && (
                                    <View className="absolute top-4 right-4 w-6 h-6 bg-[#111827] dark:bg-white rounded-full items-center justify-center">
                                        <Text className="text-white dark:text-[#111827] text-[12px] font-bold">✓</Text>
                                    </View>
                                )}
                            </Pressable>

                            {/* Tenant Card */}
                            <Pressable
                                onPress={() => setRole('tenant')}
                                style={{ flex: 1 }}
                                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative ${role === 'tenant'
                                        ? 'border-[#111827] dark:border-white bg-gray-50 dark:bg-gray-700/50'
                                        : 'bg-white dark:bg-[#374151] border-gray-200 dark:border-gray-600'
                                    }`}
                            >
                                <View className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
                                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }} style={{ width: 28, height: 28, tintColor: '#16a34a' }} />
                                </View>
                                <Text className="font-serif text-[20px] font-bold text-gray-900 dark:text-white mb-2 text-center">Tenant</Text>
                                <Text className="text-[14px] text-gray-500 dark:text-gray-300 text-center leading-5">I am renting a property and want to connect with my community.</Text>

                                {role === 'tenant' && (
                                    <View className="absolute top-4 right-4 w-6 h-6 bg-[#111827] dark:bg-white rounded-full items-center justify-center">
                                        <Text className="text-white dark:text-[#111827] text-[12px] font-bold">✓</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {/* Form Component (Forced Grid Layout) */}
                    <View className="w-full bg-white dark:bg-[#374151] p-6 sm:p-8 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-700">

                        {/* Row 1: First Name & Last Name */}
                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, marginBottom: 20, width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</Text>
                                <TextInput
                                    placeholder="e.g. Sarah"
                                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</Text>
                                <TextInput
                                    placeholder="e.g. Miller"
                                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </View>
                        </View>

                        {/* Row 2: DOB & Gender */}
                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, marginBottom: 20, width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</Text>
                                <TextInput
                                    placeholder="mm/dd/yyyy"
                                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </View>
                            <View style={{ flex: 1, position: 'relative', justifyContent: 'flex-end' }}>
                                <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</Text>
                                <View className="w-full h-12 justify-center relative">
                                    <TextInput
                                        placeholder="Select gender"
                                        placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                        editable={false}
                                        className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                                    />
                                    <View className="absolute right-4 top-0 bottom-0 justify-center pointer-events-none">
                                        <Text className="text-gray-400 text-[12px]">▼</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Email Address */}
                        <View className="w-full mb-6">
                            <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</Text>
                            <View className="w-full h-12 flex-row items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4">
                                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }} style={{ width: 18, height: 18, tintColor: '#9CA3AF', marginRight: 10 }} />
                                <TextInput
                                    placeholder="sarah.miller@example.com"
                                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="flex-1 h-full text-[14px] text-gray-900 dark:text-white"
                                />
                            </View>
                        </View>

                        {/* Mobile Number */}
                        <View className="w-full mb-8">
                            <Text className="text-[14px] font-medium text-gray-700 dark:text-gray-300 mb-2">Mobile Number</Text>
                            <View className="w-full h-12 flex-row items-center rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 overflow-hidden">
                                <View className="h-full px-4 items-center justify-center border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                    <Text className="text-[14px] font-medium text-gray-600 dark:text-gray-300">+1</Text>
                                </View>
                                <TextInput
                                    placeholder="555-0123-456"
                                    placeholderTextColor={isDark ? '#6B7280' : '#9CA3AF'}
                                    keyboardType="phone-pad"
                                    className="flex-1 h-full px-4 text-[14px] text-gray-900 dark:text-white"
                                />
                            </View>
                        </View>

                        {/* Continue Button */}
                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            className="w-full h-[52px] bg-[#111827] flex-row items-center justify-center rounded-xl shadow-md active:opacity-80"
                        >
                            <Text className="text-white font-medium text-[16px] mr-2">Continue</Text>
                            <Text className="text-white text-[18px]">➔</Text>
                        </Pressable>

                        {/* Footer Link */}
                        <View className="mt-8 flex-row justify-center items-center w-full">
                            <Text className="text-[14px] text-gray-500 dark:text-gray-400">Already have an account? </Text>
                            <Pressable onPress={() => navigation.navigate('Login')}>
                                <Text className="text-[14px] font-semibold text-[#111827] dark:text-white">Log in here</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* Bottom Footer (Web Only) */}
            {isDesktopWeb && (
                <View className="w-full py-6 px-6 border-t border-gray-200 dark:border-gray-800">
                    <View className="max-w-7xl mx-auto w-full flex-col md:flex-row justify-between items-center">
                        <Text className="text-[13px] text-gray-500 dark:text-gray-400">
                            © 2024 Kutumb Inc. All rights reserved.
                        </Text>
                        <View className="flex-row gap-6 mt-4 md:mt-0">
                            <Text className="text-[13px] text-gray-500 dark:text-gray-400">Privacy Policy</Text>
                            <Text className="text-[13px] text-gray-500 dark:text-gray-400">Terms of Service</Text>
                        </View>
                    </View>
                </View>
            )}

        </SafeAreaView>
    );
};