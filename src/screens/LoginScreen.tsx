import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useTheme } from '../context/ThemeContext';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const { theme, setTheme, isDark } = useTheme();

    const { width, height } = useWindowDimensions();
    const isSmallDevice = height < 700;
    const isDesktopWeb = width >= 1024 && Platform.OS === 'web';

    const buttonScale = useSharedValue(1);

    const toggleTheme = () => {
        try {
            setTheme(isDark ? 'light' : 'dark');
        } catch (error) {
            console.error(error);
        }
    };

    const url = Linking.useURL();

    React.useEffect(() => {
        if (url) {
            const parsedUrl = Linking.parse(url);
            if (parsedUrl.queryParams?.success === 'true') {
                navigation.navigate('Home');
            }
        }
    }, [url, navigation]);

    const handleLoginPress = async () => {
        try {
            buttonScale.value = withSpring(0.95, {}, () => {
                buttonScale.value = withSpring(1);
            });

            if (Platform.OS === 'web') {
                const redirectParams = encodeURIComponent(window.location.href);
                window.location.href = `http://127.0.0.1:3000/auth/google?redirectUrl=${redirectParams}`; // Adjust according to backend port
            } else {
                const redirectUrl = Linking.createURL('login');
                const authUrl = `http://10.0.2.2:3000/auth/google?redirectUrl=${encodeURIComponent(redirectUrl)}`;
                
                // Note: local tests might need ngrok or your correct IP instead of localhost/10.0.2.2 if on physical device
                const result = await WebBrowser.openAuthSessionAsync(
                    authUrl, // The route mapped in app.js + googleAuth.js
                    redirectUrl
                );

                if (result.type === 'success' && result.url) {
                    const parsedUrl = Linking.parse(result.url);
                    if (parsedUrl.queryParams?.success === 'true') {
                        // User authenticated successfully
                        // e.g., store token if parsedUrl.queryParams.token exists
                        navigation.navigate('Home');
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    if (isDesktopWeb) {
        return (
            <SafeAreaView style={styles.container} className="bg-gray-50 dark:bg-gray-900">
                <View style={styles.webNav}>
                    <View>
                        <Text accessibilityRole="header" className="text-[28px] font-bold text-gray-900 dark:text-gray-100 font-serif tracking-tight">
                            Kutumb
                        </Text>
                        <View className="h-[4px] w-10 bg-gray-900 dark:bg-gray-100 mt-1 rounded-full" />
                    </View>

                    <View style={styles.webNavLinks} accessibilityRole="menubar">
                        <Pressable accessibilityRole="menuitem"><Text className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mx-6 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Features</Text></Pressable>
                        <Pressable accessibilityRole="menuitem"><Text className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mx-6 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Pricing</Text></Pressable>
                        <Pressable accessibilityRole="menuitem"><Text className="text-[14px] font-medium text-gray-500 dark:text-gray-400 mx-6 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact</Text></Pressable>
                    </View>

                    <View className="flex-row items-center gap-4">
                        <Pressable onPress={toggleTheme} accessibilityRole="button" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm transition-all">
                            <Image
                                importantForAccessibility="no"
                                source={{ uri: isDark ? 'https://cdn-icons-png.flaticon.com/512/3288/3288108.png' : 'https://cdn-icons-png.flaticon.com/512/581/581426.png' }}
                                style={{ width: 18, height: 18, tintColor: isDark ? '#f9fafb' : '#111827' }}
                            />
                        </Pressable>
                        <View className="flex-row items-center gap-3 ml-2">
                            <Pressable accessibilityRole="button" className="px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <Text className="text-[14px] font-medium text-gray-900 dark:text-gray-100">Log in</Text>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('LoginForm')} accessibilityRole="button" className="px-6 py-2.5 rounded-full bg-gray-900 dark:bg-gray-100 hover:opacity-90 transition-opacity">
                                <Text className="text-[14px] font-medium text-white dark:text-gray-900">Sign up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.webMain}>
                    <View style={styles.webLeftCol}>
                        <Animated.View entering={FadeInDown.delay(100).springify()}>
                            <Text accessibilityRole="header" className="text-[56px] lg:text-[72px] font-bold text-gray-900 dark:text-gray-100 leading-[1.1] font-serif">
                                One Family,{'\n'}Connecting Communities.
                            </Text>
                            <Text accessibilityRole="text" className="text-[20px] text-gray-500 dark:text-gray-400 font-medium max-w-md mt-6">
                                Seamless tenant management designed for modern living.
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.webButtonGroup}>
                            <Animated.View style={animatedButtonStyle}>
                                <Pressable
                                    accessibilityRole="button"
                                    accessibilityLabel="Login with Google"
                                    onPress={handleLoginPress}
                                    className="h-[56px] px-8 rounded-full flex-row items-center justify-center bg-gray-900 dark:bg-gray-100 shadow-lg transition-all"
                                >
                                    <View className="w-6 h-6 bg-white dark:bg-gray-900 rounded-full items-center justify-center mr-3">
                                        <Image
                                            importantForAccessibility="no"
                                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                                            style={{ width: 14, height: 14 }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text className="text-[18px] font-medium text-white dark:text-gray-900">Login with Google</Text>
                                </Pressable>
                            </Animated.View>

                            <Pressable accessibilityRole="button" className="h-[56px] px-8 rounded-full flex-row items-center justify-center border border-gray-200 dark:border-gray-700 ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                                <Text className="text-[16px] font-medium text-gray-900 dark:text-gray-100">Learn More</Text>
                                <Text className="ml-2 text-[16px] text-gray-900 dark:text-gray-100">→</Text>
                            </Pressable>
                        </Animated.View>

                        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.webSocialProof}>
                            <View className="flex-row -space-x-2 mr-4" importantForAccessibility="no">
                                <View className="w-8 h-8 rounded-full bg-[#d4d4d8] border-2 border-gray-50 dark:border-gray-900" />
                                <View className="w-8 h-8 rounded-full bg-[#a1a1aa] border-2 border-gray-50 dark:border-gray-900" />
                                <View className="w-8 h-8 rounded-full bg-[#71717a] border-2 border-gray-50 dark:border-gray-900" />
                            </View>
                            <Text className="text-[14px] text-gray-500 dark:text-gray-400">
                                Join <Text className="font-bold text-gray-900 dark:text-gray-100">2,000+</Text> communities today
                            </Text>
                        </Animated.View>
                    </View>

                    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.webRightCol}>
                        <View style={styles.webImageContainer}>
                            <Image
                                importantForAccessibility="no"
                                source={{ uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200&ixlib=rb-4.0.3' }}
                                style={styles.image}
                                resizeMode="cover"
                            />

                            <View style={styles.webFloatingBadge} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex-row items-center shadow-xl">
                                <View className="flex-row mr-4 relative overflow-visible" importantForAccessibility="no">
                                    <View className="w-8 h-8 rounded-full bg-[#d4d4d8] border-2 border-white dark:border-gray-800 z-30" />
                                    <View className="w-8 h-8 rounded-full bg-[#a1a1aa] border-2 border-white dark:border-gray-800 -ml-3 z-20" />
                                    <View className="w-8 h-8 rounded-full bg-[#71717a] border-2 border-white dark:border-gray-800 -ml-3 z-10" />
                                </View>
                                <View>
                                    <Text className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">TRUSTED BY</Text>
                                    <Text className="text-[20px] font-bold text-gray-900 dark:text-gray-100 leading-none mt-1">10K+</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                <View style={styles.webFooter}>
                    <Text className="text-[14px] text-gray-500 dark:text-gray-400">© 2024 Kutumb Inc. All rights reserved.</Text>
                    <View className="flex-row">
                        <Pressable accessibilityRole="link" className="ml-8"><Text className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</Text></Pressable>
                        <Pressable accessibilityRole="link" className="ml-8"><Text className="text-[14px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</Text></Pressable>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} className="bg-gray-50 dark:bg-gray-900">
            <View style={styles.content}>

                <View className="w-full flex-row justify-end mb-2 pr-2">
                    <Pressable onPress={toggleTheme} accessibilityRole="button" className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                        <Image
                            importantForAccessibility="no"
                            source={{ uri: isDark ? 'https://cdn-icons-png.flaticon.com/512/3288/3288108.png' : 'https://cdn-icons-png.flaticon.com/512/581/581426.png' }}
                            style={{ width: 18, height: 18, tintColor: isDark ? '#f9fafb' : '#111827' }}
                        />
                    </Pressable>
                </View>

                <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
                    <Text
                        accessibilityRole="header"
                        className="text-[36px] font-extrabold text-gray-900 dark:text-gray-100 tracking-tight"
                    >
                        Kutumb
                    </Text>
                    <View className="h-[3px] w-8 bg-gray-900 dark:bg-gray-100 mt-1 rounded-full" />
                </Animated.View>

                <View style={[styles.middleSection, { marginTop: isSmallDevice ? 5 : 20 }]}>
                    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.imageWrapper}>
                        <View style={[styles.imageContainer, { height: isSmallDevice ? 260 : 320 }]}>
                            <Image
                                importantForAccessibility="no"
                                source={{
                                    uri: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&ixlib=rb-4.0.3',
                                }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>

                        <View style={styles.floatingBadge} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex-row items-center">
                            <View className="flex-row mr-2 relative overflow-visible" importantForAccessibility="no">
                                <View className="w-5 h-5 rounded-full bg-[#d4d4d8] border-[1.5px] border-white dark:border-gray-800 z-30" />
                                <View className="w-5 h-5 rounded-full bg-[#a1a1aa] border-[1.5px] border-white dark:border-gray-800 -ml-2 z-20" />
                                <View className="w-5 h-5 rounded-full bg-[#71717a] border-[1.5px] border-white dark:border-gray-800 -ml-2 z-10" />
                            </View>
                            <Text className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider">
                                TRUSTED BY 10K+
                            </Text>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).springify()} style={[styles.textSection, { marginTop: isSmallDevice ? 30 : 50 }]}>
                        <Text
                            accessibilityRole="text"
                            className="text-[28px] text-center font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight"
                        >
                            One Family,{'\n'}Connecting Communities.
                        </Text>
                        <Text
                            accessibilityRole="text"
                            className="text-[16px] text-center text-gray-500 dark:text-gray-400 mt-3 font-medium"
                        >
                            Seamless tenant management.
                        </Text>
                    </Animated.View>
                </View>

                <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.bottomSection}>
                    <Animated.View style={[animatedButtonStyle, { width: '100%' }]}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Login with Google"
                            accessibilityHint="Authenticates your account and navigates to the dashboard"
                            onPress={handleLoginPress}
                            className="w-full h-[60px] rounded-[30px] flex-row items-center justify-center bg-gray-900 dark:bg-gray-100 active:scale-95"
                        >
                            <View className="w-8 h-8 bg-white dark:bg-gray-900 rounded-full items-center justify-center mr-3">
                                <Image
                                    importantForAccessibility="no"
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                                    style={{ width: 18, height: 18 }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text className="text-[18px] font-bold text-white dark:text-gray-900 tracking-wide">Login with Google</Text>
                        </Pressable>
                    </Animated.View>

                    <View className="mt-8 flex-row items-center justify-center">
                        <Pressable accessibilityRole="link" accessibilityLabel="Privacy Policy">
                            <Text className="text-[13px] font-semibold text-gray-500 dark:text-gray-400">Privacy Policy</Text>
                        </Pressable>
                        <Text className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 mx-3">•</Text>
                        <Pressable accessibilityRole="link" accessibilityLabel="Terms of Service">
                            <Text className="text-[13px] font-semibold text-gray-500 dark:text-gray-400">Terms of Service</Text>
                        </Pressable>
                    </View>
                </Animated.View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bottomSection: {
        alignItems: 'center',
        paddingTop: 10,
        width: '100%',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 24,
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    floatingBadge: {
        borderRadius: 30,
        bottom: -15,
        elevation: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        position: 'absolute',
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    imageContainer: {
        borderRadius: 32,
        overflow: 'hidden',
        width: '100%',
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    middleSection: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    textSection: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    webButtonGroup: {
        flexDirection: 'row',
        marginTop: 32,
    },
    webFloatingBadge: {
        borderRadius: 24,
        bottom: 32,
        paddingHorizontal: 24,
        paddingVertical: 16,
        position: 'absolute',
        right: 32,
    },
    webFooter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 64,
        paddingVertical: 32,
    },
    webImageContainer: {
        aspectRatio: 4 / 3,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.1,
        shadowRadius: 40,
        width: '100%',
    },
    webLeftCol: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 64,
        zIndex: 10,
    },
    webMain: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        maxWidth: 1400,
        paddingHorizontal: 64,
        width: '100%',
    },
    webNav: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 64,
        paddingVertical: 24,
        width: '100%',
    },
    webNavLinks: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    webRightCol: {
        flex: 1,
    },
    webSocialProof: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 48,
    }
});