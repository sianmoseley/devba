import {StyleSheet, Dimensions} from 'react-native';

export const authenticationStyles = StyleSheet.create({
  authContainer: {
    backgroundColor: '#2bb76e',
    // flex: 1,
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
    color: 'black',
    paddingHorizontal: 10,
  },
  authLabel: {
    marginBottom: 3,
    color: 'white',
  },
  authText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2B74B7',
    paddingVertical: 10,
  },
  newUserButton: {
    backgroundColor: '#2B2EB7',
    paddingVertical: 10,
  },
  forgotPassword: {
    marginTop: 10,
  },
});

export const globalStyles = StyleSheet.create({
  aboutText: {
    fontSize: 16,
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
  iconLeft: {
    left: 12,
  },
  icon: {
    color: '#2bb76e',
    padding: 5,
  },
  iconMargin: {
    marginHorizontal: 165,
    flexDirection: 'row',
  },
  iconRight: {
    right: 12,
  },
  inAppButton: {
    backgroundColor: '#2bb76e',
    borderRadius: 10,
    paddingVertical: 10,
  },
  inAppTouchText: {
    color: 'white',
    fontSize: 18,
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
    justifyContent: 'center',
    flexGrow: 1,
    padding: 10,
  },
  logoLoginContainer: {
    alignItems: 'center',
    // backgroundColor: 'black',
    justifyContent: 'center',
    marginHorizontal: 68,
    marginVertical: 0,
  },
  logoTag: {
    // backgroundColor: 'red',
    color: 'white',
    fontSize: 16,
    marginTop: -7,
    textAlign: 'center',
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
    fontSize: 18,
    paddingBottom: 3,
    paddingTop: 5,
    textAlign: 'center',
  },
  submitButtonContainer: {
    marginHorizontal: 100,
  },
});
