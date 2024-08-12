<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js"
>
  <xsl:output method="xml" indent="yes"/>

  <!--<msxsl:script language="JavaScript" implements-prefix="js">

    //function for returning Current Date
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


  </msxsl:script>-->
  
  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/Policy/PolicyNumber)"></xsl:variable>

  <!-- Account number length -->
  <xsl:variable name="varAcctNoLength" select="string-length(CorrespondenceDataResponse/Policy/Account/AccountNo)"></xsl:variable>


  <!-- Text String variable for posting notices -->
  <xsl:variable name="TextString">
    <xsl:apply-templates select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Named Insured'])]/Organization/OrganizationNm"/>
    <xsl:apply-templates select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Additional Insured'])]/Organization/OrganizationNm">
      <xsl:sort select="Organization/OrganizationNm" order="ascending"/>
    </xsl:apply-templates>
  </xsl:variable>

  <!-- variable for and or string Length -->
  <xsl:variable name="AndOrPadding" >
    <xsl:choose>
      <xsl:when test="count(CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Named Insured'] or PartyRoles[text()='Additional Insured'])])>1">
        <xsl:value-of select="(count(CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Named Insured'] or PartyRoles[text()='Additional Insured'])])-1)*6"/>
      </xsl:when>
      <xsl:otherwise>0</xsl:otherwise>
    </xsl:choose>
  </xsl:variable>

  <xsl:template match="/">
    <xsl:copy>
      <CUSTOMER_DATA>
        <RECORD_DELIM>
          <POLICY_REC>
            <POL_PK>1</POL_PK>
            <SRC_SYS>ADHOC</SRC_SYS>
            <!-- current DATE -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>-->
            <!--<xsl:element name="CURR_DT">
              <xsl:value-of select="js:getCurrentDate()"/>
            </xsl:element>-->
           
            <POL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/BaseState"/>
            </POL_ST>
            <POL_NO>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:variable name="pol" select="CorrespondenceDataResponse/Policy/PolicyNumber/text()"></xsl:variable>
                <xsl:value-of select="substring($pol,1,$varPolLength - 1)"/>
                <xsl:text>-</xsl:text>
                <xsl:value-of select="substring($pol,$varPolLength,1)"/>
                <!--<xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyNumber"/>-->
              </xsl:if>
            </POL_NO>
            <PRIMARY_INS_POL_HLD_NAME>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/PartyTypeCd = 'Person'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Person/PersonName/FirstGivenNm"/>
                 <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Person/PersonName/FamilyNm"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/PartyTypeCd = 'Organization'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/OrganizationNm"/>
              </xsl:if>              
            </PRIMARY_INS_POL_HLD_NAME>
            <POL_EFF_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,3)"/>
            </POL_EFF_YR>
            <POL_EXP_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,3)"/>
            </POL_EXP_YR>
            <AUDIT_PERIOD_BEGIN_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,11)"/>
            </AUDIT_PERIOD_BEGIN_DT>
            <AUDIT_PERIOD_END_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,11)"/>
            </AUDIT_PERIOD_END_DT>
            
            <POL_EFF_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,11)"/>
            </POL_EFF_DT>
              
            <POL_EXP_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,11)"/>
            </POL_EXP_DT>

            <OB_KEYWORD1>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if>
            </OB_KEYWORD1>
            <OB_KEYWORD2>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,5)"/>
            </OB_KEYWORD2>
            <OB_KEYWORD3>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/Account/AccountNo,1,($varAcctNoLength - 1))"/>
            </OB_KEYWORD3>
            <OB_KEYWORD4>OUTGOING</OB_KEYWORD4>
            <OB_KEYWORD5></OB_KEYWORD5>
            <OB_KEYWORD6>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNr"/>
            </OB_KEYWORD6>
            <OB_KEYWORD12></OB_KEYWORD12>
            <PRINTER_NAME></PRINTER_NAME>
            <CERT_IND>N</CERT_IND>           
            <BARCODE_IND>Y</BARCODE_IND>
            <WCU_CSF_TYPE>M</WCU_CSF_TYPE>
            <POL_NO_PAD>
                <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(concat('000000000',CorrespondenceDataResponse/Policy/PolicyNumber),string-length(CorrespondenceDataResponse/Policy/PolicyNumber),9)"/>
              </xsl:if>
            </POL_NO_PAD>

            <APPLICANT_CO_NM>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/PartyTypeCd = 'Person'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Person/PersonName/FirstGivenNm"/>
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Person/PersonName/FamilyNm"/>
              </xsl:if>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/PartyTypeCd = 'Organization'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/OrganizationNm"/>
              </xsl:if>
            </APPLICANT_CO_NM>

            <APPLICANT_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line1Tx"></xsl:value-of>
            </APPLICANT_ADDR_1>
            <APPLICANT_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line2Tx"></xsl:value-of>
            </APPLICANT_ADDR_2>
            <APPLICANT_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line3Tx"></xsl:value-of>
            </APPLICANT_ADDR_3>

            <APPLICANT_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Municipality/MunicipalityNm"></xsl:value-of>
            </APPLICANT_CTY>
            <APPLICANT_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/CountrySubdivision/CountrySubdivisionNm"></xsl:value-of>
            </APPLICANT_ST>
            <APPLICANT_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/PostalCd"></xsl:value-of>
            </APPLICANT_ZIP>
                      
            <EMP_NAME>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/OrganizationNm"></xsl:value-of>
            </EMP_NAME>
            <EMP_CLM_LOC_ADDR>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line1Tx"></xsl:value-of>
            </EMP_CLM_LOC_ADDR>
            <EMP_CLM_LOC_CITY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Municipality/MunicipalityNm"></xsl:value-of>
            </EMP_CLM_LOC_CITY>
            <EMP_CLM_LOC_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/CountrySubdivision/CountrySubdivisionNm"></xsl:value-of>
            </EMP_CLM_LOC_ST>
            <EMP_CLM_LOC_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/PostalCd"></xsl:value-of>
            </EMP_CLM_LOC_ZIP>

            <NJM_POL_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line1Tx"></xsl:value-of>
            </NJM_POL_ADDR_1>
            <NJM_POL_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line2Tx"></xsl:value-of>
            </NJM_POL_ADDR_2>
            <NJM_POL_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Line3Tx"></xsl:value-of>
            </NJM_POL_ADDR_3>
            <NJM_POL_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/Municipality/MunicipalityNm"></xsl:value-of>
            </NJM_POL_CTY>
            <NJM_POL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/CountrySubdivision/CountrySubdivisionNm"></xsl:value-of>
            </NJM_POL_ST>
            <NJM_POL_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Addresses/Address/PostalCd"></xsl:value-of>
            </NJM_POL_ZIP>
          
            <!-- Outputs DBAName String Length -->
            <POL_HLD_NAME_MULTI_CHAR_COUNT>
              <xsl:value-of select="string-length($TextString) + $AndOrPadding"/>
            </POL_HLD_NAME_MULTI_CHAR_COUNT>

            <AUTHOR_EXEC_IND>N</AUTHOR_EXEC_IND>
            <PKG_NAME></PKG_NAME>
            <!--<CNC_DT>
              <xsl:variable name="dt" select="CorrespondenceDataResponse/Policy/PolicyPeriod/CancellationDt"/>
              <xsl:value-of select="substring-before($dt,'T')" />
            </CNC_DT>-->
            <!--<PEND_CNC_DT>
              <xsl:variable name="pdt" select="CorrespondenceDataResponse/Policy/PolicyPeriod/PendingCancellationDt"/>
              <xsl:value-of select="substring-before($pdt,'T')" />
            </PEND_CNC_DT>-->
            <NJM_ACCT_NUM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/Account/AccountNo"/>
            </NJM_ACCT_NUM>
            <PRIMARY_NAMED_INS_ONLY_MAN>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/OrganizationNm"/>
            </PRIMARY_NAMED_INS_ONLY_MAN>
            <NJM_POLHOLD_PHONE_NO>
              <xsl:variable name="AreaCd" select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Telephones/PhoneNumber/AreaCd"/>
              <xsl:variable name="ExchangeId" select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Telephones/PhoneNumber/ExchangeId"/>
              <xsl:variable name="SubscriberLineId" select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/Telephones/PhoneNumber/SubscriberLineId"/>
              <xsl:if test="$AreaCd != '' and $ExchangeId != '' and $SubscriberLineId != ''">
                <xsl:value-of select="concat($AreaCd,'-',$ExchangeId,'-',$SubscriberLineId)" />
              </xsl:if>
            </NJM_POLHOLD_PHONE_NO>
            
            <BUREAU_FILE_NUM>
              <!--<xsl:variable name="BureauID" select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyRoles[text()='Named Insured']]/Organization/OfficialIdentifications/IdentificationTypeCd[text()='BureauID']"/>-->
              
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties/Organization/OfficialIdentifications[IdentificationTypeCd = 'BureauID']/IdentificationCd" />
            </BUREAU_FILE_NUM>
 
        </POLICY_REC>

          <!--  Outputs DBANames Secondary Table -->
          <xsl:for-each select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Additional Insured']) or (PartyRoles[text()='Named Insured'])]">
            <xsl:variable name="OrgNameVariable" select="Organization/OrganizationNm"/>

            <NJM_POL_HLD>
              <POL_HLD_NAME_MULTI>
                <xsl:value-of select="$OrgNameVariable"/>

                <xsl:apply-templates select="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/Trades[RelatedPartyNm=$OrgNameVariable and PrimaryTradeNameIn='true']">
                  <xsl:sort select="TradeNm" order="ascending"/>
                </xsl:apply-templates>

                <xsl:apply-templates select="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/Trades[RelatedPartyNm=$OrgNameVariable and PrimaryTradeNameIn!='true']">
                  <xsl:sort select="TradeNm" order="ascending"/>
                </xsl:apply-templates>

              </POL_HLD_NAME_MULTI>
              <POL_FK>1</POL_FK>
            </NJM_POL_HLD>
          </xsl:for-each>

          <!--  ARRAY DATA FOR STATE AND BUREAU FILE NO -->
          <xsl:for-each select="CorrespondenceDataResponse/Policy/PolicyPeriod/InvolvedParties[PartyTypeCd[text()='Organization'] and (PartyRoles[text()='Named Insured'])]/Organization/OfficialIdentifications[IdentificationTypeCd[text()='BureauID']]">

           <ST_OF_OWNERSHIP_REC>
              <ST_OF_OWNERSHIP_INFO>
                <xsl:value-of select="IssuingCountrySubdivisionCd"/>
              </ST_OF_OWNERSHIP_INFO>
              <RATING_BUREAU_FILE_NUM>
                <xsl:value-of select="IdentificationCd"/>
              </RATING_BUREAU_FILE_NUM>
            </ST_OF_OWNERSHIP_REC>
          </xsl:for-each>
          
        </RECORD_DELIM>
      </CUSTOMER_DATA>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
