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

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <View style={styles.category}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Credit/Debit Cards
            </Text>
            <Link href={'/settings/newcard'} asChild>
              <Text style={styles.link}>
                Add New
              </Text>
            </Link>
          </View>
          <View style={styles.list}>
            <TouchableOpacity style={styles.item} onPress={() => router.push('/settings/editcard')}>
              <View style={styles.cardContainer}>
                <Ionicons name="card" size={40} color={'#9CA3AF'}/>
                <View>
                  <Text style={styles.card}>
                    Mastercard
                  </Text>
                  <Text style={styles.number}>
                    **** **** **** 1123
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={'#9CA3AF'}/>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.item}>
              <View style={styles.cardContainer}>
                <Ionicons name="card" size={40} color={'#9CA3AF'}/>
                <View>
                  <Text style={styles.card}>
                    Visa
                  </Text>
                  <Text style={styles.number}>
                    **** **** **** 1123
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={'#9CA3AF'}/>
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={styles.category}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>
              Bank Accounts
            </Text>
            <Link href={'/(modals)/schedule'} asChild>
              <Text style={styles.link}>
                Add New
              </Text>
            </Link>
          </View>
          <View style={styles.list}>
            <TouchableOpacity style={styles.item}>
              <View style={styles.cardContainer}>
                <Ionicons name="card" size={40} color={'#9CA3AF'}/>
                <View>
                  <Text style={styles.card}>
                    Bank of America
                  </Text>
                  <Text style={styles.number}>
                    **** **** **** 1123
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={'#9CA3AF'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={styles.cardContainer}>
                <Ionicons name="card" size={40} color={'#9CA3AF'}/>
                <View>
                  <Text style={styles.card}>
                    Citi Bank
                  </Text>
                  <Text style={styles.number}>
                    **** **** **** 1123
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={'#9CA3AF'}/>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: 24,
    gap: 24,
  },
  category: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 16,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  heading: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  link: {
    color: Colors.primary,
    fontFamily: 'mon',
    fontSize: 14,
  },
  list: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  card: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  number: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 12,
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
});

export default Page;
