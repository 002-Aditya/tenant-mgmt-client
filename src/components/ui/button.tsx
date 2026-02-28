import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, type PressableProps } from 'react-native';
import { Text } from 'react-native';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'active:opacity-80 flex-row items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-blue-500 hover:bg-blue-500/90 dark:bg-blue-600 dark:hover:bg-blue-600/90',
                destructive: 'bg-red-500 hover:bg-red-500/90',
                outline: 'border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800',
                secondary: 'bg-gray-200 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-800/80',
                ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50',
                link: 'text-blue-500 underline-offset-4 hover:underline dark:text-blue-400',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

const buttonTextVariants = cva(
    'font-bold text-center',
    {
        variants: {
            variant: {
                default: 'text-white',
                destructive: 'text-white',
                outline: 'text-gray-900 dark:text-gray-100',
                secondary: 'text-gray-900 dark:text-gray-100',
                ghost: 'text-gray-900 dark:text-gray-100',
                link: 'text-blue-500 dark:text-blue-400',
            },
            size: {
                default: 'text-base',
                sm: 'text-sm',
                lg: 'text-lg',
                icon: 'text-base',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
    className?: string;
    textClass?: string;
    children: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
    ({ className, textClass, variant, size, children, ...props }, ref) => {
        return (
            <Pressable
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                <Text className={cn(buttonTextVariants({ variant, size, className: textClass }))}>
                    {children}
                </Text>
            </Pressable>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants, buttonTextVariants };
