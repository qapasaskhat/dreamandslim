import React from 'react'
import {
    SafeAreaView,
    ActivityIndicator
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


class Loading extends React.Component{
    componentDidMount= async()=>{
        //await AsyncStorage.removeItem('value')
        let value = await AsyncStorage.getItem('value')
        value = JSON.parse(value)
        if(!value){
            value = {
                value: false
            }
        }else{
            console.log(value)
        }
        this.props.navigation.navigate(value.value?'App':'Load')
    }
    render(){
        return(
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator />
            </SafeAreaView>
        )
    }
}
export default Loading