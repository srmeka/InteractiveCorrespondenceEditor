<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:esb="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService" xmlns:tns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:types="http://njm.com/esb/wcu/bc/bds/1.0/types" xmlns:typ1="http://njm.com/esb/wcu/bc/bds/policyperoid/1.0/types" xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" xmlns:typesProdStmt="http://njm.com/esb/wcu/bc/bds/producerstatments/1.0/types" exclude-result-prefixes="msxsl js">

  <xsl:output method="xml" indent="yes"/>

  <xsl:strip-space elements="*"/>


  <!-- Getting Unique Contacts nodes for policy holder accouting stmt -->
  <xsl:key name="item-by-value" match="/tns:Envelope/tns:Body/esb:retrievePolicyInvoiceDetailsResponse/retrievePolicyInvoiceDetailsOut/AccountInvoices/types:PolicyPeriodForThisInvoice/types:Contacts/types:Entry/types:DisplayName" use="."/>

  <!-- Getting Unique Contacts nodes for invoice transactions -->
  <xsl:key name="item-by-value_invoice" match="/tns:Envelope/tns:Body/esb:retrieveInvoiceTransactionsResponse/retrieveInvoiceTransactionsOut/LatestPolicyPeriod/types:Contacts/types:Entry/types:DisplayName" use="."/>


  <xsl:template match="types:DisplayName" mode="unique">
    <xsl:if test="generate-id() = generate-id(key('item-by-value', normalize-space(.)))">
      <Entry>
        <xsl:attribute name="id">
          <xsl:value-of select="position()"/>
        </xsl:attribute>

        <xsl:apply-templates select="../types:Contact"></xsl:apply-templates>
        <xsl:apply-templates select="../types:DisplayName"/>
        <xsl:apply-templates select="../types:IsCorrespondenceReceiver_Ext"></xsl:apply-templates>
        <xsl:apply-templates select="../types:Roles"/>

        <xsl:text></xsl:text>
      </Entry>
    </xsl:if>
  </xsl:template>

  <xsl:template match="text()" mode="unique">
    <xsl:apply-templates/>
  </xsl:template>


  <xsl:template match="types:DisplayName" mode="uniqueInv">
    <xsl:if test="generate-id() = generate-id(key('item-by-value_invoice', normalize-space(.)))">
      <Entry>
        <xsl:attribute name="id">
          <xsl:value-of select="position()"/>
        </xsl:attribute>

        <xsl:apply-templates select="../types:Contact"></xsl:apply-templates>
        <xsl:apply-templates select="../types:DisplayName"/>
        <xsl:apply-templates select="../types:IsCorrespondenceReceiver_Ext"></xsl:apply-templates>
        <xsl:apply-templates select="../types:Roles"/>

        <xsl:text></xsl:text>
      </Entry>
    </xsl:if>
  </xsl:template>

  <xsl:template match="text()" mode="uniqueInv">
    <xsl:apply-templates/>
  </xsl:template>



  <xsl:template match="@* | node()">
    <xsl:copy>
      <xsl:apply-templates select="@* | node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Rename root element -->
  <xsl:template match="tns:Envelope">
    <CorrespondenceDataResponse>
      <xsl:apply-templates select="@* | node()"/>

      <!-- Getting Unique Contacts -->
      <UniqueContacts>
        <xsl:apply-templates select="/tns:Envelope/tns:Body/esb:retrievePolicyInvoiceDetailsResponse/retrievePolicyInvoiceDetailsOut/AccountInvoices/types:PolicyPeriodForThisInvoice/types:Contacts/types:Entry/types:DisplayName" mode="unique"/>

        <xsl:apply-templates select="/tns:Envelope/tns:Body/esb:retrieveInvoiceTransactionsResponse/retrieveInvoiceTransactionsOut/LatestPolicyPeriod/types:Contacts/types:Entry/types:DisplayName" mode="uniqueInv"/>
      </UniqueContacts>

    </CorrespondenceDataResponse>
  </xsl:template>

  <!-- Remove all header xml nodes -->
  <xsl:template match="tns:Body">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrievePolicyInvoiceDetailsResponse xml node -->
  <xsl:template match="esb:retrievePolicyInvoiceDetailsResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrievePolicyInvoiceDetailsResponse xml node -->
  <xsl:template match="esb:retrieveInvoiceTransactionsResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrievePolicyInvoiceDetailsOut xml node SP1483-->
  <xsl:template match="retrievePolicyInvoiceDetailsOut">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrieveInvoiceTransactionsOut xml node  SP1483-->
  <xsl:template match="retrieveInvoiceTransactionsOut">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrieveProducerStatementDetailsResponse xml node -->
  <xsl:template match="esb:retrieveProducerStatementDetailsResponse">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove retrieveProducerStatementDetailsOut xml node -->
  <xsl:template match="retrieveProducerStatementDetailsOut">
    <xsl:apply-templates/>
  </xsl:template>

  <!-- Remove Header xml node -->
  <xsl:template match="Header"/>

  <!-- Matching template for Manual Invoice Retrun XML tag LatestPolicyPeriod and converting into AccountInvoice SP1483-->
  <xsl:template match="LatestPolicyPeriod">
    <AccountInvoices>
      <xsl:attribute name="LatestPolicyPeriod">true</xsl:attribute>
      <xsl:attribute name="id">100</xsl:attribute>
      <PolicyPeriodForThisInvoice>
        <xsl:apply-templates select="@* | node()"/>
      </PolicyPeriodForThisInvoice>
    </AccountInvoices>

  </xsl:template>


  <!-- Remove types: from each node and use actual node name for element -->
  <!-- types:AmountDue   to AmountDue-->
  <xsl:template match="types:*">
    <xsl:variable name="a" select="local-name()" />
    <xsl:element name="{$a}">
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>

  <xsl:template match="typesProdStmt:*">
    <xsl:variable name="a" select="local-name()" />
    <xsl:element name="{$a}">
      <xsl:apply-templates select="@* | node()"/>
    </xsl:element>
  </xsl:template>

  <!-- Added this for converting entity-Person to entityPerson-->
  <xsl:template match="types:entity-Person">
    <entityPerson>
      <xsl:apply-templates select="@* | node()"/>
    </entityPerson>
  </xsl:template>

  <!-- remove Code tag from RiskState. This is for Policy Number schema -->
  <xsl:template match="types:RiskState">
    <RiskState>
      <xsl:apply-templates select="types:Code/text()"/>
    </RiskState>
  </xsl:template>


  <!-- remove Code tag from State and Convert into RiskState This is for Procedure code schema response only and move one level up under prducer node-->
  <xsl:template match="ProducerStatments[1]/types:Producer">
    <xsl:variable name="a" select="local-name()" />
    <xsl:element name="{$a}">
      <RiskState>
        <xsl:apply-templates select="//typesProdStmt:Address_Ext/types:State/types:Code/text()" />
      </RiskState>
      <xsl:apply-templates select="node() | @*" />
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
