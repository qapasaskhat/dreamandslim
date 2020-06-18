import React from 'react';
import {View, Text, Image} from 'react-native';
import {Calendar} from 'react-native-calendars';
import styles from './styles';

const CardCalendar = ({title,text,txt}) => {
  return (
    <View style={styles.container}>
      <Calendar
            current={'2020-02-02'}
            //style={styles.calendar}
            hideExtraDays
          />
    </View>
  );
};

export default CardCalendar;
