import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const ExerciseCard = ({title, text}) => {
  return (
    <View>
      <View style={styles.view} />
      <View style={styles.textView}>
        <Text style={styles.textStyle}>
          {title}
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.txtStyle}>
          {text}
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.txtStyle2}>
          
        </Text>
      </View>
    </View>
  );
};

export default ExerciseCard;
