import { StyleSheet,Dimensions } from 'react-native'
const { width,height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    loadView:{
        width: width*0.92,
        height: height*0.53,
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#BDBDBD',
        marginTop:  height*0.061,
        marginLeft: width *0.033,
    },
    text: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        lineHeight: 15,
        maxWidth: width * 0.75,
        marginLeft: 5,
    },
    view:{
        flexDirection: 'row',
        marginHorizontal: width *0.033,
        marginTop: 35,
        alignItems: 'center',
    },
    btnView:{
        marginTop: height*0.039,
        marginLeft: width*0.5169
    }
})
export default styles