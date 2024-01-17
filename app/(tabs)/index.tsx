import { View, Text, Image, StyleSheet} from 'react-native';
import React, { useMemo, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';
import listingsData from '@/assets/data/airbnb-listings.json';
import ListingsMap from '@/components/ListingsMap';
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const { user } = useUser();
  const items = useMemo(() => listingsData as any, []);
  const getoItems = useMemo(() => listingsDataGeo, []);
  const [category, setCategory] = useState<string>('Tiny homes');
  const [firstName, setFirstName] = useState(user?.firstName);

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
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', paddingTop: 44, paddingHorizontal: 24,}}>
      {/* Define pour custom header */}
      {/* <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      /> */}
      {/* <ListingsMap listings={getoItems} /> */}
      {/* <ListingsBottomSheet listings={items} category={category} /> */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
        <Text style={styles.heading}>
          Hello,
        </Text>
        <Text style={styles.name}>
          {firstName}
        </Text>
        </View>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
      </View>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Upcoming Activities
          </Text>
          <Text style={styles.link}>
            View All
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 16, }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ height: 24, width: 24, borderColor: Colors.primary, borderWidth: 4, borderRadius: 12 }}/>
            <View style={{ height: 88, width: 2, borderColor: Colors.grey, borderWidth: 1, borderStyle: 'dashed', }}/>
            <View style={{ height: 24, width: 24, borderColor: Colors.grey, borderWidth: 4, borderRadius: 12 }}/>
            <View style={{ height: 88, width: 2, borderColor: Colors.grey, borderWidth: 1, borderStyle: 'dashed', }}/>
            <View style={{ height: 24, width: 24, borderColor: Colors.grey, borderWidth: 4, borderRadius: 12 }}/>
          </View>
          <View style={styles.list}>
            <View>
              <Image source={require('../../assets/images/Card.png')} style={styles.card} />
              <View style={styles.cardText}>
                <Text style={styles.title}>
                  Pilates
                </Text>
                <View style={styles.detailsContainer}>
                <Ionicons name="calendar-outline" color={'#FFFFFF'} size={12} />
                  <Text style={styles.details}>
                    Saturday, Dec. 10
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Image source={require('../../assets/images/Card-2.png')} style={styles.card} />
              <View style={styles.cardText}>
                <Text style={styles.title}>
                  Pilates
                </Text>
                <View style={styles.detailsContainer}>
                <Ionicons name="calendar-outline" color={'#FFFFFF'} size={12} />
                  <Text style={styles.details}>
                    Saturday, Dec. 10
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Image source={require('../../assets/images/Card-3.png')} style={styles.card} />
              <View style={styles.cardText}>
                <Text style={styles.title}>
                  Pilates
                </Text>
                <View style={styles.detailsContainer}>
                <Ionicons name="calendar-outline" color={'#FFFFFF'} size={12} />
                  <Text style={styles.details}>
                    Saturday, Dec. 10
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 26,
  },
  greetingContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  heading: {
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  name: {
    fontFamily: 'mon',
    fontSize: 16,
  },
  link: {
    color: Colors.primary,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
