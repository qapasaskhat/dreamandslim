import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  startTimer: {
    backgroundColor: '#2196F5',
    width: width * 0.21,
    height: height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 24,
    marginRight: 5,
  },
  btnText: {
    fontSize: 16,
    //fontWeight: 'bold',
    textAlign: 'center',
    //color: '#fff',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontFamily: 'Montserrat',
  },
  textTimer: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    lineHeight: 32,
    letterSpacing: 0.3,
    fontFamily: 'Montserrat',
  },
  img:{
    width: 48,
    height: 48,
    resizeMode: 'contain'
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    //width: width,
    //height: height,
    //position: 'absolute'
  },
  finishText:{
    fontSize: 32,
    fontFamily: 'Montserrat',
    lineHeight: 48,
    textAlign: "center",
  },
  text:{
    fontSize: 14,
    fontFamily: 'Montserrat',
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: width/2,
    alignSelf: 'center'
  },
  btn:{
    height: 40,
    backgroundColor: '#2196F5',
    justifyContent: 'center',
    alignItems: 'center',
    width: width/2,
    alignSelf:'center',
    margin: 4,
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});
export default styles;
