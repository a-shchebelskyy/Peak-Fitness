import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = SCREEN_WIDTH * 0.84;

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

const DetailsPage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const listing = (listingsData as any[]).find((item) => item.id === id);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [readMore, setReadMore] = useState(false);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View style={styles.header}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 0], [0, 1]),
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                Personal Trainer
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="star" size={18} color={Colors.primary} />
                <Text style={styles.ratings}>
                  {(listing.review_scores_rating / 20).toFixed(1)} ({listing.review_scores_rating})
                </Text>
              </View>
            </View>
            <Text style={styles.name}>{listing.name}</Text>
            <Text style={styles.ratings}>
              In-Person · Active Workout
            </Text>
          </View>
          {/* <Text style={styles.location}>
            {listing.room_type} in {listing.smart_location}
          </Text> */}
          {/* <Text style={styles.rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed ·{' '}
            {listing.bathrooms} bathrooms
          </Text> */}
          {/* <View style={{ flexDirection: 'row', gap: 4 }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View> */}
          <View style={styles.divider} />

          {/* <View style={styles.hostView}>
            <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View> */}
          {listing.description.length > 120 && readMore == false ? (
            <View>
              <Text style={styles.description}>
                {listing.description.slice(0, 120)}
              </Text>
              <TouchableOpacity onPress={() => setReadMore(true)}>
                <Text style={styles.link}>
                  Read more
                </Text>
              </TouchableOpacity>
            </View>
          ):(
            <View>
              <Text style={styles.description}>
                {listing.description}
              </Text>
              <TouchableOpacity onPress={() => setReadMore(false)}>
                <Text style={styles.link}>
                  Read less
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 24,}}>
            <Text style={styles.sectionHeader}>
              Classes
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              paddingHorizontal: 24,
            }}
          >
            {events.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 327,
                  height: 155,
                }}
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

          </ScrollView>
        </View>
        <View>

        </View>
      </Animated.ScrollView>
      <Animated.View entering={SlideInDown.delay(200)}>
        <View
          style={styles.footer}>
          <TouchableOpacity style={styles.footerText}>
            <Text>Starting at</Text>
            <Text style={styles.footerPrice}>€{listing.price}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[defaultStyles.btn, { flex: 1, paddingHorizontal: 16, paddingVertical: 8,}]}
            onPress={() => router.push('/booking/book')}
          >
            <Text style={defaultStyles.btnText}>Book Now</Text>
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
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    gap: 4,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  labelText: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 12,
    color: '#4B5563',
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 24,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    display: 'flex',
    //height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    display: 'flex',
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    //backgroundColor: '#fff',
    height: 64,
    //borderBottomWidth: StyleSheet.hairlineWidth,
    //borderColor: Colors.grey,
  },
  description: {
    fontSize: 14,
    fontFamily: 'mon',
  },
  link: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 14,
  },
  sectionHeader: {
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: Colors.grey,
    width: 327,
    height: 155,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardText: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 76,
    marginLeft: 20,
    gap: 8,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'mon-sb',
    fontSize: 18,
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
