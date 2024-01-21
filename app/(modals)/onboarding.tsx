import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
}

const options = [
  {
    name: 'Fitness',
  },
  {
    name: 'Motivation',
  },
  {
    name: 'Discipline',
  },
  {
    name: 'Community',
  },
  {
    name: 'Wellness',
  },
  {
    name: 'Accountability',
  },
  {
    name: 'Stress Management',
  },
  {
    name: 'Goal',
  },
  {
    name: 'Health',
  },
  {
    name: 'Results',
  },
  {
    name: 'Progress',
  },
  {
    name: 'Tracking',
  },
];

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectOption = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    //onCategoryChanged(categories[index].name);
  };

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
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        What’s your primary reason for joining Peak?
      </Text>
      <View style={styles.options}>
        {options.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={[styles.optionButton, { 
                backgroundColor: activeIndex === index ? Colors.primary : '#FFFFFF',
                borderColor: activeIndex === index ? '#FFFFFF' : '#9CA3AF',
              }]}
              onPress={() => selectOption(index)}>
              {/* <Ionicons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? Colors.primary : Colors.grey}
              /> */}
              <Text style={[styles.optionText, {color: activeIndex === index ? '#FFFFFF' : '#111827'}]}>
                {item.name}
              </Text>
            </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={[defaultStyles.btn, { position: 'absolute', width: SCREEN_WIDTH - 48, bottom: 32, alignSelf: 'center' }]}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 24 }]}
      />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
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

      {/* <View style={{ gap: 20 }}> */}
        {/* <TouchableOpacity style={styles.btnOutline}>
          <Ionicons name="mail-outline" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
          <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Sign in with Apple</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity> */}
      {/* </View> */}
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
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 47,
    gap: 8,
  },
  optionButton: {
    display: 'flex',
    justifyContent: 'center',
    height: 40,
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    //borderColor: '#9CA3AF',
  },
  optionText: {
    fontFamily: 'mon-sb',
    color: '#FFFFFF', 
    fontSize: 16,
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
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  header: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 24,
    textAlign: 'center',
  },
  subheader: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 16,
  },
});
