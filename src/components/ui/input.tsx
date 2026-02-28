import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';

export interface InputProps extends TextInputProps {
    className?: string;
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
    ({ className, ...props }, ref) => {
        const { isDark } = useTheme();

        return (
            <TextInput
                ref={ref}
                placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                className={cn(
                    'flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:text-gray-100 disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400',
                    className
                )}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
