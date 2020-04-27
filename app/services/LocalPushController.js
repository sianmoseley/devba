import PushNotification from 'react-native-push-notification';
 
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});
 
export default function LocalNotification() {
  PushNotification.localNotification({
    autoCancel: true,
    bigText:
      'Someone has added a new post to Big APPetite!',
    // subText: 'Local Notification Demo',
    title: 'New post in Big APPetite',
    message: 'put the details of the post here',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
}
