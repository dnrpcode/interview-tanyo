import PushNotification from "react-native-push-notification";

class Notifications {
    constructor() {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("token", token)
            },
            onNotification: function (notification) {
                console.log("notification", notification);
            },
            popInitialNotification: true,
            requestPermissions: false,
        });

        PushNotification.createChannel(
            {
                channelId: 'reminders',
                channelName: 'Taks reminders notifications',
                channelDescription: 'Reminders'
            },
            () => { },
        );

        PushNotification.getScheduledLocalNotifications(rn => {
            console.log("getScheduledLocalNotifications: ", rn);
        })
    }

    scheduleNotification(msg, date) {
        PushNotification.localNotificationSchedule({
            channelId: 'reminders',
            title: 'Task Tanyo',
            message: msg,
            date,
        })
    }
}

export default new Notifications();