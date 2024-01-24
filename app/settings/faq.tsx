import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const categories = [
  {
    name: 'Get Started',
  },
  {
    name: 'Account',
    q1: 'How can I reset my password',
    q2: 'How can I change my email?',
    q3: 'How can I unsubscribe from emails?',
    q4: 'How can I adjust my calendar & \nnotification settings?',
    a1: 'To reset your password, go to the login page of the app or website and click on the "Forgot Password" or "Reset Password" link. Enter the email address associated with your account and follow the verification process, which may include receiving a verification code via email or text message. Once verified, you will be prompted to create a new password. Make sure it is secure and unique.',
  },
  {
    name: 'Booking',
  },
  {
    name: 'Billing',
  },
  {
    name: 'Subscription',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const Page = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const questionRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    onCategoryChanged(categories[index].name);
  };

  const selectQuestion = (index: number) => {
    if (activeQuestion == index) {
      setActiveQuestion(0);
    }
    else {
      setActiveQuestion(index);
    }
  };

  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(true);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Top Questions
        </Text>
        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              //style={[styles.categoryBtn, { backgroundColor: activeIndex === index ? Colors.primary: '#FFFFFF'}]}
              style={activeIndex === index ? styles.categoryActive : styles.categoryInactive}
              onPress={() => selectCategory(index)}>
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryTextInactive}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.content}>
          <TouchableOpacity
              style={styles.item}
              onPress={() => selectQuestion(1)}
          >
            <View style={[styles.itemTextContainer, { borderBottomWidth: activeQuestion == 1 ? 1 : 0 }]}>
              <Text style={activeQuestion == 1 ? styles.itemTextActive : styles.itemTextInactive}>
                {categories[1].q1}
              </Text>
              <Ionicons name={activeQuestion == 1 ? 'chevron-up-outline' : 'chevron-down-outline'} size={16} color={activeQuestion == 1 ? '#111827' : '#9CA3AF'} />
            </View>
            {activeQuestion == 1 && (
            <Text style={styles.itemTextInactive}>
              {categories[1].a1}
            </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.item}
              onPress={() => selectQuestion(2)}
          >
            <View style={[styles.itemTextContainer, { borderBottomWidth: activeQuestion == 2 ? 1 : 0 }]}>
              <Text style={activeQuestion == 2 ? styles.itemTextActive : styles.itemTextInactive}>
                {categories[1].q2}
              </Text>
              <Ionicons name={activeQuestion == 2 ? 'chevron-up-outline' : 'chevron-down-outline'} size={16} color={activeQuestion == 2 ? '#111827' : '#9CA3AF'} />
            </View>
            {activeQuestion == 2 && (
            <Text style={styles.itemTextInactive}>
              {categories[1].a1}
            </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.item}
              onPress={() => selectQuestion(3)}
          >
            <View style={[styles.itemTextContainer, { borderBottomWidth: activeQuestion == 3 ? 1 : 0 }]}>
              <Text style={activeQuestion == 3 ? styles.itemTextActive : styles.itemTextInactive}>
                {categories[1].q3}
              </Text>
              <Ionicons name={activeQuestion == 3 ? 'chevron-up-outline' : 'chevron-down-outline'} size={16} color={activeQuestion == 3 ? '#111827' : '#9CA3AF'} />
            </View>
            {activeQuestion == 3 && (
            <Text style={styles.itemTextInactive}>
              {categories[1].a1}
            </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.item}
              onPress={() => selectQuestion(4)}
          >
            <View style={[styles.itemTextContainer, { borderBottomWidth: activeQuestion == 4 ? 1 : 0 }]}>
              <Text style={activeQuestion == 4 ? styles.itemTextActive : styles.itemTextInactive}>
                {categories[1].q4}
              </Text>
              <Ionicons name={activeQuestion == 4 ? 'chevron-up-outline' : 'chevron-down-outline'} size={16} color={activeQuestion == 4 ? '#111827' : '#9CA3AF'} />
            </View>
            {activeQuestion == 4 && (
            <Text style={styles.itemTextInactive}>
              {categories[1].a1}
            </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 8,
    gap: 24,
  },
  title: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 28,
  },
  categoryActive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 18,
    backgroundColor: Colors.primary,
  },
  categoryInactive: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontFamily: 'mon-sb',
    fontSize: 12,
  },
  categoryTextInactive: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 12,
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 55,
    width: SCREEN_WIDTH - 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  itemTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    //paddingVertical: 16,
    gap: 12,
    borderColor: '#E5E7EB',
  },
  itemTextInactive: {
    color: '#111827',
    fontFamily: 'mon',
    fontSize: 14,
    paddingVertical: 16,
  },
  itemTextActive: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 14,
    paddingVertical: 16,
  },


  label: {
    color: '#4B5563',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  languageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  language: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-sb',
    fontSize: 28,
  },
  card: {
    backgroundColor: '#fff',
    //padding: 20,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 48,
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editText: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  editRow: {
    //flex: 1,
    //flexDirection: 'row',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 56,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  element: {
    display: 'flex',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    display: 'flex',
    width: 40,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  elementLabel: {
    color: '#9CA3AF',
    fontFamily: 'mon-sb',
    fontSize: 12,
  },
  settings: {
    display: 'flex',
    //flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 24,
    width: SCREEN_WIDTH,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    //borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemText: {
    color: '#374151',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
});

export default Page;
