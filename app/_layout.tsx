import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Home — Product List */}
        <Stack.Screen
          name="index"
          options={{
            title: 'Storekeeper App',
            headerShown: true,
          }}
        />

        {/* Add Product */}
        <Stack.Screen
          name="add"
          options={{
            title: 'Add New Product',
            headerShown: true,
          }}
        />

        {/* Edit Product */}
        <Stack.Screen
          name="edit"
          options={{
            title: 'Edit Product',
            headerShown: true,
          }}
        />

        {/* Settings / Info */}
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: true,
          }}
        />
      </Stack>

      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
