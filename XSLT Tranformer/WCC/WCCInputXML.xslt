<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:m1="http://njm.com/esb/common/types" xmlns:m0="http://njm.com/esb/core/claim/1.0.0/types" xmlns:typ="http://njm.com/esb/common/1.0.0/types" xmlns:typ1="http://njm.com/ccutil/1.0.0/types" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:js="http://www.url.com"  xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl js">
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

  <xsl:template match="int:GetCorrespondenceDataResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="Response">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="Response/typ:Header"/>

  <xsl:template match="typ1:Response">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Role conversion template -->
  <xsl:template match="typ1:Role">
    <Role>
      <xsl:variable name="inputRole" select="." />
    
      <!-- This is used for replacing single quote values for role values -->
      <xsl:variable name="roleValue">
        <xsl:call-template name="escapeQuotes">
          <xsl:with-param name="txt" select="."/>
        </xsl:call-template>
      </xsl:variable>

      <xsl:choose>
        <xsl:when test="contains($inputRole,'Adjuster - I') or contains($inputRole,'Adjuster - II')  or contains($inputRole,'Adjuster - III')">
          <xsl:text>Adjuster</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Awards Representative')">
          <xsl:text>Awards Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Case Management Representative')">
          <xsl:text>Case Management Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'DME Representative')">
          <xsl:text>DME Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'FNOL Representative')">
          <xsl:text>FNOL Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Bill Processor')">
          <xsl:text>Medical Services</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Provider Services Representative')">
          <xsl:text>Provider Services Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Reinsurance Representative')">
          <xsl:text>Reinsurance Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Reserve Representative')">
          <xsl:text>Reserve Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Sales Representative')">
          <xsl:text>Sales Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'SIU Representative')">
          <xsl:text>SIU Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Subrogation Representative')">
          <xsl:text>Subrogation Rep</xsl:text>
        </xsl:when>
        <xsl:when test="contains($inputRole,'Utilization Review Representative')">
          <xsl:text>Utilization Review Rep</xsl:text>
        </xsl:when>
         <xsl:when test="contains($inputRole,'Supervisor')">
          <xsl:text>Supervisor</xsl:text>
        </xsl:when>         
        <xsl:when test="$roleValue = 'Petitioners Attorney'">
          <xsl:text>Petitioners Attorney</xsl:text>
        </xsl:when>
        <xsl:when test="$roleValue = 'Petitioners Law Firm'">
          <xsl:text>Petitioners Law Firm</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="."/>
        </xsl:otherwise>
      </xsl:choose>
    </Role>
  </xsl:template>

  <xsl:template match="typ1:*">
    <xsl:variable name="a" select="local-name()" />
    <xsl:element name="{$a}">
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>

  <!-- escape single quote for roles-->
  <xsl:template name="escapeQuotes">
    <xsl:param name="txt"/>
    <xsl:variable name="backSlashQuote"></xsl:variable>
    <xsl:variable name="singleQuote">&#39;</xsl:variable>

    <xsl:choose>
      <xsl:when test="contains($txt, $singleQuote)">
        <xsl:value-of disable-output-escaping="yes" select="concat(substring-before($txt, $singleQuote), $backSlashQuote)"/>

        <!-- recusrive call -->
        <xsl:call-template name="escapeQuotes">
          <xsl:with-param name="txt" select="substring-after($txt, $singleQuote)"/>
        </xsl:call-template>

      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of disable-output-escaping="yes" select="$txt"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  
    <!-- Final copy -->
  <xsl:template match="typ1:Claim">
    <Claim>
      <xsl:apply-templates select="@* | node()"/>
    </Claim>
  </xsl:template>


</xsl:stylesheet>
