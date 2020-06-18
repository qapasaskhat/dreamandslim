import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notification: {
    flexDirection: 'row',
    height: height * 0.08,
    //width: width,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },
  btn: {
    height: height * 0.07,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#2196F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F5',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontFamily: 'Montserrat',
  },
  textMusic: {
    fontSize: 16,
    lineHeight: 20,
    color: '#696767',
    //textTranslate: 'uppercase'
    marginBottom: 5,
  },
  picker: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#696767',
    marginRight: 20,
    alignItems: 'center'
  },
  dropdown: {
      width:16,
      height:12,
      resizeMode: 'contain',
      marginLeft: 4,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '45%',
    left: '25%',
    width: 200,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  textItem:{
    fontSize: 14,
    fontFamily: 'Montserrat',
    lineHeight: 20,
  }
});
export default styles;
