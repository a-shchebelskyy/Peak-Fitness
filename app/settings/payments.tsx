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
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const cards = [
  {
    name: 'Alexander Shchebelskyy',
    number: '1111222233334444',
    expiry: 1124,
    cvc: 123,
    postal: 'M6A1X5'
  },
];

//https://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number
function detectCardType(num: String) {
  // the regular expressions check for possible matches as you type, hence the OR operators based on the number of chars
  // regexp string length {0} provided for soonest detection of beginning of the card numbers this way it could be used for BIN CODE detection also

  //JCB
  //const jcb = new RegExp('^(?:2131|1800|35)[0-9]{0,}$'); //2131, 1800, 35 (3528-3589)
  // American Express
  const amex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
  // Diners Club
  //const diners = new RegExp('^3(?:0[0-59]{1}|[689])[0-9]{0,}$'); //300-305, 309, 36, 38-39
  // Visa
  const visa = new RegExp('^4[0-9]{0,}$'); //4
  // MasterCard
  const mastercard = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
  //const maestro = new RegExp('^(5[06789]|6)[0-9]{0,}$'); //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
  //Discover
  //const discover = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$');
  ////6011, 622126-622925, 644-649, 65


  // get rid of anything but numbers
  num = num.replace(/\D/g, '');

  // checks per each, as their could be multiple hits
  //fix: ordering matter in detection, otherwise can give false results in rare cases
  var type = "unknown";
  if (num.match(amex)) {
      type = "American Express";
  } else if (num.match(visa)) {
      type = "Visa";
  } else {
      type = "Mastercard";
  }

  return type;
}

function getCardImage(type: String) {
  var imgUrl = "";
  if (type == "American Express") {
      imgUrl = require('../../assets/images/amex.png');
  } else if (type == "Visa") {
      imgUrl = require('../../assets/images/visa.png');
  } else {
    imgUrl = require('../../assets/images/mastercard.png');
  }

  return imgUrl
}

function formatCardNumber(num: String) {

}

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
            {cards.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.item} onPress={() => router.push('/settings/editcard')}
              >
                <View style={styles.cardContainer}>
                  <Image
                    source={getCardImage(detectCardType(item.number))}
                    style={styles.img}
                  />
                  <View>
                    <Text style={styles.card}>
                      {detectCardType(item.number)}
                    </Text>
                    <Text style={styles.number}>
                    •••• •••• •••• {item.number.substring(item.number.length - 4, item.number.length)}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={'#9CA3AF'}/>
              </TouchableOpacity>
              ))}
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
  img: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
