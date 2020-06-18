import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import Btn from '../Button/ButtonAdd.'

const CardView = ({text,onpress}) => {
  return (
    <View>
      <View style={styles.view} />
      <View style={styles.textView}>
        <Text style={styles.textStyle}>
        Четыре минуты тишины и покоя для вашего стройного тела.
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.txtStyle}>
        Мечтай и стройней - это пошаговое руководство по использованию силы мысли для достижения стройного тела. В основе методики – древние знания о влиянии мысли на тело.
        </Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.txtStyle}>
        Регулярно выполняя практику мысленных упражнений, вы легко, комфортно и без насилия над собой станете стройным.
        </Text>
      </View>
      <Btn  text={'Перейти к комплексам'} onpress={onpress}/>
    </View>
  );
};

export default CardView;
