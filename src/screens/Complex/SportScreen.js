import React from 'react';
import {View, Text, StatusBar, SafeAreaView, FlatList} from 'react-native';

import ComplexCard from '../../components/Complex';
import ButtonCard from '../../components/Button';
import ButtonLight from '../../components/Button/ButtonLight';

const data = [
  {
    id: 1,
    title: 'Минута для спортивного тела. Приседания.',
    text:
      'Удобная, комфортная и простая методика для вашего красивого тела.Выберите одно упражнение, которое вы будете выполнять - отжимания, приседания или планку. ',
    txt: 'Всего один подход и тренировка окончена',
  },
  {
    id: 2,
    title: 'Минута для спортивного тела. Отжимания.',
    text:
      'Удобная, комфортная и простая методика для вашего красивого тела.Выберите одно упражнение, которое вы будете выполнять - отжимания, приседания или планку. \n\nДелайте упражнение один раз в день, одну минуту в любое удобное для вас время. ',
    txt: 'Всего один подход и тренировка окончена',
  },
  {
    id: 3,
    title: 'Минута для спортивного тела. Планка.',
    text:
      'Удобная, комфортная и простая методика для вашего красивого тела.Выберите одно упражнение, которое вы будете выполнять - отжимания, приседания или планку.\n\nДелайте упражнение один раз в день, одну минуту в любое удобное для вас время.',
    txt: 'Всего один подход и тренировка окончена',
  },
];

class SportScreen extends React.Component {
  renderCard = item => {
    return (
      <View style={{marginBottom: 60}}>
        <ComplexCard title={item.title} text={item.text} txt={item.txt} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ButtonCard
            value={'Приступить'}
            onpress={() =>
              this.props.navigation.navigate('ComplexMentalScreen', {
                param: {
                  name: 'complex',
                  id: item.id,
                },
              })
            }
          />
          <ButtonLight
            value={'Инструкция'}
            onpress={() =>
              this.props.navigation.navigate('Instruction', {
                param: {name: 'sport', id: item.id},
              })
            }
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => this.renderCard(item)}
            //keyExtractor={item => item.id}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </>
    );
  }
}
export default SportScreen;
