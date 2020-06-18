import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from 'react-native';
import Dash from './Dashboard';
import {styles} from './styles';
import firebase from 'react-native-firebase';

class Example extends Component {
  componentDidMount() {
    // Create notification channel required for Android devices
    this.createNotificationChannel();
    // Ask notification permission and add notification listener
    this.checkPermission();
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
  };
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    console.log(enabled);
    
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
      <>
        <StatusBar />
        <SafeAreaView >
            <Dash />
        </SafeAreaView>
      </>
    );
  }
}

export default Example;
