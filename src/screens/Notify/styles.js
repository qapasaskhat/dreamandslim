import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
   // width: width - 4,
    height: height * 0.06,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#2196F5',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F5',
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    lineHeight: 22,
    letterSpacing: 0.2,
    fontFamily: 'Montserrat',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Montserrat',
  },
  weekbtn: {
    width: width*0.232,
    height: width*0.232,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#2196F5',
    margin: 3,
  },
  txtWeekBtn: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Montserrat',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    // maxHeight: 300,
    backgroundColor: '#fff',
    position: 'absolute',
    top: '30%',
    width: width,
    // height: 300,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 28,
    textAlign: 'left',
    lineHeight: 34,
    marginVertical: 20,
    fontFamily: 'Montserrat',
  },
  notifyTimeText: {
    fontSize: 24,
    textAlign: 'left',
    lineHeight: 29,
    //marginVertical: 20,
    fontFamily: 'Montserrat',
    color: '#333333',
  },
  notifyDayText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 22,
    marginVertical: 5,
    fontFamily: 'Montserrat',
    color: '#333333',
  },
  notifyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 30,
    alignItems: 'center'
  },
  notifyDelete:{
    width:20,
    height:25,
  }
});
export default styles;
