import React from 'react';
import {View, Text, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import styles from './styles';

const ButtonLight = ({value,onpress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onpress}>
      <Text style={styles.txt}>{value}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLight;