import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView,Image
} from 'react-native';
import { theme } from '../core/theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import { Avatar } from 'react-native-paper';
import Stamp_Icon from '../assets/Stamp';
import Header_Icon from '../assets/Header';
import Button from '../components/Button';
import axios from 'axios';
import api_config from '../Api/api';
import Spinner from 'react-native-loading-spinner-overlay';

const ProfileSeen = ({route,navigation}) => {

    console.log('props>>',route)

    const Props = route.params.Profile

    const Name = (item) =>{
        let i = item.split(' ');
        let fname = i[0];

        if(i.length > 1){
        let lname = i[1];
        return fname.charAt(0) + "" + lname.charAt(0);
        }
        else {
            return fname.charAt(0).toUpperCase() + "" + fname.charAt(1).toUpperCase()
        }

    }


    const [itemChecked, setItemChecked] = useState(false);
    const [ProfileData, setProfileData] = useState([]);



    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        paddingBottom: 30,
        // paddingTop: hp(3),
        marginTop: hp(2),
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    };

    const MainSection = (props) => (
        <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
            <Text style={styles.HeaderLAbel}>{props.Section}</Text>
        </View>
    )


    const LabelValue = (props) => (
        <View style={{ marginTop: hp(1), alignSelf: 'flex-start' }}>
            <Text style={styles.VAlue1}>{props.label}</Text>
            {props.label != 'Branch Address' ? <Text style={styles.ValueOfLabel}>{props.value}</Text> : <Text style={{
                width: wp(60), flexWrap: 'wrap', fontSize: hp(2),
                color: theme.colors.text,
                fontFamily: "Poppins-Bold",
                fontWeight: 'bold'
            }}>{props.value}</Text>}
        </View>
    )
    const Stamp = (props) => (
        <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
            <Text style={styles.ValueOfLabel}>{props.label}</Text>
            <Stamp_Icon
                size={20}
                color="black"
                style={{ width: 20, height: 20, }}
            />
        </View>
    )
    const YearValue = (props) => (
        <View style={{ marginTop: hp(1), alignSelf: 'flex-start' }}>
            <Text style={styles.VAlue1}>{props.label}</Text>
            <View style={{ flexDirection: 'column' }}>
                {
                    props.year.map(item => <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(50) }}>
                        <Text style={styles.ValueOfLabel}>{item.year}</Text>
                        <Text style={styles.ValueOfLabel}>{item.turnover} cr</Text>
                    </View>)
                }
            </View>
        </View>
    )
    const accept = (item, type) => {
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
            })
                .then(function (response) {
                    setListView(false)

                    console.log(
                        'my negotiation list response :>>>>>>>>>>>>>>>>>>>',
                        response.data
                    );
                    if (response.data.status == 200) {
                        alert(response.data.message);

                        navigation
                        // let i = Broker.filter(i => i.id != item.id)
                        // // console.log('i',i)
                        // BrokerList(i)
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
    const [listView, setListView] = useState(false)

    const [loading, setLoader] = useState(false)

    return (
        <ScrollView style={backgroundStyle}>
            <Spinner visible={loading} color="#085cab" />

            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', flexDirection: 'column',
             padding: wp(5) }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', width: wp(90) }}>
                    <Avatar.Text size={hp(3)} 
                    style={{ height: hp(10), width: hp(10), borderRadius: hp(5) }} 
                        labelStyle={{fontSize: hp(2.5),
    color: 'white',
    fontFamily: "Poppins-Bold",
                            fontWeight: 'bold'
                        }} label={Name(Props.name)} backgroundColor={theme.colors.primary} />
                    <View style={{ flexDirection: 'column', marginLeft: wp(5) }}>
                        <Text style={styles.label}>{Props.name || 'Unknown'}</Text>
                        <Text style={styles.VAlue1}>{Props.user_type || 'not provided'}</Text>
                    </View>
                </View>
                <MainSection Section='Personal Details' />
                <LabelValue label='Contact Person Name' value={Props.name_of_contact_person || 'not provided'} />
                <LabelValue label='Contact Person Mobile Number' value={Props.mobile_number || 'not provided'} />
                <LabelValue label='Email Address' value={Props.email || 'not provided'} />
                <MainSection Section='Location Details' />
                <LabelValue label='Station' value={Props.station || 'not provided'} />
                <LabelValue label='District' value={Props.city || 'not provided'} />
                <LabelValue label='State' value={Props.state || 'not provided'} />
                <MainSection Section='Company Details' />
                <LabelValue label='Header' value={Props.business_type || 'not provided'} />
                <LabelValue label='Mill reg number' value={ Props.registration_no || 'not provided' } />
                <LabelValue label='Mill reg Date' value={Props.registration_date || 'not provided'} />
                <LabelValue label='Reg as' value='MSME' />
                <YearValue label='Year' year={[{
                    year: Props.turnover_date_one,
                    turnover: Props.turnover_year_one
                }, {
                    year: Props.turnover_date_two,
                    turnover: Props.turnover_year_two
                }, {
                    year: Props.turnover_date_three,
                    turnover: Props.turnover_year_three
                }]} />
                <MainSection Section='Bank Details' />
                <LabelValue label='GST Number' value={Props.gst_no || 'Not Provided'} />
                <LabelValue label='Pan Number' value={Props.pan_no_of_buyer || 'not provided'} />
                <LabelValue label='Bank Name' value={Props.bank_name || 'not provided'} />
                <LabelValue label='Account Hoder Name' value={Props.account_holder_name || 'not provided'} />
                <LabelValue label='Branch Address' value={Props.branch_address || 'Not Provided'} />
                <LabelValue label='IFSC Code' value={Props.ifsc_code || 'not provided'} />
                <LabelValue label='Referral Code' value={Props.referral_code || 'not provided'} />
                {
                    Props.profile_image ?
                        <Image source={{ uri: Props.profile_image }} style={{ height: hp(15), width: hp(15),alignSelf:'flex-start' }} resizeMode={'contain'} /> : <Stamp label='Stamp' />

                }
               
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(90) }}>
                    <Button
                        mode="contained"
                        onPress={() => accept(Props, 'reject')}
                        style={{
                            // marginRight: 5,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: 'red',
                            width: wp(43),
                            // paddingVertical: -2,
                            // marginVertical: 0

                            // alignSelf: 'flex-start'
                        }}
                        labelStyle={{ color: 'red', fontFamily: 'Poppins - Bold', fontWeight: 'bold', 
                        textTransform: 'capitalize', fontSize: hp(2) }}>
                        Reject
                    </Button>
                    <Button
                        mode="contained"
                        onPress={() => accept(Props, 'accept')}
                        style={{
                            // marginRight: 5,
                            backgroundColor: theme.colors.primary,
                            borderWidth: 1,
                            borderColor: theme.colors.primary,
                            width: wp(43),
                            // paddingVertical: -2,
                            // marginVertical: 0
                            // alignSelf: 'flex-start'
                        }}
                        labelStyle={{
                            color: '#fff', textTransform: 'capitalize',
                            fontSize: hp(2), fontFamily: 'Poppins - Bold', fontWeight: 'bold',
                        }}>
                        Accept
                    </Button>
                </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.4),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    },
    HeaderLAbel: {
        fontSize: hp(2.5),
        color: theme.colors.text,
        fontFamily: "Poppins-Bold",
        fontWeight: 'bold'
    },
    value: {
        fontSize: hp(2.5),
        color: '#fff',
        fontFamily: "Poppins-Bold",
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        opacity: 0.5,
        fontFamily: "Poppins-Regular"
    },
    ValueOfLabel: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Bold",
        fontWeight: 'bold',
        lineHeight: hp(3)
    }

})

export default ProfileSeen