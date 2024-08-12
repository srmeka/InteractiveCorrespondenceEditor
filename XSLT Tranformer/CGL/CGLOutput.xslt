﻿<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
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
  </msxsl:script>-->

  <xsl:output method="xml" indent="yes"/>

  <xsl:strip-space elements="*"/>

  <!-- Line of business variable -->
  <xsl:variable name="varLOB" select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName"></xsl:variable>

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber)"></xsl:variable>


  <xsl:template match="/">

    <xsl:copy>
      <CustomerData>
        <RecordDelim>
          <AccountRecord>
            <NJMAccountNumber>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/AccountNo"/>
            </NJMAccountNumber>
            <!--<CurrentDate>
              <xsl:value-of select="js:getCurrentDate()"/>
            </CurrentDate>-->
            <Environment>Dev</Environment>
            <SourceSystem>ADHOC</SourceSystem>
            <!--<OutboundDocType>CL  Correspondence</OutboundDocType>-->
            <OnBaseKeyword1>G</OnBaseKeyword1>
            <DocumentRecipient>INSURED</DocumentRecipient>
            <LineOfBusiness>Commercial General Liability</LineOfBusiness>
            <CLDocSource>OUTGOING</CLDocSource>
            <!-- adding scan sheet tags -->
            <!-- adding scan sheet tags -->
            <Tag4>Policy Number:</Tag4>
            <Tag4Num>004:</Tag4Num>
            <Value4>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyNumber"/>
              </xsl:if>
            </Value4>

            <!--<Tag5>Quote Number:</Tag5>
            <Tag5Num>005:</Tag5Num>
            <Value5>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/QuoteNumber"/>
            </Value5>-->

            <Tag6>Account Number:</Tag6>
            <Tag6Num>080:</Tag6Num>
            <Value6>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/AccountNo"/>
            </Value6>

            <Tag12>Line of Business:</Tag12>
            <Tag12Num>002:</Tag12Num>
            <Value12>General Liability</Value12>
            
          </AccountRecord>
          
          <CGLPolicyRecord>
            <RecordKey>1</RecordKey>
            <NJMPolicyNumber>
              <xsl:if test="CorrespondenceDataResponse/Policy/PolicyNumber != 'Unassigned'">
                <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyNumber"/>
              </xsl:if>
            </NJMPolicyNumber>
            <QuoteNumber>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/QuoteNumber"/>
            </QuoteNumber>
            <ProductCode>CGL</ProductCode>
            <IndustryCode>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/IndustryOfferingCd"/>
            </IndustryCode>
            <PolicyNumPrefixDisplay>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/PolicyProductCd"/>
            </PolicyNumPrefixDisplay>
            <NJMPolicyHolderName1>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/Party[PartyRoles/PartyRole[text()='Primary Named Insured']]/DisplayName"/>
            </NJMPolicyHolderName1>
            <BaseState>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/BaseStateCd"/>
            </BaseState>
            <UWCompanyName>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/UnderwritingCompany/DisplayName"/>
            </UWCompanyName>
            <PolEffectiveDate>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/StartDt"/>
            </PolEffectiveDate>
            <PolicyEffectiveYear>
              <xsl:value-of select="substring(CorrespondenceDataResponse/Policy/StartDt,0,5)"/>
            </PolicyEffectiveYear>
            <PolExpirationDate>
              <xsl:value-of select="CorrespondenceDataResponse/Policy/EndDt"/>
            </PolExpirationDate>
          </CGLPolicyRecord>
        </RecordDelim>
      </CustomerData>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>