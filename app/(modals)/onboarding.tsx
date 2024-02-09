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
  '🔥 Burn fat',
  '💪 Build muscle',
  '🏋️‍♀️ Strength',
  '🤸 Flexibility',
  '👫 Community',
  '🌿 Overall health',
  '🏃‍♂️ Endurance',
  '⚡ Energy levels',
  '💢 Stress',
  '❤️ Cardiovascular health',
  '🏅 Athletic performance',
  '🧘 Mood',
  '🌙 Sleep quality',
  //'Improve balance',
  //'Tone muscles',
  //'Enhance athletic performance',
  '😎 Confidence',
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
  //var activeSection = 0;
  const [goals, setGoals] = useState(0);
  //const goals = useState([0]);

  const nextSection = (index: number) => {
    //setActiveSection(index + 1);
    console.log('Scroll')
    //activeSection = activeSection + index;
    //scrollRef.current?.scrollToEnd({animated: true});
    //scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * index, animated: true });
    if (activeSection > 2) {
      router.push('/(tabs)/home');
    }
    else {
      setActiveSection(index + 1);
      scrollRef.current?.scrollToEnd({animated: true});
      scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * index, animated: true });
      // currentSection?.measure((x) => {
      //   scrollRef.current?.scrollTo({ x: SCREEN_WIDTH, y: 0, animated: true });
      // });
    }
  };

  const selectGoal = (index: number) => {
    //goals.push(index)
    //const selected = itemsRef.current[index];
    setGoals(index);
    // if(goals.length > 2) {

    // }
    // if(goals.includes(index)) {
    //   goals.splice(index);
    // }
    // else {
    //   goals.push(index);
    // }
    //onSelect(goals);
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
    <View style={defaultStyles.container}>
      <ScrollView
        horizontal
        ref={scrollRef}
        pagingEnabled={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        //snapToStart={true}
      >
        <View style={{ width: SCREEN_WIDTH, padding: 24, }}
        >
          <Text style={styles.header}>
            Why are you joining Peak?
          </Text>
          <Text style={styles.subheader}>
            Pick up to three goals
          </Text>
          <View style={styles.options}>
            {options.map((item, index) => (
                <TouchableOpacity
                  //ref={(el) => (itemsRef.current[index] = el)}
                  key={index}
                  style={[styles.optionButton, { 
                    backgroundColor: goals === index ? Colors.primary : '#FFFFFF',
                    borderColor: goals === index ? '#FFFFFF' : '#9CA3AF',
                  }]}
                  onPress={() => selectGoal(index)}>
                  <Text style={[styles.optionText, {color: goals === index ? '#FFFFFF' : '#111827'}]}>
                    {options[index]}
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
      <View style={styles.footer}>
          <TouchableOpacity 
            style={[defaultStyles.btn, { flex: 1, paddingHorizontal: 16, paddingVertical: 8,}]}
            onPress={() => nextSection(activeSection)}
          >
            <Text style={defaultStyles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: SCREEN_WIDTH,
  },
  options: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 47,
    gap: 16,
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
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 34,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
});
