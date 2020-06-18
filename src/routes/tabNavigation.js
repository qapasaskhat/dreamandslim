export const Tabs = createBottomTabNavigator(
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