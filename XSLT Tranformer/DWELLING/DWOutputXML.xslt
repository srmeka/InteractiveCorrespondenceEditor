<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:typ="http://njm.com/esb/pds/ca/1.0/types"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js"
>
  <!-- DW OUTPUT XML xslt - parse ICE input xml into Interactive XML -->
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
  </msxsl:script>-->

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/Policy/PolicyNumber)"></xsl:variable>

  <xsl:output method="xml" indent="yes"/>

  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:copy>
      <CUSTOMER_DATA>
        <RECORD_DELIM>
          <DWELLING_REC>
            <POL_PK>1</POL_PK>
            <SRC_SYS>ADHOC</SRC_SYS>
            <!-- current DATE -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>-->
            <!--<xsl:element name="CURR_DT">
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

            <NAMED_INSD_1>
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
            </NAMED_INSD_1>

            <NAMED_INSD_2>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/NameSalutationCd != ''">
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
            </NAMED_INSD_2>

            <NAMED_INSD_3>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/NameSalutationCd != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/NameSalutationCd"/>
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/FirstGivenNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/SecondGivenNameInitial != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/SecondGivenNameInitial"/>
              </xsl:if>

              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/FamilyNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/FamilyNameGenerationCd != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='1']/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>
            </NAMED_INSD_3>

            <NAMED_INSD_4>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/NameSalutationCd != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/NameSalutationCd"/>
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/FirstGivenNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/SecondGivenNameInitial != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/SecondGivenNameInitial"/>
              </xsl:if>

              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/FamilyNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/FamilyNameGenerationCd != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='2']/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>
            </NAMED_INSD_4>

            <NAMED_INSD_5>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/NameSalutationCd != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/NameSalutationCd"/>
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/FirstGivenNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/SecondGivenNameInitial != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/SecondGivenNameInitial"/>
              </xsl:if>

              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/FamilyNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/FamilyNameGenerationCd != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='3']/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>
            </NAMED_INSD_5>

            <NAMED_INSD_6>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/NameSalutationCd != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/NameSalutationCd"/>
                <xsl:text> </xsl:text>
              </xsl:if>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/FirstGivenNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/SecondGivenNameInitial != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/SecondGivenNameInitial"/>
              </xsl:if>

              <xsl:text> </xsl:text>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/FamilyNm"/>

              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/FamilyNameGenerationCd != ''">
                <xsl:text> </xsl:text>
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Other Named Insured']][position()='4']/Person/PersonName/FamilyNameGenerationCd"/>
              </xsl:if>
            </NAMED_INSD_6>


            <HOME_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line1Tx"/>
            </HOME_ADDR_1>
            <HOME_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line2Tx"/>
            </HOME_ADDR_2>
            <HOME_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line3Tx"/>
            </HOME_ADDR_3>
            <HOME_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Municipality/MunicipalityNm"/>
            </HOME_CTY>
            <HOME_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/CountrySubdivision/CountrySubdivisionNm"/>
            </HOME_ST>
            <HOME_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/PostalCd"/>
            </HOME_ZIP>

            <POL_EFF_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,11)"/>
            </POL_EFF_DT>

            <!--<POL_EFF_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,3,2)"/>
            </POL_EFF_YR>-->

            <!--<POL_EXP_YR>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,3,2)"/>
            </POL_EXP_YR>-->

            <POL_EXP_DT>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt,0,11)"/>
            </POL_EXP_DT>

            <TOT_PREM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/SummaryAmounts[AmountTypeCd[text()='Total Policy Premium']]/SummaryAm"/>
            </TOT_PREM>

            <COV_A_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage A - Dwelling']]/CoverageParameterUnformattedValueTx"/>
            </COV_A_LMT_LIAB>
            <COV_B_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage B - Other Structures']]/CoverageParameterUnformattedValueTx"/>
            </COV_B_LMT_LIAB>
            <COV_C_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage C - Personal Property']]/CoverageParameterUnformattedValueTx"/>
            </COV_C_LMT_LIAB>
            <COV_D_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage D - Fair Rental Value']]/CoverageParameterUnformattedValueTx"/>
            </COV_D_LMT_LIAB>
            <COV_E_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage E - Additional Living Expenses']]/CoverageParameterUnformattedValueTx"/>
            </COV_E_LMT_LIAB>
            <COV_F_LMT_LIAB>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Coverage F - Medical Payments to Others']]/CoverageParameterUnformattedValueTx"/>
            </COV_F_LMT_LIAB>
            <SECT_I_DED>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/CoveragesElectionParameters[CoverageTypeCd[text()='Section I Deductible']]/CoverageParameterUnformattedValueTx"/>
            </SECT_I_DED>

            <POL_MAIL_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/Line1Tx"/>
            </POL_MAIL_ADDR_1>
            <POL_MAIL_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/Line2Tx"/>
            </POL_MAIL_ADDR_2>
            <POL_MAIL_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/Line3Tx"/>
            </POL_MAIL_ADDR_3>
            <POL_MAIL_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/Municipality/MunicipalityNm"/>
            </POL_MAIL_CTY>
            <POL_MAIL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/CountrySubdivision/CountrySubdivisionNm"/>
            </POL_MAIL_ST>
            <POL_MAIL_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Mailing']]/Address/PostalCd"/>
            </POL_MAIL_ZIP>

            <POL_LOC_ADDR_1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Line1Tx"/>
            </POL_LOC_ADDR_1>
            <POL_LOC_ADDR_2>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Line2Tx"/>
            </POL_LOC_ADDR_2>
            <POL_LOC_ADDR_3>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Line3Tx"/>
            </POL_LOC_ADDR_3>
            <POL_LOC_CTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Municipality[MunicipalityTypeCd[text()='CITY']]/MunicipalityNm"/>
            </POL_LOC_CTY>
            <POL_LOC_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/CountrySubdivision/CountrySubdivisionNm"/>
            </POL_LOC_ST>
            <POL_LOC_ZIP>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/PostalCd"/>
            </POL_LOC_ZIP>

            <POL_LOC_TOWNSHIP>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Municipality[MunicipalityTypeCd[text()='TOWNSHIP']]/MunicipalityNm != ''">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Municipality[MunicipalityTypeCd[text()='TOWNSHIP']]/MunicipalityNm"/>
              </xsl:if>
            </POL_LOC_TOWNSHIP>
            
            <POL_LOC_COUNTY>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/DwellingAddress/Address/Municipality[MunicipalityTypeCd[text()='COUNTY']]/MunicipalityNm"/>
            </POL_LOC_COUNTY>

            <PRIM_INSD_EMAIL>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/EmailAddresses/EmailAddress/UnparsedEmailAddress"/>
            </PRIM_INSD_EMAIL>

            <FORM_TYPE>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/FormTypeCd"/>
            </FORM_TYPE>
            <COVS_TOT_PREM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/SummaryAmounts[AmountTypeCd[text()='Total Base Premium']]/SummaryAm"/>
            </COVS_TOT_PREM>
            <SUB_POL_PREM>
              <xsl:value-of select="CorrespondenceDataResponse/PolicyPeriods/PolicyLines/HomeownersLine/SummaryAmounts[AmountTypeCd[text()='Subtotal Policy Premium']]/SummaryAm"/>
            </SUB_POL_PREM>
            <PLIGA>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/NonCoverageCharges[ChargeReasonCd[text()='NJ PLIGA Charge']]/ChargeAm"/>
            </PLIGA>

            <PRIOR_POL_PD_YR>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/DividendYr"/>
            </PRIOR_POL_PD_YR>
            <REG_DIV>
              <xsl:value-of select="CorrespondenceDataResponse/PolicyPeriods/TotalDividendAm"/>
            </REG_DIV>

            <ESCROW_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings/AssociatedParties/FinancialInstitution/EscrowIn"/>
            </ESCROW_IND>
            <OTH_INSD_LOC_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/OtherInsuredLocationIn"/>
            </OTH_INSD_LOC_IND>

            <POL_DISCOUNTS_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/PolicyDiscountsIn"/>
            </POL_DISCOUNTS_IND>
            <WORK_COMP_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/WorkersCompensationIn"/>
            </WORK_COMP_IND>
            <MORTGAGEE_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings/MortgageeIn"/>
            </MORTGAGEE_IND>
            <EXT_COV>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ExtendedCoverageIn"/>
            </EXT_COV>
            <VDLSM_MLSC_MSCHF>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/VandalismMLSCMischiefCoverageIn"/>
            </VDLSM_MLSC_MSCHF>
            <RCT_COV_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings/RCTCoverageIn"/>
            </RCT_COV_IND>

            <TOT_ADDL_RET_PREM>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/HomeownersLine/TOT_ADDL_RET_PREM"/>
            </TOT_ADDL_RET_PREM>
            <ADJ_TOT_DIV>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/HomeownersLine/ADJ_TOT_DIV"/>
            </ADJ_TOT_DIV>

            <SECONDARY_POL_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/SecondaryPolicyIn"/>
            </SECONDARY_POL_IND>
            <POL_MAILING_ADD_IND>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyMailingAddressIn"/>
            </POL_MAILING_ADD_IND>
            <POL_ST>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/BaseStateCd"/>
            </POL_ST>
            
             <!-- KEYWORD SECTION -->
            <OB_KEYWORD1>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if>
            </OB_KEYWORD1>
            <OB_KEYWORD2>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt,0,5)"/>
            </OB_KEYWORD2>
            <OB_KEYWORD3>DWELLING</OB_KEYWORD3>
            <OB_KEYWORD4>OUTGOING</OB_KEYWORD4>
            <OB_KEYWORD5>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNumber"/>
            </OB_KEYWORD5>
            <BARCODE_IND>N</BARCODE_IND>
            <CERT_IND>N</CERT_IND>
            <EMAIL_FROM>DoNotReply_NJMInsurance@njm.com</EMAIL_FROM>
            <EMAIL_BODY>dwelling</EMAIL_BODY>
            <EMAIL_SUBJECT>Requested NJM Dwelling Information</EMAIL_SUBJECT>
            <POL_NO_PAD>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="substring(concat('000000000',CorrespondenceDataResponse/Policy/PolicyNumber),string-length(CorrespondenceDataResponse/Policy/PolicyNumber),9)"/>
              </xsl:if>
            </POL_NO_PAD>
            <NEW_CALC_RCT_VAL>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/HomeownersLine/ListedDwellings[DwellingTypeCd[text()='Risk']]/ReplacementCostAm"/>
            </NEW_CALC_RCT_VAL>          
          </DWELLING_REC>
        </RECORD_DELIM>
      </CUSTOMER_DATA>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
