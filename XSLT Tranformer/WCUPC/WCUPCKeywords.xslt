<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
  <xsl:output method="xml" indent="yes"/>

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
      <xsl:apply-templates select="@*|node()"/>
      <!--<xsl:apply-templates select="node()[boolean(normalize-space())]|@*"/>-->
    </xsl:copy>
  </xsl:template>

  <!-- Match all nodes which are empty-->
  <xsl:template match="@*|node()" mode="removeTags">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" mode="removeTags"/>
    </xsl:copy>
  </xsl:template>

  <!-- WCU PC Letter Specific Tags -->
  <xsl:template match="PKG_NAME">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('Need Completed PP1B') or $documentName[1] = ('Bkr Mid Term Change-Add')">
          <xsl:text>WCU PP1B Package</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text></xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="PRINTER_NAME">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('SIU Referral')">
          <xsl:text>Archive Only</xsl:text>
        </xsl:when>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <!-- Remove empty tags-->
  <xsl:template match="*[not(@*|*|comment()|processing-instruction()) and normalize-space()='']" mode="removeTags">
  </xsl:template>
  

  <!-- WCU PC Keywords -->
  <xsl:template match="OB_KEYWORD4">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('SIU Referral')">
          <xsl:text>INTERNAL</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>OUTGOING</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="OB_KEYWORD5">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('Bkr Chg Add Delete Billing Opts') or $documentName[1] = ('Bkr Mid Term Change-Add') or $documentName[1] = ('Broker Authorization Ltr')">
          <xsl:text>BROKER</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('Non Pay to Broker')">
          <xsl:text>CANCEL-REINSTATE</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('Check Lacks CRIB Endorsement') or $documentName[1] = ('CRIB Ownership Response') or $documentName[1] = ('CRIB Req Relief Redes Letter') or $documentName[1] = ('CRIB Zero Balance') or $documentName[1] = ('CRIB-Vol Cov Credit Ltr') or $documentName[1] = ('Ownership to Crib') or $documentName[1] = ('Re Designation App Letter') or $documentName[1] = ('Request Bureau File Number') or $documentName[1] = ('1st Fraud Notice Complied After Req') or $documentName[1] = ('CRIB Req for Records Audit Complete') or $documentName[1] = ('Re-Audit Decline') or $documentName[1] = ('Test Audit Reqd Audit not Complete')">
          <xsl:text>RATING BUREAU</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('1st Fraud Notice Req CRIB Assist') or $documentName[1] = ('Fraud Letter') or $documentName[1] = ('Mail Audit') or $documentName[1] = ('No Change Audit Correct') or $documentName[1] = ('No Change Lack of Cooperation')">
          <xsl:text>PREMIUM AUDIT</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('Fin Co Notify Fin Co of Prior CN') or $documentName[1] = ('Fin Co Rec Part of Agremt or Rec Ck') or $documentName[1] = ('Fin Co Received Complete Agreement') or $documentName[1] = ('Finance Co Final Request')">
          <xsl:text>FINANCE AGREEMENT</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('OCIP CCIP Letter')">
          <xsl:text>OCIP-CCIP</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('SIU Referral')">
          <xsl:text>SIU</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text></xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="OB_KEYWORD12">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('Legal Status Change')">
          <xsl:text>Final Audit</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text></xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>
  

</xsl:stylesheet>
