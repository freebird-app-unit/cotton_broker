import React, { useState } from 'react';
import {
    StyleSheet, View, Text, ScrollView,TouchableOpacity,
} from 'react-native';
import { theme } from '../core/theme';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../components/responsive-ratio';
import TextInput from '../components/TextInput';

 function SecondRoute () {
     const [Yarn_Count, onChangedYarn_Count] = useState('')
     const [Cotton_Rate, onChangedCotton_Rate] = useState('')
     const [Cotton_Ratekg, onChangedCotton_Ratekg] = useState('')
     const [Yield, onChangedYield] = useState('')
     const [Waste_Recovery, onChangedWaste_Recovery] = useState('')
     const [Material_Cost, onChangedMaterial_Cost] = useState('')
     const [Conversion_Cost, onChangedConversion_Cost] = useState('')
     const [Commission, onChangedCommission] = useState('')
     const [Other_Exp, onChangedOther_Exp] = useState('')

     

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2) }}>
            <InPutText label='Yarn Count' labelValue='' outlineColor={'#d1d1d1'} onChangeText={onChangedYarn_Count} />
            <InPutText label='Cotton Rate' labelValue='Rs/ Candy' outlineColor={'#d1d1d1'} onChangeText={onChangedCotton_Rate} />
            <InPutText label='Cotton Rate' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedCotton_Ratekg} />

            <InPutText label='Yield' labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedYield}  />
            <InPutText label='Waste Recovery' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedWaste_Recovery} />
            <InPutText label='Material Cost' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedMaterial_Cost} />
            <InPutText label='Conversion Cost' labelValue='Rs/k/Count' outlineColor={'#d1d1d1'} onChangeText={onChangedConversion_Cost} />
            <InPutText label='Commission' labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedCommission} />
            <InPutText label='Other Exp' labelValue='Rs/kg' outlineColor={'#d1d1d1'} onChangeText={onChangedOther_Exp} />
        <View style={{
            flexDirection: 'row',
            alignItems: 'center', marginTop: hp(1)
        }}>
            <View style={{ width: wp(40), }}><Text style={styles.label}>Yarn Cost</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>26.6</Text>
                <Text style={styles.VAlue1}>Rs/kg</Text>
            </View>
        </View>
        <InPutText label='Yarn Rate' labelValue='Rs/kg' outlineColor={'#d1d1d1'} />
        <InPutText label='Profit' labelValue='Rs/kg' outlineColor={'#d1d1d1'} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button mode="contained"
                onPress={onPressed}
                style={{ width: wp(74) }}
                labelStyle={{
                    textTransform: 'capitalize', fontSize: 18, color: '#FFFFFF',
                    fontFamily: "Poppins-SemiBold"
                }}>
                Reset
            </Button>
            <TouchableOpacity
                onPress={onPressed}
                style={{
                    width: wp(14), height: wp(14), backgroundColor: theme.colors.primary,
                    borderRadius: wp(7), justifyContent: 'center', alignItems: 'center', marginVertical: 10
                }}>
                <Iconicons name='share-social-outline' size={hp(2.5)} color='white' />
            </TouchableOpacity>
        </View>

    </ScrollView>

)}

 function FirstRoute () {
    const [kapas, onChangedKapas] = useState('')
     const [Expenses, onChangedExpenses] = useState('')
     const [Cotton_Seed, onChangedCotton_Seed] = useState('')
     const [Our_Turn, onChangedOur_Turn] = useState('')
     const [Shortage, onChangedShortage] = useState('')



    return (
    <View style={{ flex: 1,backgroundColor:'#fff',paddingHorizontal:wp(2) }}>
            <InPutText label='Kapas' labelValue='Rs/ 20 kg' outlineColor={'#d1d1d1'} onChangeText={onChangedKapas}  />
            <InPutText label='Expenses' labelValue='Rs/ 20 kg' outlineColor={'#d1d1d1'} onChangeText={onChangedExpenses}/>
            <InPutText label='Cotton Seed' labelValue='Rs/ 20 kg' outlineColor={'#d1d1d1'} onChangeText={onChangedCotton_Seed}/>
            <InPutText label='Our Turn' labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedOur_Turn}/>
            <InPutText label='Shortage' labelValue='%' outlineColor={'#d1d1d1'} onChangeText={onChangedShortage}/>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center', marginTop: hp(1)
        }}>
            <View style={{ width: wp(40), }}><Text style={styles.label}>Cost Of Cotton</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>26.6</Text>
                <Text style={styles.VAlue1}>Rs/Candy</Text>
            </View>
        </View>
    </View>



)}
 function ThirdRoute()
{
     const [Cotton_Rate, onChangedCotton_Rate] = useState('')
     const [Expenses, onChangedExpenses] = useState('')
     const [Exchange_Rate, onChangedExchange_Rate] = useState('')
     


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: wp(2)}}>

            <InPutText label='Cotton Rate' labelValue='Rs/Candy' outlineColor={'#d1d1d1'} onChangeText={onChangedCotton_Rate} />
            <InPutText label='Expenses' labelValue='Rs/Candy' outlineColor={'#d1d1d1'} onChangeText={onChangedExpenses}/>
            <InPutText label='Exchange Rate' labelValue='USD/INR' outlineColor={'#d1d1d1'} onChangeText={onChangedExchange_Rate}/>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center', marginTop: hp(2)
        }}>
            <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>26.6</Text>
                <Text style={styles.VAlue1}>Cents/Bales</Text>
            </View>
        </View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center', marginTop: hp(1)
        }}>
            <View style={{ width: wp(40), }}><Text style={styles.label}>Export Rate</Text></View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.value}>26.6</Text>
                <Text style={styles.VAlue1}>USD/kg</Text>
            </View>
        </View>
    </View>



);
    }

const InPutText = (props) => {
    console.log('hello')
    return (
        <View style={{
            backgroundColor: '#fff', width: wp(96), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
        }}>
            <View style={{ width: wp(30), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.9),
                    color: theme.colors.text,
                    fontFamily: "Poppins-Regular"
                }}>{props.label}</Text></View>
            <View style={{ width: wp(43), marginVertical: -4 }}><TextInput
                returnKeyType="next"
                // require={true}
                maxLength={50}
                onChangeText={props.onChangeText}
                {...props}
            /></View>
            <View style={{ width: wp(18), alignItems: 'flex-start', justifyContent: 'center', paddingTop: hp(1.5) }}>
                <Text style={{
                    fontSize: hp(1.7),
                    color: theme.colors.text,
                    opacity: 0.5,
                    fontFamily: "Poppins-Regular",
                    width: wp(18)
                }} numberOfLines={2}>{props.labelValue}</Text></View>

        </View>
    )
}

export{FirstRoute,SecondRoute,ThirdRoute,InPutText}

    const onPressed = () => {
        console.log('reset')
    }

const styles = StyleSheet.create({
    label: {
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontFamily: "Poppins-Regular"
    },
    value: {
        fontSize: hp(2.5),
        color: theme.colors.primary,
        fontFamily: "Poppins-Bold",
        marginRight: wp(5)
    },
    VAlue1: {
        fontSize: hp(2),
        color: theme.colors.text,
        fontFamily: "Poppins-Regular"
    }

})