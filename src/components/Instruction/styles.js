import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginBottom: 59,
    },
    view:{
        height: height*0.24,
        backgroundColor: '#C4C4C4',
        width: "100%",
        marginBottom: 25,
    },
    titleStyle:{
        color: '#2196F5',
        fontSize: 17,
        fontFamily: 'Montserrat',
        lineHeight: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    textTitleStyle:{
        fontSize: 14,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        lineHeight: 17,
        marginTop: 10,
        color: '#333333',
    },
    textStyle:{
        fontSize: 14,
        fontFamily: 'Montserrat',
        lineHeight: 17,
        color: '#333333',
        textAlign: 'justify',
        marginRight: 15
    }
})
export default styles