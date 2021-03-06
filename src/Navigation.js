import React, { useEffect } from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './core/theme'
import { View, Text, Alert, StatusBar, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterSettings from './assets/FilterSettings';

import styles from './screens/Styles'

import {
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    SplashScreen,
    Dashboard,
    SetPasswordScreen,
    VerifyOtpScreen,
    ChangePasswordScreen,
    SearchSelectSeller,
    DealDetails,
    NegotiateDetails,
    NotificationSelectSeller,
    MyPostDetails,
    MyContractFilter,
    ReportScreen,
    MyContractDetails, RequestScreen, MyContract, HomeScreen, MyClients, MenuScreen, MyEarning, NewsFeedView
} from './screens'
import firebase from '@react-native-firebase/app';
import EditProfile from './components/EditProfile'
import ProfileSeen from './components/ProfileSeen'
import Profile from './components/Profile'
import MCXScreen from './components/MCXScreen'
import NewsSingle from './components/NewsSingle'
// import { FirstRoute, SecondRoute, ThirdRoute } from './components/CalculatorView'




import messaging from '@react-native-firebase/messaging';
import EncryptedStorage from 'react-native-encrypted-storage';
import Custom from './components/Custom'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FirstRoute, SecondRoute, ThirdRoute } from './components/CalculatorView'
import { Appbar, Searchbar, Button, Badge } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './components/responsive-ratio';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator();
const AppHeading = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(10), marginTop: hp(4.5) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color={props.color ? props.color : "white"}
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color={props.color ? props.color : "white"} />}
                        color={props.color ? props.color : "white"}
                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color={props.color ? props.color : "white"}
                    title={props.title}
                    titleStyle={{ fontSize: 20, fontFamily: "Poppins-SemiBold" }}
                />
                {props.filter ? <Appbar.Action
                    icon={() => <FilterSettings color={'white'} />}
                    color={props.color ? props.color : "white"}
                    onPress={
                        props.rightPress
                        // this.setState({ isFilterShow: true });
                        // // if (this.state.isMyContracts || this.state.isProfile) {
                        //   this.state.isMyContracts && this.props.navigation.navigate
                        //     ('MyContractFilter', { productList: this.state.productItem });
                        //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                    }
                /> : <Appbar.Action
                    icon="menu"
                    color="transparent"
                    onPress={() => null}
                />}
            </Appbar.Header>
        </View>
    )
}

