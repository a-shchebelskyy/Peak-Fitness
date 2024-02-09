import Colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inputField: {
    minHeight: 56,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    fontFamily: 'mon',
    fontSize: 16,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'mon-b',
  },
  btnIcon: {
    //position: 'absolute',
    //left: 16,
  },
  link: {
    color: Colors.primary,
    fontFamily: 'mon-sb',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
