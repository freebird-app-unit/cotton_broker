import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet, View, Text, ScrollView,
    useWindowDimensions, Image, TouchableOpacity, SectionList, RefreshControl
} from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import NoRecordsFound_Icon from '../assets/NoRecodsFound';

import TextInput from '../components/TextInput';
import { FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import api_config from '../Api/api';
import EncryptedStorage from 'react-native-encrypted-storage';
import defaultMessages from '../helpers/defaultMessages';
import Spinner from 'react-native-loading-spinner-overlay';
import Profile from '../components/Profile';
const Plans = ({ navigation }) => {

    // console.log('props>>', navigation)

    const ListBroker = async () => {
        try {
            // setListView(true)
            setLoader(true)

            let data = {
                broker_id: await EncryptedStorage.getItem('user_id'),
            };
            // console.log("getNegotiationListData");
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            console.log('Negotiation Request Param: ', formData);

            axios({
                url: api_config.BASE_URL + api_config.BROKER_REQUEST_LIST,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(function (response) {
                    setListView(false)
                    setLoader(false)
                    serRefresh(false)
                    console.log(
                        'my negotiation list response :>>>>>>>>>>>>>>>>>>>',
                        response.data
                    );
                    if (response.data.status == 200) {

                        BrokerList(response.data.data)
                        // self.setState({ ProfileData: response.data.data, spinner: false, });
                    } else {
                        // setListView(false)

                      alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    // self.setState({
                    //     spinner: false,
                    //     message: 'Something bad happened ' + error,
                    // }),
                    // setListView(false)
                    setLoader(false)
                    serRefresh(false)
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
            // setListView(false)

        }
    }

    useEffect(() => {
        console.log('hi')
        ListBroker()
    }, [])


    const [listView, setListView] = useState(false)

    const [loading, setLoader] = useState(false)
    const [Broker, BrokerList] = useState([])

    const [transaction, setTransaction] = useState(
        [
            {
                title: '11-10-2021',
                data: [{
                    Name: 'Added to a wallet',
                    userType:'Buyer',
                    state:'Gujarat',
                    city:'Rajkot',
                  
                }, {
                        Name: 'Added to a wallet',
                        userType: 'Buyer',
                        state: 'Gujarat',
                        city: 'Rajkot',

                },
                {
                    Name: 'Added to a wallet',
                    userType: 'Buyer',
                    state: 'Gujarat',
                    city: 'Rajkot',
                },
                ]
            },
            {
                title: '10-10-2021',
                data: [{
                    Name: 'Added to a wallet',
                    userType: 'Buyer',
                    state: 'Gujarat',
                    city: 'Rajkot',
                }, {
                        Name: 'Added to a wallet',
                        userType: 'Buyer',
                        state: 'Gujarat',
                        city: 'Rajkot',

                },
                {
                    Name: 'Added to a wallet',
                    userType: 'Buyer',
                    state: 'Gujarat',
                    city: 'Rajkot',

                },
                ]
            },
        ]
    )


    const [itemChecked, setItemChecked] = useState(false);


    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        paddingBottom: 30,
        paddingTop: hp(3),
        // marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };

   

    const select = (item) => {
        item.selected = !item.selected
        const updated = Plan.map((it) => {
            it.selected = false;
            if (it.Days === item.Days) {
                it.selected = !it.selected;
            }
            return it;
        });

        setPlan(updated)
        setItemChecked((prevState) => !prevState);
        // setPlan(pl)
    }


const Profile = (item) => {
    try {
        // setListView(true)

        let data = {
            user_id: item.buyer_id,
        };
        // console.log("getNegotiationListData");
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        console.log('Negotiation Request Param: ', formData);

        axios({
            url: api_config.BASE_URL + api_config.PROFILE_BUYER,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (response) {
                setListView(false)

                console.log(
                    'my negotiation list response :>>>>>>>>>>>>>>>>>>>',
                    response.data
                );
                if (response.data.status == 200) {
                    navigation.navigate('ProfileSeen',{Profile:response.data.data,navigation})
                    // alert(response.data.message)
                    // BrokerList(response.data.data)
                    // self.setState({ ProfileData: response.data.data, spinner: false, });
                } else {
                    // setListView(false)

                    alert(response.data.message);
                }
            })
            .catch(function (error) {
                // self.setState({
                //     spinner: false,
                //     message: 'Something bad happened ' + error,
                // }),
                // setListView(false)
                setLoader(false)

                alert(defaultMessages.en.serverNotRespondingMsg);
            });
    } catch (error) {
        console.log(error);
        // setListView(false)

    }
} 


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=> Profile(item)}><View style={{ flexDirection: 'column',borderBottomColor:'#d1d1d1',borderBottomWidth:wp(.2),paddingBottom:wp(1), alignSelf: 'center', width: wp(94),paddingHorizontal:wp(3), marginVertical: hp(1) }}>
               <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={styles.label}>{item.name}</Text>
                    <Text style={styles.Typelabel}>Buyer</Text>
               </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(32)}}>
                        <Text style={styles.time}>{item.time_ago}</Text>

                    {/* <View style={{flexDirection:'column',alignItems:'flex-start'}}>
                        <Text style={styles.time}>State</Text>
                            <Text style={styles.balance} >Gujarat</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={styles.time}>City</Text>
                            <Text style={styles.balance} >Rajkot</Text>
                    </View> */}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(47) }}>
                        <Button
                            mode="contained"
                            onPress={() => accept(item, 'reject')}
                            style={{
                                // marginRight: 5,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: 'red',
                                width: wp(21),
                                paddingVertical:-2,
                                // marginVertical: 0

                                // alignSelf: 'flex-start'
                            }}
                            labelStyle={{ color: 'red', fontFamily: 'Poppins - Bold', fontWeight: 'bold', textTransform: 'capitalize',fontSize:hp(1.5) }}>
                            Reject
                </Button>
                        <Button
                            mode="contained"
                            onPress={() => accept(item,'accept')}
                            style={{
                                // marginRight: 5,
                                backgroundColor: theme.colors.primary,
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                width: wp(21),
                                paddingVertical: -2,
                                // marginVertical: 0
                                // alignSelf: 'flex-start'
                            }}
                            labelStyle={{ color: '#fff', textTransform: 'capitalize',
                                fontSize: hp(1.5), fontFamily: 'Poppins - Bold', fontWeight: 'bold', }}>
                            Accept
                </Button>
                    </View>
                </View>
                
            </View></TouchableOpacity>
        )
    }



    const accept = (item,type) => {
        try {
            // setListView(true)

            let data = {
                request_id: item.id,
                type: type
            };
            // console.log("getNegotiationListData");
            const formData = new FormData();
            formData.append('data', JSON.stringify(data));
            console.log('Negotiation Request Param: ', formData);
            axios({
                url: api_config.BASE_URL + api_config.ACCEPT_BROKER_REQUEST,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                    setListView(false)

                    console.log(
                        'my negotiation list response :>>>>>>>>>>>>>>>>>>>',
                        response.data
                    );
                    if (response.data.status == 200) {
                        alert(response.data.message);

                        let i = Broker.filter(i => i.id != item.id )
                        // console.log('i',i)
                        BrokerList(i)
                        // self.setState({ ProfileData: response.data.data, spinner: false, });
                    } else {
                        // setListView(false)

                        alert(response.data.message);
                    }
                })
                .catch(function (error) {
                    // self.setState({
                    //     spinner: false,
                    //     message: 'Something bad happened ' + error,
                    // }),
                    // setListView(false)
                    setLoader(false)

                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            console.log(error);
            // setListView(false)

        }
    }

    // const setIndex = (index) => setId(index);

    const [refreshing, serRefresh] = useState(false)

    const _onRefresh = () => {
        serRefresh(true);
        ListBroker();

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>

            <View style={backgroundStyle}>
                {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <Spinner visible={loading} color="#085cab" />

                    <View style={{
                        flex: 1, width: wp(100),
                        flexDirection: 'column', backgroundColor: '#fff', paddingHorizontal: wp(5)
                    }}>

                        {Broker.length ? (<View style={{
                            flex: 1
                        }}><FlatList data={Broker}
                            renderItem={renderItem}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={_onRefresh}
                                    />
                                }
                            // renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                            keyExtractor={(item, index) => index}
                            />
                        </View> ) : (
                                <View
                                    style={{
                                       
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                       
                                    }}>
                                    <NoRecordsFound_Icon />
                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Regular' }}>Sorry, no records available</Text>
                                </View>
                        )}
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontWeight: 'bold',
        fontFamily: 'Poppins - Bold'
    },
    Typelabel: {
        fontSize: hp(1.8),
        color: theme.colors.text,
        fontWeight: 'bold',
        fontFamily: 'Poppins - Bold'
    },
    balance: {
        fontSize: hp(2), fontFamily: 'Poppins - Bold',
    },
    time: {
        fontSize: hp(1.9),
        opacity: 0.5,
        fontFamily: 'Poppins - Regular'
    },
    sectionHeader: {
        marginVertical: hp(.5),
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: hp(1),
        fontSize: hp(2.1),
        fontFamily: 'Poppins-Regular',
        color: "#333",
        opacity: 0.5
        // backgroundColor: '#8fb1aa',  
    }

})

export default Plans