import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const Page = () => {
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
        <Text style={styles.label}>
          Your Current Language
        </Text>
        <View style={styles.item}>
          <View style={[styles.languageContainer]}>
            <Text style={{ fontSize: 26 }}>
              🇬🇧
            </Text>
            <Text style={styles.language}>
              Mandarin
            </Text>
          </View>
          <Ionicons name="checkmark" size={20} color={Colors.primary}/>
        </View>
        <Text style={styles.label}>
          All Languages
        </Text>
        <TouchableOpacity style={styles.item}>
          <View style={styles.languageContainer}>
            <Text style={{ fontSize: 26 }}>
              🇪🇸
            </Text>
            <Text style={styles.language}>
              Espanol
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.languageContainer}>
            <Text style={{ fontSize: 26 }}>
              🇫🇷
            </Text>
            <Text style={styles.language}>
              Francais
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.languageContainer}>
            <Text style={{ fontSize: 26 }}>
              🇨🇳
            </Text>
            <Text style={styles.language}>
              Mandarin
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: 24,
    gap: 2,
  },
  label: {
    color: '#4B5563',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    height: 64,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
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
