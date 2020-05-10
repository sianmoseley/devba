import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default function LocalNotification(heading, description, location) {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      heading + '\nDescription: ' + description + '\nLocation: ' + location,
    title: 'New post in Big APPetite',
    message:
      heading + '\nDescription: ' + description + '\nLocation: ' + location,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
}
