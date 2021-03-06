const api_config = {
  //Development URL
  BASE_URL: 'http://cottontradecentre.com/development/cotton_bid_v3/api/',
  //BASE_URL: 'http://cottontradecentre.com/development/cotton_bid_v2/api/',

  //Production URL
  //BASE_URL: 'http://cottontradecentre.com/cotton_bid/api/',

  //APIs Name
  BROKER_REGISTRATION: 'registration_broker',
  GET_SELLER_TYPE: 'seller_type',
  GET_BUSINESS_TYPE: 'business_type',
  GET_REGISTRATION_AS: 'registration_as',
  GET_STATE: 'state_list',
  GET_DISTRICT: 'district_list',
  GET_STATIONNAME: 'station_list',
  LOGIN_BROKER: 'login_broker',
  RESEND_OTP: 'resend_otp_broker',
  VERIFY_OTP: 'otp_verify_broker',
  PRODUCT_LIST: 'product_list',
  PRODUCT_ATTRIBUTE_LIST: 'product_attribute_list',
  POST_TO_SELL: 'post_to_sell',
  MY_ACTIVE_POST:'post_to_sell_list',
  COMPLETED_DEALS:'completed_deal',
  CANCEL_POST:'cancel_post',
  NEGOTIATION_LIST: 'negotiation_list',
  SEARCH_TO_SELL: 'search_to_sell',
  FORGOT_PASSWORD_BROKER:'forgot_password_broker',
  RESET_PASSWORD_BROKER:'reset_password_broker',
  SEARCH_SELLER:'search_buyer',
  NOTIFICATION_TO_SELLER:'notification_to_buy',
  MAKE_DEAL:'make_deal',
  NOTIFICATION_LIST:'notification_to_seller_list',
  REGISTRATION_SCREEN_DROPDOWN_DATA:'sellertype_buyertype_businesstype_registrationas',
  POST_DETAILS:'post_details',
  TRANSMIT_PAYMENT_LAB_LIST:'transmit_payment_lab_list',
  NEGOTIATION: 'negotiation',
  NEGOTIATION_DETAIL:'negotiation_detail',
  MY_CONTRACT:'my_contract',
  MY_CLIENTS:'seller_buyer_list',
  PROFILE_BROKER:'profile_broker',
  BROKER_REQUEST_LIST:'broker_request_list',
  ACCEPT_BROKER_REQUEST: 'accept_broker_request',
  PROFILE_BUYER: 'profile_buyer',
  CONTRACT_DETAIL: 'contract_details',
  UPDATE_TRANSACTION_TRACKING: 'update_transaction_tracking',
  EDIT_PROFILE_BUYER:'edit_profile_broker',
  MAKE_DEAL_OTP_VERIFY: 'make_deal_otp_verify',
  CHANGE_PASSWORD_BROKER:'change_password_broker',
  BROKER_EARNING : 'broker_earning',
  RESEND_DEAL_OTP:'resend_deal_otp',
  LOGOUT_BROKER:'logout_broker',
  GET_MCX_DATA: "get_mcx_data",
  NEWS: 'news',
  CONTRACT_PARTY_LIST: 'contract_party_list',
  BROKER_PARTY_WISE_CONTRACT_REPORT: 'broker_party_wise_contract_report'



};

export default api_config;
