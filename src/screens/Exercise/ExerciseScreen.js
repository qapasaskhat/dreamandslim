import React from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import styles from './styles';

import ExerciseCard from '../../components/Exercise';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

import Modal from 'react-native-modal';

import SoundPlayer from 'react-native-sound-player'

const PlayPause = ({
  onpressPlayBack,
  onpressPause,
  onpressPlayForward,
  value,
}) => {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      <TouchableOpacity onPress={onpressPlayBack}>
        <Image
          source={require('../../icons/play-back.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onpressPause}>
        <Image source={require('../../icons/pause.png')} style={styles.img} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onpressPlayForward}>
        <Image
          source={require('../../icons/play-forward.png')}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  )
}

const Finish = ({onpressShare, onpressReplay, onpressStatistics, onpressBack}) => {
  return (
    <View style={styles.finishStyle}>
      <Text style={styles.finishText}>Поздравляем!</Text>
      <Text style={styles.text}>Вы успешно завершили комплекс упражнении</Text>
      <TouchableOpacity style={[styles.btn]} onPress={onpressShare}>
        <Text style={styles.buttonText}>Поделиться</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn]} onPress={onpressReplay}>
        <Text style={styles.buttonText}>Повторить</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn]} onPress={onpressStatistics}>
        <Text style={styles.buttonText}>Статистика</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn]} onPress={onpressBack}>
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
};

class ExerciseScreen extends React.Component {
  state = {
    timeLeft: null,
    timer: null,
    remainingTime: 20,
    params: [],
    timeExercise: null,
    timerExercise: null,
    stop: false,
    value: 0,
    finish: false,
  };

  returnTime = times => {

    let time 
    times.map(item => {
      if (item.id === this.state.value) {
        time = item.time;
        return time;
      }
    })
    console.log('[Return time function] value = '+this.state.value)
    console.log('[Return time function] time = '+time)

    return parseInt(time)
  }

  componentDidMount = async () => {
    this.startTimer(5)
    this.nextExersiceTime(this.state.value)
    console.log(this.props.navigation.getParam('param'))
    
  }
  nextExersiceTime = async value => {
    switch (value) {
      case 0:
        console.log('[nextExersiceTime function] case ' + value)
        this.startExercise(
          this.returnTime(this.props.navigation.getParam('param')) + 5,
        );
        break;
      case 1:
        console.log('[nextExersiceTime function] case ' + value)
        this.startExercise(
          this.returnTime(this.props.navigation.getParam('param')),
        );
        break;
      case 2:
        console.log('[nextExersiceTime function] case ' + value)
        this.startExercise(
          this.returnTime(this.props.navigation.getParam('param')),
        );
        break;
      case 3:
        console.log('[nextExersiceTime function] case ' + value)
        this.startExercise(
          this.returnTime(this.props.navigation.getParam('param')),
        );
        break;
      default:
        console.log('default');
        break;
    }

    this.setState({
      params: this.props.navigation.getParam('param'),
    });
    console.log(this.props.navigation.getParam('param'));
  };

