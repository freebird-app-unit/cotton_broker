import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { baseUrl } from '../components/Global';
import { fontSizeMyPostCenterText } from '../components/Global';
import { vLineMyPostStyle } from '../components/Global';
import Background from '../components/Background';
import Header from '../components/Header';
import {Card} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Appbar,Searchbar,Button,Badge} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {theme} from '../core/theme';
import TextInput from '../components/TextInput';

//svgs
import Home from '../assets/Home';
import Employee from '../assets/Employee';
import EmployeeGray from '../assets/EmployeeGray';
import CustomerIcon from '../assets/CustomerIcon';
import FilterSettings from '../assets/FilterSettings';
import Download from '../assets/Download';

class MyPostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      loading: 'true',
      spinner: false,
      jsonData: {},
      token: ''
    };
    
  }


      _keyExtractor (item, index) {
    return index.toString();
  }

   _renderItem ({ item, index }) {
    return (<View style={{flexDirection:'row',width:80}}><View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center',textTransform: 'uppercase'}}>{item.attribute}</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontFamily:'Poppins-SemiBold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>{item.attribute_value}</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  </View>

                  );
  }


  render() {
    const jsonDashboard = this.state.jsonData;
   

    return (
      <Background>
        
        <View
          style={{
            flex: 1,
            width: '100%',
            height:'100%',
            position: 'relative',
            marginTop: -40,
            backgroundColor:theme.colors.blackBG
          }}>

          <Spinner
            visible={this.state.spinner}
            color="#085cab" />

              <View style={{width: '100%',height:55, marginTop: 40}}>
                <Appbar.Header style={{backgroundColor: 'transparent'}} >
                    <Appbar.BackAction color='white' onPress={() => this.props.navigation.goBack()} />
                    <Appbar.Content
                      style={{alignItems: 'center'}}
                      color="white"
                      title=""
                      titleStyle={{fontSize:20,fontWeight:'bold'}}
                    />
                    <Appbar.Action icon='notification-clear-all' color="transparent" onPress={() => {
                      this.setState({isFilterShow:true}); }} />
                  </Appbar.Header>
              </View>




 <View style={{width: '100%',height:'86%',paddingBottom:30, marginTop:10,backgroundColor: 'white',borderTopLeftRadius:20,borderTopRightRadius:20}}>
              <ScrollView>
                    <View style={{marginTop:20}}>



           <View style={{width:'100%'}}>

              <View style={{flexDirection: 'row',marginLeft:'5%',marginRight:'5%',height:40,alignItems:'center'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.primary,
                            fontSize:16,
                            fontFamily:'Poppins-SemiBold',
                            textAlignVertical:'center'}}>{this.props.route.params.data.product_name}</Text>



                        
              </View>

              <View style={{flexDirection: 'row',marginLeft:'5%',marginTop:10,marginRight:'5%',height:40}}>


                   <FlatList style={{ flex: 1 }}
                        data={this.props.route.params.data.attribute_array}
                        keyExtractor={this._keyExtractor.bind(this)}
                        renderItem={this._renderItem.bind(this)}
                        horizontal={true}
                      />


                {/*   <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>UHML(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>28.7</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>MIC(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>100-200</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>RD(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>28.5</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                   <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            textAlign:'center',
                            textAlignVertical:'center'}}>CG(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>30.0</Text>

                  </View>

                  <View style={vLineMyPostStyle}></View>

                  <View style={{flex:1}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            textAlign:'center',
                            textAlignVertical:'center'}}>SFI(mm)</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:fontSizeMyPostCenterText,
                            fontWeight:'bold',
                            textAlign:'center',
                            textAlignVertical:'center'}}>31.2</Text>

                  </View> */}

                    
                  
              </View>


              
              


          
          </View>





         

              <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:'auto',marginTop:20}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontFamily:'Poppins-SemiBold',
                            textAlignVertical:'center'}}>Bales/ Price Details</Text>

              </View>

   




           <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:'auto'}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Post Bales</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>{this.props.route.params.data.no_of_bales}</Text>

                  </View>

                   

 

                   

           <View style={{flex:1,marginLeft:'5%',marginTop:10,marginRight:'5%',height:40}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Post Price</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>₹ {this.props.route.params.data.price}</Text>

                  </View>


              <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontFamily:'Poppins-SemiBold',
                            textAlignVertical:'center'}}>Post</Text>

              </View>

           <View style={{flex:1,marginLeft:'5%',marginTop:0,marginRight:'5%',height:'auto'}}>
                     <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            opacity:.5,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Post at</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:12,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>{this.props.route.params.data.date}</Text>

                  </View>

                
 


            <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
                    
                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:16,
                            fontFamily:'Poppins-SemiBold',
                            textAlignVertical:'center'}}>Notification to Seller</Text>

              </View>


              <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
              <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Ada Perry</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            opacity:.5,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>New York City</Text>
              </View>


         
           <View style={{flex:1,marginLeft:'5%',marginRight:'5%',height:30,marginTop:10,height:'auto'}}>
              <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Alex McCaddy</Text>

                    <Text numberOfLines={1} 
                          ellipsizeMode='tail' 
                          style={{flex: 1,
                            color:theme.colors.textColor,
                            fontSize:14,
                            opacity:.5,
                            fontFamily:'Poppins-Regular',
                            textAlignVertical:'center'}}>Los Angeles</Text>
              </View>








                    </View>
              </ScrollView>
              </View>
















              </View>

      </Background>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top:0
  },
  container2:{
    marginTop:'2%',
    width:'90%',
    height:'86%',
    marginLeft:'5%',
    marginRight:'5%',
    backgroundColor: 'white',
    borderColor:'white',
    borderWidth: 1,
    borderRadius:20,
    alignItems:'flex-start',
  },
   btnActiveContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :2,
    borderBottomColor: theme.colors.primary
  },
  btnCompletedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :1,
    borderBottomColor:'gray',
    opacity:.5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth :2,
    borderBottomColor: '#57a3f5',
    marginLeft:1,
  },
  buttonContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginLeft:1,
    marginRight:1,
    opacity:.4
  },
  spinnerTextStyle: {
    color: '#000',
  },
  module_parent_view: {
    width: '100%',
  },
  module_label_header: {
    fontWeight: 'bold',
    fontSize: 20,
    justifyContent: 'center',
    color: '#2DA3FC',
  },
  module_card2: {
    height: 70,
    width:'90%',
    position:'absolute',
    backgroundColor: 'white',
    borderRadius: 35,
    borderColor: '#57a3f5',
    borderWidth:1,
    elevation: 5,
    alignItems:'center',
    alignSelf:'center',
    top:80
  },
  allbid:{
    flexDirection: 'row',
    marginLeft:'5%',
    marginTop:'5%'
  },
  bidedItem:{
      height: 120,
      width:'90%',
      backgroundColor: 'white',
      borderRadius: 0,
      borderColor: '#57a3f5',
      borderWidth:1,
      elevation: 5,
      marginLeft:'5%',
      marginTop:15,
      flexDirection: 'row',
  },
  bidedProduct:{
    width:'60%',
    height:'85%',
    marginLeft:'2%',
    marginTop:'3%',
    alignItems:'flex-start',
    
  },
  bidedQuantity:{
    width:'35%',
    height:'85%',
    marginTop:'3%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },

  titleText:{
    flex: 1,
    color:'#2DA3FC',
    fontWeight:'bold'
  },
  allbidValue:{
    flexDirection: 'row',
    marginLeft:'5%',
    marginTop:'1%'
  },
   titleTextValue:{
    flex: 1,
    color:'#2DA3FC',
    fontSize:12
  },
  scrollViewStyle: {
    width: '100%',
    flex: 1,
    backgroundColor:'white'
  },
    dealTopMainContainer: {
    flexDirection: 'row',
    top:0,
    marginLeft:'5%',
    marginRight:'5%'
  },

  dealBtnEnable: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#69BA53',
    marginLeft:0,
    marginRight:5,
    marginTop:10,
    borderRadius:5,
  },
    dealBtnDisable: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#F0F5F9',
    marginLeft:5,
    marginRight:0,
    marginTop:10,
    borderRadius:5,
  },
  dealTopBoxTextView:{
    height:40,
    width:'100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color:'white'
  },
  dealTopBoxTextViewDisable:{
    height:40,
    width:'100%',
    textAlign: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    color:'#343434'
  },

});

export default MyPostDetails;
