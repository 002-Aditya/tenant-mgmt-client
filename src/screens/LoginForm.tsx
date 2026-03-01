import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Platform, useWindowDimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export const LoginForm = () => {
    const navigation = useNavigation<any>();
    const { theme, setTheme, isDark } = useTheme();
    const { width } = useWindowDimensions();

    const isDesktopWeb = width >= 768;
    const [role, setRole] = useState<string | null>(null);

    const toggleTheme = () => {
        try {
            setTheme(isDark ? 'light' : 'dark');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView className={`flex-1 transition-colors duration-300 ${isDark ? 'bg-zinc-950' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className="w-full py-6 px-6 md:px-12 flex-row justify-between items-center max-w-7xl mx-auto">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => navigation.navigate('Home')} className="relative group cursor-pointer">
                        <Text className={`font-serif text-[30px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Kutumb
                        </Text>
                        <View className={`h-1 w-8 mt-0.5 rounded-full ${isDark ? 'bg-white' : 'bg-gray-900'}`} />
                    </Pressable>
                </View>

                {isDesktopWeb && (
                    <View className="flex-row items-center gap-8">
                        <Text className={`text-[14px] font-medium transition-colors cursor-pointer ${isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Features</Text>
                        <Text className={`text-[14px] font-medium transition-colors cursor-pointer ${isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Pricing</Text>
                        <Text className={`text-[14px] font-medium transition-colors cursor-pointer ${isDark ? 'text-zinc-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Contact</Text>
                    </View>
                )}

                <View className="flex-row items-center gap-4">
                    <Pressable
                        onPress={toggleTheme}
                        className={`w-10 h-10 rounded-full items-center justify-center border transition-all shadow-sm cursor-pointer ${isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-600' : 'bg-white border-gray-200 hover:border-gray-400'
                            }`}
                    >
                        <Image
                            source={{ uri: isDark ? 'https://cdn-icons-png.flaticon.com/512/3288/3288108.png' : 'https://cdn-icons-png.flaticon.com/512/581/581426.png' }}
                            style={{ width: 18, height: 18, tintColor: isDark ? '#fafafa' : '#09090b' }}
                        />
                    </Pressable>
                    {isDesktopWeb && (
                        <Pressable onPress={() => navigation.navigate('Login')} className={`px-5 py-2.5 border rounded-full transition-colors cursor-pointer ${isDark ? 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
                            <Text className={`text-[14px] font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Log in</Text>
                        </Pressable>
                    )}
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: 16, paddingVertical: 24 }}>
                <View className="w-full max-w-3xl">

                    {/* Hero Text */}
                    <View className="items-center mb-10 w-full pt-4">
                        <Text className={`font-serif text-[36px] md:text-[48px] font-bold mb-3 text-center leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Create your account
                        </Text>
                        <Text className={`text-[16px] md:text-[18px] max-w-xl text-center font-light ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>
                            Join thousands of communities managing their properties seamlessly. Tell us a bit about yourself.
                        </Text>
                    </View>

                    {/* Role Selection */}
                    <View className="mb-8 w-full">
                        <Text className={`text-[12px] font-semibold uppercase tracking-widest mb-4 text-center ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>
                            Select your role
                        </Text>

                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, width: '100%' }}>
                            <Pressable
                                onPress={() => setRole('landlord')}
                                style={{ flex: 1 }}
                                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative transition-all cursor-pointer ${role === 'landlord'
                                    ? (isDark ? 'border-blue-500 bg-blue-500/10' : 'border-blue-600 bg-blue-50')
                                    : (isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:border-gray-300')
                                    }`}
                            >
                                <View className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-blue-900/40' : 'bg-blue-100'}`}>
                                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2635/2635063.png' }} style={{ width: 28, height: 28, tintColor: isDark ? '#60a5fa' : '#2563eb' }} />
                                </View>
                                <Text className={`font-serif text-[20px] font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Landlord</Text>
                                <Text className={`text-[14px] text-center leading-5 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>I own or manage properties and want to streamline operations.</Text>

                                {role === 'landlord' && (
                                    <View className={`absolute top-4 right-4 w-6 h-6 rounded-full items-center justify-center ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`}>
                                        <Text className="text-white text-[12px] font-bold">✓</Text>
                                    </View>
                                )}
                            </Pressable>

                            <Pressable
                                onPress={() => setRole('tenant')}
                                style={{ flex: 1 }}
                                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative transition-all cursor-pointer ${role === 'tenant'
                                    ? (isDark ? 'border-green-500 bg-green-500/10' : 'border-green-600 bg-green-50')
                                    : (isDark ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-gray-200 hover:border-gray-300')
                                    }`}
                            >
                                <View className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-green-900/40' : 'bg-green-100'}`}>
                                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }} style={{ width: 28, height: 28, tintColor: isDark ? '#4ade80' : '#16a34a' }} />
                                </View>
                                <Text className={`font-serif text-[20px] font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Tenant</Text>
                                <Text className={`text-[14px] text-center leading-5 ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>I am renting a property and want to connect with my community.</Text>

                                {role === 'tenant' && (
                                    <View className={`absolute top-4 right-4 w-6 h-6 rounded-full items-center justify-center ${isDark ? 'bg-green-500' : 'bg-green-600'}`}>
                                        <Text className="text-white text-[12px] font-bold">✓</Text>
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    </View>

                    {/* Form Card */}
                    <View className={`w-full p-6 sm:p-8 rounded-[24px] shadow-sm border transition-colors ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>

                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, marginBottom: 20, width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>First Name</Text>
                                <TextInput
                                    placeholder="e.g. Sarah"
                                    placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                    className={`w-full h-12 px-4 rounded-xl border transition-colors ${isDark ? 'border-zinc-700 bg-zinc-950 text-white focus:border-zinc-400' : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-gray-600'}`}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>Last Name</Text>
                                <TextInput
                                    placeholder="e.g. Miller"
                                    placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                    className={`w-full h-12 px-4 rounded-xl border transition-colors ${isDark ? 'border-zinc-700 bg-zinc-950 text-white focus:border-zinc-400' : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-gray-600'}`}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, marginBottom: 20, width: '100%' }}>
                            <View style={{ flex: 1 }}>
                                <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>Date of Birth</Text>
                                <TextInput
                                    placeholder="mm/dd/yyyy"
                                    placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                    className={`w-full h-12 px-4 rounded-xl border transition-colors ${isDark ? 'border-zinc-700 bg-zinc-950 text-white focus:border-zinc-400' : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-gray-600'}`}
                                />
                            </View>
                            <View style={{ flex: 1, position: 'relative', justifyContent: 'flex-end' }}>
                                <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>Gender</Text>
                                <View className="w-full h-12 justify-center relative">
                                    <TextInput
                                        placeholder="Select gender"
                                        placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                        editable={false}
                                        className={`w-full h-12 pl-4 pr-10 rounded-xl border transition-colors cursor-pointer ${isDark ? 'border-zinc-700 bg-zinc-950 text-white' : 'border-gray-300 bg-gray-50 text-gray-900'}`}
                                    />
                                    <View className="absolute right-4 top-0 bottom-0 justify-center pointer-events-none">
                                        <Text className={`text-[10px] ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>▼</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="w-full mb-6">
                            <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>Email Address</Text>
                            <View className={`w-full h-12 flex-row items-center rounded-xl border px-4 transition-colors ${isDark ? 'border-zinc-700 bg-zinc-950 focus-within:border-zinc-400' : 'border-gray-300 bg-gray-50 focus-within:border-gray-600'}`}>
                                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }} style={{ width: 16, height: 16, tintColor: isDark ? '#71717a' : '#a1a1aa', marginRight: 10 }} />
                                <TextInput
                                    placeholder="sarah.miller@example.com"
                                    placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className={`flex-1 h-full text-[14px] outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
                                />
                            </View>
                        </View>

                        <View className="w-full mb-8">
                            <Text className={`text-[14px] font-medium mb-2 ${isDark ? 'text-zinc-200' : 'text-gray-900'}`}>Mobile Number</Text>
                            <View className={`w-full h-12 flex-row items-center rounded-xl border overflow-hidden transition-colors ${isDark ? 'border-zinc-700 bg-zinc-950 focus-within:border-zinc-400' : 'border-gray-300 bg-gray-50 focus-within:border-gray-600'}`}>
                                <View className={`h-full px-4 items-center justify-center border-r ${isDark ? 'border-zinc-700 bg-zinc-900' : 'border-gray-300 bg-gray-100'}`}>
                                    <Text className={`text-[14px] font-medium ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>+1</Text>
                                </View>
                                <TextInput
                                    placeholder="555-0123-456"
                                    placeholderTextColor={isDark ? '#52525b' : '#a1a1aa'}
                                    keyboardType="phone-pad"
                                    className={`flex-1 h-full px-4 text-[14px] outline-none ${isDark ? 'text-white' : 'text-gray-900'}`}
                                />
                            </View>
                        </View>

                        <Pressable
                            onPress={() => navigation.navigate('Home')}
                            className={`w-full h-[56px] flex-row items-center justify-center rounded-xl active:scale-[0.98] transition-all shadow-md cursor-pointer ${isDark ? 'bg-white hover:bg-zinc-200' : 'bg-gray-900 hover:bg-gray-800'}`}
                        >
                            <Text className={`font-medium text-[16px] mr-2 ${isDark ? 'text-gray-900' : 'text-white'}`}>Continue</Text>
                            <Text className={`text-[18px] ${isDark ? 'text-gray-900' : 'text-white'}`}>➔</Text>
                        </Pressable>

                        <View className="mt-8 flex-row justify-center items-center w-full">
                            <Text className={`text-[14px] ${isDark ? 'text-zinc-400' : 'text-gray-500'}`}>Already have an account? </Text>
                            <Pressable onPress={() => navigation.navigate('Login')} className="cursor-pointer">
                                <Text className={`text-[14px] font-semibold hover:underline ml-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Log in here</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>

            {isDesktopWeb && (
                <View className={`w-full py-6 px-6 border-t mt-auto transition-colors ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-gray-200 bg-white'}`}>
                    <View className="max-w-7xl mx-auto w-full flex-col md:flex-row justify-between items-center">
                        <Text className={`text-[13px] ${isDark ? 'text-zinc-500' : 'text-gray-500'}`}>
                            © 2024 Kutumb Inc. All rights reserved.
                        </Text>
                        <View className="flex-row gap-6 mt-4 md:mt-0">
                            <Text className={`text-[13px] transition-colors cursor-pointer ${isDark ? 'text-zinc-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Privacy Policy</Text>
                            <Text className={`text-[13px] transition-colors cursor-pointer ${isDark ? 'text-zinc-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>Terms of Service</Text>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};