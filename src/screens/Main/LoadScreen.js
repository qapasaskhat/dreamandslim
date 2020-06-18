import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import styles from './styles';
import ButtonNext from '../../components/Button';

import CheckBox from '@react-native-community/checkbox'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

class LoadScreen extends React.Component {
  state ={
    toggleCheckBox: false,
    chek: 1
  }
  componentDidMount() {}

  _goTo = async(value)=>{
    value?
    this.props.navigation.replace('App'):
    this.setState({
      chek: 0
    })
    name = {
      value: true
    }
    await AsyncStorage.setItem('value',JSON.stringify(name))
  }
  _changeChek = ()=>{
    this.setState({
      toggleCheckBox: !this.state.toggleCheckBox,
      chek: 1
    })
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
          <View style={styles.loadView} />
          <View style={styles.view}>
            <CheckBox
              disabled={false}
              value={this.state.toggleCheckBox}
              onValueChange={() =>
                this._changeChek()
              }
            />
            <TouchableOpacity onPress={()=>this._changeChek()}>
            <Text style={[styles.text,{color: this.state.chek===0?'red': 'black'}]}>
              Я согласен с условиями пользовательского соглашения
            </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnView}>
            <ButtonNext
              value={'Далее'}
              onpress={() =>  this._goTo(this.state.toggleCheckBox) }
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default LoadScreen;
