import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, ScrollView,Image,RefreshControl
} from 'react-native';
import { theme } from '../core/theme';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import { Avatar } from 'react-native-paper';
import Stamp_Icon from '../assets/Stamp';
import Spinner from 'react-native-loading-spinner-overlay';
import defaultMessages from '../helpers/defaultMessages';
import EncryptedStorage from 'react-native-encrypted-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NoRecordsFound_Icon from '../assets/NoRecodsFound';

import api_config from '../Api/api';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';

const MyEarning = ({  navigation, route  }) => {


    const [spinner, setSpinner] = useState(true)

    const [EarningData, setEarningData] = useState([])

    // console.log('props>>',Props)

    const Name = (item) =>{
        console.log('item',item)
        if (item){
        let i = item.split(' ');
        let fname = i[0];

        if(i.length > 1){
        let lname = i[1];
        return fname.charAt(0).toUpperCase() + "" + lname.charAt(0).toUpperCase();
        }
        else {
            return fname.charAt(0).toUpperCase() + "" + fname.charAt(1).toUpperCase()
        }
    }
    else {
        return 'hi'
    }

    }


    const fetchProfile = async () => {

        // let dataProfile = await EncryptedStorage.getItem('user_data');
        // let d = (JSON.parse(dataProfile));
        // console.log('data', dataProfile)
        // console.log('item', dataProfile.user_id, dataProfile.api_token)
        try {
            setSpinner(true)
            let data = {
                broker_id: await EncryptedStorage.getItem('user_id'),
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(data));

            axios({
                url: api_config.BASE_URL + api_config.BROKER_EARNING,
                method: 'POST',
                data: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }).then(function (response) {
                setSpinner(false)
                serRefresh(false)

                console.log('res', response.data.data)
                if (response.data.status == 200) {
                    setEarningData(response.data.data)
                    // navigation.setParams({
                    //     ProfileData: response.data.data,
                    // });
                } else {
                    console.log(response.data.message);
                }
            })
                .catch(function (error) {
                    setSpinner(false)
                    serRefresh(false)

                    console.log('error', JSON.stringify(error))
                    alert(defaultMessages.en.serverNotRespondingMsg);
                });
        } catch (error) {
            setSpinner(false)
            serRefresh(false)

            console.log(error);
        }
    }

    useEffect(async () => {

        const willFocusSubscription = navigation.addListener('focus', () => {
            fetchProfile();
        });

        return willFocusSubscription;



    }, [])

    const [itemChecked, setItemChecked] = useState(false);
    // const [ProfileData, setEarningData] = useState([]);



    // const[Id,setId] = useState(0);
    const backgroundStyle = {
        flex: 1,
        width: '100%',
        height: hp(86),
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

const HeaderValue = (props) => {
       console.log('props',props.value)
    return props.value ? <View style={{ marginTop: hp(2), alignSelf: 'flex-start' }}>
        <Text style={styles.ValueOfLabel}>{props.label}</Text>
                <Image source={{ uri: props.value }} style={{ height: hp(15), width: hp(15), alignSelf: 'flex-start' }}
                 resizeMode={'contain'} /></View>
                  : <Stamp label={props.label} />

        
    
}

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

const renderItem = ({item}) => {
    console.log('item',item)
            return (
                <View style={{flexDirection:'row',
                alignItems :'center',flex:1,borderBottomColor:'lightgray',borderBottomWidth:0.5,paddingVertical:wp(3)}}>
                    <View style={{flexDirection:'column',width:wp(35)}}>
                        <Text>
                            Date
                        </Text>
                        <Text>
                            {item.date}
                        </Text>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{marginLeft:wp(1),fontSize:hp(2),fontFamily:'Poppins-Bold'}}>
                            Earning
                        </Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                        <FontAwesome name={'rupee'} size={hp(2)} color={'#333'} />
                        <Text style={{marginLeft:wp(1),fontSize:hp(2),fontFamily:'Poppins-Bold'}}>
                            {item.amount}
                        </Text>
                        </View>
                       
                    </View>
                </View>
            )
}

    const [refreshing, serRefresh] = useState(false)

    const _onRefresh = () => {
        serRefresh(true);
        fetchProfile();

    }

    return (
        <View style={backgroundStyle}>
            {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} hidden /> */}
            <Spinner visible={spinner} color="#085cab" />
            <View style={{ flexShrink: 1, backgroundColor: 'white', 
             flexDirection: 'column', paddingHorizontal: wp(5) }}>
                {(EarningData.hasOwnProperty('earning') && EarningData.earning.length > 0 )? (<FlatList
                 style={{minHeight:hp(75)}}
                        data={EarningData.earning}
                 renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                 />) : (
                        <View
                            style={{
                                height: '90%',
                                flexGrow: 1,
                                flexDirection: 'column',
                                //backgroundColor: 'red',
                                justifyContent: 'center',
                                alignItems: 'center',
                                // marginTop: '40%'
                            }}>
                            <NoRecordsFound_Icon />
                            <Text style={styles.norecords}>Sorry, no records available</Text>
                        </View>
                 )}
                  <View style={{flexDirection:'column',alignSelf:'flex-end',alignContent:'flex-end'}}>
                        <Text style={styles.label}>Total Earning</Text>
                        <Text style={{
                            fontSize: hp(2.5),
                            color: theme.colors.primary,
                            textAlign:'right',
                            fontFamily: "Poppins-Regular"
                        }}>{EarningData.total_earning }</Text>
                </View>
                 </View>
                
                   </View>

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

export default MyEarning