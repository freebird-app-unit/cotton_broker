import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AppState,
    TouchableWithoutFeedback,
    Alert,
    Share,
    PermissionsAndroid, RefreshControl
} from 'react-native';
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import { wfrInNegotiation } from '../components/Global';

import Background from '../components/Background';
import Header from '../components/Header';
import { Card } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { theme } from '../core/theme';
import TextInput from '../components/TextInput';
import api_config from '../Api/api';
import axios from 'axios';
import Plus from '../assets/Plus';
import Bell_Icon from '../assets/Bell';
import History_Icon from '../assets/History';
import Newsfeed_Icon from '../assets/NewsFeed';
import MCX_Icon from '../assets/MCX';
import Calculator_Icon from '../assets/Calculator';
import ChangePassword_Icon from '../assets/ChangePassword';
import Profile_Icon from '../assets/Profile';
import Reports_Icon from '../assets/Reports';
import TransactionTracking_Icon from '../assets/TransactionTracking';
import { fieldValidator } from '../helpers/fieldValidator';
import { priceValidator } from '../helpers/priceValidator';
// import MyPostGreen_Icon from '../assets/MyPostGreen';
import defaultMessages from '../helpers/defaultMessages';
import { Picker } from '@react-native-picker/picker';
//svgs
import Home from '../assets/Home';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';
import SearchToSell_Icon from '../assets/SearchToSell';
import PostToSell_Icon from '../assets/PostToSell';
import MyPost_Icon from '../assets/MyPost';
import MyContracts_Icon from '../assets/MyContracts';
import Logout_Icon from '../assets/Logout';
import NotificationToBuyer_Icon from '../assets/NotificationToBuyer';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import Minus from '../assets/Minus';
import MPIcon1 from '../assets/MPIcon1';
import MPIcon2 from '../assets/MPIcon2';
import PlusRound from '../assets/PlusRound';
import MinusRound from '../assets/MinusRound';
import SetPassword from '../assets/SetPassword';
import EncryptedStorage from 'react-native-encrypted-storage';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";

// import io from "socket.io-client";
import styles from './Styles'
if (!window.location) {
    // App is running in simulator
    window.navigator.userAgent = 'ReactNative';
}

// const socket = io.connect('http://cottontradecentre.com:6001', { transports: ['websocket'] }); //live

import {
    handleAndroidBackButton,
    removeAndroidBackButtonHandler
} from '../helpers/backHandler'
import {
    exitAlert
} from '../helpers/customAlert';
import RNFetchBlob from 'rn-fetch-blob';


const Data = [
    {
        label: 'HomeScreen',
        Title: 'Home',
        Icon: <Home />
    },
    {
        label: 'ReportScreen',
        Title: 'Reports',
        Icon: <Reports_Icon />
    },
    {
        label: 'MyClients',
        Title: 'My Clients',
        Icon: <SearchToSell_Icon />
    },
    {
        label: 'MyContract',
        Title: 'My Contracts',
        Icon: <MyContracts_Icon />
    },
  
    {
        label: 'Profile',
        Title: 'Profile',
        Icon: <Profile_Icon />
    },
    {
        label: 'RequestScreen',
        Title: 'Request',
        Icon: <Profile_Icon />
    },
    {
        label: 'NewsFeed',
        Title: 'News Feed',
        Icon: <Newsfeed_Icon />
    },
    {
        label: 'Calculator',
        Title: 'Calculator',
        Icon: <Calculator_Icon />
    },
    {
        label: 'ChangePasswordScreen',
        Title: 'Change Password',
        Icon: <ChangePassword_Icon />
    },
    {
        label: 'McxScreen',
        Title: ' MCX',
        Icon: <MCX_Icon />
    },
    {
        label: 'MyEarning',
        Title: 'My Earning',
        Icon: <ChangePassword_Icon />
    },
    
]

