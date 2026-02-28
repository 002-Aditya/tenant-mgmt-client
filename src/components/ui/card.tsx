import * as React from 'react';
import { Text, View, type ViewProps, type TextProps } from 'react-native';
import { cn } from '../../lib/utils';

const Card = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
    <View
        ref={ref}
        className={cn(
            'rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950',
            className
        )}
        {...props}
    />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
    <View
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
    <Text
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100', className)}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<Text, TextProps>(({ className, ...props }, ref) => (
    <Text
        ref={ref}
        className={cn('text-sm text-gray-500 dark:text-gray-400', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
    <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<View, ViewProps>(({ className, ...props }, ref) => (
    <View
        ref={ref}
        className={cn('flex flex-row items-center p-6 pt-0', className)}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
