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

  const logOff = async () => {
    signOut();
    router.push('/(modals)/login');
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        {isSignedIn && 
          <TouchableOpacity onPress={() => logOff()}>
            <Ionicons name="log-out-outline" size={28} />
          </TouchableOpacity>}
      </View>

      {user && (
        <View>
          <View style={styles.card}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            <TouchableOpacity onPress={onCaptureImage}>
              <Text style={styles.editText}>
                Change Photo
              </Text>
            </TouchableOpacity>
            {/* <View style={{ flexDirection: 'row', gap: 6 }}>
              {!edit && (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name="create-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
              {edit && (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName || ''}
                    onChangeText={setFirstName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName || ''}
                    onChangeText={setLastName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text>{email}</Text>
            <Text>Since {user?.createdAt!.toLocaleDateString()}</Text> */}
          </View>
          <View style={styles.frame}>
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
          </View>
          <View style={styles.settings}>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]}>
              <View style={styles.item}>
                <Ionicons name="person-circle-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                  My Profile
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]}>
              <View style={styles.item}>
                <Ionicons name="ribbon-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                  My Membership
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]}>
              <View style={styles.item}>
                <Ionicons name="notifications-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                  Notification Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]}>
              <View style={styles.item}>
                <Ionicons name="language-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                  Language Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, {borderBottomWidth: 1}]}>
              <View style={styles.item}>
                <Ionicons name="card-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                Payment Methods
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.row}>
              <View style={styles.item}>
                <Ionicons name="help-circle-outline" size={28} color={'#374151'}/>
                <Text style={styles.itemText}>
                  FAQ
                </Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={'#9CA3AF'} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {isSignedIn && <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />} */}
      {!isSignedIn && (
        <Link href={'/(modals)/login'} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 16,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 24,
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
