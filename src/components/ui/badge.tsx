import * as React from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
    'items-center rounded-full px-2.5 py-0.5 font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-blue-500 hover:bg-blue-500/80',
                secondary: 'bg-gray-200 hover:bg-gray-200/80 dark:bg-gray-800 dark:hover:bg-gray-800/80',
                destructive: 'bg-red-500 hover:bg-red-500/80',
                outline: 'border border-gray-300 dark:border-gray-700',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const badgeTextVariants = cva(
    'text-xs',
    {
        variants: {
            variant: {
                default: 'text-white',
                secondary: 'text-gray-900 dark:text-gray-100',
                destructive: 'text-white',
                outline: 'text-gray-900 dark:text-gray-100',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
    children?: React.ReactNode;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
    return (
        <View className={cn(badgeVariants({ variant }), className)} {...props}>
            <Text className={cn(badgeTextVariants({ variant }))}>
                {children}
            </Text>
        </View>
    );
}

export { Badge, badgeVariants };
