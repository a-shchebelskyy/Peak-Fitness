import { useLocalSearchParams, useNavigation, useRouter, Link } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share } from 'react-native';
import listingsData from '@/assets/data/airbnb-listings.json';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { defaultStyles } from '@/constants/Styles';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = SCREEN_WIDTH * 0.84;

const DetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const listing = (listingsData as any[]).find((item) => item.id === id);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const scrollOffset = useScrollViewOffset(scrollRef);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.image}>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.title}>
                Arm Strengthening
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="time-outline" size={16} color={'#9CA3AF'}/>
                <Text style={styles.time}>
                  Thursday, Mar 10 · 5:00 PM
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeading}>
              <Text style={styles.heading}>
                Customer Information
              </Text>
              <Link href={'/settings/profile'} asChild>
                <Text style={styles.link}>
                  Change
                </Text>
              </Link>
            </View>
            <View style={styles.infoList}>
              <View style={styles.item}>
                <Text style={styles.label}>
                  First Name
                </Text>
                <Text style={styles.text}>
                  Alexander
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>
                  Email
                </Text>
                <Text style={styles.text}>
                  alexanders823@gmail.com
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.label}>
                  Phone Number
                </Text>
                <Text style={styles.text}>
                  +1 647-784-2795
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeading}>
              <Text style={styles.heading}>
                Payment Method
              </Text>
              <Link href={'/(modals)/payments'} asChild>
                <Text style={styles.link}>
                  Change
                </Text>
              </Link>
            </View>
            <View style={styles.card}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Ionicons name="card" size={40} color={'#9CA3AF'}/>
                <View style={{ gap: 4 }}>
                  <Text style={styles.title}>
                    Mastercard
                  </Text>
                  <Text style={styles.labelNumber}>
                    **** **** **** 1123
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeading}>
              <Text style={styles.heading}>
                Billing
              </Text>
            </View>
            <View style={styles.card}>
              <View style={styles.infoList}>
                <View style={styles.item}>
                  <Text style={styles.label}>
                    Personal Training
                  </Text>
                  <Text style={styles.text}>
                    $25.00
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.label}>
                    Service Fee
                  </Text>
                  <Text style={styles.text}>
                    $2.50
                  </Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.item}>
                  <Text style={styles.label}>
                    Total
                  </Text>
                  <Text style={styles.heading}>
                    $27.50
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View entering={SlideInDown.delay(200)}>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[defaultStyles.btn, { flex: 1, paddingHorizontal: 16, paddingVertical: 8,}]}
          >
            <Text style={defaultStyles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
    gap: 24,
    backgroundColor: '#fff',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 16,
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
  },
  image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#E5E7EB'
  },
  cardText: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  time: {
    color: '#9CA3AF',
    fontFamily: 'mon',
    fontSize: 12,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 16,
  },
  infoHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  heading: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  link: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  infoList: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    gap: 12,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  label: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 14,
  },
  labelNumber: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 12,
  },
  text: {
    color: '#111827',
    fontFamily: 'mon',
    fontSize: 14,
  },
  paymentCard: {
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

  divider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginBottom: 34,
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
});

export default DetailsPage;
