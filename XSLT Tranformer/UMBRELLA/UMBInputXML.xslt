<?xml version="1.0" encoding="utf-8"?>
<!-- UMB input XML xslt - parse pds xml into ICE XML -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:umcd="http://njm.com/esb/pds/um/correditor/1.0/interfaces/UMCorrespondenceData" xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js">
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

  <!-- remove all empty spaces between removed nodes and elements-->
  <xsl:strip-space elements="*"/>

  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Rename root element -->
  <xsl:template match="soapenv:Envelope">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove all header xml nodes -->
  <xsl:template match="soapenv:Body">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="umcd:retrievePolicyByPolicyNumberResponse">
    <CorrespondenceDataResponse>
      <xsl:apply-templates select="@* | node()"/>
    </CorrespondenceDataResponse>
  </xsl:template>

  <xsl:template match="umcd:retrievePolicyByQuoteNumberResponse">
    <CorrespondenceDataResponse>
      <xsl:apply-templates select="@* | node()"/>
    </CorrespondenceDataResponse>
  </xsl:template>

  <xsl:template match="retrievePolicyByPolicyNumberRespMsg">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="retrievePolicyByQuoteNumberRespMsg">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="Header"/>

  <xsl:template match="CorrelationContext"/>

</xsl:stylesheet>
