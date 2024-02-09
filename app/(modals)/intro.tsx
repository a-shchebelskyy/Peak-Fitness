import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Image, View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
}
const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
        //router.push('/(modals)/onboarding');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/hero.png')}
        style={{ position: 'absolute', top: 80, display: 'flex', alignSelf: 'center', width: 432, height: 432 }}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          Welcome to Peak
        </Text>
        <Text style={styles.subheader}>
          One app for all things fitness
        </Text>
      </View>
{/* onPress={() => router.push('/(modals)/onboarding')} */}

      {/* <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or sign in with</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: Colors.grey,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View> */}

      <View style={{ gap: 12 }}>
        <TouchableOpacity style={defaultStyles.btn} onPress={() => router.push('/(modals)/signup')}>
          <Text style={defaultStyles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} />
          <Text style={styles.btnOutlineText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDark} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} color={'#FFF'}/>
          <Text style={styles.btnDarkText}>Sign in with Apple</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 8,}}>
        <Text style={styles.signin}>
          Already have an account?
        </Text>
        <Link href={'/(modals)/signin'} asChild>
          <Text style={defaultStyles.link}>
            Sign In
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon',
    color: '#6B7280', 
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  btnDark: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 480,
    marginBottom: 36,
  },
  header: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 28,
  },
  subheader: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 16,
  },
  signin: {
    color: '#111827',
    fontFamily: 'mon',
    fontSize: 16,
  },
});
