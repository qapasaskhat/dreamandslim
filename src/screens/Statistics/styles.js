import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    lineHeight: 22,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    color: '#696767',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  calendar: {
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default styles;
