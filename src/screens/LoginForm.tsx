import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export const LoginForm = () => {
  const navigation = useNavigation();
  const { setTheme, isDark } = useTheme();
  const { width } = useWindowDimensions();

  const isDesktopWeb = width >= 768;
  const [role, setRole] = useState<string | null>(null);

  const toggleTheme = useCallback(() => {
    try {
      setTheme(isDark ? 'light' : 'dark');
    } catch (error) {
      console.error(error);
      Alert.alert('Theme Error', 'Unable to toggle theme right now.');
    }
  }, [isDark, setTheme]);

  const handleNavigation = useCallback(
    (route: string) => {
      try {
        navigation.navigate(route);
      } catch (error) {
        console.error(error);
        Alert.alert('Navigation Error', 'Unable to navigate to the specified screen.');
      }
    },
    [navigation],
  );

  return (
    <SafeAreaView className="flex-1 transition-colors duration-300 bg-background">
      <View className="w-full py-6 px-6 md:px-12 flex-row justify-between items-center max-w-7xl mx-auto">
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => handleNavigation('Home')}
            className="relative group cursor-pointer"
          >
            <Text className="font-serif text-[30px] font-bold tracking-tight text-text">
              Kutumb
            </Text>
            <View className="h-1 w-8 mt-0.5 rounded-full bg-text" />
          </Pressable>
        </View>

        {isDesktopWeb && (
          <View className="flex-row items-center gap-8">
            <Text className="text-[14px] font-medium transition-colors cursor-pointer text-textMuted hover:text-text">
              Features
            </Text>
            <Text className="text-[14px] font-medium transition-colors cursor-pointer text-textMuted hover:text-text">
              Pricing
            </Text>
            <Text className="text-[14px] font-medium transition-colors cursor-pointer text-textMuted hover:text-text">
              Contact
            </Text>
          </View>
        )}

        <View className="flex-row items-center gap-4">
          <Pressable
            onPress={toggleTheme}
            className="w-10 h-10 rounded-full items-center justify-center border transition-all shadow-sm cursor-pointer bg-card border-border hover:opacity-80"
          >
            <Image
              source={{
                uri: isDark
                  ? 'https://cdn-icons-png.flaticon.com/512/3288/3288108.png'
                  : 'https://cdn-icons-png.flaticon.com/512/581/581426.png',
              }}
              className="w-[18px] h-[18px] tint-iconTint"
            />
          </Pressable>
          {isDesktopWeb && (
            <Pressable
              onPress={() => handleNavigation('Login')}
              className="px-5 py-2.5 border rounded-full transition-colors cursor-pointer bg-background border-border hover:bg-card"
            >
              <Text className="text-[14px] font-medium text-text">Log in</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <View className="w-full max-w-3xl">
          <View className="items-center mb-10 w-full pt-4">
            <Text className="font-serif text-[36px] md:text-[48px] font-bold mb-3 text-center leading-tight text-text">
              Create your account
            </Text>
            <Text className="text-[16px] md:text-[18px] max-w-xl text-center font-light text-textMuted">
              Join thousands of communities managing their properties seamlessly. Tell us a bit
              about yourself.
            </Text>
          </View>

          <View className="mb-8 w-full">
            <Text className="text-[12px] font-semibold uppercase tracking-widest mb-4 text-center text-textSubtle">
              Select your role
            </Text>

            <View
              style={{ flexDirection: isDesktopWeb ? 'row' : 'column', gap: 16, width: '100%' }}
            >
              <Pressable
                onPress={() => setRole('landlord')}
                style={{ flex: 1 }}
                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative transition-all cursor-pointer ${role === 'landlord' ? 'bg-landlordBg border-landlordBorder' : 'bg-roleCardBgDefault border-roleCardBorderDefault'}`}
              >
                <View
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${role === 'landlord' ? 'bg-landlordIconBg' : 'bg-prefixBg'}`}
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2635/2635063.png' }}
                    className={`w-7 h-7 ${role === 'landlord' ? 'tint-landlordIconTint' : 'tint-textSubtle'}`}
                  />
                </View>
                <Text className="font-serif text-[20px] font-bold mb-2 text-center text-text">
                  Landlord
                </Text>
                <Text className="text-[14px] text-center leading-5 text-textMuted">
                  I own or manage properties and want to streamline operations.
                </Text>

                {role === 'landlord' && (
                  <View className="absolute top-4 right-4 w-6 h-6 rounded-full items-center justify-center bg-landlordCheckBg">
                    <Text className="text-white text-[12px] font-bold">✓</Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                onPress={() => setRole('tenant')}
                style={{ flex: 1 }}
                className={`p-6 rounded-2xl border-2 flex-col items-center justify-center relative transition-all cursor-pointer ${role === 'tenant' ? 'bg-tenantBg border-tenantBorder' : 'bg-roleCardBgDefault border-roleCardBorderDefault'}`}
              >
                <View
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${role === 'tenant' ? 'bg-tenantIconBg' : 'bg-prefixBg'}`}
                >
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }}
                    className={`w-7 h-7 ${role === 'tenant' ? 'tint-tenantIconTint' : 'tint-textSubtle'}`}
                  />
                </View>
                <Text className="font-serif text-[20px] font-bold mb-2 text-center text-text">
                  Tenant
                </Text>
                <Text className="text-[14px] text-center leading-5 text-textMuted">
                  I am renting a property and want to connect with my community.
                </Text>

                {role === 'tenant' && (
                  <View className="absolute top-4 right-4 w-6 h-6 rounded-full items-center justify-center bg-tenantCheckBg">
                    <Text className="text-white text-[12px] font-bold">✓</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          <View className="w-full p-6 sm:p-8 rounded-[24px] shadow-sm border transition-colors bg-card border-border">
            <View
              style={{
                flexDirection: isDesktopWeb ? 'row' : 'column',
                gap: 16,
                marginBottom: 20,
                width: '100%',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text className="text-[14px] font-medium mb-2 text-textLabel">First Name</Text>
                <TextInput
                  placeholder="e.g. Sarah"
                  className="w-full h-12 px-4 rounded-xl border transition-colors outline-none bg-inputBg border-inputBorder text-text placeholder:text-inputPlaceholder"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text className="text-[14px] font-medium mb-2 text-textLabel">Last Name</Text>
                <TextInput
                  placeholder="e.g. Miller"
                  className="w-full h-12 px-4 rounded-xl border transition-colors outline-none bg-inputBg border-inputBorder text-text placeholder:text-inputPlaceholder"
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: isDesktopWeb ? 'row' : 'column',
                gap: 16,
                marginBottom: 20,
                width: '100%',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text className="text-[14px] font-medium mb-2 text-textLabel">Date of Birth</Text>
                <TextInput
                  placeholder="mm/dd/yyyy"
                  className="w-full h-12 px-4 rounded-xl border transition-colors outline-none bg-inputBg border-inputBorder text-text placeholder:text-inputPlaceholder"
                />
              </View>
              <View style={{ flex: 1, position: 'relative', justifyContent: 'flex-end' }}>
                <Text className="text-[14px] font-medium mb-2 text-textLabel">Gender</Text>
                <View className="w-full h-12 justify-center relative">
                  <TextInput
                    placeholder="Select gender"
                    editable={false}
                    className="w-full h-12 pl-4 pr-10 rounded-xl border transition-colors cursor-pointer outline-none bg-inputBg border-inputBorder text-text placeholder:text-inputPlaceholder"
                  />
                  <View className="absolute right-4 top-0 bottom-0 justify-center pointer-events-none">
                    <Text className="text-[10px] text-textSubtle">▼</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="w-full mb-6">
              <Text className="text-[14px] font-medium mb-2 text-textLabel">Email Address</Text>
              <View className="w-full h-12 flex-row items-center rounded-xl border px-4 transition-colors bg-inputBg border-inputBorder">
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/542/542689.png' }}
                  className="w-4 h-4 mr-2.5 tint-textSubtle"
                />
                <TextInput
                  placeholder="sarah.miller@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 h-full text-[14px] outline-none text-text placeholder:text-inputPlaceholder"
                />
              </View>
            </View>

            <View className="w-full mb-8">
              <Text className="text-[14px] font-medium mb-2 text-textLabel">Mobile Number</Text>
              <View className="w-full h-12 flex-row items-center rounded-xl border overflow-hidden transition-colors bg-inputBg border-inputBorder">
                <View className="h-full px-4 items-center justify-center border-r bg-prefixBg border-inputBorder">
                  <Text className="text-[14px] font-medium text-prefixText">+1</Text>
                </View>
                <TextInput
                  placeholder="555-0123-456"
                  keyboardType="phone-pad"
                  className="flex-1 h-full px-4 text-[14px] outline-none text-text placeholder:text-inputPlaceholder"
                />
              </View>
            </View>

            <Pressable
              onPress={() => handleNavigation('Home')}
              className="w-full h-[56px] flex-row items-center justify-center rounded-xl active:scale-[0.98] transition-all shadow-md cursor-pointer bg-buttonPrimaryBg hover:opacity-90"
            >
              <Text className="font-medium text-[16px] mr-2 text-buttonPrimaryText">Continue</Text>
              <Text className="text-[18px] text-buttonPrimaryText">➔</Text>
            </Pressable>

            <View className="mt-8 flex-row justify-center items-center w-full">
              <Text className="text-[14px] text-textMuted">Already have an account? </Text>
              <Pressable onPress={() => handleNavigation('Login')} className="cursor-pointer">
                <Text className="text-[14px] font-semibold hover:underline ml-1 text-text">
                  Log in here
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {isDesktopWeb && (
        <View className="w-full py-6 px-6 border-t mt-auto transition-colors bg-background border-border">
          <View className="max-w-7xl mx-auto w-full flex-col md:flex-row justify-between items-center">
            <Text className="text-[13px] text-textSubtle">
              © 2024 Kutumb Inc. All rights reserved.
            </Text>
            <View className="flex-row gap-6 mt-4 md:mt-0">
              <Text className="text-[13px] transition-colors cursor-pointer text-textSubtle hover:text-text">
                Privacy Policy
              </Text>
              <Text className="text-[13px] transition-colors cursor-pointer text-textSubtle hover:text-text">
                Terms of Service
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
