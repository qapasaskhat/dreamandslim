/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routes from './src/routes'
import firebase from 'react-native-firebase'

import { Provider } from 'react-redux'
import store from './src/api/store'

//import { fcmService } from './src/notify/FCMService'
//import { localNotificationService } from "./src/notify/LocalNotificationService";


class App extends React.Component{
 
  componentDidMount=()=>{
    this.createNotificationChannel()
    this.checkPermission()
  }

  createNotificationChannel = () => {
    // Build a android notification channel
    const channel = new firebase.notifications.Android.Channel(
      'reminder', // channelId
      'Reminders Channel', // channel name
      firebase.notifications.Android.Importance.High, // channel importance
    ).setDescription('Used for getting reminder notification'); // channel description
    // Create the android notification channel
    firebase.notifications().android.createChannel(channel);
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // We've the permission
      this.notificationListener = firebase
        .notifications()
        .onNotification(async notification => {
          // Display your notification
          await firebase.notifications().displayNotification(notification);
          console.log(notification);
          alert(notification._body)
        });
    } else {
      // user doesn't have permission
      try {
        await firebase.messaging().requestPermission();
      } catch (error) {
        Alert.alert(
          'Unable to access the Notification permission. Please enable the Notification Permission from the settings',
        );
      }
    }
  };
  
  render() {
    return (
      <Provider store={store}>
        <Routes  />
      </Provider>
    )
  };
}

export default App;
