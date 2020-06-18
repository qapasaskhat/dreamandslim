import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingLeft: 15,
    },
    text:{
        fontSize: 16,
        fontFamily: 'Montserrat',
        lineHeight: 20,
    },
    view:{
        flexDirection: 'row',
        paddingTop: 10
    },
    img:{
        width: 16,
        height: 16,
        marginLeft: 20,
    }
})
export default styles