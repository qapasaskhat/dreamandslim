import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ComplexMentalItem from '../../components/ComplexMental';

import styles from './styles';
import Modal from 'react-native-modal';
import {
  mentalExersice,
  sportExersice,
  sportExersice_2,
  sportExersice_3,
} from '../../data';

const ButtonNotify = ({onpress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Text style={styles.btnTxt}>Начать</Text>
    </TouchableOpacity>
  );
};

class ComplexMental extends React.Component {
  state = {
    isModalVisible: false,
    dataMental: [],
    time: 60,
    idModal: null,
    dataSport: [],
    params: '',
    dataSport_2: [],
    dataSport_3: [],
  };

  async componentDidMount() {
    
    /*await AsyncStorage.removeItem('dataSport')
    await AsyncStorage.removeItem('dataSport_2')
    await AsyncStorage.removeItem('dataSport_3')*/

    let array = [];
    array = await AsyncStorage.getItem('data_Mental');
    array = JSON.parse(array);
    if (!array) {
      array = mentalExersice;
      await AsyncStorage.setItem('data_Mental', JSON.stringify(array));
      this.setState({
        dataMental: array,
      });
    } else {
      this.setState({
        dataMental: array,
      });
    }

    let array_1 = [];
    array_1 = await AsyncStorage.getItem('dataSport');
    array_1 = JSON.parse(array_1);
    if (!array_1) {
      array_1 = sportExersice;
      await AsyncStorage.setItem('dataSport', JSON.stringify(array_1));
      this.setState({
        dataSport: array_1,
      });
    } else {
      this.setState({
        dataSport: array_1,
      });
    }

    let array_2 = [];
    array_2 = await AsyncStorage.getItem('dataSport_2');
    array_2 = JSON.parse(array_2);
    if (!array_2) {
      array_2 = sportExersice_2;
      await AsyncStorage.setItem('dataSport_2', JSON.stringify(array_2));
      this.setState({
        dataSport_2: array_2,
      });
    } else {
      this.setState({
        dataSport_2: array_2,
      });
    }

    let array_3 = [];
    array_3 = await AsyncStorage.getItem('dataSport_3');
    array_3 = JSON.parse(array_3);
    if (!array_3) {
      array_3 = sportExersice_3;
      await AsyncStorage.setItem('dataSport_3', JSON.stringify(array_3));
      this.setState({
        dataSport_3: array_3,
      });
    } else {
      this.setState({
        dataSport_3: array_3,
      });
    }

    this.setState({
      params: this.props.navigation.getParam('param').name,
    });
  }

  converterTime = time => {
    let min = Math.floor(time / 60);
    let sek = time % 60;
    min = min >= 10 ? `${min}` : `0${min}`;
    sek = sek >= 10 ? `${sek}` : `0${sek}`;
    let text = `${min}:${sek}`;

    return text;
  };

  openModal = id => {
    this.setState({
      isModalVisible: true,
      idModal: id,
    });
  };

  mentalTime = time => {
    this.setState(state => {
      const dataMental = state.dataMental.map(i =>
        i.id === this.state.idModal ? {...i, time: time} : i,
      );
      return {dataMental};
    });
    this.resetTime();
  };
  resetTime = () => {
    this.setState({
      time: 60,
    });
  };

  sportTime = time => {
    switch (this.props.navigation.getParam('param').id) {
      case 1:
        this.setState(state => {
          const dataSport = state.dataSport.map(i =>
            i.id === this.state.idModal ? {...i, time: time} : i,
          );
          return {dataSport};
        });
        break;
      case 2:
        this.setState(state => {
          const dataSport_2 = state.dataSport_2.map(i =>
            i.id === this.state.idModal ? {...i, time: time} : i,
          );
          return {dataSport_2};
        });
        break;
      case 3:
        this.setState(state => {
          const dataSport_3 = state.dataSport_3.map(i =>
            i.id === this.state.idModal ? {...i, time: time} : i,
          );
          return {dataSport_3};
        });
        break;
    }

    this.resetTime();
  };

  closeModal = time => {
    this.setState({isModalVisible: false});
    this.props.navigation.getParam('param').name === 'mental'
      ? this.mentalTime(time)
      : this.sportTime(time);
  };

  change = id => {
    switch (id) {
      case 1:
        return this.state.dataSport;
      case 2:
        return this.state.dataSport_2;
      case 3:
        return this.state.dataSport_3;
    }
  };

  onPressButton = async () => {
    const {params, dataMental} = this.state;
    if (this.props.navigation.getParam('param').name === 'mental') {
      await AsyncStorage.removeItem('data_Mental');
      await AsyncStorage.setItem('data_Mental', JSON.stringify(dataMental));
    } else {
      if (
        this.props.navigation.getParam('param').id === 1
      ) {
        console.log('====================================');
        console.log(this.props.navigation.getParam('param').id);
        console.log('====================================');
        await AsyncStorage.removeItem('dataSport')
        await AsyncStorage.setItem(
          'dataSport',
          JSON.stringify(
            this.change(this.props.navigation.getParam('param').id),
          ),
        )
        let data = await AsyncStorage.getItem('dataSport')
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      }
      else if (
        this.props.navigation.getParam('param').id === 2
      ) {
        await AsyncStorage.removeItem('dataSport_2');
        await AsyncStorage.setItem(
          'dataSport_2',
          JSON.stringify(
            this.change(this.props.navigation.getParam('param').id),
          ),
        );
      }
      else if (
        this.props.navigation.getParam('param').id === 3
      ) {
        await AsyncStorage.removeItem('dataSport_3');
        await AsyncStorage.setItem(
          'dataSport_3',
          JSON.stringify(
            this.change(this.props.navigation.getParam('param').id),
          ),
        );
      }
    }
    
    this.props.navigation.navigate('Exercise', {
      param:
        this.props.navigation.getParam('param').name === 'mental'
          ? dataMental
          : this.change(this.props.navigation.getParam('param').id),
    });
  };

  render() {
    const {params, dataMental} = this.state;

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={
              this.props.navigation.getParam('param').name === 'mental'
                ? dataMental
                : this.change(this.props.navigation.getParam('param').id)
            }
            renderItem={({item}) => (
              <ComplexMentalItem
                text={item.task}
                time={this.converterTime(item.time)}
                onpress={() => this.openModal(item.id)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          <ButtonNotify onpress={() => this.onPressButton()} />
          <Modal
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            swipeDirection={'down'}
            style={styles.modal}
            isVisible={this.state.isModalVisible}>
            <Text style={[styles.text, {marginTop: 0}]}>
              Время выполнение (сек)
            </Text>
            <TextInput
              style={styles.textInput}
              maxLength={3}
              defaultValue={`${this.state.time}`}
              onChangeText={time => {
                this.setState({time});
              }}
              value={String(this.state.time)}
              numeric
              keyboardType={'numeric'}
            />
            <TouchableOpacity onPress={() => this.closeModal(this.state.time)}>
              <Text
                style={[
                  styles.text,
                  {marginTop: 5, color: '#2196F5', fontWeight: 'bold'},
                ]}>
                Ok
              </Text>
            </TouchableOpacity>
          </Modal>
        </SafeAreaView>
      </>
    );
  }
}
export default ComplexMental;
