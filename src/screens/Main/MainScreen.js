import React from 'react';
import {
    View, 
    Text,
    StatusBar,
    SafeAreaView,
    Platform,
    ActivityIndicator
    } from 'react-native';

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'
import Card from '../../components/Card'
import {fcmService} from '../../notify/FCMService'
import { ScrollView } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { network } from '../../api/Main/actions';

class MainScreen extends React.Component {
  state={
    selectedDateMental: {
      '2020-06-03':{
        selected: true,
        selectedColor: '#198CFF',
      }
    },
    selectedDateSport:{
      '2020-06-03':{
        selected: true,
        selectedColor: '#198CFF',
      }
    }
  }

  componentDidMount = async()=>{

    this.props.dispatch(network());
    //this.createNotificationChannel()
    //this.checkPermission()

   // fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)

      let dataMental = await AsyncStorage.getItem('historyMental')
      let newDataMental = JSON.parse(dataMental)
      if (!newDataMental){
        newDataMental = {}
        await AsyncStorage.setItem('historyMental',JSON.stringify(newDataMental))
      }else{
       // console.log(JSON.parse(dataMental))
      }

      let dataSport = await AsyncStorage.getItem('historySport')
      let newDataSport = JSON.parse(dataSport)
      if(!newDataSport){
        newDataSport = {}
        await AsyncStorage.setItem('historySport',JSON.stringify(newDataSport))
      }else{
        //console.log(JSON.parse(dataSport)+'dataSport')
      }

      let dataSport_1 = await AsyncStorage.getItem('historySport_1')
      let newDataSport_1 = JSON.parse(dataSport_1)
      if(!newDataSport_1){
        newDataSport_1 = {}
        await AsyncStorage.setItem('historySport',JSON.stringify(newDataSport_1))
      }else{
       // console.log(JSON.parse(dataSport_1)+'dataSport_1')
      }

      let dataSport_2 = await AsyncStorage.getItem('historySport_2')
      let newDataSport_2 = JSON.parse(dataSport_2)
      if(!newDataSport_2){
        newDataSport = {}
        await AsyncStorage.setItem('historySport',JSON.stringify(newDataSport))
      }else{
        //console.log(JSON.parse(dataSport_2)+'dataSport_2')
      }
  }

onRegister(token){
  console.log("[NotificationFCM] onRegister: ", token )
}

onNotification(notify){
  console.log("[NotificationFCM] onNotification ", notify)
  const channelObj = {
    channelId: "reminder",
    channelName: "Reminders Channel",
    channelDes: "Used for getting reminder notification"
  }
  const channel = fcmService.buildChannel(channelObj)
  const buildNotify = {
    dataId: notify._notificationId,
    title: notify._title,
    content: notify._body,
    sound: 'default',
    channel: channel,
    data: {},
    colorBgIcon: "#1a243b",
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_launcher',
  }
  
  const notification = fcmService.buildNotification(buildNotify)
  fcmService.displayNotification(notification)
  fcmService.scheduleNotification(notification,'2020-06-05','23:30')
}
onOpenNotification(notify){

  console.log("[NotificationFCM] onOpenNotification", notify)
  alert('Open Notification: ' + notify._body)

}

  render() {

    const {loading} = this.props

    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();

    const unitId =
      Platform.OS === 'ios'
        ? 'ca-app-pub-5096918044613246/4054010755'
        : 'ca-app-pub-5096918044613246/5558664119';
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
       { loading?
       <View style={{
         flex:1,
         justifyContent: 'center',
         alignItems: 'center'
       }}>
         <ActivityIndicator color='#2196F5' />
       </View>
       : <SafeAreaView style={styles.container}>
        {/* <Banner
          unitId={unitId}
          size='SMART_BANNER'
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={(error)=>{
            console.log(error.message)
          }}
        /> */}
          <ScrollView>
          <Card 
            text={'text'}
            onpress ={()=>this.props.navigation.navigate('Complex')}
            />
            </ScrollView>
        </SafeAreaView>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  items: state.main.items,
  load: state.main.loading,
  error: state.main.error,
});

export default connect(mapStateToProps)(MainScreen);