const AppHeadingProfile = (props) => {
    console.log('props', props)
    return (
        <View style={{ width: '100%', height: hp(9), marginTop: hp(4) }}>
            <Appbar.Header style={{ backgroundColor: 'transparent' }}>
                {props.menu ? <Appbar.Action
                    icon="menu"
                    color="white"
                    onPress={props.leftPress}
                /> :
                    <Appbar.Action
                        icon={() => <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' />}
                        color="white"
                        onPress={props.leftPress}
                    />}
                <Appbar.Content
                    style={{ alignItems: 'center' }}
                    color="white"
                    title={props.title}
                    titleStyle={{ fontSize: hp(2.5), fontFamily: "Poppins-SemiBold" }}
                />
                <Appbar.Action
                    icon={() => <Image tintColor={'white'} style={{ height: hp(3), width: hp(3) }} source={require('./assets/edit-icon.png')} />}
                    color={"white"}
                    onPress={
                        props.rightPress
                        // this.setState({ isFilterShow: true });
                        // // if (this.state.isMyContracts || this.state.isProfile) {
                        //   this.state.isMyContracts && this.props.navigation.navigate
                        //     ('MyContractFilter', { productList: this.state.productItem });
                        //   this.state.isProfile && this.props.navigation.navigate('EditProfile', { data: this.state.ProfileData })

                    }
                /></Appbar.Header>
        </View>
    )
}

const MyContractFunction = ({ navigation, route }) => {
    console.log('navigation>??', route)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'My Contract'} menu filter leftPress={() => navigation.navigate('MenuScreen')} rightPress={() =>
                navigation.navigate('MyContractFilter', { productList: route.params.productList })} />
            <View
                style={styles.flex}>
                <MyContract navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const mcxScreenFunction = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'MCX'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <MCXScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const ReportScreenFunction = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'Report'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <ReportScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const MyContractFilterFunction = ({ navigation, route }) => <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <AppHeading title={'Filter'} color={'black'} leftPress={() => navigation.goBack()} />
    <View
        style={styles.flex}>
        <MyContractFilter navigation={navigation} route={route} />
    </View>
</View>

const MyClientsFunction = ({ navigation, route }) => {
    // console.log('navigation>??', route)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'My Clients'} menu leftPress={() => navigation.navigate('MenuScreen')} rightPress={() =>
                navigation.navigate('MyContractFilter', { productList: route.params.productList })} />
            <View
                style={styles.flex}>
                <MyClients navigation={navigation} route={route} />
            </View>
        </View>
    )
}
const ProfileFunction = ({ navigation, route }) => {
    console.log('navigation>?? profiole', route.params)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeadingProfile title={'Profile'} menu profile leftPress={() => navigation.navigate('MenuScreen')}
                rightPress={() => navigation.navigate('EditProfile', { data: route.params != undefined ? route.params.ProfileData : [] })} />
            <View
                style={{

                    width: '100%',
                    // height: '86%',
                    flex: 1,
                    paddingBottom: 30,
                    // marginTop: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,

                }}>
                <Profile navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const home = ({ navigation, route }) => {
    // console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'Dashboard'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <HomeScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const Request = ({ navigation, route }) => {
    console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'Requests'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={{
                    width: '100%',
                    // height: '86%',
                    flex: 1,
                    paddingBottom: 30,
                    // marginTop: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                <RequestScreen navigation={navigation} route={route} />
            </View>
        </View>
    )
}
const NewsFeedViewFunction = ({ navigation }) => <View style={{ flex: 1, backgroundColor: '#333' }}>
    <AppHeading title={'News Feed'} menu leftPress={() => navigation.navigate('MenuScreen')} />
    <View
        style={styles.flex}>
        <NewsFeedView navigation={navigation} />
    </View>
</View>
const ChangePasswordFunction = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <AppHeading menu title={'Change Password'} leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={styles.flex}>
                <ChangePasswordScreen navigation={navigation} />
            </View>
        </View>
    )
}

