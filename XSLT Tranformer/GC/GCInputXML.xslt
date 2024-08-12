<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m1="http://njm.com/esb/common/types" xmlns:m0="http://njm.com/esb/core/claim/1.0.0/types" xmlns:typ="http://njm.com/ccutil/1.0.0/types" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:js="http://www.url.com"  xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl js">
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
    <CorrespondenceDataResponse>
      <xsl:apply-templates select="@* | node()"/>
    </CorrespondenceDataResponse>
  </xsl:template>

  <!-- Remove all header xml nodes -->
  <xsl:template match="soapenv:Body">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="int:RetrieveDocumentDataResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="Response">
    <xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template match="typ:Header"/>

  <xsl:template match="typ:*">
    <xsl:variable name="a" select="local-name()" />
    <xsl:element name="{$a}">
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="typ:Claim">
    <Claim>
      <xsl:apply-templates select="@* | node()"/>
    </Claim>
  </xsl:template>
  

</xsl:stylesheet>
