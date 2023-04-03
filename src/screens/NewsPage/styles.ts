import {rem} from '@app/utils';
import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imgWrapper: {
    backgroundColor: '#ddd',
    aspectRatio: 1,
  },
  img: {
    aspectRatio: 1,
    opacity: 0,
  },
  headerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: rem(15),
    paddingBottom: rem(45),
    // backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  tag: {
    position: 'absolute',
    paddingHorizontal: rem(15),
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    borderRadius: 20,
    top: 0,
    marginTop: rem(-50),
    left: 15,
  },
  tagName: {
    color: '#222',
    fontWeight: '600',
  },
  backBtn: {
    position: 'absolute',
    top: getStatusBarHeight(true) + 20,
    left: rem(15),
    backgroundColor: 'rgba(255, 255, 255, .4)',
    width: rem(40),
    height: rem(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rem(20),
    paddingRight: rem(3),
  },
  title: {
    fontSize: rem(18),
    color: '#fff',
    fontWeight: '600',
  },
  contentWrapper: {
    flex: 1,
    padding: rem(15),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: rem(-25),
    backgroundColor: '#fff',
    shadowColor: '#222',
    shadowOffset: {width: 0, height: -3},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
