import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  const [push, setPush] = useState(false);
  const [community, setCommunity] = useState(false);
  const [promo, setPromo] = useState(false);
  const [news, setNews] = useState(false);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <View style={styles.item}>
          <View style={styles.titleContainer}>
            <View style={styles.icon}>
              <Text style={{ fontSize: 20}}>
                🥊
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                Push Notifications
              </Text>
              <Text style={styles.subtitle}>
                Get notified of upcoming events
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#E5E7EB', true: '#FEDA00'}}
            thumbColor={'#FFFFFF'}
            onValueChange={() => setPush(previousState => !previousState)}
            value={push}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.titleContainer}>
            <View style={styles.icon}>
              <Text style={{ fontSize: 20}}>
                🏘️
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                Community
              </Text>
              <Text style={styles.subtitle}>
                Receive messages from members
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#E5E7EB', true: '#FEDA00'}}
            thumbColor={'#FFFFFF'}
            onValueChange={() => setCommunity(previousState => !previousState)}
            value={community}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.titleContainer}>
            <View style={styles.icon}>
              <Text style={{ fontSize: 20}}>
                🎁
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                Promotions
              </Text>
              <Text style={styles.subtitle}>
                Get emails about promotional offers
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#E5E7EB', true: '#FEDA00'}}
            thumbColor={'#FFFFFF'}
            onValueChange={() => setPromo(previousState => !previousState)}
            value={promo}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.titleContainer}>
            <View style={styles.icon}>
              <Text style={{ fontSize: 20}}>
                🌎
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                News
              </Text>
              <Text style={styles.subtitle}>
                Receive news about Peak Fitness
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{false: '#E5E7EB', true: '#FEDA00'}}
            thumbColor={'#FFFFFF'}
            onValueChange={() => setNews(previousState => !previousState)}
            value={news}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 24,
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
    backgroundColor: '#F9FAFB'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    color: '#111827',
    fontFamily: 'mon-sb',
    fontSize: 12,
  },
  subtitle: {
    color: '#6B7280',
    fontFamily: 'mon',
    fontSize: 10,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    padding: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
  },
});

export default Page;
