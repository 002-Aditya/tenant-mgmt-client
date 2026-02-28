import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <View className="flex-row justify-between items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-lg mt-4 w-full">
            <TouchableOpacity
                onPress={() => setTheme('light')}
                className={`flex-1 py-2 items-center rounded-md ${theme === 'light' ? 'bg-white shadow-sm dark:bg-gray-700' : ''}`}
            >
                <Text className={`font-semibold ${theme === 'light' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTheme('dark')}
                className={`flex-1 py-2 items-center rounded-md ${theme === 'dark' ? 'bg-white shadow-sm dark:bg-gray-700' : ''}`}
            >
                <Text className={`font-semibold ${theme === 'dark' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTheme('system')}
                className={`flex-1 py-2 items-center rounded-md ${theme === 'system' ? 'bg-white shadow-sm dark:bg-gray-700' : ''}`}
            >
                <Text className={`font-semibold ${theme === 'system' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>System</Text>
            </TouchableOpacity>
        </View>
    );
};
