import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Platform,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import moment from 'moment';
import localization from 'moment/locale/ru';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

import {
  DateTimePickerModal,
  DatePicker,
} from 'react-native-modal-datetime-picker';

import {weekDayItems} from '../../data';

import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const value = true;

const ButtonNotify = ({onpress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Text style={styles.btnTxt}>Добавить</Text>
    </TouchableOpacity>
  );
};
const WeekDay = ({text, value, onpress}) => {
  return (
    <TouchableOpacity
      style={[styles.weekbtn, {backgroundColor: value ? '#2196F5' : '#fff'}]}
      onPress={onpress}>
      <Text style={[styles.txtWeekBtn, {color: value ? '#fff' : '#2196F5'}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const NotifyItem = ({time, text, onpress}) => {
  return (
    <View style={styles.notifyView}>
      <View>
        <Text style={styles.notifyTimeText}>{time}</Text>
        <Text style={styles.notifyDayText}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onpress}>
        <Image
          source={require('../../icons/delete.png')}
          style={styles.notifyDelete}
        />
      </TouchableOpacity>
    </View>
  );
};

class NotifyScreen extends React.Component {
  state = {
    date: new Date('2020-06-02T10:40:40'),
    mode: 'time',
    show: false,
    isModalVisible: false,
    items: weekDayItems,
    time: '09:00',
    isDatePickerVisible: 0,
    notifyData: 1,
    notify: [],
    remindTime: '',
  };

  componentDidMount = async () => {
    let not = await AsyncStorage.getItem('notify');
    let newNotify = JSON.parse(not);
    if (!newNotify) {
      notify = [];
      await AsyncStorage.setItem('notify', JSON.stringify(notify));
    } else {
      console.log(newNotify);
    }
    this.setState({
      notifyData: not ? 2 : 1,
      notify: JSON.parse(not),
    });
  }

  _addNotify = async () => {
    let notify = await AsyncStorage.getItem('notify');
    console.log(notify);

    this.setState({
      notifyData: this.state.notifyData === 1 ? 2 : 1,
    });
  };

  setReminder = async reminderTime => {
    await firebase.notifications().cancelAllNotifications();
    // schedule notification
    const interval = 1440
   // for (let i = 0; i<7; i++){
      const notification = new firebase.notifications.Notification()
      //.setSound('default')
      .setNotificationId('1') // Any random ID
      .setTitle('Ежедневное напоминание') // Title of the notification
      .setBody('Мечтай и стройней  ' + `${moment(reminderTime).format("MMM Do YY")}`) // body of notification
      .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
      .android.setChannelId('reminder') // should be the same when creating channel for Android
      .android.setAutoCancel(true)

      const date = new Date();
      console.log(date.setMinutes(date.getMinutes()+1))
      date.setMinutes(date.getMinutes()+2)

    const schedule = {
      fireDate: /*date.getTime(),*/  reminderTime.valueOf(),
      repeatInterval: 'week',
      exact: true,
    }
    try {
      await firebase
        .notifications()
        .scheduleNotification(notification, schedule);
      console.log('sucsess');
    } catch {
      error => {
        console.log(error);
      };
    }
  //}
  }

  buildNotification = () => {
    const title =
      Platform.OS === 'android'
        ? 'Ежедневное напоминание'
        : 'Ежедневное напоминание';
    const notification = new firebase.notifications.Notification()
      .setNotificationId('1') // Any random ID
      .setTitle(title) // Title of the notification
      .setBody('Мечтай и стройней') // body of notification
      .android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
      .android.setChannelId('reminder') // should be the same when creating channel for Android
      .android.setAutoCancel(true);
    return notification;
  };

  _addNotifyItem = async (time, date) => {
    //console.log(this.state.remindTime)
    //console.log(moment(this.state.remindTime))

    this.setReminder(moment(this.state.remindTime));
    let notify = [];
    notify = await AsyncStorage.getItem('notify');
    //console.log(notify);
    let text = `${date.map(i => {
      if (i.value) return i.text;
    })}`;

    let newText = text.replace(/,,/gi, ',');
    let newNew = newText.replace(/,,/gi, ',');
    let newNewText = newNew.replace(/,,/gi, ',');
    //console.log(newNewText)

    let p = {
      id: Math.random(),
      time: time,
      date: 'Eжедневно',
    };
    let asyncNotify = JSON.parse(notify);
    if (!asyncNotify) {
      asyncNotify = [];
      asyncNotify.push(p);
      await AsyncStorage.setItem('notify', JSON.stringify(asyncNotify));
    } else {
      asyncNotify.push(p);
      await AsyncStorage.setItem('notify', JSON.stringify(asyncNotify));
    }
    console.log(asyncNotify);

    this.setState({
      notifyData: this.state.notifyData === 1 ? 2 : 1,
      notify: asyncNotify,
    });
    this.reset();
  };

  setDateAndroid = date => {
    console.log(date);

    this.setState({
      time: moment(date)
        .locale('ru', localization)
        .format('LT'),
      isDatePickerVisible: 0,
      remindTime: date,
    });
  };

  setDateIos = (event, date) => {
    console.log(event);
    this.setState({
      time: moment(event)
        .locale('ru', localization)
        .format('LT'),
      remindTime: event,
    });
  };

  showDatePicker = () => {
    this.setState({
      isDatePickerVisible: 1,
    });
  };

  DateTimeIos = () => {
    return (
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible === 1}
        onConfirm={() => {
          this.setState({
            isDatePickerVisible: 0,
          });
        }}
        onCancel={date => {
          this.setState({
            isDatePickerVisible: 0,
          });
        }}
        mode={'time'}
        locale="ru_RU"
        is24Hour={true}
        date={new Date()}
        onChange={this.setDateIos}
        headerTextIOS="Время уведомление"
        confirmTextIOS="Выбрать"
        cancelTextIOS="Отмена"
      />
    );
  };

  reset = () => {
    this.setState({
      items: weekDayItems,
      time: '09:00',
    });
  };

  DateTimeAndroid = () => {
    return (
      <DateTimePickerModal
        isVisible={this.state.isDatePickerVisible === 1}
        onConfirm={date => this.setDateAndroid(date)}
        onCancel={() => this.setState({isDatePickerVisible: 0})}
        mode="time"
        date={new Date()}
        is24Hour={false}
        locale="en_GB"
      />
    );
  };

  _deleteNotify = async id => {
    let data = this.state.notify.filter(item => item.id !== id);
    this.setState({
      notify: data,
    });
    await AsyncStorage.setItem('notify', JSON.stringify(data));
  };

  _delete = () => {
    this.setState({
      notify: [],
    });
    AsyncStorage.removeItem('notify');
    console.log();
  };

  render() {
    const {notifyData} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{alignItems: 'flex-end', marginRight: 24, marginTop: 12}}
            onPress={() => this._delete()}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat',
              }}>
              Очистить всё
            </Text>
          </TouchableOpacity>
          {notifyData === 2 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              <ScrollView>
                {this.state.notify.map(item => {
                  return (
                    <NotifyItem
                      key={item.id}
                      time={item.time}
                      text={item.date}
                      onpress={() => this._deleteNotify(item.id)}
                    />
                  );
                })}
              </ScrollView>
              <ButtonNotify onpress={() => this._addNotify()} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
              }}>
              {value ? (
                <View>
                  <View style={{marginLeft: 37}}>
                    <Text style={{fontFamily: 'Montserrat'}}>
                      Время уведомления{' '}
                    </Text>
                    <TouchableOpacity onPress={() => this.showDatePicker()}>
                      <Text style={styles.timeText}>{this.state.time}</Text>
                      {Platform.OS !== 'ios' ? (
                        <this.DateTimeAndroid />
                      ) : (
                        <this.DateTimeIos />
                      )}
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'Montserrat', marginBottom: 20}}>
                      Дни недели
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FlatList
                      data={this.state.items}
                      renderItem={({item}) => (
                        <WeekDay
                          text={item.text}
                          value={item.value}
                          onpress={() =>
                            this.setState(state => {
                              const items = state.items.map(i =>
                                i.id === item.id
                                  ? {...i, value: !item.value}
                                  : i,
                              );
                              return {items};
                            })
                          }
                        />
                      )}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      numColumns={3}
                    />
                  </View>
                </View>
              ) : (
                <Text style={styles.text}>
                  Вы пока не добавили ни одного уведомления
                </Text>
              )}
              <ButtonNotify
                onpress={() =>
                  this._addNotifyItem(this.state.time, this.state.items)
                }
              />
            </View>
          )}
        </SafeAreaView>
      </>
    );
  }
}
export default NotifyScreen;