const MyEarningFunction = ({ navigation, route }) => {
    console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'My Earning'} menu leftPress={() => navigation.navigate('MenuScreen')} />
            <View
                style={{
                    width: '100%',
                    // height: '86%',
                    flex: 1,
                    paddingBottom: 30,
                    // marginTop: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                <MyEarning navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const ProfileSeenFunction = ({ navigation, route }) => {
    console.log('navigation>', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#343434' }}>
            <AppHeading title={'Profile'} leftPress={() => navigation.goBack()} />
            <View
                style={{
                    width: '100%',
                    // height: '86%',
                    flex: 1,
                    paddingBottom: 30,
                    // marginTop: 10,
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}>
                <ProfileSeen navigation={navigation} route={route} />
            </View>
        </View>
    )
}

const tabnavi = ({ navigation }) => {
    // console.log('nabvi', navigation)
    return (
        <View style={{ flex: 1, backgroundColor: '#333', }}>
            <View style={{
                flexDirection: 'row', paddingHorizontal: wp(5),
                marginTop: hp(4), height: hp(9), alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Ionicons name='chevron-back-outline' size={hp(3)} color='#fff' style={{ width: wp(30) }} onPress={() => navigation.goBack()} />
                <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 20, fontFamily: 'Poppins-SemiBold' }}>Calculator</Text>
                <View style={{ width: wp(30) }} />

            </View>
            <View style={{
                flex: 1,
                width: '100%',
                // height: hp(86),
                paddingBottom: 30,
                paddingTop: hp(3),
                marginTop: hp(2),
                backgroundColor: 'white',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
            }}>
                <Tab.Navigator tabBarOptions={{
                    labelStyle: { fontSize: hp(2), fontFamily: 'Poppins-SemiBold', textTransform: 'none' },
                    activeTintColor: theme.colors.primary,
                    inactiveTintColor: '#afafaf',
                    indicatorStyle: { backgroundColor: theme.colors.primary },
                }}>
                    <Tab.Screen name="Ginning" component={FirstRoute} />
                    <Tab.Screen name="Spinning" component={SecondRoute} />
                    <Tab.Screen name="Exports" component={ThirdRoute} />
                </Tab.Navigator>
            </View>
        </View>
    );
}

const App = () => {

    const credentials = {
        clientId: '1092885786732-mbkufs9gkblr44rd0ma0gosj1his7pj5.apps.googleusercontent.com',
        appId: '1:1092885786732:android:5c985918395a6ac6676849',
        apiKey: 'AIzaSyAh0zSYw6abqVxVzJjj9-KkOEknYqEYRfA',
        storageBucket: 'cotton-broker-25b0d.appspot.com',
        databaseURL: 'https://databasename.firebaseio.com',
        messagingSenderId: '1092885786732',
        projectId: 'cotton-broker-25b0d',
    };

    async function onAppBootstrap() {
        // Register the device with FCM

        if (!firebase.apps.length) {
            await firebase.initializeApp(credentials);
        }

        await messaging().registerDeviceForRemoteMessages();

        // Get the token
        const token = await messaging().getToken();

        console.log('token', token)

        await EncryptedStorage.setItem('FCMToken', token);

        // Save the token
    }


    async function onMessageReceived(message) {
        console.log('message', message)
    }

    useEffect(() => {
        onAppBootstrap()

        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);

        // return unsubscribe;
    }, []);

    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <StatusBar barStyle={'light-content'}
                    backgroundColor="transparent" translucent={true} />
                <Stack.Navigator
                    initialRouteName="SplashScreen"
                    screenOptions={{
                        headerShown: false,
                    }}
                >

                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordScreen} />
                    <Stack.Screen
                        name="SetPasswordScreen"
                        component={SetPasswordScreen} />
                    <Stack.Screen
                        name="ChangePasswordScreen"
                        component={ChangePasswordFunction} />
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="HomeScreen" component={home} />
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
                    <Stack.Screen name="MyContractDetails" component={MyContractDetails} />
                    <Stack.Screen name="MyContractFilter" component={MyContractFilterFunction} />
                    <Stack.Screen name="SearchSelectSeller" component={SearchSelectSeller} />
                    <Stack.Screen name="DealDetails" component={DealDetails} />
                    <Stack.Screen name="NegotiateDetails" component={NegotiateDetails} />
                    <Stack.Screen name="NotificationSelectSeller" component={NotificationSelectSeller} />
                    <Stack.Screen name="MyPostDetails" component={MyPostDetails} />
                    <Stack.Screen name="Custom" component={Custom} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Calculator" component={tabnavi} />
                    <Stack.Screen name="RequestScreen" component={Request} />
                    <Stack.Screen name="ProfileSeen" component={ProfileSeenFunction} />
                    <Stack.Screen name="Profile" component={ProfileFunction} />
                    <Stack.Screen name="MyContract" component={MyContractFunction} />
                    <Stack.Screen name="MyClients" component={MyClientsFunction} />
                    <Stack.Screen name="MenuScreen" component={MenuScreen} />
                    <Stack.Screen name="MyEarning" component={MyEarningFunction} />
                    <Stack.Screen name="McxScreen" component={mcxScreenFunction} />
                    <Stack.Screen name="NewsSingle" component={NewsSingle} />
                    <Stack.Screen name="NewsFeed" component={NewsFeedViewFunction} />
                    <Stack.Screen name="ReportScreen" component={ReportScreenFunction} />










                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App