<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:cglpir="http://njm.com/esb/pds/cgl/1.0/interfaces/CGLPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cgl/1.0/types" xmlns:esbcommon="http://njm.com/esb/common/types" xmlns:ebt="http://njm.com/esb/business/1.3.0/types">
  <!-- This JavaScript function retrun Current Date in the format required by ad hoc document   Full Month DD, YYYY -->
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

  <!-- remove all empty spaces between removed nodes and elements-->
  <xsl:strip-space elements="*"/>

  <xsl:variable name="varPolicyPeriod" select="CorrespondenceDataResponse/typ:Policy/typ:PolicyPeriod" />

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Rename root element -->
  <xsl:template match="soapenv:Envelope">
    <CorrespondenceDataResponse>
      <xsl:apply-templates select="@* | node()"/>
    </CorrespondenceDataResponse>
  </xsl:template>

  <!-- Remove all header xml nodes -->
  <xsl:template match="soapenv:Body">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="cglpir:retrievePolicyByPolicyNumberResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="typ:RetrievePolicyByPolicyNumberResponseMessage">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- added for Quote call -->
  <xsl:template match="cglpir:retrievePolicyByQuoteNumberResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- added for Quote call -->
  <xsl:template match="typ:RetrievePolicyByQuoteNumberResponseMessage">
    <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="esbcommon:Header"/>

  <xsl:template match="esbcommon:Version"/>

  <xsl:template match="esbcommon:CorrelationContext"/>

   <!-- Remove Account node and keep AccountNo -->
  <xsl:template match="typ:AccountNo">
    <AccountNo>
      <xsl:value-of select="//typ:AccountNo"/>
    </AccountNo>
  </xsl:template>
  
  <!-- Remove Account Node -->
  <xsl:template match="typ:Account">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- remove PolicyPeriod node -->
  <xsl:template match="typ:PolicyPeriod">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove PolicyLines -->
  <xsl:template match="typ:PolicyLines"/>

  <!-- remove ListedParties node -->
  <xsl:template match="typ:ListedParties">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- remove Person node -->
  <xsl:template match="typ:Person">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- remove PersonName node -->
  <xsl:template match="typ:PersonName">
    <DisplayName>
      <xsl:value-of select="ebt:UnparsedNameTx"/>
    </DisplayName>
  </xsl:template>

  <!-- remove Organization node -->
  <xsl:template match="typ:Organization">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Rename OrganizationNm to Display Name-->
  <xsl:template match="typ:OrganizationNm">
    <DisplayName>
      <xsl:value-of select="."/>
    </DisplayName>
  </xsl:template>

  <!-- remove VehicleDriverLicense node -->
  <xsl:template match="typ:VehicleDriverLicense">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- restructure partyroles -->
  <xsl:template match="typ:PartyRoles">
    <xsl:element name="PartyRoles">
      <xsl:attribute name="id">
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:element name="PartyRole">
        <xsl:value-of select="."/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template match="typ:UnparsedNameTx">
    <DisplayName>
      <xsl:value-of select="."/>
    </DisplayName>
  </xsl:template>

  <!-- MOVE UnderwritingConcernIn and DriverStatusCd  UNDER PARTY node-->
  <xsl:template match="Party">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
      <xsl:copy-of select="../typ:UnderwritingConcernIn"/>
      <xsl:copy-of select="../typ:DriverStatusCd"/>
    </xsl:copy>
  </xsl:template>

  <!-- remove UnderwritingConcernIn and DriverStatusCd-->
  <xsl:template match="typ:UnderwritingConcernIn"/>
  <xsl:template match="typ:DriverStatusCd"/>


  <xsl:template match="*">
    <xsl:element name="{local-name()}">
      <!-- Check if child node exists and If yes insert attribute number -->
      <xsl:if test="child::*">
        <xsl:attribute name="id">
          <xsl:number format="1" level="any" count="*"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates select="node()"/>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
