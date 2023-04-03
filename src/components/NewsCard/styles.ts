import {rem} from '@app/utils';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    padding: 15,
  },
  image: {
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  tag: {
    opacity: 0.5,
    marginBottom: 5,
  },
  title: {
    flexShrink: 1,
    fontSize: rem(16),
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  date: {
    opacity: 0.5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
  },
});
