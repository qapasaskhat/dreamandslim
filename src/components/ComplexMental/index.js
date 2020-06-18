import React from 'react';
import {View, Text, Image } from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';

import styles from './styles';

const ComplexMentalItem = ({
    text,
    time,
    onpress
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.view}>
        <Text style={styles.text}>{time}</Text>
        <TouchableOpacity onPress={onpress}>
          <Image style={styles.img} source={require('../../icons/pero.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ComplexMentalItem;