  startTimer = timeLeft => {
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      var timeLeft = this.state.timeLeft - 1;
      if (timeLeft === 0) {
        clearInterval(timer);
      }
      this.setState({
        timeLeft: timeLeft,
      });
    }, 1000);
    return this.setState({timeLeft: timeLeft, timer: timer});
  };

  startExercise = timeExercise => {
    
    console.log('[startExercise] timeExercise = '+timeExercise)
    
    clearInterval(this.state.timerExercise)

    let timerExercise = setInterval(() => {
      let value = this.state.stop ? 0 : 1;
      var timeExercise = this.state.timeExercise - value;
      if (timeExercise === 0) {
        clearInterval(timerExercise);
        // sport mental
        this.props.navigation.getParam('param').length === 1
          ? this._finishSportExersice()
          : this._finishMentalExersice()
      }
      this.setState({
        timeExercise: timeExercise,
      });
    }, 1000);
    return this.setState({
      timeExercise: timeExercise,
      timerExercise: timerExercise,
    });
  };

  _stop = () => {
    this.setState({stop: !this.state.stop})
  }

  _finishMentalExersice = async () => {

    this.setState({
      value: this.state.value + 1
    })
    console.log( '[_finishMentalExersice function] value = ' + this.state.value)
    setTimeout(() => {
      this.nextExersiceTime(this.state.value)
      this.state.value === 4 && this._finishSportExersice()
    }, 1000)
    //this.state.value === 3 && this._finishSportExersice()
  }

  saveMentalData = async () => {
    let data = {};


    data = await AsyncStorage.getItem('historyMental');
    data = JSON.parse(data);
    let date = moment().format();
    date = date.slice(0, 10);
    console.log(date);

    data[date] = {
      selected: true,
      selectedColor: '#198CFF',
    };
    await AsyncStorage.setItem('historyMental', JSON.stringify(data));

    console.log(data, 'mental');
  }

  saveSportData = async () => {
    try{
    SoundPlayer.playUrl('https://firebasestorage.googleapis.com/v0/b/dreamed-c3cbf.appspot.com/o/presto.mp3?alt=media&token=18be42e4-4a2c-427e-9bb4-6d2b5d812210')
    }
    catch{error=>console.log(error)
    }

    let id = this.props.navigation.getParam('param').map(item=>{return item.id_item})
    
    switch(parseInt(id)){
      case 1:
        return this.saveSportData_1()
      case 2:
        return this.saveSportData_2()
      case 3:
        return this.saveSportData_3()
    }
  }
  saveSportData_1 = async()=>{

    console.log('saveSportData_1')
    let data = {};
    data = await AsyncStorage.getItem('historySport');
    data = JSON.parse(data);
    let date = moment().format();
    date = date.slice(0, 10);
    console.log(date);
    if (!data){
      data = {}
    }

    data[date] = {
      selected: true,
      selectedColor: '#198CFF',
    };
    await AsyncStorage.setItem('historySport', JSON.stringify(data));
    //console.log(data, 'sport')
  }
  saveSportData_2 = async()=>{
    console.log('saveSportData_2')
    let data = {};
    data = await AsyncStorage.getItem('historySport_1');
    data = JSON.parse(data);
    let date = moment().format();
    date = date.slice(0, 10);
    console.log(date);
    if (!data){
      data = {}
    }
    data[date] = {
      selected: true,
      selectedColor: '#198CFF',
    };
    await AsyncStorage.setItem('historySport_1', JSON.stringify(data));
    //console.log(data, 'sport')
  }
  saveSportData_3 = async()=>{
    console.log('saveSportData_3')
    let data = {};
    data = await AsyncStorage.getItem('historySport_2');
    data = JSON.parse(data);
    let date = moment().format();
    date = date.slice(0, 10);
    console.log(date);
    console.log(data)
    if (!data){
      data = {}
    }
    data[date] = {
      selected: true,
      selectedColor: '#198CFF',
    };
    console.log(data)

    await AsyncStorage.setItem('historySport_2', JSON.stringify(data));
  }


  _finishSportExersice = async () => {
    this.setState({
      stop: false,
      timeExercise: 0,
      finish: true,
    })

    console.log(this.props.navigation.getParam('param').length)

    this.props.navigation.getParam('param').length > 1
      ? this.saveMentalData()
      : this.saveSportData()
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Мечтай и стройней',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onReplay = () => {
    this.setState({
      finish: false,
      value: 0,
    });
    this.startTimer(5);
    //this.startExercise(this.returnTime(this.props.navigation.getParam('param')) + 5)
    setTimeout(() => {
      this.startExercise(this.returnTime(this.props.navigation.getParam('param')))
    }, 5000)
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView style={styles.container}>
          {this.state.timeLeft === 0 ? (
            <View>
              <PlayPause
                onpressPause={() => this._stop(this.state.timeExercise)}
                onpressPlayForward={() =>
                  this.props.navigation.getParam('param').length === 1
                    ? this._finishSportExersice()
                    : this._finishMentalExersice()
                }
              />
              <Text style={styles.textTimer}>{this.state.timeExercise}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.btnText}>Приготовтесь к упражнению</Text>
              <Text style={styles.textTimer}>{this.state.timeLeft}</Text>
            </View>
          )}
          {this.props.navigation.getParam('param').map(item => {
            if (item.id === this.state.value)
              return <ExerciseCard key={item.id} title={item.task} />;
          })}
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
            isVisible={this.state.finish}>
            <View>
              <Finish
                onpressShare={() => this.onShare()}
                onpressReplay={() => this.onReplay()}
                onpressStatistics={() =>
                  this.props.navigation.navigate('Statistics')
                }
                onpressBack={()=>this.props.navigation.navigate('Complex')}
              />
            </View>
          </Modal>
        </SafeAreaView>
      </>
    );
  }
}

export default ExerciseScreen;
