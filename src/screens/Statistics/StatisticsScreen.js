import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Ян.',
    'Фев.',
    'Март',
    'Апр',
    'Май',
    'Июнь',
    'Июль.',
    'Авг',
    'Сен.',
    'Окт.',
    'Нояб',
    'Дек',
  ],
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ],
  dayNamesShort: ['Вс.', 'Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.'],
  today: 'Cегодня',
};
LocaleConfig.defaultLocale = 'ru';

import styles from './styles';
import moment from 'moment';

const Statistics = ({text, data, currentDate}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.calendar}>
        <Calendar
          current={currentDate}
          hideExtraDays
          markedDates={data}
        />
      </View>
    </View>
  );
};

class StatisticsScreen extends React.Component {
  state = {
    value: false,
    selectedDateMental: null,
    date: '',
    refreshing: false,
    selectedDateSport: null,
  };
  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    let data = await AsyncStorage.getItem('historyMental');
    let sport = await AsyncStorage.getItem('historySport');
    let sport_1 = await AsyncStorage.getItem('historySport_1');
    let sport_2 = await AsyncStorage.getItem('historySport_2');

    console.log(JSON.parse(data));
    this.setState({
      selectedDateMental: JSON.parse(data),
      selectedDateSport: JSON.parse(sport),
      selectedDateSport_1: JSON.parse(sport_1),
      selectedDateSport_2: JSON.parse(sport_2),

    });
    this.setState({
      refreshing: false,
    });
  };

  componentDidMount = async () => {
    let date = moment().format();
    date = date.slice(0, 10);

    let data = await AsyncStorage.getItem('historyMental');
    let sport = await AsyncStorage.getItem('historySport');
    let sport_1 = await AsyncStorage.getItem('historySport_1');
    let sport_2 = await AsyncStorage.getItem('historySport_2')

    console.log(JSON.parse(data));
    this.setState({
      selectedDateMental: JSON.parse(data),
      date: date,
      selectedDateSport: JSON.parse(sport),
      selectedDateSport_1: JSON.parse(sport_1),
      selectedDateSport_2: JSON.parse(sport_2),
    });
    //console.log(this.state.selectedDateMental);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
          {this.state.selectedDateMental === {} ? (
            <Text
              style={{
                fontSize: 16,
                lineHeight: 20,
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'Montserrat',
              }}>
              Вы пока не закончили ни одного упражнения
            </Text>
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.onRefresh()}
                />
              }>
              <Statistics text='Комплекс мысленных упражнений' data={this.state.selectedDateMental} currentDate={this.state.date} />
              <Statistics text='Приседания' data={this.state.selectedDateSport} currentDate={this.state.date}/>
              <Statistics text='Отжимания' currentDate={this.state.date} data={this.state.selectedDateSport_1}/>
              <Statistics text='Планка' currentDate={this.state.date} data={this.state.selectedDateSport_2}/>
            </ScrollView>
          )}
        </SafeAreaView>
      </>
    );
  }
}
export default StatisticsScreen;
