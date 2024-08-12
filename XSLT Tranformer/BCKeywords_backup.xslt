<?xml version="1.0" encoding="utf-8"?>
<!-- This xslt is used for transforming BC XML Data with keywrods based on each letter-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
  <xsl:output method="xml" indent="yes"/>

  <xsl:variable  name="documentName"  select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LTR_NAME/text()"></xsl:variable>
  <xsl:variable  name="varLob"  select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/LINEOFBUSINESS/text()"></xsl:variable>

  <xsl:strip-space elements="*"/>

  <!-- Matching root element -->
  <xsl:template match="/">
    <!-- creating variable to store Input XML-->
    <xsl:variable name="xmldoc">
      <xsl:apply-templates select="@*|node()"/>
    </xsl:variable>

    <!-- o/p Variable store final result XML -->
    <xsl:variable name="outputXml">
      <!-- APPLY template that removes empty tags-->
      <xsl:apply-templates select="msxsl:node-set($xmldoc)/CUSTOMER_DATA" mode="removeTags"/>
    </xsl:variable>

    <!-- O/P final XML-->
    <xsl:copy-of select="$outputXml"/>
  </xsl:template>

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
 
    <!-- Keyword processing -->
    <xsl:template match="OB_KEYWORD2">
      <xsl:copy>
        <xsl:if test="$varLob = 'CA' or $varLob = 'CGL'">
          <xsl:if test="$documentName = ('DD-Remove from Direct Debit') or $documentName = ('DD-Waiting for New Funding') or $documentName = ('DD-Remove Multiple Cancel Pymts') or $documentName = ('PL Request Reissue of Check') or $documentName = ('PL BC Blank Letter Template') or $documentName = ('PL Claim Settlement') or $documentName = ('PL Direct Debit Letter') or $documentName = ('PL Return Pymts') or $documentName = ('PL Not Honored Pymt Request Replace') or $documentName = ('PL Policyholder Acct Statement') or $documentName = ('CMLC  Collection Agency') or $documentName = ('PL Partial Pymt Pending CN Stands') or $documentName = ('PL Return Pymt Letter') or $documentName = ('PL Pymt Accepted CN Stands')">
            <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
          </xsl:if>
          <xsl:if test="$documentName = ('PL Loss Payee NH Pymt CN DT Stands') or $documentName = ('PL Not Honored Pymt Orig CN DT Stnd')">
            <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
          </xsl:if>
          <xsl:if test="$documentName = 'PL Not Honored Pymt on Pending CN'">
            <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
          </xsl:if>
        </xsl:if>

        <xsl:if test="$varLob = 'PLA' or $varLob = 'HO' or $varLob = 'DW' or $varLob = 'UMB'">
          <xsl:if test="$documentName = ('DD-Remove from Direct Debit') or $documentName = ('DD-Waiting for New Funding') or $documentName = ('DD-Remove Multiple Cancel Pymts') or $documentName = ('PL Request Reissue of Check') or $documentName = ('PL BC Blank Letter Template') or $documentName = ('PL Claim Settlement') or $documentName = ('PL Direct Debit Letter') or $documentName = ('PL Return Pymts') or $documentName = ('PL Not Honored Pymt Request Replace') or $documentName = ('PL Policyholder Acct Statement') or $documentName = ('CMLC  Collection Agency') or $documentName = ('PL Partial Pymt Pending CN Stands') or $documentName = ('PL Return Pymt Letter') or $documentName = ('PL Pymt Accepted CN Stands')">
            <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
          </xsl:if>
          <xsl:if test="$documentName = ('PL Loss Payee NH Pymt CN DT Stands') or $documentName = ('PL Not Honored Pymt Orig CN DT Stnd')">
            <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
          </xsl:if>
          <xsl:if test="$documentName = 'PL Not Honored Pymt on Pending CN'">
            <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/OB_KEYWORD2"/>
          </xsl:if>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD3">
      <xsl:copy>
        <xsl:if test="$documentName = ('PL CCI Letter') or $documentName = ('PL Loss Payee NH Pymt CN DT Stands') or $documentName = ('PL Not Honored Pymt Orig CN DT Stnd') or $documentName = ('PL Pymt Accepted CN Stands')">
          <xsl:text></xsl:text>
        </xsl:if>
        <xsl:if test="$documentName = ('DD-Remove from Direct Debit') or $documentName = ('DD-Waiting for New Funding') or $documentName = ('DD-Remove Multiple Cancel Pymts') or $documentName = ('PL Request Reissue of Check') or $documentName = ('PL BC Blank Letter Template') or $documentName = ('PL Claim Settlement') or $documentName = ('PL Direct Debit Letter') or $documentName = ('PL Not Honored Pymt Request Replace') or $documentName = ('PL Policyholder Acct Statement') or $documentName = ('CMLC  Collection Agency') or $documentName = ('PL Partial Pymt Pending CN Stands') or $documentName = ('PL Return Pymts')">
          <xsl:text>OUTGOING</xsl:text>
        </xsl:if>
        <xsl:if test="$documentName = ('PL Not Honored Pymt on Pending CN')">
          <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/POL_EFF_DT,0,5)"/>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD4">
      <xsl:copy>
        <xsl:choose>
          <xsl:when test="$documentName = ('PL Return Pymt Letter')">
            <xsl:text></xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/OB_KEYWORD4"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD5">
      <xsl:copy>
        <xsl:choose>
          <xsl:when test="$documentName[1] = ('DD-Remove from Direct Debit') or $documentName[1] = ('DD-Waiting for New Funding') or $documentName[1] = ('DD-Remove Multiple Cancel Pymts')">
            <xsl:text>DIRECT DEBIT</xsl:text>
          </xsl:when>
          <xsl:when test="$documentName[1] = ('PL Request Reissue of Check')  or $documentName[1] = ('PL BC Blank Letter Template')  or $documentName[1] = ('PL Claim Settlement') or $documentName[1] = ('PL Direct Debit Letter') or $documentName[1] = ('PL Not Honored Pymt Request Replace') or $documentName[1] = ('PL Policyholder Acct Statement') or $documentName[1] = ('PL Partial Pymt Pending CN Stands') or $documentName = ('PL Return Pymts')">
            <xsl:text>CASH MANAGEMENT</xsl:text>
          </xsl:when>
          <xsl:when test="$documentName[1] = ('PL Not Honored Pymt on Pending CN')">
            <xsl:text>OUTGOING</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text></xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:copy>
    </xsl:template>


    <xsl:template match="OB_KEYWORD6">
      <xsl:copy>
        <xsl:choose>
          <xsl:when test="$varLob = ('PLA') or $varLob = ('HO') or $varLob = ('DW')  or $varLob = ('UMB')">
            <xsl:if test="$documentName = 'PL Not Honored Pymt on Pending CN'">
              <xsl:text>NOT HONORED PYMT PEND CANCEL</xsl:text>
            </xsl:if>
            <xsl:if test="$documentName = 'PL Loss Payee NH Pymt CN DT Stands'">
              <xsl:text>NOT HONORED PYMT CANCEL DT STANDS</xsl:text>
            </xsl:if>
            <xsl:if test="$documentName = 'PL Not Honored Pymt Orig CN DT Stnd'">
              <xsl:text>NOT HONORED PYMT CANCEL DT STANDS</xsl:text>
            </xsl:if>
            <xsl:if test="$documentName = 'PL Partial Pymt Pending CN Stands'">
              <xsl:text>PARTIAL PYMT PEND CANCEL STANDS</xsl:text>
            </xsl:if>
            <xsl:if test="$documentName = ('PL Pymt Accepted CN Stands') or $documentName = ('PL Return Pymt Letter')">
              <xsl:text>CANCELLATION</xsl:text>
            </xsl:if>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text></xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD7">
      <xsl:copy>
        <xsl:if test="$documentName = 'PL Not Honored Pymt on Pending CN'">
          <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Account/AccountNumber"/>
        </xsl:if>
        <xsl:if test="$documentName = 'PL Return Pymt Letter'">
          <xsl:value-of select="substring(/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/OB_KEYWORD7,0,5)"/>
        </xsl:if>
        <xsl:if test="$documentName != ('PL Return Pymt Letter') or $documentName != ('PL Not Honored Pymt on Pending CN')">
          <xsl:text></xsl:text>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD8">
      <xsl:copy>
        <xsl:if test="$documentName = ('PL Loss Payee NH Pymt CN DT Stands')">
          <xsl:text>LOSS PAYEE</xsl:text>
        </xsl:if>
        <xsl:if test="$documentName = ('PL Not Honored Pymt Orig CN DT Stnd') or $documentName =('PL Partial Pymt Pending CN Stands')">
          <xsl:text>INSURED</xsl:text>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD9">
      <xsl:copy>
        <xsl:if test="$documentName = ('PL Not Honored Pymt on Pending CN') or $documentName = ('PL Partial Pymt Pending CN Stands') or $documentName = ('PL Not Honored Pymt Orig CN DT Stnd')">
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/CNC_EFF_DT"/>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD10">
      <xsl:copy>
        <xsl:if test="$documentName = ('PL Partial Pymt Pending CN Stands')">
          <xsl:text>PARTIAL PYMT PEND CANCEL STANDS</xsl:text>
        </xsl:if>
        <xsl:if test="$documentName = ('PL Not Honored Pymt on Pending CN')">
          <xsl:text>NOT HONORED PYMT PEND CANCEL</xsl:text>
        </xsl:if>
        <xsl:if test="$documentName = ('PL Not Honored Pymt Orig CN DT Stnd')">
          <xsl:text>NOT HONORED PYMT PEND CANCEL</xsl:text>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OB_KEYWORD12">
      <xsl:copy>
        <xsl:if test="$varLob = 'CA' or $varLob = 'GL'">
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/OB_KEYWORD12"/>
        </xsl:if>
        <xsl:if test="$varLob = 'PLA' or $varLob = 'HO' or $varLob = 'DW' or $varLob = 'UMB'">
          <xsl:text></xsl:text>
        </xsl:if>
        <xsl:if test="$varLob = 'WC'">
          <xsl:text></xsl:text>
        </xsl:if>
      </xsl:copy>
    </xsl:template>

    <xsl:template match="OUTBND_DOCTYPE">
      <xsl:copy>
        <xsl:choose>
          <xsl:when test="$documentName = ('PL Not Honored Pymt on Pending CN') or $documentName = ('PL Not Honored Pymt Orig CN DT Stnd')">
            <xsl:if test="$varLob = 'CA' or $varLob = 'GL'">
              <xsl:text>CL  Non Payment Cancellation and Reinstatement</xsl:text>
            </xsl:if>
            <xsl:if test="$varLob = 'PLA' or $varLob = 'HO' or $varLob = 'DW' or $varLob = 'UMB'">
              <xsl:text>CM  Collections - Cancel Notices</xsl:text>
            </xsl:if>
          </xsl:when>

          <xsl:when test="$documentName = ('PL Partial Pymt Pending CN Stands')">
            <xsl:if test="$varLob = 'CA' or $varLob = 'GL'">
              <xsl:text>CL  Non Payment Cancellation and Reinstatement</xsl:text>
            </xsl:if>
            <xsl:if test="$varLob = 'PLA' or $varLob = 'HO' or $varLob = 'DW' or $varLob = 'UMB'">
              <xsl:text>CM  Collections - Cancel Notices</xsl:text>
            </xsl:if>
          </xsl:when>

          <xsl:otherwise>
            <xsl:if test="$varLob = 'CA' or $varLob = 'GL'">
              <xsl:text>CL  Correspondence</xsl:text>
            </xsl:if>
            <xsl:if test="$varLob = 'PLA' or $varLob = 'HO' or $varLob = 'DW' or $varLob = 'UMB'">
              <xsl:text>POLDOC  Correspondence</xsl:text>
            </xsl:if>
            <xsl:if test="$varLob = 'WC'">
              <xsl:text>WCU  Correspondence</xsl:text>
            </xsl:if>
          </xsl:otherwise>

        </xsl:choose>
      </xsl:copy>
    </xsl:template>
   
  
  <!-- do not pass TOT AMT DUE for PL POLICYHODER ACCT STMT-->
  <xsl:template match="TOT_AMT_DUE">
    <xsl:copy>
      <xsl:choose>
        <xsl:when test="$documentName = 'PL Policyholder Acct Statement'">
          <xsl:text></xsl:text>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="/CUSTOMER_DATA/RECORD_DELIM/BILLING_REC/TOT_AMT_DUE"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:copy>
  </xsl:template>

  <!--<xsl:template match="@*[string()]">
    <xsl:copy/>
  </xsl:template>-->

  <xsl:template match="text()">
    <xsl:value-of select="normalize-space(.)" />
  </xsl:template>



</xsl:stylesheet>



