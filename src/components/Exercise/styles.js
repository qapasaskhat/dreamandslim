import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  view: {
    height: height * 0.25,
    backgroundColor: '#C4C4C4',
    width: '100%',
  },
  textView: {
    margin: 10,
  },
  textStyle: {
    color: '#2196F5',
    fontSize: 18,
    fontWeight: 'bold',
    //fontFamily: 'Montserrat',
    fontFamily: 'Montserrat',
    textAlign:'center'
  },
  txtStyle: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },
  txtStyle2: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 17,
    fontFamily: 'Montserrat',
  },
  finishStyle:{
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
  }
});
export default styles;
