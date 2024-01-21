import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';

const events = [
  {
    title: 'Pilates',
    date: 'Saturday, Dec. 10',
    imgUrl: require('../../assets/images/Card.png'),
  },
  {
    title: 'Arm Strengthening',
    date: 'Saturday, Dec. 10',
    imgUrl: require('../../assets/images/Card-2.png'),
  },
  {
    title: 'Boxing',
    date: 'Saturday, Dec. 10',
    imgUrl: require('../../assets/images/Card-3.png'),
  },
];

const Page = () => {
  const { user } = useUser();
  const scrollRef = useRef<ScrollView>(null);
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');
  const [firstName, setFirstName] = useState(user?.firstName);
  const today = new Date().toISOString().substring(0, 10);

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
  }, [user]);

  return (
    <ScrollView
          ref={scrollRef}
          contentContainerStyle={{
            //flex: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}>
        
      {/* Define pour custom header */}
      {/* <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      /> */}
      {/* <ListingsMap listings={getoItems} /> */}
      {/* <ListingsBottomSheet listings={items} category={category} /> */}
          <DatePicker
            options={{
              defaultFont: 'mon',
              headerFont: 'mon-sb',
              textHeaderColor: '#111827',
              textSecondaryColor: '#9CA3AF',
              mainColor: '#111827',
              backgroundColor: '#F9FAFB',
              borderColor: 'transparent',
            }}
            current={today}
            selected={today}
            //onSelectedChange={date => setSelectedDate(date)}
            mode={'calendar'}
            style={{ borderRadius: 20, }}
          />
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Schedule
          </Text>
          <Text style={styles.date}>
            {today}
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 24, }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 24, width: 24, borderColor: Colors.primary, borderWidth: 4, borderRadius: 12 }}/>
            <View style={{ height: 88, width: 2, borderColor: Colors.grey, borderWidth: 1, borderStyle: 'dashed', }}/>
            <View style={{ height: 24, width: 24, borderColor: Colors.grey, borderWidth: 4, borderRadius: 12 }}/>
            <View style={{ height: 88, width: 2, borderColor: Colors.grey, borderWidth: 1, borderStyle: 'dashed', }}/>
            <View style={{ height: 24, width: 24, borderColor: Colors.grey, borderWidth: 4, borderRadius: 12 }}/>
          </View>
          <View style={styles.list}>
          {events.map((item, index) => (
            <TouchableOpacity
              key={index}
            >
              <Image source={item.imgUrl} style={styles.card} />
              <View style={styles.cardText}>
                <Text style={styles.title}>
                  {item.title}
                </Text>
                <View style={styles.detailsContainer}>
                <Ionicons name="calendar-outline" color={'#FFFFFF'} size={12} />
                  <Text style={styles.details}>
                    {item.date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    marginVertical: 32,
  },
  heading: {
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  name: {
    fontFamily: 'mon',
    fontSize: 16,
  },
  date: {
    color: '#96A0B5',
    fontFamily: 'mon',
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 24,
  },
  list: {
    display: 'flex',
    marginLeft: 24,
    gap: 30,
  },
  card: {
    display: 'flex',
    width: 318,
    //height: 96,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    //gap: 16,
    backgroundColor: Colors.grey,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardText: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 43,
    marginLeft: 12,
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  details: {
    color: '#FFFFFF',
    fontFamily: 'mon',
    fontSize: 12,
  },
});

export default Page;
