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
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const Layout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarActiveTintColor: Colors.primary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderRadius: 40,
          borderTopWidth: 0,
          shadowColor: '#000000',
          shadowOffset: {width: 0, height: -8},
          shadowOpacity: 0.1,
          shadowRadius: 22,
          marginBottom: 24,
          marginHorizontal: 10,
          paddingBottom: 0,
          backgroundColor: '#ffffff',
          position: 'absolute',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="trending-up-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          
          tabBarIcon: ({ size, color }) => (
            <TouchableOpacity 
              style={{
                display: 'flex',
                height: 60,
                width: 60,
                marginBottom: 60,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 3,
                borderColor: '#FFFFFF',
                backgroundColor: Colors.primary,
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.1,
                shadowRadius: 18,
              }}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Ionicons name="search" size={30} color={'#FFFFFF'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbox-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
