import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

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

  const scrollRef = useRef<ScrollView>(null);
  const sectionRef = useRef<Array<View | null>>([]);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSection = (index: number) => {
    const currentSection = sectionRef.current[index];
    setActiveSection(index + 1);
    if (activeSection > 2) {
      router.push('/(tabs)/home');
    }
    else {
      currentSection?.measure((x) => {
        scrollRef.current?.scrollTo({ x: -1 * SCREEN_WIDTH, y: 0, animated: true });
      });
    }
  };

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
    <View>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={{ width: SCREEN_WIDTH }}>
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
                  <Text style={[styles.optionText, {color: activeIndex === index ? '#FFFFFF' : '#111827'}]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ width: SCREEN_WIDTH }}>
          <Text style={styles.header}>
            Tell us about yourself
          </Text>
          <Text style={styles.subheader}>
            We’d like the following information to provide more accurate results
          </Text>
          <View style={styles.inputGroup}>
            <TextInput
                style={styles.input}
                placeholder="Height"
                placeholderTextColor={'#111827'}
            />
            <TextInput
                style={styles.input}
                placeholder="Weight"
                placeholderTextColor={'#111827'}
            />
          </View>
        </View>
        <View style={{ width: SCREEN_WIDTH }}>
          <Text style={styles.header}>
            Give your coach some final details
          </Text>
          <Text style={styles.subheader}>
            This information helps your coach design a training journey.
          </Text>
          <View style={styles.inputGroup}>
            <TextInput
                style={styles.input}
                placeholder="Gender"
                placeholderTextColor={'#111827'}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                placeholderTextColor={'#111827'}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={[defaultStyles.btn, { position: 'absolute', bottom: 32, alignSelf: 'stretch' }]}
        onPress={() => nextSection(activeSection)}
      >
        <Text style={defaultStyles.btnText}>Next</Text>
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
    flexDirection: 'row',
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
  inputGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    marginTop: 32,
  },
  input: {
    display: 'flex',
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
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
    marginTop: 8,
  },
});
