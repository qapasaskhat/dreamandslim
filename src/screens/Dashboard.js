import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from 'react-native-firebase';
import styles from './styles';

const Dashboard = () => {

  const [showTimer, setShowTimer] = useState(false);

  const [reminderTime, setReminderTime] = useState(moment({hour: 17}));

  useEffect(() => {
    async function setReminder() {
      await firebase.notifications().cancelAllNotifications();
      // schedule notification
      await firebase.notifications().scheduleNotification(buildNotification(), {
        fireDate: reminderTime.valueOf(),
        repeatInterval: 'day',
        exact: true,
      });
    }
    setReminder();
  }, [reminderTime]);
  useEffect(() => {
    retrieveData();
  }, []);
  const buildNotification = () => {
    const title =
      Platform.OS === 'android' ? 'Daily reminder' : 'Trip Planner Reminder';
    const notification = new firebase.notifications.Notification()
      .setNotificationId('1') // Any random ID
      .setTitle(title) // Title of the notification
      .setBody('qapas askhat') // body of notification
      .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
      .android.setChannelId('1') // should be the same when creating channel for Android
     // .android.setAutoCancel(true)
      //.android.setCategory(firebase.notifications.Android.Category.Reminder) // To remove notification when tapped on it
    return notification;
  }
  const showDateTimePicker = () => {
    setShowTimer(true);
  }

  const hideDateTimePicker = () => {
    setShowTimer(false);
  }

  const handleDatePicked = async time => {
    await AsyncStorage.setItem('time', JSON.stringify(time));
    setReminderTime(moment(time));
    console.log(moment(time))
    hideDateTimePicker();
  }
  
  const retrieveData = async () => {
    try {
      const valueString = await AsyncStorage.getItem('time');
      const value = JSON.parse(valueString);
      if (value !== null) {
        setReminderTime(moment(value));
        //console.log(moment(time))
        console.log(moment(value))
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:600
    }}>
      <View style={{
          flexDirection: 'row',
          marginTop:32,
          justifyContent:'space-around'
      }}>
        <Text style={{fontSize: 20,}}>Reminder Time:</Text>
        <Text style={{fontSize: 20,}}>{reminderTime.format('LT')}</Text>
      </View>
      <TouchableOpacity onPress={showDateTimePicker} style={{
          width:300,
          height: 40,
          backgroundColor: '#ececec',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40
      }}>
        <Text style={{fontWeight: 'bold',fontSize: 16,}}>Update reminder time here</Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={showTimer}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        is24Hour={false}
        titleIOS="Select a reminder time"
        locale="ru-RU"
      />
    </SafeAreaView>
  );
};
export default Dashboard;
