import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import moment from 'moment';
import firebase from 'react-native-firebase';
import {musicData} from '../../data';

const ButtonNotify = ({onpress}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onpress}>
      <Text style={styles.btnTxt}>Напоминания</Text>
    </TouchableOpacity>
  );
};
const Item = ({text, onpress, id}) => {
  return (
    <TouchableOpacity
      onPress={onpress}
      style={{
        flexDirection: 'row',
        marginVertical: 3,
        borderBottomColor: '#cecece',
        borderBottomWidth: 0.5,
      }}>
      <Text
        style={[
          styles.textItem,
          {
            marginRight: 6,
          },
        ]}>
        {id + 1}.{' '}
      </Text>
      <Text style={styles.textItem}>{text}</Text>
    </TouchableOpacity>
  );
};

class SettingScreen extends React.Component {
  state = {
    language: 'music 1',
    isEnabled: true,
    data: musicData,
    isModalVisible: false,
    id: 0,
  };
  componentDidMount = () => {};

  _openModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  closeModal = id => {
    this.setState({
      isModalVisible: false,
      id: id,
    });
  };
  setDateAndroid = (event, date) => {
    console.log(event);

    this.setState({
      time: moment(event.nativeEvent.timestamp),
      visible: false,
    });

    console.log(this.state.time);
  };

  async canselNotify(id) {
    try {
      const cancel = await firebase.notifications().cancelAllNotifications();
      console.log(cancel + '  cancelAllNotifications');
    } catch (e) {
      console.error(e);
    }
  }
  onChange=()=>{
    this.setState({
      isEnabled: !this.state.isEnabled
    })
    this.state.isEnabled && this.canselNotify()
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
          <View style={styles.notification}>
            <Text style={styles.text}>Голос помощника</Text>
            <TouchableOpacity
              style={styles.picker}
              onPress={() => this._openModal()}>
              <Text style={styles.textMusic}>
                {this.state.data.map(i => {
                  if (i.id === this.state.id) return i.value;
                })}
              </Text>
              <Image
                source={require('../../icons/dropdown.png')}
                style={styles.dropdown}
              />
            </TouchableOpacity>
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
              <Text
                style={[
                  styles.textItem,
                  {marginBottom: 24, fontWeight: 'bold', color: '#2196F5'},
                ]}>
                Выберите мелодию
              </Text>
              {this.state.data.map(item => {
                return (
                  <Item
                    text={item.value}
                    id={item.id}
                    onpress={() => this.closeModal(item.id)}
                    key={item.id}
                  />
                );
              })}
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 30,
                  backgroundColor: '#cecece',
                  marginTop: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                }}
                onPress={() => this.setState({isModalVisible: false})}>
                <Text style={[styles.textItem, {fontWeight: 'bold'}]}>
                  Отмена
                </Text>
              </TouchableOpacity>
            </Modal>
          </View>
          <View style={styles.notification}>
            <Text style={styles.text}>Напоминания</Text>
            <Switch
              trackColor={{false: '#767577', true: 'rgba(33, 150, 245, 0.5)'}}
              thumbColor={this.state.isEnabled ? '#2196F5' : '#f4f3f4'}
              ios_backgroundColor="rgba(33, 150, 245, 0.5)"
              value={this.state.isEnabled}
              onValueChange={() =>
               this.onChange()
              }
            />
          </View>
          <ButtonNotify
            onpress={() => this.props.navigation.navigate('Notify')}
          />
        </SafeAreaView>
      </>
    );
  }
}
export default SettingScreen;
