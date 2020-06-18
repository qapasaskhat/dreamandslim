import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        width: width*0.44,
        height: height*0.06,
        backgroundColor: '#2196F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    txt:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22,
        textAlign: 'center',
        fontFamily: 'Montserrat',

    }
})
export default styles;