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
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={20} color={'#4B5563'}/>
        <TextInput
          style={{ fontFamily: 'mon', fontSize: 14 }}
          placeholder="Search"
          placeholderTextColor={'#9CA3AF'}
        />
      </View>
      <View style={styles.divider}/>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>
            PINNED
          </Text>
          <TouchableOpacity style={styles.message}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            <View style={{ display: 'flex', alignItems: 'flex-start', gap: 4, }}>
              <View style={styles.textLine}>
                <Text style={styles.textTitle}>
                  Yoga Team
                </Text>
                <Text style={styles.textInactive}>
                  Saturday
                </Text>
              </View>
              <View style={styles.textLine}>
                <Text style={styles.textInactive}>
                  Wow really cool! 🔥
                </Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
        <View>
          <Text style={styles.label}>
            ALL MESSAGES
          </Text>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    margin: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB'
  },
  divider: {
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 24,
    gap: 16,
  },
  label: {
    color: '#9CA3AF',
    fontFamily: 'mon-sb',
    fontSize: 10,
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.grey,
  },
  textLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  textTitle: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  textInactive: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 12,
  },
  textActive: {
    color: Colors.primary,
    fontFamily: 'mon',
    fontSize: 12,
  },
});

export default Page;
