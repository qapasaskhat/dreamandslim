import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

import MainScreen from '../screens/Main/MainScreen';
import SportScreen from '../screens/Complex/SportScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import SettingScreen from '../screens/Setting/SettingScreen';
import MentalScreen from '../screens/Complex/MentalScreen';
import NotifyScreen from '../screens/Notify/NotifyScreen';
import InstructionScreen from '../screens/Instruction/InstructionScreen';
import ComplexMental from '../screens/Complex/ComplexMental';
import LoadScreen from '../screens/Main/LoadScreen'
import ExerciseScreen from '../screens/Exercise/ExerciseScreen';
import Loading from '../screens/Loading'

import { TouchableOpacity } from 'react-native-gesture-handler';

const MaterialTopTab = createMaterialTopTabNavigator(
  {
    Mental: {
      screen: MentalScreen,
      navigationOptions: {
        title: 'Мысленные',
      },
    },
    Sport: {
      screen: SportScreen,
      navigationOptions: {
        title: 'Спортивные',
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      tabStyle: {
        height: 48,
      },
      style: {
        backgroundColor: '#2196F5',
      },
      upperCaseLabel: false,
      indicatorStyle: {
        backgroundColor: '#FBFBFB',
      },
    },
  },
);

const MainStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Мечтай и стройней',
      headerTintColor: '#fff',
      headerTitleAlign: 'center'
    },
  },
});

const ComplexStack = createStackNavigator({
  Complex: {
    screen: MaterialTopTab,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Мечтай и стройней',
      headerTintColor: '#fff',
      headerTitleAlign: 'center'

    },
  },

},{
  initialRouteName: 'Complex'
});

const StatisticsStack = createStackNavigator({
  Statistics: {
    screen: StatisticsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Мечтай и стройней',
      headerTintColor: '#fff',
      headerTitleAlign: 'center'

    },
  },
});

const SettingStack = createStackNavigator({
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Мечтай и стройней',
      headerTintColor: '#fff',
      headerTitleAlign: 'center'

    },
  },
});

const Tabs = createBottomTabNavigator(
  {
    Main: {
      screen: MainStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.tabIconView}>
            <Image
              source={require('../icons/home.png')}
              style={{width: 20, height:20, tintColor: tintColor}}
            />
            <Text
              style={{
                color: tintColor,
                fontSize: 13,
                fontFamily: 'Montserrat',
              }}>
              Главная
            </Text>
          </View>
        ),
      },
    },
    Complex: {
      screen: ComplexStack,
      navigationOptions: {
       
        tabBarIcon: ({tintColor}) => (
          <TouchableOpacity style={styles.tabIconView}>
            <Image
              source={require('../icons/menu.png')}
              style={{width: 20, height:20, tintColor: tintColor}}
            />
            <Text
              style={{
                color: tintColor,
                fontSize:  13,
                fontFamily: 'Montserrat',
                letterSpacing:-0.4
              }}>
              Комплексы
            </Text>
          </TouchableOpacity>
        ),
      },
    },
    Statistics: {
      screen: StatisticsStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.tabIconView}>
            <Image
              source={require('../icons/statistics.png')}
              style={{width: 20, height:20, tintColor: tintColor}}
            />
            <Text
              style={{
                color: tintColor,
                fontSize: 13,
                letterSpacing:-0.4,
                fontFamily: 'Montserrat',
              }}>
              Статистика
            </Text>
          </View>
        ),
      },
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View style={styles.tabIconView}>
            <Image
              source={require('../icons/setting.png')}
              style={{width: 20, height: 20, tintColor: tintColor}}
            />
            <Text
              style={{
                color: tintColor,
                fontSize: 13,
                letterSpacing:-0.4,
                fontFamily: 'Montserrat',
              }}>
              Настройки
            </Text>
          </View>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#2196F5',
      inactiveTintColor: '#C3C5C6',
      showLabel: false,
      style: {
        backgroundColor: '#fff',
        height: 75,
      },
      adaptive: true,
    },
    defaultNavigationOptions: {
      tabBarVisible: true,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if(navigation.state.routeName==='Complex'){
          //navigation.navigate('ComplexStack')
          //navigation.goBack()
         // navigation.dispatch(StackActions.pop());
        }
        console.log('onPress:', navigation.state.routeName);
        defaultHandler()
      },
    },
  },
);

const TabStack = createStackNavigator({
  Tab: {
    screen: Tabs,
    navigationOptions: {
      headerShown: false,
    },
  },
  Notify: {
    screen: NotifyScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Настройка напоминаний',
      headerTintColor: '#fff',
      headerBackTitle: ' ',
      headerTitleAlign: 'center'

    },
  },
  ComplexMentalScreen:{
    screen: ComplexMental,
    navigationOptions:{
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Комплекс упражнений',
      headerTintColor: '#fff',
      headerBackTitle: ' ',
      headerTitleAlign: 'center'

    }
  },
  Exercise:{
    screen: ExerciseScreen,
    navigationOptions:{
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Выполнение упражнении',
      headerTintColor: '#fff',
      headerBackTitle: ' ',
      headerTitleAlign: 'center'

    }
  },
  Instruction: {
    screen: InstructionScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Инструкция',
      headerTintColor: '#fff',
      headerBackTitle: ' ',
      headerTitleAlign: 'center'
    },
  },
},{
  mode: 'card'
})

const loadStack = createStackNavigator({
  Load: {
    screen: LoadScreen,
     navigationOptions:{
      headerStyle: {
        backgroundColor: '#2196F5',
      },
      title: 'Мечтай и стройней',
      headerTintColor: '#fff',
      headerTitleAlign: 'center'
    }
  },
  App: {
    screen: TabStack,
    navigationOptions: {
      headerShown: false,
    },
  },
  Loading:{
    screen: Loading,
    navigationOptions:{
      headerShown: false
    }
  }
},{

  initialRouteName: 'Loading',
  mode: 'card',
  headerMode:'screen'

})

const Container = createAppContainer(loadStack)

export default Container

const styles = StyleSheet.create({
  tabIconView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
