<?xml version="1.0" encoding="utf-8"?>
<!--This xslt is used for transforming BC XML Hidden Data-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:esb="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService" xmlns:tns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:types="http://njm.com/esb/wcu/bc/bds/1.0/types" xmlns:msxsl="urn:schemas-microsoft-com:xslt"  xmlns:js="http://www.url.com" exclude-result-prefixes="msxsl js" extension-element-prefixes="esb tns types">

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

  <!-- Line of business variable -->
  <xsl:variable name="varLOB" select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName"></xsl:variable>

  <!-- Line of business variable for producer statement -->
  <xsl:variable name="varProducerLOB" select="CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/Policy/LOBCode/DisplayName"></xsl:variable>

  <!-- Policy number length -->
  <xsl:variable name="varPolLength" select="string-length(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber)"></xsl:variable>

  <!-- Producer number length -->
  <xsl:variable name="varProducerLength" select="string-length(CorrespondenceDataResponse/ProducerStatments/Producer/ProducerCodes/Entry/Code)"></xsl:variable>

  <xsl:template match="/">


    <!-- check for account invoice data -->
    <xsl:if test="$varProducerLength = 0">
      <xsl:copy>
        <CUSTOMER_DATA>
          <RECORD_DELIM>
            <BILLING_REC>
              <xsl:element name="BILL_PK">1</xsl:element>
              <xsl:element name="SRC_SYS">ADHOC</xsl:element>

              <xsl:element name="OUTBND_DOCTYPE">

                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName) = 'WC'">
                  <xsl:text>WCU  Correspondence</xsl:text>
                </xsl:if>

              </xsl:element>

              <!-- current DATE -->
              <!--<xsl:value-of select="js:getCurrentDate()"/>-->
              <!--<xsl:element name="CURR_DT">
                <xsl:value-of select="js:getCurrentDate()"/>
              </xsl:element>-->

              <xsl:element name="POL_NO">
                <xsl:if test="$varLOB = ('WC')">
                  <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber"/>
                </xsl:if>
              </xsl:element>

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
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PrimaryInsured[Roles/Entry/Role/Code/text()='Additional Insured']/DisplayName"/>
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

              <!-- UPDATE FOR SP 1483-->
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

              <xsl:element name="BUREAU_NO">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/BureauFileNumber_Ext"/>
              </xsl:element>

              <!-- REMOVE Check  Digit from Keyword 1 for POLICY Number-->
              <xsl:element name="OB_KEYWORD1">
                <xsl:if test="$varLOB = ('WC')">
                  <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyNumber,1,($varPolLength - 1))"/>
                </xsl:if>
              </xsl:element>

              <xsl:element name="OB_KEYWORD2">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Account/AccountNumber"/>
              </xsl:element>

              <xsl:element name="OB_KEYWORD3">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/PolicyPerEffDate,0,5)"/>
              </xsl:element>

              <xsl:element name="OB_KEYWORD4">
                <xsl:text></xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD5">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD6">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD7">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Cancellation/ModificationDate,0,11)"/>
              </xsl:element>

              <xsl:element name="OB_KEYWORD8">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD9">
                <xsl:text>                      
              </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD10">
                <xsl:text></xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD11">
                <xsl:text>ADHOC</xsl:text>
              </xsl:element>

              <!--<xsl:element name="OB_KEYWORD12">
              <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Account/AccountNumber"/>
            </xsl:element>-->

              <xsl:element name="BARCODE_IND">
                <xsl:text>N</xsl:text>
              </xsl:element>

              <xsl:element name="CERT_IND">
                <xsl:text>N</xsl:text>
              </xsl:element>

              <xsl:element name="GUNTHER_IND">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="CANCEL_MAIL_DT">
                <xsl:value-of select="substring(CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/IntentToCancelMailDate_Ext,0,11)"/>
              </xsl:element>

              <xsl:element name="PMNT_AMT">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/NotHonoredPaymentAmount_Ext"/>
              </xsl:element>

              <xsl:element name="NOT_HONORED_PYMT_AMT">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/NotHonoredPaymentAmount_Ext"/>
              </xsl:element>

              <xsl:element name="POL_ST">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/RiskState/Code"/>
              </xsl:element>

              <xsl:element name="LEASING_CO_NAME">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFName_Ext"/>
              </xsl:element>

              <xsl:element name="LEASING_ADD_1">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/AddressLine1"/>
              </xsl:element>

              <xsl:element name="LEASING_ADD_2">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/AddressLine2"/>
              </xsl:element>

              <xsl:element name="LEASING_ADD_3">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/AddressLine3"/>
              </xsl:element>

              <xsl:element name="LEASING_CTY">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/City"/>
              </xsl:element>

              <xsl:element name="LEASING_ST">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/State/Code"/>
              </xsl:element>

              <xsl:element name="LEASING_ZIP">
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoice/PolicyPeriodForThisInvoice/LCFAddress_Ext/PostalCode"/>
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

              <BROKER_NAME>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Name"/>
              </BROKER_NAME>

              <BROKER_ADD_1>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Address_Ext/AddressLine1"/>
              </BROKER_ADD_1>

              <BROKER_ADD_2>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Address_Ext/AddressLine2"/>
              </BROKER_ADD_2>

              <BROKER_CTY>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Address_Ext/City"/>
              </BROKER_CTY>

              <BROKER_ST>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Address_Ext/State/Code"/>
              </BROKER_ST>

              <BROKER_ZIP>
                <xsl:value-of select="CorrespondenceDataResponse/AccountInvoices/PolicyPeriodForThisInvoice/Policy/ProducerCodeOfService_Ext/Producer/Address_Ext/PostalCode"/>
              </BROKER_ZIP>

              <PRODUCT_TYPE>
                <xsl:if test="(CorrespondenceDataResponse/AccountInvoices[1]/PolicyPeriodForThisInvoice/Policy/LOBCode/DisplayName/text()) = 'WC'">
                  <xsl:text>Workers Compensation</xsl:text>
                </xsl:if>
              </PRODUCT_TYPE>
            
            <!-- PV11490: 2020 Release 2 - SP1483 -->
              <!-- HP28197  FORMAT NUMBER FIX-->
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
            
            <BILLING_CC_OPT/>             
            
            <!-- Code MOved to Homecontroller.cs -->
            <!-- Foreach Loop only used for Accouting statements to pass transaction data -->
            <!--<xsl:for-each select="CorrespondenceDataResponse/AccountInvoices/InvoiceLineItemsFrom360/Entry[*]">
              <xsl:element name="TRANS_DATE_REC">
                <xsl:element name="TRANS_DATE">
                  <xsl:value-of select="substring(TransactionDate,0,11)"/>
                </xsl:element>
                <xsl:element name="TRANS">
                  --><!--<xsl:value-of select="Description"/>--><!--
                  <xsl:variable name="varDesc" select="Description"></xsl:variable>
                  --><!-- call javascript function to transform description --><!--
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
            <xsl:for-each select="CorrespondenceDataResponse/InvoiceLineItemsFrom360ForThePolicy/Entry[*]">
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
    </xsl:if>

    <!-- PRODUCER DATA LOGIC -->
    <xsl:if test="$varProducerLength != 0">
      <xsl:copy>
        <CUSTOMER_DATA>
          <RECORD_DELIM>
            <BILLING_REC>
              <xsl:element name="BILL_PK">1</xsl:element>
              <xsl:element name="SRC_SYS">ADHOC</xsl:element>

              <xsl:element name="OUTBND_DOCTYPE">

                <xsl:if test="(CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/Policy/LOBCode/DisplayName) = 'WC'">
                  <xsl:text>WCU  Correspondence</xsl:text>
                </xsl:if>

              </xsl:element>

              <!-- current DATE -->
              <!--<xsl:value-of select="js:getCurrentDate()"/>-->
              <!--<xsl:element name="CURR_DT">
                <xsl:value-of select="js:getCurrentDate()"/>
              </xsl:element>-->

              <xsl:element name="PRODUCER_CODE">
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/ProducerCodes/Entry/Code"/>
              </xsl:element>

              <BROKER_NAME>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Name"/>
              </BROKER_NAME>

              <BROKER_ADD_1>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/AddressLine1"/>
              </BROKER_ADD_1>

              <BROKER_ADD_2>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/AddressLine2"/>
              </BROKER_ADD_2>

              <BROKER_CTY>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/City"/>
              </BROKER_CTY>

              <BROKER_ST>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/State/Code"/>
              </BROKER_ST>

              <BROKER_ZIP>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/PostalCode"/>
              </BROKER_ZIP>

              <POL_ST>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Address_Ext/State/Code"/>
              </POL_ST>

              <BR_NJM_POL_NO>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/PolicyNumber"/>
              </BR_NJM_POL_NO>

              <BR_NJM_POLHOLD_NAME_1>
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/PrimaryInsured/DisplayName"/>
              </BR_NJM_POLHOLD_NAME_1>

              <xsl:element name="POL_EFF_DT">
                <xsl:value-of select="substring(CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/PolicyPerEffDate,0,11)"/>
              </xsl:element>

              <xsl:element name="POL_EXP_DT">
                <xsl:value-of select="substring(CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/PolicyPerExpirDate,0,11)"/>
              </xsl:element>

              <xsl:element name="POL_EFF_YR">
                <xsl:value-of select="substring(CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry/RelatedPolicyPeriod/PolicyPerEffDate,0,5)"/>
              </xsl:element>

              <xsl:element name="INS_POL_HLD_NAME_1">
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/Name"/>
              </xsl:element>

              <xsl:element name="TOT_AMT_DUE">
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/TotalAmountDue"/>
              </xsl:element>

              <!-- REMOVE Check  Digit from Keyword 1 for POLICY Number-->
              <xsl:element name="OB_KEYWORD1">

              </xsl:element>

              <xsl:element name="OB_KEYWORD2">

              </xsl:element>

              <xsl:element name="OB_KEYWORD3">

              </xsl:element>

              <xsl:element name="OB_KEYWORD4">
                <xsl:text></xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD5">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD6">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD7">

              </xsl:element>

              <xsl:element name="OB_KEYWORD8">
                <xsl:text> </xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD9">
                <xsl:value-of select="CorrespondenceDataResponse/ProducerStatments/Producer/ProducerCodes/Entry/Code"/>
              </xsl:element>

              <xsl:element name="OB_KEYWORD10">
                <xsl:text>WORKERS COMP</xsl:text>
              </xsl:element>

              <xsl:element name="OB_KEYWORD11">
                <xsl:text>ADHOC</xsl:text>
              </xsl:element>

              <xsl:element name="BARCODE_IND">
                <xsl:text>N</xsl:text>
              </xsl:element>

              <xsl:element name="CERT_IND">
                <xsl:text>N</xsl:text>
              </xsl:element>

              <xsl:element name="GUNTHER_IND">
                <xsl:text> </xsl:text>
              </xsl:element>
            </BILLING_REC>
            
            <!--<BILLING_CC_OPT>             
            </BILLING_CC_OPT>-->

            <!-- Foreach Loop only used for Accouting statements to pass transaction data -->
            <xsl:for-each select="CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry[*]">
              <xsl:element name="TRANS_DATE_REC">
                <xsl:element name="TRANS_DATE">
                  <xsl:value-of select="substring(EventDate,0,11)"/>
                </xsl:element>
                <xsl:element name="TRANS">
                  <!--<xsl:value-of select="Description"/>-->
                  <xsl:variable name="varDesc" select="TransactionName"></xsl:variable>
                  <!-- call javascript function to transform description -->
                  <xsl:value-of select="js:TransformDescription(string($varDesc))"/>
                </xsl:element>
                <xsl:element name="CHARGE_AMT">
                  <xsl:value-of select="CommissionEarned"/>
                </xsl:element>
                <xsl:element name="CREDIT_AMT">
                  <xsl:value-of select="CommissionUnearned"/>
                </xsl:element>
                <xsl:element name="BAL_AMT">
                  <xsl:value-of select="BalanceAmount"/>
                </xsl:element>
                <xsl:element name="POL_YR">
                  <xsl:value-of select="PolicyYear"/>
                </xsl:element>
                <xsl:element name="BR_NJM_POL_NO">
                  <xsl:value-of select="RelatedPolicyPeriod/PolicyNumber"/>
                </xsl:element>
                <xsl:element name="BR_NJM_POLHOLD_NAME_1">
                  <xsl:value-of select="RelatedPolicyPeriod/Contacts/Entry/DisplayName"/>
                </xsl:element>
              </xsl:element>
            </xsl:for-each>

            <!-- PV11490: 2020 Release 2 - SP1483 -->
            <!-- This for each loop for Manual Invoice transactions only -->
            <xsl:for-each select="CorrespondenceDataResponse/ProducerStatments/ProducerActivity/Entry[*]">
              <xsl:element name="InvoiceTransactions">
                <xsl:element name="InvoiceTransactionDate">
                  <xsl:value-of select="substring(TransactionEffectiveDate,0,11)"/>
                </xsl:element>
                <xsl:element name="InvoiceTransactionDescription">
                  <xsl:value-of select="Description"/>
                </xsl:element>
                <xsl:element name="InvoicePayments">
                  <xsl:if test="Description = 'Payment Reversal'">
                    <xsl:value-of select="DueAmount/Amount"/>
                  </xsl:if>
                  <xsl:if test="Description ='Payment Reversal'">
                    <xsl:value-of select="PaidAmount/Amount"/>
                  </xsl:if>
                </xsl:element>
                <xsl:element name="InvoicePolicyYear">
                  <xsl:value-of select="PolicyYear"/>
                </xsl:element>
                <xsl:element name="InvoiceCharge">
                  <xsl:value-of select="DueAmount"/>
                </xsl:element>
                <xsl:element name="InvoiceCredit">
                  <xsl:value-of select="PaidAmount"/>
                </xsl:element>
                <xsl:element name="InvoiceAmountDue">
                  <xsl:value-of select="InvoiceItemAmtDue"/>
                </xsl:element>
              </xsl:element>
            </xsl:for-each>

          </RECORD_DELIM>
        </CUSTOMER_DATA>

      </xsl:copy>
    </xsl:if>

  </xsl:template>

  <xsl:template match="CorrespondenceDataResponse/AccountInvoices">
    <xsl:value-of select="AmountDue"/>
  </xsl:template>


  <xsl:template match="CorrespondenceDataResponse/ProducerStatments">
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
