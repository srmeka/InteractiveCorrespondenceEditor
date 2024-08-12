<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
    <xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>

  <xsl:variable  name="documentName"  select="/CUSTOMER_DATA/RECORD_DELIM/POLICY_REC/LTR_NAME/text()"></xsl:variable>

  <xsl:strip-space elements="*"/>

  <!-- Matching root element -->
  <!--<xsl:template match="/">
    --><!-- creating variable to store Input XML--><!--    
    <xsl:variable name="xmldoc">     
      <xsl:apply-templates select="@*|node()"/>
    </xsl:variable>

    --><!-- o/p Variable store final result XML --><!--
    <xsl:variable name="outputXml">
      --><!-- APPLY template that removes empty tags--><!--
      <xsl:apply-templates select="msxsl:node-set($xmldoc)/CUSTOMER_DATA" mode="removeTags"/>
    </xsl:variable>

    --><!-- O/P final XML--><!--
    <xsl:copy-of select="$outputXml"/>
  </xsl:template>-->

  <!-- Match all Nodes-->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <!--<xsl:apply-templates select="@*|node()"/>-->
      <xsl:apply-templates select="node()[boolean(normalize-space())]|@*"/>
    </xsl:copy>
  </xsl:template>

  <!-- Match all nodes which are empty-->
  <xsl:template match="@*|node()" mode="removeTags">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" mode="removeTags"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove empty tags-->
  <xsl:template match="*[not(@*|*|comment()|processing-instruction()) and normalize-space()='']" mode="removeTags">
  </xsl:template>

  <xsl:template match="OB_KEYWORD6">
    <xsl:copy>
      <xsl:if test="$documentName = ('NJM NJ Standard CSF')">STANDARD</xsl:if>
    </xsl:copy>
  </xsl:template>

  <!-- only pass collection of vehicles description for CSF , for other documents only selected vehicles are passed by UI control-->
  <xsl:template match="VEH_DESC_TEMP">
    <xsl:if test="$documentName = ('NJM NJ Standard CSF')">
      <VEH_DESC>
        <xsl:apply-templates select="@* | node()"/>
      </VEH_DESC>
    </xsl:if>
    
  </xsl:template>
  
</xsl:stylesheet>
