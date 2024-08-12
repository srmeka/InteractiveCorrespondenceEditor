<?xml version="1.0" encoding="utf-8"?>
<!--This xslt is used for transforming BC XML Hidden Data-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:esb="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService" xmlns:tns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:types="http://njm.com/esb/wcu/bc/bds/1.0/types" xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js" extension-element-prefixes="esb types tns">
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

    //Function for returning transformed description text
    function TransformDescription(desc)
    {

    var data = "";
    var Untransform_data = desc;

    if (Untransform_data != "")
    {
    //remove any digit and # sign from data
    data = Untransform_data.replace(/#/, '');

    if (data.indexOf("reversal") != -1 || data.indexOf("Reversal") != -1)
    {
    data = data.replace(/reversal/,"Returned");
    }
    else if (data.indexOf("Disbursement") != -1 || data.indexOf("disbursement") != -1)
    {
        //HP26248 - SP144
        if (data.indexOf("[NJM]") != -1)
        {
          data = data.replace(/Disbursement/,"Transferred");
          data = data.replace(/\[.*?\]/g, "");
        }        
    }
    else if (data.indexOf("reversal") != -1 || data.indexOf("Reversal") != -1)
    {
    data = data.replace(/reversal/,"Returned");
    }
    else
    {
        data = data.replace(/\[.*?\]/g, "Thank You");
    }
    }

    return data;
    }
  </msxsl:script>-->

  <xsl:output method="xml" indent="yes"/>
  <xsl:param name="desc"></xsl:param>

  <xsl:strip-space elements="*"/>

  <!-- Line of business variable -->
  <xsl:variable name="varLOB" select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName"></xsl:variable>
  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber)"></xsl:variable>

  <xsl:template match="/">
    <xsl:copy>
      <CUSTOMER_DATA>
        <RECORD_DELIM>
          <BILLING_REC>
            <xsl:element name="BILL_PK">1</xsl:element>
            <xsl:element name="SRC_SYS">ADHOC</xsl:element>

            <xsl:element name="OUTBND_DOCTYPE">
              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'PA'">
                <xsl:text>POLDOC  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'HO'">
                <xsl:text>POLDOC  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'PUP'">
                <xsl:text>POLDOC  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CA'">
                <xsl:text>CL  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CGL'">
                <xsl:text>CL  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'BOP'">
                <xsl:text>CL  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CUMB'">
                <xsl:text>CL  Correspondence</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'WC'">
                <xsl:text>WCU  Correspondence</xsl:text>
              </xsl:if>

            </xsl:element>

            <!-- current DATE -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>-->
            <!--
            <xsl:element name="CURR_DT">
              -->
            <!--<xsl:value-of select="js:getCurrentDate()"/>-->
            <!--
              <xsl:text>JULY 23, 2000</xsl:text>
            </xsl:element>-->

            <xsl:element name="POL_NO">
              <!-- <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber"/> -->

              <!-- FOR PL Policies we are passing Policy Number with hyphen added and then check Digit for Print document-->
              <xsl:if test="$varLOB = ('PA') or $varLOB = ('HO') or $varLOB = ('PUP')">
                <xsl:value-of select="concat(substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,1,($varPolLength - 1)), '-',substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,($varPolLength),1))"/>
              </xsl:if>

              <!-- FOR CL Policies we are sending policy number as is no formatting required -->
              <!-- Updated for BOP AND CUMB -->
              <xsl:if test="$varLOB = ('CA') or $varLOB = ('CGL') or $varLOB = ('BOP') or $varLOB = ('CUMB')">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber"/>
              </xsl:if>

              <xsl:if test="$varLOB = ('WC')">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber"/>
              </xsl:if>

            </xsl:element>

            <!--<PolicyNumPrefixDisplay>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyProductCd"/>
            </PolicyNumPrefixDisplay>-->

            <REAS_CODE_DESC>
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/NotHonoredPaymentReason_Ext/DisplayName"/>
            </REAS_CODE_DESC>

            <!-- update for SP 1483 -->
            <!--<xsl:apply-templates select="@* | node()"/>-->
            <xsl:element name="AMT">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/AmountDue"/>
            </xsl:element>

            <TEMP_AMT>
              <xsl:choose>
                <xsl:when test="CorrespondenceDataResponse/PolicyInstAmtDue">
                  <xsl:value-of select="CorrespondenceDataResponse/PolicyInstAmtDue"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text>0</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </TEMP_AMT>

            <xsl:element name="INV_DT">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/IntentToCancelMailDate_Ext,0,11)"/>
            </xsl:element>

            <xsl:element name="CNC_EFF_DT">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Cancellation/ModificationDate,0,11)"/>
            </xsl:element>

            <!-- TEMP FIELDTO PASS SCHEDULED DATE -->
            <xsl:element name="CNC_EFF_DT_TEMP">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/ScheduledCancellationDate_Ext,0,11)"/>
            </xsl:element>


            <xsl:element name="POL_EFF_DT">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyPerEffDate,0,11)"/>
            </xsl:element>

            <xsl:element name="POL_EXP_DT">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyPerExpirDate,0,11)"/>
            </xsl:element>

            <xsl:element name="POL_EFF_YR">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyPerEffDate,0,5)"/>
            </xsl:element>

            <xsl:element name="EARNED_PREM_AMT">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/EPAgreementPaymentAmount"/>
            </xsl:element>

            <xsl:element name="PAST_DUE_AMT">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/DueAmount"/>
            </xsl:element>

            <!-- update for SP 1483 -->
            <TEMP_PAST_DUE_AMT>
              <xsl:choose>
                <xsl:when test="CorrespondenceDataResponse/PolicyPastDueAmt">
                  <xsl:value-of select="CorrespondenceDataResponse/PolicyPastDueAmt"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text>0</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </TEMP_PAST_DUE_AMT>

            <xsl:element name="INS_POL_HLD_NAME_1">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured[Roles/Entry/Role/Code/text()='primaryinsured']/DisplayName"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_NAME_2">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Contacts/Entry[Roles/Entry/Role/Code/text()='SecondaryContact_Ext']/DisplayName"/>
            </xsl:element>

            <!-- update for SP 1483 -->
            <xsl:element name="TOT_AMT_DUE">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/TotalDueForPolicyPeriod"/>
            </xsl:element>

            <TOT_AMT_DUE_TEMP>
              <xsl:choose>
                <xsl:when test="CorrespondenceDataResponse/PolicyTotBalDue">
                  <xsl:value-of select="CorrespondenceDataResponse/PolicyTotBalDue"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text>0</xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </TOT_AMT_DUE_TEMP>

            <!-- update for SP 1483 -->
            <CUR_INSTALL_AMT>
              <xsl:choose>
                <xsl:when test="CorrespondenceDataResponse/PolicyInstAmtDue">
                  <xsl:value-of select="CorrespondenceDataResponse/PolicyInstAmtDue"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:text></xsl:text>
                </xsl:otherwise>
              </xsl:choose>
            </CUR_INSTALL_AMT>

            <!-- REMOVE Check  Digit from Keyword 1 for POLICY Number-->
            <xsl:element name="OB_KEYWORD1">

              <xsl:if test="$varLOB = ('PA') or $varLOB = ('HO') or $varLOB = ('PUP')">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if>

              <!-- Updated for BOP AND CUMB -->
              <xsl:if test="$varLOB = ('CA') or $varLOB = ('CGL') or $varLOB = ('BOP') or $varLOB = ('CUMB')">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if>

              <xsl:if test="$varLOB = ('WC')">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,1,($varPolLength - 1))"/>
              </xsl:if>

            </xsl:element>

            <xsl:element name="OB_KEYWORD2">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Account/AccountNumber"/>
            </xsl:element>

            <xsl:element name="OB_KEYWORD3">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD4">

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'WC'">
                <xsl:text>WORKERS COMP</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'PA'">
                <xsl:text>AUTO</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'HO'">
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code/text()) = 'Homeowners'">
                  <xsl:text>HOME</xsl:text>
                </xsl:if>
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code/text()) = 'Dwelling'">
                  <xsl:text>DWELLING</xsl:text>
                </xsl:if>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'PUP'">
                <xsl:text>UMBRELLA</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CA'">
                <xsl:text>COMMERCIAL AUTO</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CGL'">
                <xsl:text>GENERAL LIABILITY</xsl:text>
              </xsl:if>

              <!-- Added for BOP AND CUMB -->
              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'BOP'">
                <xsl:text>BUSINESS OWNERS</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CUMB'">
                <xsl:text>COMMERCIAL UMBRELLA</xsl:text>
              </xsl:if>
            </xsl:element>

            <xsl:element name="OB_KEYWORD5">
              <xsl:text> </xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD6">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD7">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/IntentToCancelMailDate_Ext"/>
            </xsl:element>

            <xsl:element name="OB_KEYWORD8">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD9">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD10">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD11">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="OB_KEYWORD12">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Account/AccountNumber"/>
            </xsl:element>

            <xsl:element name="BARCODE_IND">
              <xsl:text>N</xsl:text>
            </xsl:element>

            <xsl:element name="CERT_IND">
              <xsl:text>N</xsl:text>
            </xsl:element>

            <xsl:element name="GUNTHER_IND">
              <xsl:text></xsl:text>
            </xsl:element>

            <xsl:element name="CANCEL_MAIL_DT">
              <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/IntentToCancelMailDate_Ext,0,11)"/>
            </xsl:element>

            <xsl:element name="PMNT_AMT">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/LastPaymentAmountPosted"/>
            </xsl:element>

            <xsl:element name="NOT_HONORED_PYMT_AMT">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/NotHonoredPaymentAmount_Ext"/>
            </xsl:element>

            <xsl:element name="POL_ST">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/RiskState"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_ADD_1">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/AddressLine1"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_ADD_2">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/AddressLine2"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_ADD_3">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/AddressLine3"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_CTY">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/City"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_ST">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/State/Code"/>
            </xsl:element>

            <xsl:element name="INS_POL_HLD_ZIP">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured/Contact/PrimaryAddress/PostalCode"/>
            </xsl:element>

            <FULL_ANNUAL_PREM>

            </FULL_ANNUAL_PREM>

            <LINEOFBUSINESS>
              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'WC'">
                <xsl:text>WC</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'PA'">
                <xsl:text>PLA</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'HO'">
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code) = 'Homeowners'">
                  <xsl:text>HO</xsl:text>
                </xsl:if>
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code) = 'Dwelling'">
                  <xsl:text>DW</xsl:text>
                </xsl:if>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'PUP'">
                <xsl:text>UMB</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CA'">
                <xsl:text>CA</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CGL'">
                <xsl:text>GL</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'BOP'">
                <xsl:text>BOP</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'CUMB'">
                <xsl:text>CUMB</xsl:text>
              </xsl:if>

            </LINEOFBUSINESS>

            <PRODUCT_TYPE>
              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'WC'">
                <xsl:text>WORKERS COMP</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'PA'">
                <xsl:text>Personal Auto</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'HO'">
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code/text()) = 'Homeowners'">
                  <xsl:text>Homeowners</xsl:text>
                </xsl:if>
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/HOPolicyType_Ext/Code/text()) = 'Dwelling'">
                  <xsl:text>Dwelling</xsl:text>
                </xsl:if>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'PUP'">
                <xsl:text>Umbrella</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CA'">
                <xsl:text>Commercial Auto</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CGL'">
                <xsl:text>General Liability</xsl:text>
              </xsl:if>

              <!-- add for BOP AND CUMB letters-->
              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'BOP'">
                <xsl:text>Business Owners</xsl:text>
              </xsl:if>

              <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'CUMB'">
                <xsl:text>Commercial Umbrella</xsl:text>
              </xsl:if>
            </PRODUCT_TYPE>

            <ProductCode>
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/ProductOfferingCode_Ext"/>
            </ProductCode>

            <IndustryCode>
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/NJMIndustryOfferingCode_Ext"/>
            </IndustryCode>

            <PolicyNumPrefixDisplay>
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyProductCode_Ext"/>
            </PolicyNumPrefixDisplay>
            
            <!-- PV11490: 2020 Release 2 - SP1483 -->
            <!-- HP28197 fix for formatting 0 amount -->
            <RemainingInstallmentTotalBalance>
              <xsl:if test="CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/TotalDueForPolicyPeriod != ''">
                <xsl:value-of select='format-number(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/TotalDueForPolicyPeriod,"0.00")'/>
              </xsl:if>
            </RemainingInstallmentTotalBalance>
            
          </BILLING_REC>

          <!-- PV11490: 2020 Release 2 - SP1483 -->
          <!-- This for each loop for 1ST Manual PlannedInvoices Invoice transactions only -->
          <xsl:for-each select="CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/PlannedInvoices/Entry[*]">
            <RemainingInstallments>
              <RemainingInstallmentAmountDue>
                <xsl:value-of select="AmountDue"/>
              </RemainingInstallmentAmountDue>
              <RemainingInstallmentDueDate>
                <xsl:value-of select="substring(PaymentDueDate,0,11)"/>
              </RemainingInstallmentDueDate>
            </RemainingInstallments>
          </xsl:for-each>

          <!-- This code is now moved to Homecontroller.js -->
          <!-- Foreach Loop only used for Accouting statements to pass transaction data -->
          <!--<xsl:for-each select="CorrespondenceDataResponse/AccountInvoices/InvoiceLineItemsFrom360/Entry[*]">
            <xsl:element name="TRANS_DATE_REC">
              <xsl:element name="TRANS_DATE">
                <xsl:value-of select="substring(TransactionDate,0,11)"/>
              </xsl:element>

              <xsl:element name="TRANS">

                <xsl:value-of select="Description"/>
                
                  <xsl:variable name="varDesc" select="Description"></xsl:variable>             
                   call javascript function to transform description                
                  <xsl:value-of select="js:TransformDescription(string($varDesc))"/> 
                
              </xsl:element>

              <xsl:element name="CHARGE_AMT">
                <xsl:value-of select="DueAmount"/>
              </xsl:element>
              <xsl:element name="CREDIT_AMT">
                <xsl:value-of select="PaidAmount"/>
              </xsl:element>
              <xsl:element name="BAL_AMT">
                <xsl:value-of select="InvoiceItemAmtDue"/>
              </xsl:element>
              <xsl:element name="POL_YR">
                <xsl:value-of select="PolicyYear"/>
              </xsl:element>
              <xsl:element name="BR_NJM_POL_NO">
                <xsl:value-of select="PolicyYear"/>
              </xsl:element>
              <xsl:element name="BR_NJM_POLHOLD_NAME_1">
                <xsl:value-of select="PrimaryInsured/DisplayName"/>
              </xsl:element>
            </xsl:element>
          </xsl:for-each>-->

          <!-- PV11490: 2020 Release 2 - SP1483 -->
          <!-- This for each loop for Manual Invoice transactions only -->
          <!-- HP28107 change of mappng -->
          <xsl:for-each select="CorrespondenceDataResponse/AccountInvoices/InvoiceLineItemsFrom360ForThePolicy/Entry[*]">
            <xsl:element name="InvoiceTransactions">
              <xsl:element name="InvoiceTransactionDate">
                <xsl:value-of select="substring(TransactionDate,0,11)"/>
              </xsl:element>
              <xsl:element name="InvoiceTransactionDescription">
                <xsl:value-of select="Description"/>
              </xsl:element>
              <xsl:element name="InvoicePayments">
                <xsl:if test="Description = 'Payment Returned'">
                  <xsl:if test="DueAmount != ''">
                    <xsl:value-of select='format-number(DueAmount, "#.00")' />
                  </xsl:if>

                </xsl:if>
                <xsl:if test="Description !='Payment Returned'">
                  <xsl:if test="PaidAmount != ''">
                    <xsl:value-of select='format-number(PaidAmount, "#.00")' />
                  </xsl:if>
                </xsl:if>
              </xsl:element>
              <xsl:element name="InvoicePolicyYear">
                <xsl:value-of select="PolicyYear"/>
              </xsl:element>
              <xsl:element name="InvoiceCharge">
                <xsl:if test="DueAmount != ''">
                  <xsl:value-of select='format-number(DueAmount, "#.00")' />
                </xsl:if>
              </xsl:element>
              <xsl:element name="InvoiceCredit">
                <xsl:if test="PaidAmount != ''">
                  <xsl:value-of select='format-number(PaidAmount, "#.00")' />
                </xsl:if>
              </xsl:element>
              <xsl:element name="InvoiceAmountDue">
                <xsl:if test="InvoiceItemAmtDue !=''">
                  <xsl:value-of select='format-number(InvoiceItemAmtDue, "#.00")' />
                </xsl:if>
              </xsl:element>
            </xsl:element>
          </xsl:for-each>
        </RECORD_DELIM>
      </CUSTOMER_DATA>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="CorrespondenceDataResponse/AccountInvoices">
    <xsl:value-of select="AmountDue"/>
  </xsl:template>

  <!-- Replace Function -->
  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text"
         select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
