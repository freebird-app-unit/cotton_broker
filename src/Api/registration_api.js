export function registration_api(password,brokerName,contactPersonName,mobileNumber,alternateMobNo,gstNo,email,stateId,districtId,stationId,finYearDateOne,finYearDateTwo,finYearDateThree,turnOverOne,turnOverTwo,turnOverThree,address,webSiteURL,fcmToken) {

  let registration_param = {
    user_type:"broker",
    device_type:"android",
    password:password,
    name:brokerName,
    name_of_contact_person:contactPersonName,
    mobile_number:mobileNumber,
    mobile_number_2:alternateMobNo,
    gst_no:gstNo,
    fcm_token:fcmToken,
    email:email,
    country_id:1,
    state_id:stateId,
    city_id:districtId,
    station_id:stationId,
    turnover_date_one:finYearDateOne,
    turnover_date_two:finYearDateTwo,
    turnover_date_three:finYearDateThree,
    turnover_year_one:turnOverOne,
    turnover_year_two:turnOverTwo,
    turnover_year_three:turnOverThree,
    address:address,
    website:webSiteURL,
  }

  return registration_param
}
