<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:typ="http://njm.com/esb/pds/ca/1.0/types"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js"
>
  <!-- This JavaScript function retrun Current Date in the format required by ad hoc document   Full Month DD, YYYY -->
  <!--<msxsl:script language="JavaScript" implements-prefix="js">
    function getCurrentDate()
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

    }


    function getIDCardDate(dt)
    {
        var month = new Array(12);
        month[1] = "JAN";
        month[2] = "FEB";
        month[3] = "MAR";
        month[4] = "APR";
        month[5] = "MAY";
        month[6] = "JUN";
        month[7] = "JUL";
        month[8] = "AUG";
        month[9] = "SEP";
        month[10] = "OCT";
        month[11] = "NOV";
        month[12] = "DEC";

        var yr1   = parseInt(dt.substring(0,4));
        var mon1  = parseInt(dt.substring(5,7),10);
        var dt1   = parseInt(dt.substring(8,10),10);

        var d = new Date(yr1, mon1-1, dt1);
        
        var _year = d.getFullYear();
        var _month = d.getMonth() + 1;

        var _fullMonth = month[_month];
        var _day = d.getDate() + '';

        var dayLen = _day.length;

        if (dayLen == 1)
        {
            _day = "0" + _day;
        }

          var _idCardDate = _fullMonth + " " + _day + ", " + _year;
          return _idCardDate;
    }   

  </msxsl:script>-->

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/Policy/PolicyNumber)"></xsl:variable>

  <xsl:output method="xml" indent="yes"/>

  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:copy>
      <CUSTOMER_DATA>
        <RECORD_DELIM>
          <POLICY_REC>
            <POL_PK>1</POL_PK>
            <SRC_SYS>ADHOC</SRC_SYS>
            <!-- current DATE -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>--><!--
            <xsl:element name="CURR_DT">
              <xsl:value-of select="js:getCurrentDate()"/>
            </xsl:element>-->
            <POL_NO>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:variable name="pol" select="CorrespondenceDataResponse/Policy/PolicyNumber/text()"></xsl:variable>                
                <xsl:value-of select="substring($pol,1,$varPolLength - 1)"/>
                <xsl:text>-</xsl:text>
                <xsl:value-of select="substring($pol,$varPolLength,1)"/>
                  <!--<xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyNumber"/>-->
              </xsl:if>
            </POL_NO>
            <QUOTE_NUM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNumber"/>
            </QUOTE_NUM>

            <POL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/BaseStateCd"/>
            </POL_ST>

            <POL_STATUS>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/StatusCd"/>
            </POL_STATUS>

            <PRIMARY_INS_POL_HLD_NAME>
               <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/NameSalutationCd != ''">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/NameSalutationCd"/>
                  <xsl:text> </xsl:text>
               </xsl:if>              
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FirstGivenNm"/>              
              <xsl:text> </xsl:text>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/SecondGivenNameInitial != ''">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/SecondGivenNameInitial"/>
                  <xsl:text> </xsl:text>
               </xsl:if>              
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FamilyNm"/>              
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FamilyNameGenerationCd != ''">
                  <xsl:text> </xsl:text>
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FamilyNameGenerationCd"/>
               </xsl:if>             
            </PRIMARY_INS_POL_HLD_NAME>

            <SECONDARY_INS_POL_HLD_NAME>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNameGenerationCd != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/NameSalutationCd"/>
                <xsl:text> </xsl:text>
              </xsl:if>
            
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FirstGivenNm"/>
              <xsl:text> </xsl:text>
              
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/SecondGivenNameInitial != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/SecondGivenNameInitial"/>
                <xsl:text> </xsl:text>
              </xsl:if>
              
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNm"/>
              
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNameGenerationCd != ''">
                  <xsl:text> </xsl:text>
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>
            </SECONDARY_INS_POL_HLD_NAME>

            <TERTIARY_INS_POL_HLD_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Tertiary Named Insured']]/Person/PersonName/FirstGivenNm"/>
              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Tertiary Named Insured']]/Person/PersonName/FamilyNm"/>
            </TERTIARY_INS_POL_HLD_NAME>

            <INS_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/Line1Tx"/>
            </INS_ADDR_1>

            <INS_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/Line2Tx"/>
            </INS_ADDR_2>

            <INS_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/Line3Tx"/>
            </INS_ADDR_3>

            <INS_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/Municipality/MunicipalityNm"/>
            </INS_CTY>

            <INS_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/CountrySubdivision/CountrySubdivisionNm"/>
            </INS_ST>

            <INS_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLocation/Address/PostalCd"/>
            </INS_ZIP>

            <POL_EFF_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,11)"/>
            </POL_EFF_DT>

            <!--<POL_EFF_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,3,2)"/>
            </POL_EFF_YR>

            <POL_EXP_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,3,2)"/>
            </POL_EXP_YR>-->

            <POL_EXP_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,11)"/>
            </POL_EXP_DT>

            <!--<POL_EFF_DT_ID_CARD>             
              <xsl:variable select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,11)" name="idcardEFFdate"></xsl:variable>
              <xsl:value-of select="js:getIDCardDate($idcardEFFdate)"/>
            </POL_EFF_DT_ID_CARD>

            <POL_EXP_DT_ID_CARD>
              <xsl:variable select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,11)" name="idcardEXPdate"></xsl:variable>
              <xsl:value-of select="js:getIDCardDate($idcardEXPdate)"/>
            </POL_EXP_DT_ID_CARD>-->

            <COLL_DED>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/VehicleCoverageDetails/Coverages[CoverageTypeCd[text()='Collision']]/CoverageParameterUnformattedValueTx"/>
            </COLL_DED>
            <OTH_THAN_COLL_DED>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/VehicleCoverageDetails/Coverages[CoverageTypeCd[text()='Comprehensive']]/CoverageParameterUnformattedValueTx"/>
            </OTH_THAN_COLL_DED>

            <LIAB_LMT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[CoverageTypeCd[text()='Liability']]/CoverageParameterUnformattedValueTx"/>
            </LIAB_LMT>

            <TOT_BSC_PREM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/SummaryAmounts[(AmountTypeCd[text()='Total Basic Premium'])]/SummaryAm"/>
            </TOT_BSC_PREM>

            <TOT_BSC_PREM_FULL_TORT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/SummaryAmounts[(AmountTypeCd[text()='Total Basic Premium Full Tort'])]/SummaryAm"/>
            </TOT_BSC_PREM_FULL_TORT>

            <UNINSD_MTRST_LMT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[CoverageTypeCd[text()='UnInsured UnderInsured Motorist']]/CoverageParameterUnformattedValueTx"/>
            </UNINSD_MTRST_LMT>

            <PIP_DED>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Deductible'])]/CoverageParameterUnformattedValueTx"/>
            </PIP_DED>

            <PIP_PRIMARY_PROV>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Provider'])]/CoverageParameterUnformattedValueTx = 'NJM'">
                <xsl:text>NJM</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Provider'])]/CoverageParameterUnformattedValueTx = 'Health Insurance'">
                <xsl:text>Health insurance primary</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Provider'])]/CoverageParameterUnformattedValueTx = 'Limitation on Lawsuit'">
                <xsl:text>Limitation</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Provider'])]/CoverageParameterUnformattedValueTx = 'No Limitation on Lawsuit'">
                <xsl:text>NoLimitation</xsl:text>
              </xsl:if>
            </PIP_PRIMARY_PROV>

            <PIP_OPTION>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Non Medical Benefits'])]/CoverageParameterUnformattedValueTx"/>
            </PIP_OPTION>

            <PIP_HIGHER_LMT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Non Medical Benefits'])]/CoverageParameterUnformattedValueTx"/>
            </PIP_HIGHER_LMT>

            <PIP_MED_LMT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Medical Expense Limit'])]/CoverageParameterUnformattedValueTx"/>
            </PIP_MED_LMT>

            <THRESH_OPTION>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Lawsuit Threshold'] and CoverageParameterTypeCd[text()='Lawsuit Threshold Limit'])]/CoverageParameterValueTx = 'NJM'">
                <xsl:text>NJM</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Lawsuit Threshold'] and CoverageParameterTypeCd[text()='Lawsuit Threshold Limit'])]/CoverageParameterValueTx = 'Health Insurance'">
                <xsl:text>Health insurance primary</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Lawsuit Threshold'] and CoverageParameterTypeCd[text()='Lawsuit Threshold Limit'])]/CoverageParameterValueTx = 'Limitation on Lawsuit'">
                <xsl:text>Limitation</xsl:text>
              </xsl:if>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Lawsuit Threshold'] and CoverageParameterTypeCd[text()='Lawsuit Threshold Limit'])]/CoverageParameterValueTx = 'No Limitation on Lawsuit'">
                <xsl:text>NoLimitation</xsl:text>
              </xsl:if>
            </THRESH_OPTION>

            <HLTH_INS_PROV>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/AssociatedPolicies[AssociationReasonCd='Health Insurance Policy']/PolicyProvider"/>
            </HLTH_INS_PROV>

            <POL_GRP_CERT_NO>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/AssociatedPolicies[AssociationReasonCd='Health Insurance Policy']/PolicyId"/>
            </POL_GRP_CERT_NO>

            <RES_REL_BIRTH_DT>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PersonalAutoLine/ResRelBirthDt"/>
            </RES_REL_BIRTH_DT>

            <RES_REL_RELATED>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PersonalAutoLine/ResRelRel"/>
            </RES_REL_RELATED>
            
           <SPOUSE_PARTNER_NAME>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FirstGivenNm != ''">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FirstGivenNm"/>
                  <xsl:text> </xsl:text>
               </xsl:if>              
              
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/SecondGivenNameInitial != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/SecondGivenNameInitial"/>
               <xsl:text> </xsl:text>
             </xsl:if>   
            
            <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FamilyNm != ''">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FamilyNm"/>
             <xsl:text> </xsl:text>
             </xsl:if>  
             
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FamilyNameGenerationCd != ''">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties[Party[PartyRoles[text()='Spouse']] and DriverStatusCd[text() != 'Own Insurance'] and Party/Person/VehicleDriverLicense[LicenseStatusCd[text() != 'Suspended']]]/Party/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>  
                  </SPOUSE_PARTNER_NAME>
            <TORT_IND>
              <xsl:variable name="tortValue" select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Tort'] and CoverageParameterTypeCd[text()='Tort Option'])]/CoverageParameterUnformattedValueTx,0,2)" />
              <xsl:choose>
                <xsl:when test="string(number($tortValue)) != 'NaN'">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Tort'] and CoverageParameterTypeCd[text()='Tort Option'])]/CoverageParameterValueTx"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Tort'] and CoverageParameterTypeCd[text()='Tort Option'])]/CoverageParameterUnformattedValueTx"></xsl:value-of>
                </xsl:otherwise>
              </xsl:choose>
            </TORT_IND>

            <UM_LMT>
              <xsl:variable name="umLMT" select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnInsured Motorist'] and CoverageParameterTypeCd[text()='Uninsured Motorist Limit'])]/CoverageParameterUnformattedValueTx,0,2)" />
              <xsl:choose>
                <xsl:when test="string(number($umLMT)) != 'NaN'">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnInsured Motorist'] and CoverageParameterTypeCd[text()='Uninsured Motorist Limit'])]/CoverageParameterValueTx"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnInsured Motorist'] and CoverageParameterTypeCd[text()='Uninsured Motorist Limit'])]/CoverageParameterUnformattedValueTx"></xsl:value-of>
                </xsl:otherwise>
              </xsl:choose>
            </UM_LMT>

            <UIM_LMT>
              <xsl:variable name="uimLMT" select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnderInsured Motorist'] and CoverageParameterTypeCd[text()='Underinsured Motorist Limit'])]/CoverageParameterUnformattedValueTx,0,2)" />
              <xsl:choose>
                <xsl:when test="string(number($uimLMT)) != 'NaN'">
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnderInsured Motorist'] and CoverageParameterTypeCd[text()='Underinsured Motorist Limit'])]/CoverageParameterValueTx"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='UnderInsured Motorist'] and CoverageParameterTypeCd[text()='Underinsured Motorist Limit'])]/CoverageParameterUnformattedValueTx"></xsl:value-of>
                </xsl:otherwise>
              </xsl:choose>
            </UIM_LMT>

            <!--<ARCHIVE_IND>Y</ARCHIVE_IND>-->
            <EMAIL_FROM>DoNotReply_AutoInsurance@njm.com</EMAIL_FROM>
            <EMAIL_SUBJECT>Requested NJM Automobile Information</EMAIL_SUBJECT>
            <POL_NO_PAD>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(concat('000000000',CorrespondenceDataResponse/Policy/PolicyNumber),string-length(CorrespondenceDataResponse/Policy/PolicyNumber),9)"/>
              </xsl:if>
            </POL_NO_PAD>
            <!-- KEYWORD SECTION -->
            <OB_KEYWORD1>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if> 
            </OB_KEYWORD1>

            <OB_KEYWORD2>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,5)"/>
            </OB_KEYWORD2>

            <OB_KEYWORD3>AUTO</OB_KEYWORD3>

            <OB_KEYWORD4>OUTGOING</OB_KEYWORD4>

            <OB_KEYWORD5>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNumber"/>
            </OB_KEYWORD5>

            <OB_KEYWORD6></OB_KEYWORD6>
          
          </POLICY_REC>

          <xsl:for-each select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/VehicleCoverageDetails" >
            <VEH_DESC_TEMP>
              <POL_FK>1</POL_FK>
              <VEH_NO>
                <xsl:value-of select="position()"/>
              </VEH_NO>
              <VEH_YR>
                <xsl:value-of select="Vehicle/ModelYearNr"/>
              </VEH_YR>
              <VEH_MK>
                <xsl:value-of select="Vehicle/VehicleTradeNm"/>
              </VEH_MK>
              <COLL_DED>
                <xsl:value-of select="Coverages[CoverageTypeCd[text()='Collision']]/CoverageParameterUnformattedValueTx"/>
              </COLL_DED>
              <OTH_THAN_COLL_DED>
                <xsl:value-of select="Coverages[CoverageTypeCd[text()='Comprehensive']]/CoverageParameterUnformattedValueTx"/>
              </OTH_THAN_COLL_DED>
            </VEH_DESC_TEMP>
          </xsl:for-each>

          <!-- UM UIM STANDARD -->
          <xsl:for-each select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters/CoverageParameterTypeCd[text()='UMUIMStandardLimit']" >
            <xsl:sort select="../CoverageParameterValueTx" data-type="number" order="descending"/>
            <UM_W_STANDARD_UIM_COV>
              <UM_W_STANDARD_UIM_COV_LIMIT>
                <xsl:value-of select="../CoverageParameterValueTx"></xsl:value-of>
              </UM_W_STANDARD_UIM_COV_LIMIT>
              <UM_W_STANDARD_UIM_COV_TEXT>
                <xsl:if test="position()=1">
                  <xsl:text>Double BI Limit</xsl:text>
                </xsl:if>
                <xsl:if test="position()=3">
                  <xsl:text>BI Limit</xsl:text>
                </xsl:if>
                <xsl:if test="position()=last()">
                  <xsl:text>Minimum Limit</xsl:text>
                </xsl:if>
              </UM_W_STANDARD_UIM_COV_TEXT>
              <UM_W_STANDARD_UIM_COV_TOT_PREM>
                <xsl:value-of select="../CoverageParameterPremiumAm"></xsl:value-of>
              </UM_W_STANDARD_UIM_COV_TOT_PREM>
              <UM_W_STANDARD_UIM_COV_LESS_LIAB>
                <xsl:if test="position()!=2 and position()!=1 and position()!=3">
                  <xsl:text>*</xsl:text>
                </xsl:if>
              </UM_W_STANDARD_UIM_COV_LESS_LIAB>
            </UM_W_STANDARD_UIM_COV>
          </xsl:for-each>
          
          <!-- UM UIM CONVERSION LIAB -->
        <xsl:for-each select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters/CoverageParameterTypeCd[text()='UMUIMConversionLimit']" >
            <xsl:sort select="../CoverageParameterValueTx" data-type="number" order="descending"/>
            <UM_W_UIM_CONVERSION_COV>
              <UM_W_UIM_CONVERSION_COV_LIMIT>
                <xsl:value-of select="../CoverageParameterValueTx"></xsl:value-of>
              </UM_W_UIM_CONVERSION_COV_LIMIT>
              <UM_W_UIM_CONVERSION_COV_TEXT>
                <xsl:if test="position()=1">
                  <xsl:text>Double BI Limit</xsl:text>
                </xsl:if>
                <xsl:if test="position()=3">
                  <xsl:text>BI Limit</xsl:text>
                </xsl:if>
              <xsl:if test="position()=last()">
                  <xsl:text>Minimum Limit</xsl:text>
                </xsl:if>
              </UM_W_UIM_CONVERSION_COV_TEXT>
              <UM_W_UIM_CONVERSION_COV_TOT_PREM>
                <xsl:value-of select="../CoverageParameterPremiumAm"></xsl:value-of>
              </UM_W_UIM_CONVERSION_COV_TOT_PREM>
              <UM_W_UIM_CONVERSION_COV_LESS_LIAB>
                <xsl:if test="position()!=2 and position()!=1 and position()!=3">
                  <xsl:text>*</xsl:text>
                </xsl:if>
              </UM_W_UIM_CONVERSION_COV_LESS_LIAB>
            </UM_W_UIM_CONVERSION_COV>
          </xsl:for-each>

        </RECORD_DELIM>
      </CUSTOMER_DATA>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
