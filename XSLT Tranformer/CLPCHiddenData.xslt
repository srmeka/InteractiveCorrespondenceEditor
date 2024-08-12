<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="xml" indent="yes"/>

  <xsl:variable  name="documentName"  select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LTR_NAME/text()"></xsl:variable>

  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  
</xsl:stylesheet>





<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/BaseStateCd" xmlOutNode="POL_ST" outFormat="{0}"/>
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyNumber" xmlOutNode="POL_NO" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNumber" xmlOutNode="QUOTE_NUM" outFormat="{0}" />
<Part checkPrefix="Y" xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/NameSalutationCd, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FirstGivenNm, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/SecondGivenNameInitial, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FamilyNm, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Primary Named Insured']]/Person/PersonName/FamilyNameGenerationCd" xmlOutNode="PRIMARY_INS_POL_HLD_NAME" outFormat="{0} {1} {2} {3} {4}" altoutFormat="{1} {2} {3} {4}" />
<Part checkPrefix="Y" xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/NameSalutationCd, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FirstGivenNm, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/SecondGivenNameInitial, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNm, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles[text()='Secondary Named Insured']]/Person/PersonName/FamilyNameGenerationCd" xmlOutNode="SECONDARY_INS_POL_HLD_NAME" outFormat="{0} {1} {2} {3} {4}" altoutFormat="{1} {2} {3} {4}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Tertiary Named Insured']/Person/PersonName/FirstGivenNm, /CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Tertiary Named Insured']/Person/PersonName/FamilyNm" xmlOutNode="TERTIARY_INS_POL_HLD_NAME" outFormat="{0} {1}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line1Tx" xmlOutNode="INS_ADDR_1" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line2Tx" xmlOutNode="INS_ADDR_2" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Line3Tx" xmlOutNode="INS_ADDR_3" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/Municipality/MunicipalityNm" xmlOutNode="INS_CTY" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/CountrySubdivision/CountrySubdivisionNm" xmlOutNode="INS_ST" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/ListedParties/Party[PartyRoles='Primary Named Insured']/Person/Addresses[AddressUseCd[text()='Home']]/Address/PostalCd" xmlOutNode="INS_ZIP" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt" xmlOutNode="POL_EFF_DT" outFormat="yyyy-MM-dd" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt" xmlOutNode="POL_EFF_YR" outFormat="yy" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt" xmlOutNode="POL_EXP_YR" outFormat="yy" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt" xmlOutNode="POL_EXP_DT" outFormat="yyyy-MM-dd" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt" xmlOutNode="POL_EFF_DT_ID_CARD" outFormat="yyyy-MM-dd" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/EndDt" xmlOutNode="POL_EXP_DT_ID_CARD" outFormat="yyyy-MM-dd" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/VehicleCoverageDetails/Coverages[CoverageTypeCd[text()='Collision']]/CoverageParameterUnformattedValueTx" xmlOutNode="COLL_DED" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/VehicleCoverageDetails/Coverages[CoverageTypeCd[text()='Comprehensive']]/CoverageParameterUnformattedValueTx" xmlOutNode="OTH_THAN_COLL_DED" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[CoverageTypeCd[text()='Liability']]/CoverageParameterUnformattedValueTx" xmlOutNode="LIAB_LMT" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Deductible'])]/CoverageParameterUnformattedValueTx" xmlOutNode="PIP_DED" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Provider'])]/CoverageParameterUnformattedValueTx" xmlOutNode="PIP_PRIMARY_PROV" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Option'])]/CoverageParameterUnformattedValueTx" xmlOutNode="PIP_OPTION" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Higher Limit'])]/CoverageParameterUnformattedValueTx" xmlOutNode="PIP_HIGHER_LMT" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Personal Injury Protection'] and CoverageParameterTypeCd[text()='PIP Medical Expense Limit'])]/CoverageParameterUnformattedValueTx" xmlOutNode="PIP_MED_LMT" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PolicyLines/PersonalAutoLine/CoverageElectionParameters[(CoverageTypeCd[text()='Lawsuit Threshold'] and CoverageParameterTypeCd[text()='Lawsuit Threshold Limit'])]/CoverageParameterUnformattedValueTx" xmlOutNode="THRESH_OPTION" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/AssociatedPolicies[AssociationReasonCd='Health Insurance Policy']/PolicyProvider" xmlOutNode="HLTH_INS_PROV" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/AssociatedPolicies[AssociationReasonCd='Health Insurance Policy']/PolicyId" xmlOutNode="POL_GRP_CERT_NO" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PersonalAutoLine/ResRelBirthDt" xmlOutNode="RES_REL_BIRTH_DT" outFormat="{0}" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/PersonalAutoLine/ResRelRel" xmlOutNode="RES_REL_RELATED" outFormat="{0}" />
<Part text="Y" xmlOutNode="ARCHIVE_IND" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyNumber" xmlOutNode="OB_KEYWORD1" outFormat="{0}" checkdigit="false" />
<Part text="AUTO" xmlOutNode="OB_KEYWORD3" />
<Part text="OUTGOING" xmlOutNode="OB_KEYWORD4" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/StartDt" xmlOutNode="OB_KEYWORD2" outFormat="yyyy" dataType="DateTime" inFormat="yyyy-MM-dd" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyPeriod/QuoteNumber" xmlOutNode="OB_KEYWORD5" outFormat="{0}" />
<Part text="" xmlOutNode="OB_KEYWORD6" />
<Part text="" xmlOutNode="OB_KEYWORD7" />
<Part text="" xmlOutNode="OB_KEYWORD8" />
<Part text="" xmlOutNode="OB_KEYWORD9" />
<Part text="" xmlOutNode="OB_KEYWORD10" />
<Part text="" xmlOutNode="OB_KEYWORD11" />
<Part text="" xmlOutNode="OB_KEYWORD12" />
<Part text="N" xmlOutNode="BARCODE_IND" />
<Part text="N" xmlOutNode="CERT_IND" />
<Part text="" xmlOutNode="GUNTHER_IND" />
<Part text="DoNotReply_AutoInsurance@njm.com" xmlOutNode="EMAIL_FROM" />
<Part text="Requested NJM Automobile Information" xmlOutNode="EMAIL_SUBJECT" />
<Part httpEmail="SM_EMAIL" xmlOutNode="FAX_FROM" />
<Part xPath="/CorrespondenceDataResponse/Policy/PolicyNumber" xmlOutNode="POL_NO_PAD" outFormat="{0}" padValue="9" />