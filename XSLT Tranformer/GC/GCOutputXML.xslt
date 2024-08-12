<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:typ="http://njm.com/esb/pds/ca/1.0/types"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js"
>
  <!-- GC OUTPUT XML xslt - parse ICE input xml into Interactive XML -->
  <!-- This JavaScript function retrun Current Date in the format required by ad hoc document   Full Month DD, YYYY -->
  <!--<msxsl:script language="JavaScript" implements-prefix="js">-->
    <!--function getCurrentDate()
    {
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    var d = new Date();
    var _year = d.getUTCFullYear();
    var _month = d.getUTCMonth();

    var _fullMonth = month[_month];

    var _day = d.getUTCDate();

    var _currentDate = _fullMonth + " " + _day + ", " + _year;
    return _currentDate;
    }-->


    <!--function getClaimLossDate(dt)
    {
    var month = new Array(12);
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";

    var yr1   = parseInt(dt.substring(0,4));
    var mon1  = parseInt(dt.substring(5,7),10);
    var dt1   = parseInt(dt.substring(8,10),10);
    var hr    = parseInt(dt.substring(11,13));
    var min   = parseInt(dt.substring(14,16));
    var sec   = parseInt(dt.substring(17,19));

            var d = new Date(yr1, mon1-1, dt1, hr, min, sec,0);
    var dtLocal = ConvertUTCTimeToLocalTime(d);

    //var d = new Date(yr1, mon1-1, dt1);

    var _year = dtLocal.getFullYear();
    var _month = dtLocal.getMonth() + 1;

    var _fullMonth = month[_month];
    var _day = dtLocal.getDate() + '';

    var dayLen = _day.length;

    if (dayLen == 1)
    {
    _day = "0" + _day;
    }

    var _lossDate = _fullMonth + " " + _day + ", " + _year;
    return _lossDate;
    }-->

    <!--function getClaimLossDate1(dt)
    {
              var month = new Array(12);
              month[1] = "January";
              month[2] = "February";
              month[3] = "March";
              month[4] = "April";
              month[5] = "May";
              month[6] = "June";
              month[7] = "July";
              month[8] = "August";
              month[9] = "September";
              month[10] = "October";
              month[11] = "November";
              month[12] = "December";


              var yr1   = parseInt(dt.substring(0,4));
              var mon1  = parseInt(dt.substring(5,7));
              var dt1   = parseInt(dt.substring(8,10));
              var hr    = parseInt(dt.substring(11,13));
              var min   = parseInt(dt.substring(14,16));
              var sec   = parseInt(dt.substring(17,19));

              var d = new Date(yr1, mon1-1, dt1, hr, min, sec);
              var dtLocal = ConvertUTCTimeToLocalTime(d);

              var _year = dtLocal.getUTCFullYear();
              var _month = dtLocal.getUTCMonth() + 1;
              //var _month = dtLocal.getUTCMonth();

              var _fullMonth = month[_month];
              var _day = dtLocal.getDate();

              var _lossDate = _fullMonth + " " + _day + ", " + _year;
              return _lossDate;
    }-->

    <!--//convert Date passed UTC TO LOCAL Date Time
    //convert zulu date into local date - offset of 5 hours
    function ConvertUTCTimeToLocalTime(UTCDateString)
    {
    var convertdLocalTime = new Date(UTCDateString);

    var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

    convertdLocalTime.setHours( convertdLocalTime.getHours() - hourOffset );

    return convertdLocalTime;
    }-->

    
    <!-- New method to fix DOL issue-->
  <!--
    function getDOLDate(dt)
    {
    var convertedTime = convertAndAppendTimeZone(dt);
    return convertedTime
    }
    -->
  <!-- Convert in local date time-->
  <!--
    function convertAndAppendTimeZone(dt)
    {

          var month = new Array(12);
          month[1] = "January";
          month[2] = "February";
          month[3] = "March";
          month[4] = "April";
          month[5] = "May";
          month[6] = "June";
          month[7] = "July";
          month[8] = "August";
          month[9] = "September";
          month[10] = "October";
          month[11] = "November";
          month[12] = "December";

          var yr1   = parseInt(dt.substring(0,4));
          var mon1  = parseInt(dt.substring(5,7),10);
          var dt1   = parseInt(dt.substring(8,10),10);
          var hr    = parseInt(dt.substring(11,13));
          var min   = parseInt(dt.substring(14,16));
          var sec   = parseInt(dt.substring(17,19));

          var dateTime = new Date(yr1, mon1-1, dt1, hr, min, sec,0);
                   
          // Variable to store the timezone
          var timeZone, convertedDateTime;

          // Setting timezone options into a variable
          var options = { timeZone: "America/New_York" };

          //If any invalid dateTime is passed, the JS Date constructor will return "Invalid Date" string.
          if (dateTime != "Invalid Date")
          {
            // Getting local time zone based on time zone options : sample output: 00:00:00 GMT-0400 (EDT) or 00:00:00 GMT-0500 (EST)
              var localeTime = dateTime.toLocaleTimeString("en-US", options);
              // Saving GMT time difference from the generated local timezone : EX: Input: 00:00:00 GMT-0400 (EDT) , output: -04:00
    
          if (dateTime.toString().indexOf("EDT")  > 1)
          {
             timeZone = "-04:00";
          }
          else if (dateTime.toString().indexOf("EST"))
          {
             timeZone = "-05:00";
          }    
    
            var _year = dateTime.getFullYear();
            var _month = dateTime.getMonth() + 1;

            var _fullMonth = month[_month];
            var _day = dateTime.getDate() + '';

            var dayLen = _day.length;

        // Return the dateTime with current timezone
        return (convertedDateTime);    
    }
    else 
    {
      return ("Error:Invalid Date");
    }
    }

  </msxsl:script>-->

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber)"></xsl:variable>
  <xsl:output method="xml" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:copy>
      <CUSTOMER_DATA>
        <RECORD_DELIM>
          <NJM_CLAIM_REC>
            <CLM_PK>1</CLM_PK>
            <SRC_SYS>ADHOC</SRC_SYS>
            <!-- current DATE -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>-->
            <!--<xsl:element name="CURR_DT">
              <xsl:value-of select="js:getCurrentDate()"/>
            </xsl:element>-->

            <POL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyState"/>
            </POL_ST>
            <POL_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber"/>
            </POL_NO>
            <POL_TYPE>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/Type"/>
            </POL_TYPE>
            <VEH_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/VehicleState"/>
            </VEH_ST>
            <CLM_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimNumber"/>
            </CLM_NO>
            <!--<CLM_LOSS_DT>
              <xsl:variable select="substring(CorrespondenceDataResponse/Claim/DateOfLoss,1,24)" name="lossdate"></xsl:variable>
              <xsl:value-of select="js:getClaimLossDate($lossdate)"/>
            </CLM_LOSS_DT>-->

            <INS_POL_HLD_NAME_1>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Type != 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/MiddleName"/>
                <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/MiddleName != ''" >
                  <xsl:text> </xsl:text>
                </xsl:if>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Suffix"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Name"/>
              </xsl:if>
            </INS_POL_HLD_NAME_1>
            <INS_POL_HLD_NAME_2>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Type != 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/MiddleName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Suffix"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Name"/>
              </xsl:if>
            </INS_POL_HLD_NAME_2>
            <INS_POL_HLD_NAME_3>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/Type != 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/MiddleName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/Suffix"/>
              </xsl:if>
               <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='ThirdInsured']/Name"/>
              </xsl:if>
            </INS_POL_HLD_NAME_3>
            <!--Added the address line for the loss location data-->
            <CLM_LOSS_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocation/Address/StreetAddress1"/>
            </CLM_LOSS_ADDR_1>
            <CLM_LOSS_ADDR_2>
              <xsl:if test="CorrespondenceDataResponse/Claim/LossLocation/Address/StreetAddress2 != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocation/Address/StreetAddress2"/>
              </xsl:if>
            </CLM_LOSS_ADDR_2>
            <CLM_LOSS_ADDR_3>
              <xsl:if test="CorrespondenceDataResponse/Claim/LossLocation/Address/StreetAddress3 != ''">                
                <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocation/Address/StreetAddress3"/>
              </xsl:if>
            </CLM_LOSS_ADDR_3>
            <CLM_LOSS_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationCity"/>
            </CLM_LOSS_CTY>
            <CLM_LOSS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationState"/>
            </CLM_LOSS_ST>
            <INS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address/State"/>
            </INS_ST>
            <!--<CLM_RPT_DT_AUTO>
              <xsl:variable select="substring(CorrespondenceDataResponse/Claim/AccidentReportDate,1,24)" name="accrepdate"></xsl:variable>
              <xsl:value-of select="js:getClaimLossDate($accrepdate)"/>
            </CLM_RPT_DT_AUTO>-->
            <FIRST_INS_ADDR>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address[Type='Primary']/StreetAddress1"/>
            </FIRST_INS_ADDR>
            <FIRST_INS_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address[Type='Primary']/StreetAddress2"/>
            </FIRST_INS_ADDR_2>
            <FIRST_INS_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address[Type='Primary']/City"/>
            </FIRST_INS_CTY>
            <FIRST_INS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address[Type='Primary']/State"/>
            </FIRST_INS_ST>
            <FIRST_INS_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/Addresses/Address[Type='Primary']/ZipCode"/>
            </FIRST_INS_ZIP>
            <LOC_OF_LOSS_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationState"/>
            </LOC_OF_LOSS_SYS>
            <INSD_MAIN_CNTCT_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='MainContact']/FirstName"/>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='MainContact']/FirstName != ''">
              <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='MainContact']/LastName"/>
            </INSD_MAIN_CNTCT_NAME>
            <INSD_EMAIL>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='FirstInsured']/EmailAddresses/EmailAddress/EmailAddressValue"/>
            </INSD_EMAIL>
          </NJM_CLAIM_REC>

          <xsl:for-each select="CorrespondenceDataResponse/Claim/ClaimPolicy/Endorsements[not(Type='HSB Endorsement')]">
            <xsl:element name="ENDRS_NUM_W_ED_DT_REC">
              <xsl:element name="CLM_FK">1</xsl:element>
              <xsl:element name="ENDRS_NUM_W_ED_DT">
                <xsl:value-of select="FormNumber"/>
              </xsl:element>
            </xsl:element>
          </xsl:for-each>

          <xsl:for-each select="CorrespondenceDataResponse/Claim/ClaimPolicy/Endorsements[Type='HSB Endorsement']">
            <xsl:element name="HSB_END_REC">
              <xsl:element name="CLM_FK">1</xsl:element>
              <xsl:element name="HSB_END">
                <xsl:value-of select="FormNumber"/>
              </xsl:element>
            </xsl:element>
          </xsl:for-each>

        </RECORD_DELIM>
      </CUSTOMER_DATA>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
