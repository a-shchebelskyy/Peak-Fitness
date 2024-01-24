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
      router.back();
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
      {/* <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        {isSignedIn && 
          <TouchableOpacity onPress={() => signOut()}>
            <Ionicons name="log-out-outline" size={28} />
          </TouchableOpacity>}
      </View> */}

      {user && (
          <View style={styles.card}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            <TouchableOpacity onPress={onCaptureImage}>
              <Text style={styles.editText}>
                Change Photo
              </Text>
            </TouchableOpacity>
              {/* {!edit && (
                <View style={styles.editRow}>
                  <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons name="create-outline" size={24} color={Colors.dark} />
                  </TouchableOpacity>
                </View>
              )} */}
              {edit && (
                <View style={styles.settings}>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      First Name
                    </Text>
                    <TextInput
                      value={firstName || ''}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Last Name
                    </Text>
                    <TextInput
                      value={lastName || ''}
                      onChangeText={setLastName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Phone Number
                    </Text>
                    <TextInput
                      value={'+16477842795'}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Date of Birth
                    </Text>
                    <TextInput
                      value={'March 29, 1996'}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Height
                    </Text>
                    <TextInput
                      value={'183.0 cm'}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Weight
                    </Text>
                    <TextInput
                      value={'73.0 kg'}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  <View style={styles.editRow}>
                    <Text style={styles.label}>
                      Gender
                    </Text>
                    <TextInput
                      value={'Male'}
                      onChangeText={setFirstName}
                      style={{ fontFamily: 'mon-sb' }}
                    />
                  </View>
                  {/* <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons name="checkmark-outline" size={24} />
                  </TouchableOpacity> */}
                </View>
              )}
            {/* <Text>{email}</Text>
            <Text>Since {user?.createdAt!.toLocaleDateString()}</Text> */}
        </View>
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
  label: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 14,
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
