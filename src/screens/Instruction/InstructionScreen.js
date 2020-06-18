import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList} from 'react-native';

import InstructionItem from '../../components/Instruction';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

import {dataSport, data_Sport, data, dataMental} from '../../data';

const ButtonNotify = ({onpress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Text style={styles.btnTxt}>Приступить</Text>
    </TouchableOpacity>
  );
};

class InstructionScreen extends React.Component {
  componentDidMount = async () => {
    const {navigation} = this.props;
  };
  data = value => {
    switch (value.name) {
      case 'mental':
        return dataMental;
      case 'sport':
        return this.getId(value.id);
      default:
        return dataSport;
    }
  };

  getId = value => {
    switch (value) {
      case 1:
        return dataSport;
      case 2:
        return data_Sport;
      case 3:
        return data;
      default:
        return dataSport;
    }
  };
  _goTo = () => {
    this.props.navigation.getParam('param').name === 'sport' && this.props.navigation.replace('ComplexMentalScreen', {param: this.props.navigation.getParam('param')})
    this.props.navigation.getParam('param').name === 'mental' && this.props.navigation.replace('ComplexMentalScreen', {param: {name: 'mental'}});
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.data(this.props.navigation.getParam('param'))}
            renderItem={({item}) => (
              <InstructionItem
                title={item.title}
                textTitle={item.texttitle}
                text={item.text}
                name={item.name}
                textValue={item.textValue}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<ButtonNotify onpress={() => this._goTo()} />}
          />
        </SafeAreaView>
      </>
    );
  }
}
export default InstructionScreen;
