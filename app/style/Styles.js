import {StyleSheet, Dimensions} from 'react-native';

export const authenticationStyles = StyleSheet.create({
  authContainer: {
    backgroundColor: '#28A966',
    padding: 10,
    paddingBottom: 20,
    height: '100%',
    width: '100%',
  },
  authError: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authInput: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
    paddingHorizontal: 10,
  },
  authLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 1,
    marginBottom: 4,
    fontFamily: 'arial',
  },
  authText: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 18,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2B74B7',
    paddingVertical: 10,
  },
  newUserButton: {
    backgroundColor: '#2B2EB7',
    marginTop: 14,
    paddingVertical: 10,
  },
  forgotPassword: {
    marginTop: 10,
  },
  tcText: {
    color: 'white',
    fontFamily: 'Arial',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    paddingBottom: 5
  }
});

export const globalStyles = StyleSheet.create({
  aboutText: {
    fontSize: 20,
    fontFamily: 'arial',
  },
  accountButton: {
    borderColor: '#28A966',
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    width: '60%',
  },
  accountButtonText: {
    color: '#28A966',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'arial',
  },
  accountContainer: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  customHeaderIconOne: {
    color: 'white',
    fontSize: 48,
  },
  customHeaderIconTwo: {
    color: '#28A966',
    fontSize: 48,
  },
  error: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 3,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'arial',
  },
  formField: {
    marginHorizontal: 10,
    marginTop: 12,
  },
  formLabel: {
    color: '#28A966',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 1,
    marginBottom: 4,
    fontFamily: 'arial',
  },
  formPicker: {
    marginBottom: 5,
    marginLeft: 70,
    width: '70%',
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  formPlaceholder: {
    fontSize: 18,
    fontFamily: 'arial',
    fontWeight: 'bold',
    borderBottomColor: '#28A966',
    borderBottomWidth: 2,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#28A966',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26,
    fontFamily: 'arial',
  },
  heading: {
    color: '#28A966',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  iconLeft: {
    left: 12,
  },
  icon: {
    color: '#28A966',
    padding: 5,
  },
  iconMargin: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconRight: {
    right: 12,
  },
  image: {
    height: 200,
    width: 200,
    alignSelf: 'center',
  },
  inAppButton: {
    backgroundColor: '#28A966',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  inAppDeleteButton: {
    backgroundColor: 'crimson',
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
  },
  inAppTouchText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'arial',
  },
  inputBox: {
    borderColor: '#28A966',
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
    paddingLeft: 0,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    padding: 10,
  },
  logoLoginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 68,
  },
  logoSize: {
    width: 275,
    height: 238,
  },
  logoTag: {
    color: 'white',
    fontSize: 18,
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: 'arial',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  noPostText: {
    fontSize: 18,
    marginTop: 80,
    fontFamily: 'arial',
  },
  notificationsText: {
    color: '#28A966',
    fontSize: 18,
    margin: 20,
    fontWeight: 'bold',
  },
  postContainer: {
    borderColor: '#28A966',
    borderBottomWidth: 2,
    marginHorizontal: 12,
    marginBottom: 4,
    marginTop: 10,
    paddingBottom: 8,
  },
  postText: {
    fontSize: 20,
    paddingBottom: 3,
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'arial',
  },
  searchFormField: {
    marginHorizontal: 10,
    marginTop: 12,
    marginBottom: 220,
  },
  submitButtonContainer: {
    marginHorizontal: 100,
  },
});
