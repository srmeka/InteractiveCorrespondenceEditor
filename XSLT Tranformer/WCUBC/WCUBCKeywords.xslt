<?xml version="1.0" encoding="utf-8"?>
<!-- This xslt is used for transforming BC XML Data with keywrods based on each letter-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>

  <xsl:variable  name="documentName"  select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LTR_NAME/text()"></xsl:variable>
  <xsl:variable  name="varLob"  select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/PRODUCT_TYPE/text()"></xsl:variable>

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

  <!-- Remove empty tags-->
  <xsl:template match="*[not(@*|*|comment()|processing-instruction()) and normalize-space()='']" mode="removeTags">
  </xsl:template>

  <!-- update for SP 1483 -->
  
  <xsl:template match="OB_KEYWORD5">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('Blank Letter Template') or $documentName[1] = ('Claim Settlement') or $documentName[1] = ('CRIB Payment Arrangement') or $documentName[1] = ('Not Honored Pymt Request Replacemnt') or $documentName[1] = ('Broker Accounting Statement') or $documentName[1] = ('Request Reissue of Check') or $documentName[1] = ('Return Pymts') or $documentName[1] = ('WC-DD-Remove Multiple Cancel Pymts') or $documentName[1] = ('WCU-DD-Remove from Direct Debit') or $documentName[1] = ('WCU-DD-Waiting for New Funding') or $documentName[1] = ('WCU-Direct Debit Letter') or $documentName[1] = ('Manual Invoice')">
          <xsl:text>OUTGOING</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text></xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <!-- update for SP 1483 -->
  <xsl:template match="OB_KEYWORD6">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('CRIB Payment Arrangement')">
          <xsl:text>RATING BUREAU</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName[1] = ('2nd Request For Unearned Commission') or $documentName[1] = ('Broker Accounting Statement') or $documentName[1] = ('Partial Pymt Pending CN Stands') or $documentName[1] = ('Pymt Accepted Cancellation Stands') or $documentName[1] = ('Return Pymt Letter') or $documentName[1] = ('Manual Invoice')">
          <xsl:text></xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>CASH MANAGEMENT</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="OB_KEYWORD8">
    <xsl:copy>
      <xsl:if test="$documentName = ('Partial Pymt Pending CN Stands')">
        <xsl:text>PARTIAL PYMT PEND CANCEL STANDS</xsl:text>
      </xsl:if>
      <xsl:if test="$documentName = ('Return Pymt Letter') or $documentName = ('Pymt Accepted Cancellation Stands')">
        <xsl:text>CANCELLATION</xsl:text>
      </xsl:if>
      <xsl:if test="$documentName = ('Not Honored Pymt Orig CN Date Stnds')">
        <xsl:text>NOT HONORED PYMT CANCEL DT STANDS</xsl:text>
      </xsl:if>
      <xsl:if test="$documentName = ('Not Honored Pymt on Pending Cancel')">
        <xsl:text>NOT HONORED PYMT PEND CANCEL</xsl:text>
      </xsl:if>
    </xsl:copy>
  </xsl:template>

  <!-- update for SP 1483 -->
  <xsl:template match="OB_KEYWORD10">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('2nd Request For Unearned Commission') or $documentName[1] = ('Broker Accounting Statement') or $documentName[1] = ('Manual Invoice')">
          <xsl:text>WORKERS COMP</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text></xsl:text>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="OUTBND_DOCTYPE">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName[1] = ('CCI Letter')">
          <xsl:text>CMLC  Collection Agency</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName = ('Not Honored Pymt on Pending Cancel') or $documentName = ('Not Honored Pymt Orig CN Date Stnds') or $documentName = ('Partial Pymt Pending CN Stands') or $documentName = ('Pymt Accepted Cancellation Stands') or $documentName = ('Return Pymt Letter')">
          <xsl:text>WCU  Non Payment Cancellation and Reinstatement</xsl:text>
        </xsl:when>
        <xsl:when test="$documentName = ('2nd Request For Unearned Commission')">
          <xsl:text>CM  Billing</xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/OUTBND_DOCTYPE"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <!-- do not pass TOT AMT DUE for PL POLICYHODER ACCT STMT  SP1483 Change for Manual Invoice-->
  <xsl:template match="TOT_AMT_DUE">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName = 'PL Policyholder Acct Statement'">
          <xsl:text></xsl:text>
        </xsl:when>

        <xsl:when test="$documentName = 'Manual Invoice'">
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TOT_AMT_DUE_TEMP/text() = '0'">
            <xsl:text></xsl:text>
          </xsl:if>
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TOT_AMT_DUE_TEMP/text() != '0'">
            <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TOT_AMT_DUE_TEMP/text()"/>
          </xsl:if>
        </xsl:when>

        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TOT_AMT_DUE/text()"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="TOT_AMT_DUE_TEMP"/>

  <!-- PASSING CORRECT AMT Value for Manual Invoice and Other documents SP1483-->
  <xsl:template match="AMT">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName = 'Manual Invoice'">
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_AMT/text() = '0'">
            <xsl:text></xsl:text>
          </xsl:if>
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_AMT/text() != '0'">
            <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_AMT/text()"/>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/AMT/text()"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="TEMP_AMT"/>

  <!-- PASSING CORRECT PAST_DUE_AMT Value for Manual Invoice and Other documents SP1483-->
  <xsl:template match="PAST_DUE_AMT">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName = 'Manual Invoice'">
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_PAST_DUE_AMT/text() = '0'">
            <xsl:text></xsl:text>
          </xsl:if>
          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_PAST_DUE_AMT/text() != '0'">
            <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TEMP_PAST_DUE_AMT/text()"/>
          </xsl:if>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/PAST_DUE_AMT/text()"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="TEMP_PAST_DUE_AMT"/>

  <!-- Logic to send correct Cancellation effective date based on letter name-->
  <xsl:template match="CNC_EFF_DT">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName = ('Not Honored Pymt on Pending Cancel') or $documentName = ('Partial Pymt Pending CN Stands')">
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/CNC_EFF_DT_TEMP/text()"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/CNC_EFF_DT/text()"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

 <!-- adding CC setion by default when Broker name or fianance lease company is send from source data-->
  <xsl:template match="RECORD_DELIM">
    <xsl:copy>
      <xsl:apply-templates/>
      <xsl:choose>
        <xsl:when test="$documentName = ('Partial Pymt Pending CN Stands')">

          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_CO_NAME/text() != ''">
            <BILLING_CC_OPT>
              <BILL_FK>1</BILL_FK>
              <CC_BCC_IND>Y</CC_BCC_IND>
              <!--<CC_ATTN_NAME>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_CO_NAME"/>
              </CC_ATTN_NAME>-->
              <CC_ADDRESSEE_NAME_1>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_CO_NAME"/>
              </CC_ADDRESSEE_NAME_1>
              <CC_ADDRESSEE_ADDR_1>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_ADD_1"/>
              </CC_ADDRESSEE_ADDR_1>
              <CC_ADDRESSEE_ADDR_2 >
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_ADD_2"/>
              </CC_ADDRESSEE_ADDR_2>
              <CC_ADDRESSEE_ADDR_3 >
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_ADD_3"/>
              </CC_ADDRESSEE_ADDR_3>
              <CC_ADDRESSEE_CTY>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_CTY"/>
              </CC_ADDRESSEE_CTY>
              <CC_ADDRESSEE_ST>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_ST"/>
              </CC_ADDRESSEE_ST>
              <CC_ADDRESSEE_ZIP>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LEASING_ZIP"/>
              </CC_ADDRESSEE_ZIP>
            </BILLING_CC_OPT>
          </xsl:if>

          <xsl:if test="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_NAME/text() != ''">
            <BILLING_CC_OPT>
              <BILL_FK>1</BILL_FK>
              <CC_BCC_IND>Y</CC_BCC_IND>
              <!--<CC_ATTN_NAME>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_NAME"/>
              </CC_ATTN_NAME>-->
              <CC_ADDRESSEE_NAME_1>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_NAME"/>
              </CC_ADDRESSEE_NAME_1>
              <CC_ADDRESSEE_ADDR_1>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_ADD_1"/>
              </CC_ADDRESSEE_ADDR_1>
              <CC_ADDRESSEE_ADDR_2 >
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_ADD_2"/>
              </CC_ADDRESSEE_ADDR_2>
              <CC_ADDRESSEE_ADDR_3 >
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_ADD_3"/>
              </CC_ADDRESSEE_ADDR_3>
              <CC_ADDRESSEE_CTY>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_CTY"/>
              </CC_ADDRESSEE_CTY>
              <CC_ADDRESSEE_ST>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_ST"/>
              </CC_ADDRESSEE_ST>
              <CC_ADDRESSEE_ZIP>
                <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/BROKER_ZIP"/>
              </CC_ADDRESSEE_ZIP>
            </BILLING_CC_OPT>
          </xsl:if>

        </xsl:when>
        <xsl:otherwise>

        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <!-- REMOVE TEMP FIELD-->
  <xsl:template match="CNC_EFF_DT_TEMP"/>

</xsl:stylesheet>



