import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        width: width*0.44,
        height: height*0.06,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#2196F5',
    },
    txt:{
        color: '#2196F5',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 22,
        textAlign: 'center',
        fontFamily: 'Montserrat',

    }
})
export default styles;