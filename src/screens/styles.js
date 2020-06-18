import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1 ,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    title:{
        fontSize: 20,
        color: 'red'
    },
    text:{
        fontSize: 16,
        color: 'yellow'
    },
    btn:{
       backgroundColor:'blue'
    },
})
export default styles