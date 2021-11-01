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
    Share,
    PermissionsAndroid,
    RefreshControl
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
import RNFetchBlob from 'rn-fetch-blob';
import Profile from '../components/Profile';
import styles from "./Styles";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            loading: 'true',
            isLoading: true,
            userID: 0,
            spinner: false,
            refreshing:false,
            jsonData: {},
            dropdownPlaceholder: '',
            balesCount: 100,
            displayBalesCount: 0,
            balesPrice: '',
            productJsonData: {},
            productAttributeList: {},
            myActivePost: {},
            myClientList: {},
            arrNegotiationList: [],
            arrNotificationList: {},
            myContractListArray: {},
            txtSpinningMillName: '',
            attributeValue: [{}],
            selectedProductID: 0,
            selectedProductName: '',
            inputData: [],
            attributeArry: [],
            balespriceFocus: false,
            token: '',
            balesPriceError: '',
            isHomeVisible: true,
            isCustomerVisible: true,
            isAllBid: true,
            isBided: false,
            isDeal: false,
            isMenuOpen: false,
            openState: false,
            deOpenState: false,
            isMyClientsAllClicked: true,
            isMyClientsBuyersClicked: false,
            isMyClientsSellersClicked: false,
            value: null,
            productItem: [],
            deValue: null,
            items: [
                { label: 'Maharashtra', value: '1' },
                { label: 'Rajasthan', value: '2' },
                { label: 'Punjab', value: '3' },
                { label: 'Karnatak', value: '4' },
            ],
            deList: [
                { label: 'Domestic', value: 'Domestic' },
                { label: 'Export', value: 'Export' }
            ],
            deName: 'Domestic',
            buyForList: [
                { label: 'Self', value: 'Self' },
                { label: 'Other', value: 'Other' }
            ],
            isShowBuyForDrpDown: true,
            isShowSpinningName: false,
            buyForDropDownValue: 'Self',
            arrProductAttributeValue: [
                { label: 'Maharashtra', value: '1' },
                { label: 'Rajasthan', value: '2' },
                { label: 'Punjab', value: '3' },
                { label: 'Karnatak', value: '4' },
            ],
            isPostToSell: false,
            isSearchToSell: false,
            isProfile: false,
            ProfileData: [],
            isNotificationToBuyer: false,
            isDashboard: true,
            isMyContracts: false,
            titleOfScreen: 'Dashboard',

            btnNegotiation: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: '#69BA53',
            },
            btnUnread: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnNegotiationTextColor: theme.colors.primary,
            btnUnreadTextColor: 'gray',


            dealTabStyle1: {
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#69BA53',
                marginLeft: 0,
                marginRight: 5,
                marginTop: 10,
                borderRadius: 5,
            },
            dealTabStyle2: {
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F0F5F9',
                marginLeft: 5,
                marginRight: 0,
                marginTop: 10,
                borderRadius: 5,
            },
            dealTabTextBox1: {
                height: 40,
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                color: 'white',
            },
            dealTabTextBox2: {
                height: 40,
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                color: theme.colors.textColor,
            },
            btnAllContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
            },
            btnBuyersContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnSellerContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnActiveTextColor: theme.colors.primary,
            btnCompletedTextColor: 'gray',

        };

    }

    componentDidMount() {
        this.getMyClientList();

    }

    onClickMyClientsAll = () => {
        this.setState({
            isMyClientsAllClicked: true,
            isMyClientsBuyersClicked: false,
            isMyClientsSellersClicked: false,
            myClientList: {},
            spinner: true,
            btnAllContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
            },
            btnBuyersContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnSellerContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnActiveTextColor: theme.colors.primary,
            btnCompletedTextColor: 'gray',
        });

        this.getMyClientList();
    };

    onClickMyClientsBuyers = () => {
        this.setState({
            isMyClientsAllClicked: false,
            isMyClientsBuyersClicked: true,
            isMyClientsSellersClicked: false,
            spinner: true,
            myClientList: {},
            btnAllContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnBuyersContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
            },
            btnSellerContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnActiveTextColor: 'gray',
            btnCompletedTextColor: theme.colors.primary,
        });
        this.getMyClientList();
    };

    onClickMyClientsSellers = () => {
        this.setState({
            isMyClientsAllClicked: false,
            isMyClientsBuyersClicked: false,
            isMyClientsSellersClicked: true,
            spinner: true,
            myClientList: {},
            btnAllContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnBuyersContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnSellerContainer: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
            },
            btnActiveTextColor: 'gray',
            btnCompletedTextColor: theme.colors.primary,
        });
        this.getMyClientList();
    };

    getMyClientList = async () => {
        try {
            var self = this;
            let data = { broker_id: await EncryptedStorage.getItem('user_id') };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.MY_CLIENTS,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    console.log('my client list response :', JSON.stringify(response.data.data));
                    self.setState({
                        myActivePost: [],
                        spinner: false,
                        refreshing:false
                    })
                    if (response.data.status == 200) {
                        self.setState({ myClientList: response.data.data });
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch(function (error) {
                    self.setState({
                        spinner: false,
                        message: 'Something bad happened ' + error,
                        refreshing: false

                    }),
                        alert('error from image :');
                });
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    createMyClientsAll = () => {
        try {
            if (this.state.isMyClientsAllClicked) {
                if (this.state.myClientList.length > 0) {
                    return this.state.myClientList.map((el, i) => (
                        <TouchableOpacity >
                            <View style={{ width: '100%' }}>

                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.user_type}
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.name}
                                        </Text>
                                    </View>



                                </View>



                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Joining Date
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.created_at}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Deals
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.count}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Bales
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.sum_bales}
                                        </Text>
                                    </View>

                                </View>


                                <View
                                    style={{
                                        width: '90%',
                                        left: '5%',
                                        height: 1,
                                        marginTop: 10,
                                        backgroundColor: '#D1D1D1',
                                    }}></View>
                            </View>

                        </TouchableOpacity>

                    ));
                }
                return (
                    <View
                        style={{
                            height: '90%',
                            flex: 1,
                            flexDirection: 'column',
                            //backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '40%'
                        }}>
                        <NoRecordsFound_Icon />
                        <Text style={styles.norecords}>Sorry, no records available</Text>
                    </View>
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    createMyClientsBuyersUI = () => {
        try {

            if (this.state.isMyClientsBuyersClicked) {
                if (this.state.myClientList.length > 0) {
                    return this.state.myClientList.map((el, i) => (

                        <TouchableOpacity>
                            {el.user_type == "buyer" ? (<View>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Buyer
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.name}
                                        </Text>
                                    </View>



                                </View>



                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Joining Date
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.created_at}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Deals
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.count}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Bales
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.sum_bales}
                                        </Text>
                                    </View>

                                </View>

                                <View style={{ width: '90%', height: 1, backgroundColor: '#D1D1D1', marginBottom: 10, marginTop: 10, marginLeft: 19 }} />

                            </View>
                            ) : null}
                        </TouchableOpacity>
                    ));
                }
                return (
                    <View
                        style={{
                            height: '90%',
                            flex: 1,
                            flexDirection: 'column',
                            //backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '40%'
                        }}>
                        <NoRecordsFound_Icon />
                        <Text style={styles.norecords}>Sorry, no records available</Text>
                    </View>
                );
            }
        } catch (error) {
            console.log(error);
        }
    };


    createMyClientsSellersUI = () => {
        try {

            if (this.state.isMyClientsSellersClicked) {
                if (this.state.myClientList.length > 0) {
                    return this.state.myClientList.map((el, i) => (

                        <TouchableOpacity>
                            {el.user_type == "seller" ? (<View>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Seller
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.name}
                                        </Text>
                                    </View>



                                </View>



                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Joining Date
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.created_at}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            Deals
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.count}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            marginLeft: '5%',
                                            marginTop: 10,
                                            marginRight: '5%',
                                            height: 40,
                                        }}>
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                opacity: 0.5,
                                                textAlignVertical: 'center',
                                            }}>
                                            Bales
                                        </Text>

                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                            style={{
                                                flex: 1,
                                                color: theme.colors.textColor,
                                                fontSize: 12,
                                                textAlignVertical: 'center',
                                                fontFamily: "Poppins-Regular"
                                            }}>
                                            {el.sum_bales}
                                        </Text>
                                    </View>

                                </View>

                                <View style={{ width: '90%', height: 1, backgroundColor: '#D1D1D1', marginBottom: 10, marginTop: 10, marginLeft: 19 }} />

                            </View>
                            ) : null}
                        </TouchableOpacity>
                    ));
                }
                return (
                    <View
                        style={{
                            height: '90%',
                            flex: 1,
                            flexDirection: 'column',
                            //backgroundColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '40%'
                        }}>
                        <NoRecordsFound_Icon />
                        <Text style={styles.norecords}>Sorry, no records available</Text>
                    </View>
                );
            }
        } catch (error) {
            console.log(error);
        }
    };


    _onRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.getMyClientList()
        // getCallNews(1);

    }

    render () {
            return (
                <View
                    style={{
                        width: '100%',
                        height: '86%',
                        paddingBottom: 30,
                        marginTop: 10,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                    }}>
                    <ScrollView 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }>
                        <Spinner visible={this.state.spinner} color="#085cab" />

                        <View style={{ marginTop: 20 }}>
                            <View style={styles.container}>
                                <View style={this.state.btnAllContainer}>
                                    <TouchableOpacity onPress={() => this.onClickMyClientsAll()}>
                                        <Button
                                            mode="text"
                                            uppercase={false}
                                            color={this.state.btnActiveTextColor}
                                            labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontFamily: "Poppins-Regular" }}>
                                            All
                                        </Button>
                                    </TouchableOpacity>
                                </View>

                                <View style={this.state.btnBuyersContainer}>
                                    <TouchableOpacity onPress={() => this.onClickMyClientsBuyers()}>
                                        <Button
                                            mode="text"
                                            uppercase={false}
                                            color={this.state.btnCompletedTextColor}
                                            labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontFamily: "Poppins-Regular" }}>
                                            Buyers
                                        </Button>
                                    </TouchableOpacity>
                                </View>

                                <View style={this.state.btnSellerContainer}>
                                    <TouchableOpacity onPress={() => this.onClickMyClientsSellers()}>
                                        <Button
                                            mode="text"
                                            uppercase={false}
                                            color={this.state.btnCompletedTextColor}
                                            labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontFamily: "Poppins-Regular" }}>
                                            Sellers
                                        </Button>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {this.createMyClientsAll()}
                            {this.createMyClientsBuyersUI()}
                            {this.createMyClientsSellersUI()}
                        </View>
                    </ScrollView>
                </View>
            )
    }
}
export default App