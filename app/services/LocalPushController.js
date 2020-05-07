import PushNotification from 'react-native-push-notification';

//configuration for local notification
PushNotification.configure({
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

//function setting the contents of the notification
export default function LocalNotification(heading, description, location) {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: (heading + '\nDescription: ' + description + '\nLocation: ' + location),
    title: 'New post in Big APPetite',
    message: (heading + '\nDescription: ' + description + '\nLocation: ' + location),
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
}
