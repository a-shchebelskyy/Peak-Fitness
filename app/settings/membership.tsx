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
    name: 'Basic',
    color: '#FEDA00',
    description: 'Access to a vast library of personalized workout plans catering to various fitness levels and goals.',
    price: 0.00,
    feature1: 'Free 30 Day Trial',
    feature2: 'Priority Support',
  },
  {
    name: 'Premium',
    color: '#0024FE',
    description: 'Access to a vast library of personalized workout plans catering to various fitness levels and goals.',
    price: 119.99,
    feature1: 'Free 30 Day Trial',
    feature2: 'Priority Support',
  },
  {
    name: 'Pro',
    color: '#111827',
    description: 'Access to a vast library of personalized workout plans catering to various fitness levels and goals.',
    price: 199.99,
    feature1: 'Free 30 Day Trial',
    feature2: 'Priority Support',
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
      router.push('/(tabs)/');
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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={styles.headerContainer}>
      <Text style={styles.header}>
        Peak Subscription
      </Text>
      <Text style={styles.subheader}>
        Access to customized training plans, chat with personal fitness trainers, and discounted sessions.
      </Text>
      </View>
      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        snapToInterval={SCREEN_WIDTH * 0.76 + 24}
      >
        {options.map((item, index) => (
                  // <TouchableOpacity
                  //   ref={(el) => (itemsRef.current[index] = el)}
                  //   key={index}
                  //   style={[styles.optionButton, { 
                  //     backgroundColor: activeIndex === index ? Colors.primary : '#FFFFFF',
                  //     borderColor: activeIndex === index ? '#FFFFFF' : '#9CA3AF',
                  //   }]}
                  //   onPress={() => selectOption(index)}>
                  //   <Text style={[styles.optionText, {color: activeIndex === index ? '#FFFFFF' : '#111827'}]}>
                  //     {item.name}
                  //   </Text>
                  // </TouchableOpacity>
        <View 
          key={index}
          style={[styles.card, { backgroundColor: item.color, borderColor: item.color }]}
        >
          <View style={styles.inner}>
            <Text style={styles.title}>
              {item.name}
            </Text>
            <Text style={styles.description}>
              {item.description}
            </Text>
            <View style={styles.price}>
              <Text style={styles.dollar}>
                $
              </Text>
              <Text style={styles.amount}>
                {item.price}
              </Text>
            </View>
            <View style={styles.featuresContainer}>
              <View style={[styles.feature, {borderBottomWidth: 1}]}>
                <Ionicons name="checkmark-circle-outline" size={16} />
                <Text style={styles.featureText}>
                  {item.feature1}
                </Text>
              </View>
              <View style={styles.feature}>
                <Ionicons name="checkmark-circle-outline" size={16} />
                <Text style={styles.featureText}>
                  {item.feature2}
                </Text>
              </View>
            </View>
          </View>
          <View>

          </View>
        </View>
         ))}
      </ScrollView>
      <TouchableOpacity style={[defaultStyles.btn, { bottom: 50, alignSelf: 'stretch', marginHorizontal: 24, }]}>
        <Text style={defaultStyles.btnText}>Activate Now</Text>
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
    //flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 26,
    paddingHorizontal: SCREEN_WIDTH * 0.12,
    gap: 24,
  },
  card: {
    width: SCREEN_WIDTH * 0.76,
    height: SCREEN_WIDTH * 0.96,
    //padding: 2,
    borderRadius: 12,
    borderWidth: 2,
    //backgroundColor: '#0024FE',
    //borderColor: '#0024FE'
  },
  inner: {
    display: 'flex',
    height: SCREEN_WIDTH * 0.96 - 46,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#FFFFFF',
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
    display: 'flex',
    paddingHorizontal: 40,
    marginTop: 24,
    gap: 8,
  },
  header: {
    color: '#111827',
    fontFamily: 'mon-sb',
    textAlign: 'center',
    fontSize: 24,
  },
  subheader: {
    color: '#6B7280',
    fontFamily: 'mon',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
  title: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 40,
  },
  description: {
    color: '#4B5563',
    fontFamily: 'mon',
    fontSize: 12,
  },
  price: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
  },
  dollar: {
    color: '#9CA3AF',
    fontFamily: 'mon',
    fontSize: 24,
    marginTop: 6,
  },
  amount: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 48,
  },
  featuresContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 6,
  },
  feature: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 2,
    paddingVertical: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 8,
    borderColor: '#E5E7EB',
  },
  featureText: {
    display: 'flex',
    justifyContent: 'center',
    color: '#111827',
    fontFamily: 'mon',
    fontSize: 14,
  },
});
