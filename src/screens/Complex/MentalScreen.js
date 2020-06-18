import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import ComplexCard from '../../components/Complex';
import ButtonCard from '../../components/Button';
import ButtonLight from '../../components/Button/ButtonLight';

import {item} from '../../data';
import { ScrollView } from 'react-native-gesture-handler';

class MentalScreen extends React.Component {
  goto = () => {
    this.props.navigation.navigate('Instruction', {
      param: {
        name: 'mental',
      },
    });
  };
  render() {
    return (
      <>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="#fff" />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
            <ScrollView>
          <ComplexCard title={item.title} text={item.text} txt={item.txt} />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ButtonCard
              value={'Приступить'}
              onpress={() =>
                this.props.navigation.navigate('ComplexMentalScreen', {
                  param: {name:'mental'},
                })
              }
            />
            <ButtonLight 
              value={'Инструкция'} 
              onpress={() => this.goto()} 
              />
          </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
export default MentalScreen;
