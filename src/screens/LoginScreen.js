import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  NativeModules,
  Image,
} from 'react-native';
import {baseUrl} from '../components/Global';
import {Text} from 'react-native-paper';
import Background from '../components/Background1';
import Logo from '../components/Logo';
import ME_Icon from '../assets/ME_Icon';

import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {fieldValidator} from '../helpers/fieldValidator';
import {numberValidator} from '../helpers/numberValidator';
import {mobileValidator} from '../helpers/mobileValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import defaultMessages from '../helpers/defaultMessages';
import PasswordInputView from '../components/PasswordInputView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNSimpleCrypto from 'react-native-simple-crypto';
import api_config from '../Api/api';
import {login_api} from '../Api/login_api';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

var Aes = NativeModules.Aes;

const LoginScreen = ({route, navigation}) => {
  const [mobile, setMobile] = useState({
    value: '',
    error: '',
  });
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const [fcmToken, setFCMToken] = useState(null)
  //const [animating] = { true }
  let animating = false;
  let isLoading = false;
  const toHex = RNSimpleCrypto.utils.convertArrayBufferToHex;
  const toUtf8 = RNSimpleCrypto.utils.convertArrayBufferToUtf8;

// 

  const generateKey = (password, salt, cost, length) =>
    Aes.pbkdf2(password, salt, cost, length);

  const encryptData = (text, key) => {
    return Aes.randomKey(16).then(iv => {
      return Aes.encrypt(text, key, iv).then(cipher => ({
        cipher,
        iv,
      }));
    });
  };

  const decryptData = (encryptedData, key) =>
    Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);

  useEffect(async () => {
    try {
      let user_id = JSON.parse(await EncryptedStorage.getItem('user_id'));
      let isLogout = JSON.parse(await EncryptedStorage.getItem('isLogout'));
      let getFcmToken = await EncryptedStorage.getItem('FCMToken')
      setFCMToken(getFcmToken)

      if (user_id !== null && isLogout == false) {
        setLoading(true);
        let user_data = JSON.parse(await EncryptedStorage.getItem('user_data'));

        setMobile({value: user_data.user_mobile, error: ''});
        setPassword({value: user_data.user_password, error: ''});
        checkAutoLogin(user_data.user_mobile, user_data.user_password);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const checkAutoLogin = (mobileNumber, password) => {
    try {
      console.log(mobileNumber + ':' + password);
      let data = login_api(mobileNumber, password,fcmToken);

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));

      axios({
        url: api_config.BASE_URL + api_config.LOGIN_BROKER,
        method: 'POST',
        data: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          setLoading(false);
          console.log('response code : loogeding', response.data);


          if (response.data.status == 200) {
            console.log('response id :', response.data.data.code);
            //storeUserID(response.data.data.id)
            storeUserID(
              response.data.data.id,
              mobile.value,
              password.value,
              response.data.data.code,
              false,
              response.data.data.api_token,
            );
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen'}],
            });
          } else {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.log('error from image :'+JSON.stringify(error));
        });
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      startLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen'}],
      });
    } catch (e) {
      startLoading(false);
      alert('Failed to save the data to the storage:' + e.message);
    }
  };

  const startLoading = isShow => {
    setLoading(isShow);
  };

  const onLoginPressed = () => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'VerifyOtpScreen'}],
    // });
    // return
    const emailError = mobileValidator(mobile.value);
    const passwordError = passwordValidator(password.value);
    if (!fieldValidator(mobile.value)) {
      setMobile({
        ...mobile,
        error: defaultMessages.en.required.replace('{0}', 'Mobile Number'),
      });
      return;
    } else if (!numberValidator(mobile.value, 'mobile')) {
      setMobile({
        ...mobile,
        error: defaultMessages.en.minlength
          .replace('{0}', 'Mobile Number')
          .replace('{1}', '10'),
      });
      return;
    }
    if (!fieldValidator(password.value)) {
      setPassword({
        ...password,
        error: defaultMessages.en.required.replace('{0}', 'Password'),
      });
      return;
    }
    setLoading(true);
    callLoginAPI();
    // navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Dashboard'}],
    //   });
  };

  async function storeUserID(id, mobile, password, referralCode, isLogout, apiToken) {
    console.log('apitokesdfsdfsdfasdfsdf',apiToken)
    try {
      let data = {
        user_id: id.toString(),
        user_mobile: mobile.toString(),
        user_password: password.toString(),
        referral_code: referralCode.toString(),
        api_token: apiToken.toString()
      };
      await EncryptedStorage.setItem('isLogout', JSON.stringify(isLogout));
      await EncryptedStorage.setItem('user_data', JSON.stringify(data));
      await EncryptedStorage.setItem('user_id', id.toString());
    } catch (error) {
      // There was an error on the native side
    }
  }

  const callLoginAPI = () => {
    let data = login_api(mobile.value, password.value,fcmToken);

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    
    axios({
      url: api_config.BASE_URL + api_config.LOGIN_BROKER,
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        setLoading(false);
        console.log('response code : loogeding', response.data);
        if (response.data.status == 200) {
          console.log(response.data.data.id);
          storeUserID(
            response.data.data.id,
            mobile.value,
            password.value,
            response.data.data.code,
            false,
            response.data.data.api_token,
          );
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen'}],
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log('error from image :');
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <Background>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          color="#085cab"
        />
        <View style={{marginTop: '40%'}}></View>
        {/* <ME_Icon /> */}
        <Image
          style={styles.image}
          source={require('../assets/seller_logo.png')}
        />

        <View
          style={{
            backgroundColor: '#FFF',
            width: '120%',
            marginTop: '20%',
            height: '70%',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}>
          <View style={{marginTop: 40}}>
            <TextInput
              label="Mobile Number"
              returnKeyType="next"
              value={mobile.value}
              onChangeText={text => setMobile({value: text, error: ''})}
              error={!!mobile.error}
              errorText={mobile.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="phone-pad"
              maxLength={10}
            />

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                error={!!password.error}
                errorText={password.error}
                maxLength={40}
                secureTextEntry={hidePass ? true : false}
                pass={true}
                show={hidePass}
                rightOnpress={() => setHidePass(!hidePass)}
              />
            </View>
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button mode="contained" onPress={onLoginPressed} labelStyle={{textTransform: 'capitalize',fontSize:18,color:'#FFFFFF',fontFamily: "Poppins-SemiBold"}}>
              Login
            </Button>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.underline}>Create new account</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center'}}><Text>Version: {defaultMessages.en.versionNumber}</Text></View>
        </View>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 25,
    paddingLeft: 10,
    width: 50,
  },
  spinnerTextStyle: {
    color: '#000',
  },
  forgotPassword: {
    width: '95%',
    alignItems: 'flex-end',
    marginBottom: 24,
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 15,
    color: theme.colors.primary,
    fontFamily: "Poppins-Regular"
  },
  link: {
    fontFamily: "Poppins-SemiBold",
    color: theme.colors.primary,
  },
  label: {
    color: '#57a3f5',
    margin: 0,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
    fontSize: 20,
    marginTop: 40,
    paddingBottom: 40,
    color: theme.colors.primary,
    textAlign: 'center',
    fontFamily: "Poppins-Regular"
  },
  image: {
    width: 235,
    height: 175,
  },
});

export default LoginScreen;
