import { theme } from '../core/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../components/responsive-ratio';
import colors from '../common/colors';

module.exports = {
    submitButtonText: {
        color: colors.WHITE,
        //backgroundColor:colors.GREEN,
        fontFamily: 'popins',
        fontSize: 18,
        alignItems: 'center',
    },
    otpText: {
        fontWeight: 'bold',
        color: colors.GREEN,
        fontSize: 18,
        width: '100%',
    },
    otpResendButton: {
        alignItems: 'center',
        width: '100%',
        marginTop: 16,
    },
    otpResendButtonText: {
        color: colors.GREEN,
        textTransform: 'none',
        fontSize: 18,
        fontFamily: 'popins',
        textDecorationLine: 'underline',
    },

    flex: {
        width: '100%',
        // height: '86%',
        flex: 1,
        paddingBottom: 30,
        // marginTop: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    container: {
        flexDirection: 'row',
        top: 0,
    },
    container2: {
        marginTop: '2%',
        width: '90%',
        height: '86%',
        marginLeft: '5%',
        marginRight: '5%',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'flex-start',
    },
    btnActiveContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
    },
    btnCompletedContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        opacity: 0.5,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#57a3f5',
        marginLeft: 1,
    },
    buttonContainer2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 1,
        marginRight: 1,
        opacity: 0.4,
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
        width: '90%',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 35,
        borderColor: '#57a3f5',
        borderWidth: 1,
        elevation: 5,
        alignItems: 'center',
        alignSelf: 'center',
        top: 80,
    },
    allbid: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '5%',
    },
    bidedItem: {
        height: 120,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 0,
        borderColor: '#57a3f5',
        borderWidth: 1,
        elevation: 5,
        marginLeft: '5%',
        marginTop: 15,
        flexDirection: 'row',
    },
    bidedProduct: {
        width: '60%',
        height: '85%',
        marginLeft: '2%',
        marginTop: '3%',
        alignItems: 'flex-start',
    },
    bidedQuantity: {
        width: '35%',
        height: '85%',
        marginTop: '3%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },

    titleText: {
        flex: 1,
        color: '#2DA3FC',
        fontWeight: 'bold',
    },
    allbidValue: {
        flexDirection: 'row',
        marginLeft: '5%',
        marginTop: '1%',
    },
    titleTextValue: {
        flex: 1,
        color: '#2DA3FC',
        fontSize: 12,
    },
    scrollViewStyle: {
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
    },
    dealTopMainContainer: {
        flexDirection: 'row',
        top: 0,
        marginLeft: '5%',
        marginRight: '5%',
    },

    dealBtnEnable: {
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
    dealBtnDisable: {
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
    dealTopBoxTextView: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: 'white',
    },
    dealTopBoxTextViewDisable: {
        height: 40,
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        color: '#343434',
    },

    dropdown3BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#444',
        left: 0,
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3BtnTxt: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 16,
        marginHorizontal: 0,
    },
    dropdown3DropdownStyle: { backgroundColor: 'white', marginTop: hp(-4) },
    dropdown3RowStyle: {
        backgroundColor: '#fff',
        borderBottomColor: '#444',
        height: 50,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 0,
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3RowTxt: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 16,
        marginHorizontal: 0,
        width: '100%',
    },
}