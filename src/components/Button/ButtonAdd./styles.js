import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff'
    },
    btn: {
        width: width-4,
        height: height*0.06,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: "#2196F5",
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F5'
    },
    btnTxt:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        lineHeight: 22,
        letterSpacing: 0.2,
        fontFamily: 'Montserrat',

    },
})
export default styles