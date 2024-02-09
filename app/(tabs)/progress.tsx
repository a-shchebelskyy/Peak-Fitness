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
        <View>
          <View style={styles.card}>
          <Ionicons name="chevron-back-circle" size={40} color={Colors.primary}/>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            <Ionicons name="chevron-forward-circle" size={40} color={Colors.primary}/>
          </View>
          <View style={{ display: 'flex', alignItems: 'center'}}>
            <Text style={styles.statText}>
              1,239
            </Text>
            <Text style={styles.statLabel}>
              Steps
            </Text>
          </View>
          {/* <View style={styles.frame}>
            <View style={styles.element}>
              <View style={styles.circle}>
                <Text style={styles.icon}>
                  🏃
                </Text>
              </View>
              <View style={styles.labels}>
                <Text style={styles.statText}>
                  1200
                </Text>
                <Text style={styles.elementLabel}>
                  steps
                </Text>
              </View>
            </View>
            <View style={styles.element}>
              <View style={styles.circle}>
                <Text style={styles.icon}>
                  💧
                </Text>
              </View>
              <View style={styles.labels}>
                <Text style={styles.statText}>
                  2000
                </Text>
                <Text style={styles.elementLabel}>
                  ml
                </Text>
              </View>
            </View>
            <View style={styles.element}>
              <View style={styles.circle}>
                <Text style={styles.icon}>
                  🔥
                </Text>
              </View>
              <View style={styles.labels}>
                <Text style={styles.statText}>
                  500
                </Text>
                <Text style={styles.elementLabel}>
                  cals
                </Text>
              </View>
            </View>
          </View> */}
          <View style={styles.settings}>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]} onPress={() => router.push('/settings/profile')}>
              <View style={styles.item}>
              <Text style={styles.itemText}>
                 🏃
                </Text>
                <Text style={styles.itemText}>
                  Track Steps
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]} onPress={() => router.push('/settings/notifications')}>
              <View style={styles.item}>
              <Text style={styles.itemText}>
              🩸
                </Text>
                <Text style={styles.itemText}>
                  Track Menstrual Health
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]} onPress={() => router.push('/settings/payments')}>
              <View style={styles.item}>
              <Text style={styles.itemText}>
              💧
                </Text>
                <Text style={styles.itemText}>
                Track Water Intake
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => router.push('/settings/faq')}>
              <View style={styles.item}>
                <Text style={styles.itemText}>
                🔥
                </Text>
                <Text style={styles.itemText}>
                  Track Calories Burned
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 24,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.grey,
  },
  statText: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 40,
  },
  statLabel: {
    color: '#9CA3AF',
    fontFamily: 'mon-sb',
    fontSize: 19,
  },



  editText: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  frame: {
    justifyContent: 'center',
    //alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 36,
    gap: 20,
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
  icon: {
    fontSize: 24,
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  // statText: {
  //   color: '#111827',
  //   fontFamily: 'mon-sb',
  //   fontSize: 16,
  // },
  elementLabel: {
    color: '#9CA3AF',
    fontFamily: 'mon-sb',
    fontSize: 12,
  },
  settings: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 24,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
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
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemText: {
    color: '#374151',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
});

export default Page;
