import {StyleSheet, Dimensions} from 'react-native';

export const authenticationStyles = StyleSheet.create({
  authContainer: {
    backgroundColor: '#2bb76e',
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
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 1,
    marginBottom: 4,
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
});

export const globalStyles = StyleSheet.create({
  aboutText: {
    fontSize: 20,
  },
  accountButton: {
    borderColor: '#2bb76e',
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    width: '60%',
  },
  accountButtonText: {
    color: '#2bb76e',
    fontSize: 18,
    textAlign: 'center',
  },
  accountContainer: {
    alignItems: 'center',
    paddingVertical: 25,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 3,
    textAlign: 'center',
  },
  formField: {
    marginHorizontal: 10,
    marginTop: 12,
  },
  formLabel: {
    color: '#2bb76e',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 1,
    marginBottom: 4,
  },
  formPicker: {
    marginBottom: 5,
    marginHorizontal: -6,
    marginTop: -10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#2bb76e',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 26,
  },
  heading: {
    color: '#2bb76e',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  iconLeft: {
    left: 12,
  },
  icon: {
    color: '#2bb76e',
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
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
  inAppButton: {
    backgroundColor: '#2bb76e',
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10, // SIAN - added this line in so that button on AddPostScreen doesn't touch bottom of screen
  },
  inAppDeleteButton: {
    // backgroundColor: '#2bb76e',
    backgroundColor: 'crimson',
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
  },
  inAppTouchText: {
    color: 'white',
    // fontFamily: 'Arial',
    fontSize: 20,
    textAlign: 'center',
  },
  inputBox: {
    borderColor: '#2bb76e',
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
    paddingLeft: 0,
  },
  logoContainer: {
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    flexGrow: 1,
    padding: 10,
  },
  logoLoginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 68,
  },
  logoTag: {
    color: 'white',
    fontSize: 18,
    marginBottom: 60,
    textAlign: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  postContainer: {
    borderColor: '#2bb76e',
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
  },
  submitButtonContainer: {
    marginHorizontal: 100,
  },
});
