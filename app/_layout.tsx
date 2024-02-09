import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import ModalHeaderText from '@/components/ModalHeaderText';
import { TouchableOpacity } from 'react-native';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/intro');
    }
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/intro"
        options={{
          presentation: 'card',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/signin"
        options={{
          presentation: 'containedModal',
          title: '',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/signup"
        options={{
          presentation: 'card',
          title: 'Create an Account',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/onboarding"
        options={{
          presentation: 'card',
          title: 'Lets get to know you',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
      <Stack.Screen
        name="settings/profile"
        options={{
          presentation: 'card',
          title: 'My Profile',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
              }}>
              <Ionicons name="create-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/membership"
        options={{
          presentation: 'card',
          title: 'My Membership',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/notifications"
        options={{
          presentation: 'card',
          title: 'Notification Settings',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/language"
        options={{
          presentation: 'card',
          title: 'Language Settings',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/payments"
        options={{
          presentation: 'card',
          title: 'Payment Methods',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/newcard"
        options={{
          presentation: 'card',
          title: 'Add New Card',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/editcard"
        options={{
          presentation: 'card',
          title: 'Edit Card',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="settings/faq"
        options={{
          presentation: 'card',
          title: 'FAQ',
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerTitle: "",
          //(props) => <ModalHeaderText />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              >
              <Ionicons name="close-outline" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/schedule"
        options={{
          presentation: 'card',
          headerTitle: 'Schedule',
          //(props) => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                // backgroundColor: '#fff',
                // borderColor: Colors.grey,
                // borderRadius: 20,
                // borderWidth: 1,
                padding: 4,
              }}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/payments"
        options={{
          presentation: 'modal',
          headerTitle: 'Payment Method',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="booking/book"
        options={{
          presentation: 'card',
          headerTitle: 'Book',
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
