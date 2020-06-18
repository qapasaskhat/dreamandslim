import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const InstructionItem = ({title, textTitle, text, name, textValue}) => {
  return (
    <View style={styles.container}>
      <View style={styles.view} />
      <View style={{paddingLeft: 15,}}>
        {title!=='1'?<Text style={styles.titleStyle}>{title}</Text>:null}
        {textTitle!=='1'?<Text style={styles.textTitleStyle}>{textTitle}</Text>:null}
        <Text style={styles.textStyle}>{text}</Text>
        <Text style={styles.textTitleStyle}>{name}</Text>
        <Text style={styles.textStyle}>{textValue}</Text>
      </View>
    </View>
  );
};
export default InstructionItem;