ListTransaction = (props) => {
    console.log('props',props);
    try {

        let data = {
            parameters: {
                cotton: "20.00", cocudakl: "300.00", kapas: "40.00", usdinr: "10.00"
            }
        };
        // console.log("getNegotiationListData");
        console.log('requested params: ', data);
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        axios({
            url: api_config.BASE_URL + api_config.GET_MCX_DATA,
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer Pk0X15IVt07nPmvQPmtwMvRJKf4jlLncg1AHqmbvKBsybxAANf7ouAqlMJbAznLpPkAxaJjzvmIDszhk3WTZvcEaJv'

            },
        }).then(async function (response) {
            // setLoader(false)
            // serRefresh(false);
            // console.log('response', response)

            if (response.status == 200) {

                // console.log('response', response.data)
                let obj = {}

                let list = response.data.data.map(item => {
                    obj = {
                        name: item.parameters,
                        value: '--'
                    }
                    return obj
                })

                props.navigation.navigate('McxScreen', { list });

                // setmcxData(list)
                // setItemChecked((prevState) => !prevState);


              

                // let bro = response.data.data.filter(item => item.type === 'default')
                // DefaultBrokerList(bro);
                // let Brokernotdefault = response.data.data.filter(item => item.type === 'not_default')
                // setBalance(response.data.data.wallet_amount);
                // setTransaction(response.data.data.transaction_history);

                // self.setState({ ProfileData: response.data.data, spinner: false, });
            } else {
                // setListView(false)

                console.log('hi_______', response.data.message);
            }
        })
            .catch(function (error) {
                // self.setState({
                //     spinner: false,
                //     message: 'Something bad happened ' + error,
                // }),
                // setListView(false)
                // setLoader(false)
                // serRefresh(false);
                console.log('error', JSON.stringify(error))
                alert(defaultMessages.en.serverNotRespondingMsg);
            });
    } catch (error) {
        console.log(error);
        // setLoader(false)
        // serRefresh(false);

        // setListView(false)

    }
}

const NavigationButton = (props) => {
    // console.log('this',props)
    return (<TouchableOpacity onPress={() => props.label == 'McxScreen' ? ListTransaction(props.props) : props.props.navigation.navigate(props.label)}>
        <View
            style={{
                flexDirection: 'row',
                paddingTop: '4%',
                paddingLeft: '5%',
                alignItems: 'center',
            }}>
            {props.children}
            <Button
                mode="text"
                uppercase={false}
                color={theme.colors.blackBG}
                labelStyle={{ fontFamily:'Poppins-Medium', height: 20 }}>
                {props.Title}
            </Button>
        </View>
    </TouchableOpacity>)
}

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            loading: 'true',

            spinner: false,

        };


    }

  

    onClickLogout = async () => {
        Alert.alert(
            'E-Cotton',
            defaultMessages.en.confirmationDialog.replace('{1}', 'logout'),
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.logout() },
            ],
        );
    };

    logout = async () => {
        try {
            this.logoutSuccess()
          
        } catch (error) {
            console.log('Error: ' + error);
        }
    };


    logoutSuccess = async () => {
        await EncryptedStorage.setItem('isLogout', JSON.stringify(true));
        await EncryptedStorage.setItem('user_id', null)
        this.props.navigation.navigate("LoginScreen");
    };


    onClickShareApp = async () => {
        try {
            let user_data = JSON.parse(await EncryptedStorage.getItem('user_data'));

            let sharingText = "Download the e-Cotton Apps from below URL \n\nBuyer: https://fresoy.com/otasetup/cottonbuyer/index.html\n\nSeller: https://fresoy.com/otasetup/cottonseller/index.html\n\n- Use my referral code: " + user_data.referral_code
            Share.share({
                message: sharingText,
            })
                .then(result => console.log(result))
                .catch(errorMsg => console.log(errorMsg));
        } catch (error) {
            console.log("Error: " + error)
        }
    }


    render() {

        return (
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: theme.colors.blackBG,
                }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Icon
                        name="close"
                        size={30}
                        color="white"
                        style={{
                            width: 30,
                            height: 30,
                            marginTop: '10%',
                            marginLeft: '5%',
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.container2} >

                    <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}>

                        {Data.map(item => (
                            <NavigationButton props={this.props} label={item.label} Title={item.Title} >
                                {item.Icon}
                            </NavigationButton>
                        ))}

                        <TouchableOpacity
                            onPress={() => this.onClickShareApp()}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: '4%',
                                    paddingLeft: '5%',
                                    alignItems: 'center',
                                }}>
                                <NotificationToBuyer_Icon />
                                <Button
                                    mode="text"
                                    uppercase={false}
                                    color={theme.colors.blackBG}
                                    labelStyle={{ fontFamily: 'Poppins-Medium' }}>
                                    Share App
                                </Button>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onClickLogout()}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: '4%',
                                    paddingLeft: '5%',
                                    alignItems: 'center',
                                }}>
                                <Logout_Icon />
                                <Button
                                    mode="text"
                                    uppercase={false}
                                    color={theme.colors.blackBG}
                                    labelStyle={{ fontFamily:'Poppins-Medium' }}>
                                    Logout
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View></View>
        )
    }
}