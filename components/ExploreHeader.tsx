import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';

const categories = [
  {
    name: 'All',
    icon: 'globe-outline',
  },
  {
    name: 'Running',
    icon: 'walk-outline',
  },
  {
    name: 'Cycling',
    icon: 'bicycle-outline',
  },
  {
    name: 'Weightlifting',
    icon: 'barbell-outline',
  },
  {
    name: 'Yoga',
    icon: 'body-outline',
  },
  {
    name: 'Soccer',
    icon: 'football-outline',
  },
  {
    name: 'Basketball',
    icon: 'basketball-outline',
  },
  {
    name: 'Football',
    icon: 'american-football-outline',
  },
  {
    name: 'Baseball',
    icon: 'baseball-outline',
  },
  {
    name: 'Tennis',
    icon: 'tennisball-outline',
  },
  {
    name: 'Golf',
    icon: 'golf-outline',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity>
              <View style={styles.searchBtn}>
                {/* <View>
                  <Text style={{ fontFamily: 'mon-sb' }}>Search anything</Text>
                  <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere · Any week</Text>
                </View> */}
                <Ionicons name="search" size={20} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search activities"
                  placeholderTextColor={'#111827'}
                />
              </View>
            </TouchableOpacity>
          </Link>
          {/* <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          horizontal
          ref={scrollRef}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 12,
            paddingHorizontal: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              ref={(el) => (itemsRef.current[index] = el)}
              key={index}
              style={[styles.categoriesBtn, { backgroundColor: activeIndex === index ? '#F9FAFB': '#FFFFFF'}]}
              onPress={() => selectCategory(index)}>
              {/* <Ionicons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? Colors.primary : Colors.grey}
              /> */}
              <Text style={styles.categoryText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 130,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  searchBtn: {
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'row',
    height: 48,
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: 364,
    borderRadius: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'mon',
    color: '#6B7280',
  },
  categoriesBtn: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'mon',
  },
});

export default ExploreHeader;
