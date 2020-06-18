import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import styles from './styles';

const ButtonAdd = ({text,onpress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};
export default ButtonAdd;
