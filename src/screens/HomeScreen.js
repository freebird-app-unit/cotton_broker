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
    PermissionsAndroid
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

componentDidMount(){
    // this.getNegotiationListData()
    // this.getNotificationListData()
}

    onClickUnread = () => {
        this.setState({
            dealTabStyle2: {
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#69BA53',
                marginLeft: 5,
                marginRight: 0,
                marginTop: 10,
                borderRadius: 5,
            },
            dealTabStyle1: {
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F0F5F9',
                marginLeft: 0,
                marginRight: 5,
                marginTop: 10,
                borderRadius: 5,
            },
            dealTabTextBox2: {
                height: 40,
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                color: 'white',
            },
            dealTabTextBox1: {
                height: 40,
                width: '100%',
                textAlign: 'center',
                alignItems: 'center',
                textAlignVertical: 'center',
                color: theme.colors.textColor,
            },
            btnNegotiation: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                opacity: 0.5,
            },
            btnUnread: {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: '#69BA53',
            },
            btnNegotiationTextColor: 'gray',
            btnUnreadTextColor: theme.colors.primary,
        });
        // this.setState({ spinner: true })
        // this.getNotificationListData()
    };

    onClickNegotiation = () => {
        this.setState({
            // spinner: true,
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

        });

        // this.getNegotiationListData();
    };

    getNegotiationListData = async () => {
        try {
            var self = this;
            self.setState({
                seller_id: await EncryptedStorage.getItem('user_id'),
                user_type: "seller"
            })
            let data = { seller_id: await EncryptedStorage.getItem('user_id'), user_type: "seller" };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.NEGOTIATION_LIST,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    // console.log('my negotiation list response :', JSON.stringify(response.data.data));
                    self.setState({
                        arrNegotiationList: [],
                        spinner: false
                    })
                    if (response.data.status == 200) {

                        self.setState({ arrNegotiationList: response.data.data });
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch(function (error) {
                    console.log('error',error)
                    self.setState({
                        spinner: false,
                        message: 'Something bad happened ' + error,
                    }),
                        alert('error from image :');
                });
        } catch (error) {
            console.log(error)
        }
    };

    getNotificationListData = async () => {
        try {
            var self = this;
            self.setState({
                userID: await EncryptedStorage.getItem('user_id')
            })
            let data = { seller_id: await EncryptedStorage.getItem('user_id') };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.NOTIFICATION_LIST,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    // console.log('my notification list response :', JSON.stringify(response));
                    self.setState({
                        arrNotificationList: {},
                        spinner: false
                    })
                    if (response.data.status == 200) {

                        self.setState({ arrNotificationList: response.data.data });
                    } else {
                        console.log(response.data.message);
                    }
                })
                .catch(function (error) {
                    self.setState({
                        spinner: false,
                        message: 'Something bad happened ' + error,
                    }),
                        alert('error from image :');
                });
        } catch (error) {
            console.log(error)
        }
    };

    onClickRespond = (el) => {
        let data = { cameFrom: 'Negotiation', type: el.negotiation_type, post_id: el.post_notification_id, buyerId: el.buyer_id, current_price: el.current_price, current_no_of_bales: el.current_no_of_bales, payment_condition: el.payment_condition, transmit_condition: el.transmit_condition, lab: el.lab }
        this.props.navigation.navigate('DealDetails', { data: data, type: el.negotiation_type });
    };
    onClickNotificationView = (el) => {
        let data = { cameFrom: 'Notification', post_id: el.notification_id, type: 'notification', buyerId: el.seller_buyer_id, current_price: el.price, current_no_of_bales: el.no_of_bales, payment_condition: '', transmit_condition: '', lab: '' }
        this.props.navigation.navigate('DealDetails', { data: data, type: 'notification' });
    };

    onClickWaitingForResponse = (el) => {
        //this.props.navigation.navigate('NegotiateDetails',{data:el,type:el.negotiation_type,post_id:el.post_notification_id,buyerId:el.buyer_id});
        this.props.navigation.navigate('NegotiateDetails', { data: el, type: el.negotiation_type, post_id: el.post_notification_id, sellerId: el.seller_id });
    };

    createDashboardInNegotiationListUI = () => {
        try {
            //console.log("createDashboardInNegotiationListUI: " + JSON.stringify(this.state.arrNegotiationList));
            //console.log("userID: " + this.state.userID);
            if (this.state.arrNegotiationList.length > 0) {
                return this.state.arrNegotiationList.map((el, i) => (
                    //console.log( el.notification_detail[i].seller_buyer_id+":"+this.state.userID),
                    <View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>

                            <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%', height: 40 }}>
                                {el.negotiation_type == 'notification' ? <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        marginTop: 18,
                                        color: theme.colors.textColor,
                                        fontSize: 16,
                                        fontFamily: "Poppins-Regular",
                                        textAlignVertical: 'center'
                                    }}>{el.notification_detail[0].product_name}</Text> : <Text numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{
                                            flex: 1,
                                            marginTop: 18,
                                            color: theme.colors.textColor,
                                            fontSize: 16,
                                            fontFamily: "Poppins-Regular",
                                            textAlignVertical: 'center'
                                        }}>{el.post_detail[0].product_name}</Text>
                                }

                            </View>

                            <View style={{ flex: 1, marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 40 }}>
                                <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        opacity: .5,
                                        fontFamily: "Poppins-Regular",
                                        textAlignVertical: 'center'
                                    }}>Prev</Text>

                                <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        fontFamily: "Poppins-Regular",
                                        textAlignVertical: 'center'
                                    }}>₹ {el.prev_price} ({el.prev_no_of_bales})</Text>

                            </View>




                            {el.negotiation_type == 'notification' ?
                                el.negotiation_by == "seller" ?
                                    <View style={{ flex: 1.2, width: '100%', marginLeft: '1%', marginTop: 10, marginRight: '5%', height: 35 }}>
                                        <TouchableOpacity
                                            onPress={() => this.onClickWaitingForResponse(el)}>
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    fontSize: 10,
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    color: '#69BA53',
                                                    borderRadius: 5,
                                                    textAlignVertical: 'center',
                                                    fontFamily: "Poppins-Regular"
                                                }}>
                                                Waiting for response
                                            </Text>
                                        </TouchableOpacity></View> : <View style={{ flex: 1, width: '100%', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 35 }}>
                                        <TouchableOpacity onPress={() => this.onClickRespond(el)}>
                                            <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    fontSize: 14,
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    borderRadius: 5,
                                                    backgroundColor: '#69BA53',
                                                    fontFamily: "Poppins-Regular",
                                                    textAlignVertical: 'center'
                                                }}>Respond</Text>
                                        </TouchableOpacity></View> :
                                el.negotiation_by == "seller" ?
                                    <View style={{ flex: 1.2, width: '100%', marginLeft: '1%', marginTop: 10, marginRight: '5%', height: 35 }}>
                                        <TouchableOpacity
                                            onPress={() => this.onClickWaitingForResponse(el)}>
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    fontSize: 10,
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    color: '#69BA53',
                                                    borderRadius: 5,
                                                    textAlignVertical: 'center',
                                                    fontFamily: "Poppins-Regular"
                                                }}>
                                                Waiting for response
                                            </Text>
                                        </TouchableOpacity></View> :
                                    <View style={{ flex: 1, width: '100%', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 35 }}>
                                        <TouchableOpacity onPress={() => this.onClickRespond(el)}>
                                            <Text numberOfLines={1}
                                                ellipsizeMode='tail'
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    fontSize: 14,
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    color: 'white',
                                                    borderRadius: 5,
                                                    backgroundColor: '#69BA53',
                                                    fontFamily: "Poppins-Regular",
                                                    textAlignVertical: 'center'
                                                }}>Respond</Text>
                                        </TouchableOpacity></View>
                            }

                        </View>


                        <View style={{ flexDirection: 'row', width: '100%' }}>

                            <View style={{ flex: 1, marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 40 }}>
                                <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        opacity: .5,
                                        fontFamily: "Poppins-Regular",
                                        textAlignVertical: 'center'
                                    }}>Posted by</Text>


                                {el.negotiation_type == 'notification' ? <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        fontFamily: "Poppins-Regular",
                                        textAlignVertical: 'center'
                                    }}>{el.notification_detail[0].name}</Text> : <Text numberOfLines={1}
                                        ellipsizeMode='tail'
                                        style={{
                                            flex: 1,
                                            color: theme.colors.textColor,
                                            fontSize: 12,
                                            fontFamily: "Poppins-Regular",
                                            textAlignVertical: 'center'
                                        }}>{el.post_detail[0].name}</Text>
                                }

                            </View>

                            <View style={{ flex: 1, marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 40 }}>
                                <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        fontFamily: "Poppins-SemiBold",

                                        textAlignVertical: 'center'
                                    }}>New</Text>

                                <Text numberOfLines={1}
                                    ellipsizeMode='tail'
                                    style={{
                                        flex: 1,
                                        color: theme.colors.textColor,
                                        fontSize: 12,
                                        fontFamily: "Poppins-SemiBold",
                                        textAlignVertical: 'center'
                                    }}>{el.current_price} ({el.current_no_of_bales})</Text>

                            </View>


                            <View style={{ flex: 1, width: '100%', marginLeft: '5%', marginTop: 10, marginRight: '5%', height: 35 }}>


                            </View>

                        </View>
                        <View style={{ width: '90%', left: '5%', height: 1, marginTop: 10, backgroundColor: '#D1D1D1' }}></View>
                    </View>
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
        } catch (error) {
            console.log(error)
        }
    }


    createDashboardUnReadListUI = () => {
        try {
            console.log('createDashboardUnReadListUI' + JSON.stringify(this.state.arrNotificationList))
            //let = await EncryptedStorage.getItem('user_id');
            if (this.state.arrNotificationList.length > 0) {
                return this.state.arrNotificationList.map((el, i) => (
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: '5%',
                                    marginRight: '5%',
                                    height: 40,
                                }}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{
                                        flex: 1,
                                        marginTop: 18,
                                        color: theme.colors.textColor,
                                        fontSize: 16,
                                        textAlignVertical: 'center',
                                        fontFamily: "Poppins-Regular"
                                    }}>
                                    {el.product_name}
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
                                    Send by
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
                                    {el.send_by}
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
                                    Price
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
                                    ₹ {el.price} ({el.no_of_bales})
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    marginLeft: '1%',
                                    marginTop: 10,
                                    marginRight: '5%',
                                    height: 35,
                                }}>
                                <TouchableOpacity
                                    onPress={() => this.onClickNotificationView(el)}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            fontSize: 14,
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            borderRadius: 5,
                                            backgroundColor: '#69BA53',
                                            textAlignVertical: 'center',
                                            fontFamily: "Poppins-Regular"
                                        }}>
                                        View
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
        } catch (error) {
            console.log(error)
        }
    }



    render (){
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
                <ScrollView>
                    <Spinner visible={this.state.spinner} color="#085cab" />

                    <View style={{ marginTop: 20 }}>
                        <View
                            style={{
                                marginRight: 20,
                                marginLeft: 20,
                                flexDirection: 'row',
                                flex: 1,
                            }}>
                            <View style={this.state.btnNegotiation}>
                                <TouchableOpacity
                                    onPress={() => this.onClickNegotiation()}>
                                    <Button
                                        mode="text"
                                        uppercase={false}
                                        color={this.state.btnNegotiationTextColor}
                                        labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontFamily: "Poppins-Regular" }}>
                                        Negotiation
                                    </Button>
                                </TouchableOpacity>
                            </View>

                            <View style={this.state.btnUnread}>
                                <TouchableOpacity
                                    onPress={() => this.onClickUnread()}>
                                    <Button
                                        mode="text"
                                        uppercase={false}
                                        color={this.state.btnUnreadTextColor}
                                        labelStyle={{ textTransform: 'capitalize', fontSize: 14, fontFamily: "Poppins-Regular" }}>
                                        Unread
                                    </Button>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*<View style={styles.dealTopMainContainer}>
                    <View style={this.state.dealTabStyle1}>
                      <TouchableOpacity
                        onPress={() => this.onClickNegotiation()}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={this.state.dealTabTextBox1}>
                          In Negotiation
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={this.state.dealTabStyle2}>
                      <TouchableOpacity
                        onPress={() => this.onClickNotification()}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={this.state.dealTabTextBox2}>
                          Notification
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                */}

                        {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                            // {this.createDashboardInNegotiationListUI()}
                            <View>
                                {this.createDashboardInNegotiationListUI()}
                            </View>
                        )}

                        {this.state.dealTabStyle2.backgroundColor == '#69BA53' && (
                            <View>
                                {this.createDashboardUnReadListUI()}
                            </View>
                        )}

                        {/* {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                    
                  )} */}

                        {/*{this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <View
                        style={{
                          flex: 1,
                          marginLeft: '5%',
                          marginRight: '5%',
                          height: 40,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            marginTop: 18,
                            color: theme.colors.textColor,
                            fontSize: 16,
                            textAlignVertical: 'center',
                            fontFamily: "Poppins-Regular"
                          }}>
                          Shankar6
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
                          Prev
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
                          ₹ 47000 (300)
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1.2,
                          width: '100%',
                          marginLeft: '1%',
                          marginTop: 10,
                          marginRight: '5%',
                          height: 35,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            width: '100%',
                            height: '100%',
                            fontSize: 10,
                            textAlign: 'center',
                            alignItems: 'center',
                            color: '#69BA53',
                            borderRadius: 5,
                            fontFamily: "Poppins-Regular",
                            textAlignVertical: 'center',
                          }}>
                          10 Negotiation
                        </Text>
                      </View>
                    </View>
                  )}

                  {this.state.dealTabStyle1.backgroundColor == '#69BA53' && (
                    <View style={{flexDirection: 'row', width: '100%'}}>
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
                          Best Deal
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
                          John Deo
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
                          Base
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
                          ₹ 46000(200)
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
                            fontFamily: "Poppins-SemiBold",
                            textAlignVertical: 'center',
                          }}>
                          Deal
                        </Text>

                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            flex: 1,
                            color: theme.colors.textColor,
                            fontSize: 12,
                            fontFamily: "Poppins-SemiBold",
                            textAlignVertical: 'center',
                          }}>
                          ₹ 46000(200)
                        </Text>
                      </View>
                    </View>
                        )}*/}




                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default App