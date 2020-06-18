import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    view:{
        height: height*0.25,
        backgroundColor: '#C4C4C4',
        width: "100%"
    },
    textView:{
        margin: 10,
    },
    textStyle:{
        color: '#2196F5',
        fontSize: 20,
        fontFamily: 'Montserrat',
    },
    txtStyle:{
        color: '#333333',
        fontSize: 16,
        textAlign: 'justify',
        lineHeight: 20,
        fontFamily: 'Montserrat',
        marginRight: 10
    },
    txtStyle2:{
        color: '#333333',
        fontSize: 14,
        textAlign: 'left',
        lineHeight: 17,
        fontFamily: 'Montserrat',

    }
})
export default styles