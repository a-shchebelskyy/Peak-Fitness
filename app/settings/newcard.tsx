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
import { useRouter, Link } from 'expo-router';
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
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [postal, setPostal] = useState('');

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }
  }, [user]);

  // Update Clerk user data
  const onSave = async () => {
    try {
    } catch (error) {
      console.log(error);
    } finally {
      router.back();
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.name}>
            Name On Card
          </Text>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1, fontFamily: 'mon', fontSize: 16  }}
              placeholder="Name"
              placeholderTextColor={'#9CA3AF'}
              onChangeText={setName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.name}>
            Card Number
          </Text>
          <View style={styles.input}>
            <TextInput
              style={{ fontFamily: 'mon', fontSize: 16 }}
              placeholder="0000 0000 0000"
              placeholderTextColor={'#9CA3AF'}
              inputMode='numeric'
              maxLength={16}
              onChangeText={setNumber}
            />
            <Ionicons name="card-outline" size={24} color={'#9CA3AF'}/>
          </View>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 24}}>
          <View style={styles.inputContainer}>
            <Text style={styles.name}>
              Expiration
            </Text>
            <View style={styles.input}>
              <TextInput
                style={{ fontFamily: 'mon', fontSize: 16  }}
                placeholder="MM/YY"
                placeholderTextColor={'#9CA3AF'}
                inputMode='numeric'
                maxLength={4}
                onChangeText={setExpiry}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.name}>
              CVC
            </Text>
            <View style={styles.input}>
              <TextInput
                style={{ fontFamily: 'mon', fontSize: 16  }}
                placeholder="123"
                placeholderTextColor={'#9CA3AF'}
                inputMode='numeric'
                maxLength={3}
                onChangeText={setCVC}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.name}>
            Postal Code
          </Text>
          <View style={styles.input}>
            <TextInput
              style={{ flex: 1, fontFamily: 'mon', fontSize: 16  }}
              placeholder="X1X 1X1"
              placeholderTextColor={'#9CA3AF'}
              autoCapitalize='characters'
              maxLength={6}
              onChangeText={setPostal}
            />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
        style={[defaultStyles.btn, { marginTop: 258, marginHorizontal: 24 }]}
        onPress={onSave}
      >
        <Text style={defaultStyles.btnText}>Save</Text>
      </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    marginHorizontal: 24,
    paddingTop: 16,
    gap: 24,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 12,
  },
  name: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 56,
    minWidth: SCREEN_WIDTH/2 - 36,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
});

export default Page;
