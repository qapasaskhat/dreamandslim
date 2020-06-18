import firebase from 'react-native-firebase'
import type { Notification, NotificationOpen } from 'react-native-firebase'

class FCMService {
    register = (onRegister, onNotification, onOpenNotification)=>{
        this.checkPermission(onRegister)
        this.createNotificationListeners(onNotification, onOpenNotification)
    }

    /*registerAppWithFCM = async()=>{
        if (Platform.OS === 'ios'){
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }
    }*/

    checkPermission = (onRegister)=>{
        firebase.messaging().hasPermission()
        .then(enabled=>{
            if(enabled){
                //user has permissions
                this.getToken(onRegister)
            }else{
                //user doesn't have permissions
                this.requestPermission(onRegister)
            }
        }).catch(error=>{
            console.log('[FCMService] Permission Rejected',error);
            
        })
    }
    getToken = (onRegister) =>{
        firebase.messaging().getToken()
        .then(fcmToken=>{
            if(fcmToken){
                onRegister(fcmToken)
            }else{
                console.log("[FCMService] User does not have a device token");
                
            }
        }).catch(error=>{
            console.log('[FCMService] GetToken rejected', error);
            
        })
    }
    requestPermission =(onRegister)=>{
        firebase.messaging().requestPermission()
        .then(()=>{this.getToken(onRegister)})
        .catch(error=>{
            console.log('[FCMService] Request Permissions rejected',error);
            
        })
    }
    deleteToken =()=>{
        console.log('[FCMService] deleteToken');
        firebase.messaging().deleteToken()
        .catch(error=>{
            console.log(' [FCMService] delete token error',error);
            
        })
    }
    createNotificationListeners = (onRegister, onNotification, onOpenNotification)=>{
        //When the application is runnig, but in the background
       /* messaging()
        .onNotificationOpenedApp(remoteMessage =>{
            console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background: ',remoteMessage);
            if (remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
        });
        //when the application is opened from a quit state
        messaging()
        .getInitialNotification()
        .then(remoteMessage=>{
            console.log('[FCMService] getInitialNotification Notification caused app to open from quit state: ',remoteMessage);
            if (remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(remoteMessage.notification)
                //this.removeDeliveredNotification(notification.notificationId)
            }
            
        });*/

        this.notificationListener = firebase.notifications()
        .onNotification((notification: Notification) =>{
            onNotification(notification)
        })

        this.notificationOpenedListener = firebase.notifications()
        .onNotificationOpened((notificationOpen: NotificationOpen)=>{
            if(notificationOpen){
                const notification: Notification = notificationOpen.notification
                onOpenNotification(notification)
                this.removeDeliveredNotification(notification)
            }
        })

        firebase.notifications().getInitialNotification()
        .then(notificationOpen => {
            if(notificationOpen){
                const notification: Notification = notificationOpen.notification
                onOpenNotification(notification)
                this.removeDeliveredNotification(notification)

            }
        })

        this.messageListener = firebase.messaging().onMessage((message) => {
            onNotification(message)
        })

        
        //triggered when have new token
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken=>{
            console.log('[FCMService] new token refresh: ',fcmToken);
            onRegister(fcmToken)
        });
    }

    unRegister= ()=>{
        this.messageListener()
        this.onTokenRefreshListener()
        this.notificationOpenedListener()
        this.notificationListener()
    }

    buildChannel = (obj) =>{
        console.log(obj, 'buildChannel')        
        const channel =  new firebase.notifications.Andriod.Channel(
            obj.channelId,
            obj.channelName,
            firebase.notifications.Android.Importance.High
        ).setDescription(obj.channelDes)
        firebase.notifications().andriod.createChannel(channel)
        return channel
    }

    buildNotification =(obj) =>{
        console.log(obj)        
        firebase.notifications().andriod.createChannel(obj.channel)

        return new firebase.notifications.Notification()
        .setSound(obj.sound)
        .setNotificationId(odj.dataId)
        .setTitle(obj.title)
        .setBoby(obj.content)
        .setData(obj.data)
        .andriod.setChannelId(obj.channel.channelId)
        .andriod.setLargeIcon(obj.largeIcon)
        .andriod.setSmallIcon(obj.smallIcon)
        .andriod.setColor(obj.color)
        .android.setPriority(firebase.notifications.Andriod.High)
        .andriod.setVibrate(obj.vibrate)
        //.andriod.setAutoChannel(true)
    }

    scheduleNotification = (notification, datetime) => {
        const date = new Date(datetime)
        firebase.notifications()
          .scheduleNotification(notification, { 
              fireDate: date.getTime() ,
              repeatInterval: 'day'
            }).catch(err=>console.log(err)
            )
      }

    displayNotification = (notification) =>{
        firebase.notifications().displayNotification(notification)
        .catch(error => console.log("Display notification error: ", error)
        )
    }

    removeDeliveredNotification = (notification) =>{
        firebase.notifications().removeDeliveredNotification(notification,notificationId)
    }
}

export const fcmService = new FCMService()