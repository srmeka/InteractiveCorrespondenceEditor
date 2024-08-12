<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:typ="http://njm.com/esb/pds/ca/1.0/types" xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js">

  <!-- WCC OUTPUT XML xslt - parse ICE input xml into Interactive XML -->
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

    <!--function getAuthExpDate(m)
    {
    var d = new Date();
    var years = Math.floor(m / 12);
    var months = m - (years * 12);
    if (years) d.setFullYear(d.getFullYear() + years);
    if (months) d.setMonth(d.getMonth() + months);

    var _year = d.getUTCFullYear();
    var _month = d.getUTCMonth();
    var _day = d.getUTCDate();

    var _authtDate = _month + "/" + _day + "/" + _year;
    return _authtDate;
    }-->


    <!--function getLetterDate()
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

        var d = new Date();
        var _year = d.getUTCFullYear();
        var _month = d.getUTCMonth() + 1;
        var _fullMonth = month[_month];
        var _day = d.getUTCDate();

        //var _shortYear = _year.substring(0,2);

        var _ltrDate = _month + "" + _day + "" + _year;
        return _ltrDate;
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

            var d = new Date(yr1, mon1-1, dt1);

            var _year = d.getUTCFullYear();
            var _month = d.getUTCMonth() + 1;

            var _fullMonth = month[_month];
            var _day = d.getUTCDate();

            var _lossDate = _fullMonth + " " + _day + ", " + _year;
            return _lossDate;
    }-->   
    
    <!--function getDate(dt)
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

            var d = new Date(yr1, mon1-1, dt1);

            var _year = d.getUTCFullYear();
            var _month = d.getUTCMonth() + 1;

            var _fullMonth = month[_month];
            var _day = d.getUTCDate();

            var _lossDate = _month + "/" + _day + "/" + _year;
            return _lossDate;
    }-->
  
  <!--</msxsl:script>-->

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber)"></xsl:variable>
  <xsl:output method="xml" indent="yes"/>
  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:copy>
      <WCC_DATA>
        <RECORD_DELIM>
          <WCC_CLAIM_REC>
            <CLM_PK>1</CLM_PK>
            <SRC_SYS>ADHOC</SRC_SYS>

            <!-- CURRENT DATE -->
            <!--<xsl:element name="CURR_DT">
              <xsl:value-of select="js:getCurrentDate()"/>
            </xsl:element>-->

            <!-- AUTH EXP DATE -->
            <!--<AUTH_EXPIRATION_DT>
              <xsl:value-of select="js:getAuthExpDate(7)"/>
            </AUTH_EXPIRATION_DT>-->

            <!-- LETTER DATE -->
            <!--<LTR_CREATE_DT>
              <xsl:value-of select="js:getLetterDate()"/>
            </LTR_CREATE_DT>-->

            <INS_CONTACT_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[PartyRelationships/PartyRelationship[Relationship='Primary Contact']]/FirstName"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[PartyRelationships/PartyRelationship[Relationship='Primary Contact']]/LastName"/>
            </INS_CONTACT_NAME>

            <CAUSE_INJ_CD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/AccidentTypeCode"/>
            </CAUSE_INJ_CD>

            <BOARD_W_NUMBER>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/BoardWNumber"/>
            </BOARD_W_NUMBER>

            <HIST_AND_INJ>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimDescription"/>
            </HIST_AND_INJ>

            <STATE_CLAIM_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/StateClaimNumber"/>
            </STATE_CLAIM_NO>
            
            <CLM_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimNumber"/>
            </CLM_NO>
            <ONBASE_CLM_NO>
              <xsl:value-of select="translate(CorrespondenceDataResponse/Claim/ClaimNumber,'-','')"/>
            </ONBASE_CLM_NO>

            <POL_EFF_DT_FROM>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/EffectiveDate,6,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/EffectiveDate,9,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/EffectiveDate,0,5)"/>
            </POL_EFF_DT_FROM>
            <POL_EFF_DT_TO>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/ExpirationDate,6,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/ExpirationDate,9,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/ExpirationDate,0,5)"/>
            </POL_EFF_DT_TO>
            <NJ_COMPANY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/NjmCompanyCd"/>
            </NJ_COMPANY>
            <INS_COUNTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyCounty"/>
            </INS_COUNTY>
            <POL_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber"/>
            </POL_NO>
            <POL_NO_NUMERIC>
              <xsl:variable name="pollength" select="string-length(CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber)"></xsl:variable>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumber,2,$pollength)"/>
            </POL_NO_NUMERIC>
            <POL_TYPE>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/Type"/>
            </POL_TYPE>

            <EMPL_NOTIFY_DT>                          
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimantReportedDate,6,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimantReportedDate,9,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/ClaimantReportedDate,0,5)"/>
            </EMPL_NOTIFY_DT>

            <PREPARED_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,6,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,9,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,0,5)"/>
            </PREPARED_DT>

            <!--<CLM_LOSS_DT>
              <xsl:variable select="substring(CorrespondenceDataResponse/Claim/DateOfLoss,1,24)" name="lossdate"></xsl:variable>
              <xsl:value-of select="js:getClaimLossDate($lossdate)"/>
            </CLM_LOSS_DT>-->

            <MEDICAL_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualMedicalPaidAmount"/>
            </MEDICAL_PD>
            <TEMP_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualTempPaidAmount"/>
            </TEMP_PD>
            <PERM_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualPermPaidAmount"/>
            </PERM_PD>
            <SUBRO_PERM_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/StatutoryPermPaidAmount"/>
            </SUBRO_PERM_PD>
            <FUNERAL_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualFuneralPaidAmount"/>
            </FUNERAL_PD>
            <GROSS_LIEN>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/GrossLienAmount"/>
            </GROSS_LIEN>
            <NET_LIEN>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/NetLienAmount"/>
            </NET_LIEN>
            <COUNSEL_FEES_STAT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualConselFeesAmount"/>
            </COUNSEL_FEES_STAT>
            <SUIT_EXPENSES_STAT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/ActualSuitExpenseAmount"/>
            </SUIT_EXPENSES_STAT>
            <NET_SETTLE>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/NetSettlementAmount"/>
            </NET_SETTLE>
            <PCT_FUT_PYMTS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Ex_Subrogation/FuturePaymentPercent"/>
            </PCT_FUT_PYMTS>

            <TYPE_INJ_ILL>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Incidents/Incident/DetailedInjuryType"/>
            </TYPE_INJ_ILL>
            <TYPE_INJ_ILL_CD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/Incidents/Incident/DetailedInjuryTypeCode"/>
            </TYPE_INJ_ILL_CD>

            <POL_HOL_NAME>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Name"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Type = 'Person'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/MiddleName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Suffix"/>
              </xsl:if>
            </POL_HOL_NAME>

            <POL_HOL_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/StreetAddress1"/>
            </POL_HOL_ADDR_1>

            <POL_HOL_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/StreetAddress2"/>
            </POL_HOL_ADDR_2>

            <POL_HOL_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/StreetAddress3"/>
            </POL_HOL_ADDR_3>

            <POL_HOL_CITY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/City"/>
            </POL_HOL_CITY>

            <POL_HOL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/State"/>
            </POL_HOL_ST>

            <POL_HOL_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/ZipCode"/>
            </POL_HOL_ZIP>

            <POL_HOL_COUNTRY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Policy holder']/Addresses/Address[Type='Primary']/Country"/>
            </POL_HOL_COUNTRY>

            <INS_POL_HLD_NAME_1>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Name"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Type = 'Person'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/MiddleName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Suffix"/>
              </xsl:if>
            </INS_POL_HLD_NAME_1>

            <INS_POL_HLD_NAME_2>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Type = 'Company'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Name"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Type = 'Person'">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/FirstName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/MiddleName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/LastName"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='SecondInsured']/Suffix"/>
              </xsl:if>
            </INS_POL_HLD_NAME_2>

            <INS_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/StreetAddress1"/>
            </INS_ADDR_1>
            <INS_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/StreetAddress2"/>
            </INS_ADDR_2>
            <INS_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/StreetAddress3"/>
            </INS_ADDR_3>
            <INS_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/City"/>
            </INS_CTY>
            <INS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/State"/>
            </INS_ST>
            <INS_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/ZipCode"/>
            </INS_ZIP>
            <INS_COUNTRY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/Country"/>
            </INS_COUNTRY>

            <!-- Unformatted Number {0} {1} {2}-->
            <INS_PHN>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/AreaCode"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Exchange"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Number"/>
              </xsl:if>
            </INS_PHN>

            <!-- formatted nuber ({0}) {1}-{2} -->
            <INS_CONTACT_PHN>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers != ''">
                (<xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/AreaCode"/>)
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Exchange"/>
                <xsl:text>-</xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Number"/>
              </xsl:if>
            </INS_CONTACT_PHN>

            <INS_CONTACT_EXT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Extension"/>
            </INS_CONTACT_EXT>
            <INS_FEIN>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/TaxID"/>
            </INS_FEIN>
            <INS_ATTN>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address[Type='Primary']/Attention"/>
            </INS_ATTN>
            <CLMT_EMPLOYER_ADDR>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address/StreetAddress1"/>
            </CLMT_EMPLOYER_ADDR>
            <CLMT_EMPLOYER_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address/City"/>
            </CLMT_EMPLOYER_CTY>
            <CLMT_EMPLOYER_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address/State"/>
            </CLMT_EMPLOYER_ST>
            <CLMT_EMPLOYER_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Insured']/Addresses/Address/ZipCode"/>
            </CLMT_EMPLOYER_ZIP>

            <CLMT_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/FirstName"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/MiddleName"/>
                <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/MiddleName != ''">
                  <xsl:text> </xsl:text>
                </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/LastName"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Suffix"/>
            </CLMT_NAME>

            <CLMT_FIRST_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/FirstName"/>
            </CLMT_FIRST_NAME>
            <CLMT_MIDDLE_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/MiddleName"/>
            </CLMT_MIDDLE_NAME>

            <CLMT_LAST_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/LastName"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Suffix"/>
            </CLMT_LAST_NAME>

            <CLMT_ST_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/StreetAddress1"/>
            </CLMT_ST_ADDR_1>
            <CLMT_ST_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/StreetAddress2"/>
            </CLMT_ST_ADDR_2>
            <CLMT_ST_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/StreetAddress3"/>
            </CLMT_ST_ADDR_3>
            <CLMT_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/City"/>
            </CLMT_CTY>
            <CLMT_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/State"/>
            </CLMT_ST>
            <CLMT_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/ZipCode"/>
            </CLMT_ZIP>
            <CLMT_COUNTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/County"/>
            </CLMT_COUNTY>
            <CLMT_COUNTRY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Addresses/Address[Type='Primary']/Country"/>
            </CLMT_COUNTRY>

            <CLMT_PHN>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/PhoneNumbers != ''">
                <xsl:text>(</xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/PhoneNumbers/PhoneNumber[IsPrimary='true']/AreaCode"/>
                <xsl:text>)</xsl:text>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Exchange"/>
                <xsl:text>-</xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Number"/>
              </xsl:if>
            </CLMT_PHN>

            <CLMT_PHN_NO_EXT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Extension"/>
            </CLMT_PHN_NO_EXT>
            <CLMT_GENDER>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/Gender"/>
            </CLMT_GENDER>
            <CLMT_MARITAL_STATUS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/MaritalStatus"/>
            </CLMT_MARITAL_STATUS>
            <CLMT_SOC_SEC_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/TaxID"/>
            </CLMT_SOC_SEC_NO>
            <CLMT_BIRTH_DT>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/BirthDate != ''">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/BirthDate,6,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/BirthDate,9,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/BirthDate,0,5)"/>
              </xsl:if>
            </CLMT_BIRTH_DT>
            <CLMT_DEATH_DT>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/DeathDate != ''">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/DeathDate,6,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/DeathDate,9,2)"/>
                <xsl:text>/</xsl:text>
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/DeathDate,0,5)"/>
              </xsl:if>
            </CLMT_DEATH_DT>
            <CLMT_OCCUPATION>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Claimant']/OccupationDescription"/>
            </CLMT_OCCUPATION>
            <IND_MED_FACIL_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Industrial Medicine Facility']/Name"/>
            </IND_MED_FACIL_NAME>
            <LAW_FIRM>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Petitioners Law Firm']/Name"/>
            </LAW_FIRM>

            <PREPARERS_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/FirstName"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/MiddleName"/>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/MiddleName != ''">
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/LastName"/>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/Suffix != ''">
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/Suffix"/>
            </PREPARERS_NAME>

            <PREPARERS_PHN>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/PhoneNumbers != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/PhoneNumbers/PhoneNumber[IsPrimary='true']/AreaCode"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Exchange"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Number"/>
              </xsl:if>
            </PREPARERS_PHN>

            <PREPARERS_EXT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party[Role='Reporter']/PhoneNumbers/PhoneNumber[IsPrimary='true']/Extension"/>
            </PREPARERS_EXT>
            <RET_TO_WORK_DT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/ReturnToWorkDate"/>
            </RET_TO_WORK_DT>
            <OUT_OF_WORK_DT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/OutOfWorkDt"/>
            </OUT_OF_WORK_DT>
            <COMP_RATE>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/WeeklyCompensationRate"/>
            </COMP_RATE>
            <LOCATION_NUM>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/DepartmentCode"/>
            </LOCATION_NUM>
            <WAGES>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/WageAmount"/>
            </WAGES>
            <NCCI_CD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/ClassCode"/>
            </NCCI_CD>
            <NUM_DAYS_WORKED_WK>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/DaysWorkedPerWeekNumber"/>
            </NUM_DAYS_WORKED_WK>
            <PAY_PERIOD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/PayPeriod"/>
            </PAY_PERIOD>
            <CLMT_STATE_HIRED>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/HireState"/>
            </CLMT_STATE_HIRED>
            <!--<CLMT_DATE_HIRED>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/HireDate != ''">
                <xsl:variable select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/HireDate,1,24)" name="HireDate"></xsl:variable>
                <xsl:value-of select="js:getClaimLossDate($HireDate)"/>
              </xsl:if>
            </CLMT_DATE_HIRED>-->
            <!--<MMI_DT>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/MaximumMedicalImprovementDt != ''">
                <xsl:variable select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/MaximumMedicalImprovementDt,1,24)" name="MaximumMedicalImprovementDt"></xsl:variable>
                <xsl:value-of select="js:getClaimLossDate($MaximumMedicalImprovementDt)"/>
              </xsl:if>
            </MMI_DT>-->
            <LAST_WORK_DT>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastWorkedDate != ''">                
                 <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastWorkedDate,6,2)"/>
                 <xsl:text>/</xsl:text>
                  <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastWorkedDate,9,2)"/>
                  <xsl:text>/</xsl:text>
                  <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastWorkedDate,0,5)"/>
              </xsl:if>
            </LAST_WORK_DT>
            <FULL_PAY_INJ_DAY_IND>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastDayWorkedFullPayIndicator = 'true' ">
                <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/LastDayWorkedFullPayIndicator = 'false' ">
                <xsl:text>N</xsl:text>
              </xsl:if>
            </FULL_PAY_INJ_DAY_IND>
            <INJURED_EMPLOYER_PREM_IND>
              <xsl:if test="CorrespondenceDataResponse/Claim/InjuredOnEmployerPremisesIndicator = 'true'">
                <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/InjuredOnEmployerPremisesIndicator = 'false'">
                <xsl:text>N</xsl:text>
              </xsl:if>
            </INJURED_EMPLOYER_PREM_IND>
            <WORK_START_TIME>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/InjuryDateWorkStartTime"/>
            </WORK_START_TIME>
            <WORK_START_TIME_AMPM>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/EmploymentRelationships/EmploymentRelationship/InjuryDateWorkStartTime"/>
            </WORK_START_TIME_AMPM>

            <NUM_DEPENDENTS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/InvolvedParties/Party/DependentsNumber"/>
            </NUM_DEPENDENTS>

            <JURISDICTION>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimJurisdictionState"/>
            </JURISDICTION>

            <CLM_LOSS_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationCity"/>
            </CLM_LOSS_CTY>
            <CLM_LOSS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationState"/>
            </CLM_LOSS_ST>

            <REPORTED_DT>              
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,6,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,9,2)"/>
              <xsl:text>/</xsl:text>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/CreateDate,0,5)"/>            
            </REPORTED_DT>

            <EMPL_CLM>
              <xsl:if test="CorrespondenceDataResponse/Claim/NJMEmployeeClaimIndicator = 'true' ">
                <xsl:text>Y</xsl:text>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Claim/NJMEmployeeClaimIndicator = 'false' ">
                <xsl:text>N</xsl:text>
              </xsl:if>
            </EMPL_CLM>

            <SAFETY_EQUIP_PROV_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/SafetyEquipmentProvidedIndicator"/>
            </SAFETY_EQUIP_PROV_IND>
            <SAFETY_EQUIP_USED_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/SafetyEquipmentUsedIndicator"/>
            </SAFETY_EQUIP_USED_IND>

            <TIME_INJURED>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/TimeOfLoss,0,6)"/>
            </TIME_INJURED>
            <TIME_INJURED_AMPM>
              <xsl:if test="substring(CorrespondenceDataResponse/Claim/TimeOfLoss,0,3) &lt; 12">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/TimeOfLoss,0,6)"/>
                <xsl:text> AM</xsl:text>
              </xsl:if>
              <xsl:if test="substring(CorrespondenceDataResponse/Claim/TimeOfLoss,0,3) >= 12">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Claim/TimeOfLoss,0,6)"/>
                <xsl:text> PM</xsl:text>
              </xsl:if>
            </TIME_INJURED_AMPM>

            <POL_NUM_NO_CHK_DGT>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimPolicy/PolicyNumberWithOutCheckDigit"/>
            </POL_NUM_NO_CHK_DGT>

            <MED_NET_TOT_INCURRED>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/FinancialReports/FinancialReportLineItems[AccountTypeCd='Net Total Incurred' and ReportingCategoryCd='Medical' and ParentReportingCategoryCd='Claim']/Amount"/>
            </MED_NET_TOT_INCURRED>
            <INDEM_NET_TOT_INCURRED>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/FinancialReports/FinancialReportLineItems[AccountTypeCd='Net Total Incurred' and ReportingCategoryCd='Indemnity' and ParentReportingCategoryCd='Claim']/Amount"/>
            </INDEM_NET_TOT_INCURRED>
            <INDEM_PD>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/FinancialReports/FinancialReportLineItems[AccountTypeCd='Adjusted Paid' and ReportingCategoryCd='Indemnity' and ParentReportingCategoryCd='Claim']/Amount"/>
            </INDEM_PD>
            <INDEM_OPEN_RSRV>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/FinancialReports/FinancialReportLineItems[AccountTypeCd='Open Reserves' and ReportingCategoryCd='Indemnity' and ParentReportingCategoryCd='Claim']/Amount"/>
            </INDEM_OPEN_RSRV>

            <MED_OPEN_RSRV>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/FinancialReports/FinancialReportLineItems[AccountTypeCd='Open Reserves' and ReportingCategoryCd='Medical' and ParentReportingCategoryCd='Claim']/Amount"/>
            </MED_OPEN_RSRV>
              
            <!--<CLM_PET_DT>
              <xsl:if test="CorrespondenceDataResponse/Claim/EarliestCPReceivedDate != ''">             
               <xsl:variable select="substring(CorrespondenceDataResponse/Claim/EarliestCPReceivedDate,1,24)" name="EarliestCPReceivedDate"></xsl:variable>
              <xsl:value-of select="js:getClaimLossDate($EarliestCPReceivedDate)"/>
            </xsl:if>
            </CLM_PET_DT>-->

            <ACC_LOC_ADDR_1_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationAddress1"/>            
            </ACC_LOC_ADDR_1_SYS>
            
            <ACC_LOC_ADDR_2_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationAddress2"/>
            </ACC_LOC_ADDR_2_SYS>
                
            <ACC_LOC_ADDR_3_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationAddress3"/>            
            </ACC_LOC_ADDR_3_SYS>
            
            <ACC_LOC_CTY_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationCity"/>            
            </ACC_LOC_CTY_SYS>
            
            <ACC_LOC_ST_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationState"/>            
            </ACC_LOC_ST_SYS>

            <ACC_LOC_ZIP_SYS>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/LossLocationZipCode"/>            
            </ACC_LOC_ZIP_SYS>
            
            <CLAIM_TYPE>
              <xsl:value-of select="CorrespondenceDataResponse/Claim/ClaimType"/>
            </CLAIM_TYPE>
            
          </WCC_CLAIM_REC>

          <xsl:for-each select="CorrespondenceDataResponse/Claim/Incidents/Incident/InjuredBodyParts/InjuredBodyPart" >
            <AFF_BODY_PART>
              <CLM_FK>1</CLM_FK>
              <BODY_PART>
                <xsl:value-of select="DetailedBodyPart"/>
              </BODY_PART>
              <BODY_PART_CD>
                <xsl:value-of select="DetailedBodyPartCode"/>
              </BODY_PART_CD>
              <PRIMARY_IND>
                <xsl:if test="PrimaryBodyPartIndicator = 'true'">
                  <xsl:text>Y</xsl:text>
                </xsl:if>
                <xsl:if test="PrimaryBodyPartIndicator = 'false'">
                  <xsl:text>N</xsl:text>
                </xsl:if>              
              </PRIMARY_IND>
            </AFF_BODY_PART>
          </xsl:for-each>
        </RECORD_DELIM>
      </WCC_DATA>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
