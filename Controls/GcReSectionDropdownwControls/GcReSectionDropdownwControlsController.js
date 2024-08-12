app.controller('GcReSectionDropdownwControlsController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.ClaimData = JSPath.apply(".Claim", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.labelsValue = [];
        $scope.inputValue = [];
        $scope.chkReItem = [];
        $scope.ClaimantNameData = [];

        //set default options for showing the controls
        $scope.ShowLossLoc = true;
        $scope.ShowRepeater = true;
        $scope.ShowClaimant = true;
        $scope.ShowMedicare = false;
        $scope.ShowCaseID = false;
        $scope.LabelName1 = "Reference Number:"

        //override with document specific settings
        var doc = $scope.SelectedDocument.documentFriendlyName;
        switch ($scope.Category.categoryName) {
            case 'GC_BLANK_LETTER_TEMPLATES':
                $scope.chkReItem[3] = (doc == 'Blank Letter Template-Legal');
                break;
            case 'GC_BODILY_INJURY':
                $scope.ShowLossLoc = !(doc == 'Demand for Limits-Need Info' || doc == 'Demand for Limits-Need Time');
                $scope.chkReItem[0] = (doc == 'ERISA Lien-Threshold Denial Ltr');
                $scope.chkReItem[4] = (doc == 'Longworth Ltr 2-UIM Denial' || doc == 'Longworth Ltr 3-Acceptance');
                $scope.chkReItem[6] = (doc == 'Hospital Records Request Ltr' || doc == 'Medical Records Request');
                $scope.CtrlEnableRe1 = (['ERISA Lien-No Claim Presented', 'ERISA Lien-Threshold Denial Ltr', 'ERISA Proof Request Ltr',
                                         'Hospital Records Request Ltr', 'Medical Records Request', 'Threshold Denial Attorney'].indexOf(doc) > -1);
                break;
            case 'GC_ENVIRONMENTAL':
                break;
            case 'GC_FIRST_NOTICE_OF_LOSS':
                break;
            case 'GC_GENERAL':
                $scope.CtrlEnableRe0 = (doc == 'Request for Official Scene Photos' || doc == 'UMC Ltr to Clmt' ||
                                        doc == 'UMC Ltr to Insd' || doc == 'Witness Ltr')
                $scope.chkReItem[1] = (doc == 'Excess-Umbrella Carrier Notice');
                $scope.chkReItem[2] = (doc == 'Excess-Umbrella Carrier Notice');
                break;
            case 'GC_HOMEOWNERS':
                $scope.CtrlEnableRe0 = (doc == 'HO6 Broker HOA Ltr' || doc == 'HO6 Master Policy Ltr')
                break;
            case 'GC_LEGAL':
                $scope.chkReItem[0] = (doc == 'Excess Only Ltr');
                $scope.chkReItem[1] = (doc == 'Excess Only Ltr');
                $scope.chkReItem[2] = (doc == 'Excess Only Ltr');
                $scope.chkReItem[3] = !(doc == 'Cooperation Ltr 1st-Adjuster' || doc == 'Cooperation Ltr 2nd-Adjuster' ||
                                        doc == 'Cooperation Ltr-Final-Adjuster' || doc == 'Excess Only Ltr');
                $scope.chkReItem[6] = (doc == 'Demand for Arb');
                break;
            case 'GC_MEMO':
                break;
            case 'GC_PIP':
                if (doc == 'Medicare-unable to close ARB') {
                    $scope.ShowLossLoc = false;
                    $scope.ShowRepeater = false;
                    $scope.ShowClaimant = false;
                    $scope.ShowMedicare = true;
                    $scope.ShowCaseID = true;
                    $scope.LabelName1 = "CASE ID No.:"
                }
                $scope.chkReItem[0] = (doc == 'Deny Subro' || doc == 'Formal Demand Ltr');
                $scope.chkReItem[2] = (doc == 'Deny Subro' || doc == 'Formal Demand Ltr');
                $scope.chkReItem[6] = (['Appeal Response-Horizon', 'Denial-Household Insurance', 'Denial-Intentional Act',
                                        'Denial-PLIGA', 'Denial-Stranger Pedestrian', 'DPR Plan IME 2 Attorney',
                                        'DPR Plan IME 2 Clmt', 'DPR Plan IME Attorney', 'DPR Plan IME Clmt',
                                        'Kinesio Denial-Med Nec Appeal', 'Kinesio Denial-Payment Appeal'].indexOf(doc) > -1);
                $scope.CtrlEnableRe0 = (doc == 'Deny Subro');
                $scope.CtrlEnableRe1 = (['Appeal Denial EMG' ,'Appeal Invalid Appeal No Docs','Appeal Response',
                                         'Appeal Response-Horizon','Appeal Settlement Proposal Ltr','Appeal SOL Reached',
                                         'Appeal UCR Pharmacy Appeal Template','Death Letter Death Wage Exclusion',
                                         'Denial Investigation','Denial-Household Insurance','Denial-Intentional Act',
                                         'Denial-PLIGA','Denial-Stranger Pedestrian','Disability Stmt from Doctor',
                                         'DPR Plan IME 2 Attorney','DPR Plan IME 2 Clmt','DPR Plan IME Attorney',
                                         'DPR Plan IME Clmt','EMG Denial','Essential Service Cover Ltr','IME Cancellation Ltr',
                                         'Kinesio Denial-Med Nec Appeal','Kinesio Denial-Payment Appeal',
                                         'Kinesio Physician or PT Appeal','Lien Ltr','Massage Therapy By CMT Denial Ltr',
                                         'Med Pay-Denial Regular Use','Med Pay-Denial Workers Comp','Medicare',
                                         'PA Ltr of Medical Determination', 'Records Req Ltr to Provider', 'TOB Ltr', 'Concurrent Info Request', 'NY Denial Work Comp'].indexOf(doc) > -1);
                break;
            case 'GC_PROPERTY_DAMAGE':
                $scope.chkReItem[0] = (doc == 'Denial to the Company' || doc == 'Enterprise Proofs' || doc == 'Low Limits Ltr-Clmt');
                $scope.chkReItem[1] = (doc == 'Low Limits Ltr-Clmt');
                $scope.chkReItem[2] = (doc == 'Denial to the Company' || doc == 'Enterprise Proofs');
                $scope.CtrlEnableRe0 = (doc == 'Denial to the Company' || doc == 'Enterprise Proofs' || doc == 'NY Fire District Ltr');
                break;
            case 'GC_RELEASES':
                $scope.CtrlEnableRe1 = (['General BI Release', 'General PD Release-3rd Party',
                                         'Minor Release and Trust Form UM-UIM', 'UM-UIM Release and Trust BI-PD',
                                         'UM-UIM Release and Trust PD'].indexOf(doc) > -1);
                break;
            case 'GC_SALVAGE':
                break;
            case 'GC_SUBPOENA':
                $scope.chkReItem[3] = true;
                $scope.chkReItem[5] = (['Adversary Ltr', 'Bill Ltr', 'ccADJ Ltr', 'DC Resp w Rec Ltr',
                                        'DC Respond Ltr', 'Disregard Ltr', 'No Bill Ltr', 'No Claim Ltr',
                                        'Out of State Ltr', 'Prepay Bill', 'Prepay Ltr'].indexOf(doc) > -1);
                break;
            case 'GC_SUBROGATION':
                $scope.chkReItem[0] = (['1st Sub - Ltr to Carr', '1st Sub PIP - Ltr to Carr',
                                        'Addtl Payment Ltr', 'Concurrent Notice Ltr', 'Concurrent Request Ltr', 'Final Salvage', 'HO-1st Sub-Ltr to Carr',
                                        'Initial Subro Ltr', 'Ltr to Atty-RTS-Addtl Pymt',
                                        'Ltr to Atty-RTS-Counter-CrossClaim', 'Ltr to Carr-Confirm or Deny Covrage',
                                        'Ltr to Carr-Copy of their Check', 'Ltr to Carr-Proofs Ltr',
                                        'Ltr to Carr-Req for Pymt-Arb Award', 'Ltr to Carr-Rntl Pymt Only-CarrpdPD',
                                        'Ltr to Pros-Current Status', 'PD Release for Subrogation',
                                        'Subro-Addl Payments Made', 'Subro-Addl Payments Made w Pct Neg', 'Sub 1', 'Subrogation Award Pymt Ltr to Carr'].indexOf(doc) > -1);
                $scope.chkReItem[1] = (['Concurrent Notice Ltr', 'Concurrent Request Ltr'].indexOf(doc) > -1);
                $scope.chkReItem[2] = (['1st Sub - Ltr to Carr', '1st Sub PIP - Ltr to Carr',
                                        'Addtl Payment Ltr', 'Concurrent Notice Ltr', 'Concurrent Request Ltr',
                                        'Final Salvage', 'HO-1st Sub-Ltr to Carr',
                                        'Initial Subro Ltr', 'Ltr to Atty-RTS-Addtl Pymt',
                                        'Ltr to Atty-RTS-Counter-CrossClaim', 'Ltr to Carr-Confirm or Deny Covrage',
                                        'Ltr to Carr-Copy of their Check', 'Ltr to Carr-Proofs Ltr',
                                        'Ltr to Carr-Req for Pymt-Arb Award', 'Ltr to Carr-Rntl Pymt Only-CarrpdPD',
                                        'Ltr to Pros-Current Status', 'PD Release for Subrogation',
                                        'Subro-Addl Payments Made', 'Subro-Addl Payments Made w Pct Neg', 'Sub 1', 'Subrogation Award Pymt Ltr to Carr'].indexOf(doc) > -1);
                $scope.chkReItem[3] = (['Subrogation Suit Referral Ltr'].indexOf(doc) > -1);
                $scope.CtrlEnableRe0 = (['1st Sub - Ltr to Carr', '1st Sub PIP - Ltr to Carr', '1st Sub - Ltr to Tort',
                                        'Addtl Payment Ltr', 'Concurrent Notice Ltr', 'Concurrent Request Ltr', 'Final Salvage', 'HO-1st Sub-Ltr to Carr', 'HO Tort Settlement Agreement Ltr',
                                        'Initial Subro Ltr', 'Ltr to Atty-RTS-Addtl Pymt', 'HO-1st Sub-Ltr to Tort',
                                        'Ltr to Atty-RTS-Counter-CrossClaim', 'Ltr to Carr-Confirm or Deny Covrage',
                                        'Ltr to Carr-Copy of their Check', 'Ltr to Carr-Proofs Ltr',
                                        'Ltr to Carr-Req for Pymt-Arb Award', 'Ltr to Carr-Rntl Pymt Only-CarrpdPD',
                                        'Ltr to Pros-Current Status', 'Ltr to tort - non-coop w carr','Ltr to Tort- Cont Pymt Ltr',
                                        'Ltr to Tort-1st Sub-Comp','Ltr to Tort-2nd Sub','Ltr to Tort-Additional Ltr',
                                        'Ltr to Tort-Insurance Coverage','Ltr to Tort-Policy Limit','Ltr to Torts Leasing Company', 'Subrogation Award Pymt Ltr to Carr',
                                        'PD Release for Subrogation', 'Subro-Addl Payments Made', 'Subro-Addl Payments Made w Pct Neg', 'Sub 1',
                                        'Subrogation Suit Referral Ltr', 'Tort Settlement Agreement Ltr', 'Subrogation Initial Suit Ltr', 'Dram Shop Questionnaire', 'Dram Shop to Establishment', 'Subro-WC Recovery Ltr'].indexOf(doc) > -1);
                $scope.CtrlEnableRe1 = (['Concurrent Notice Ltr', 'Concurrent Request Ltr', '1st Sub PIP - Ltr to Carr', 'Sub 1', 'Subro-Addl Payments Made w Pct Neg', 'PIP Subro-NY Assignment Agreement'].indexOf(doc) > -1);

                break;
            default:
                //use the defaults
                break;
        }
        

        HomeService.LookupValue('ReItem').then(function (response) {
            $scope.ReLabels = response.data.sort(function(a,b){return a.lookupItemOrder-b.lookupItemOrder});
        }, function (error) {
            $scope.error = error;
        })

        $scope.selectedLabels = function (item,labelIndex) {
            if (item.includeValue) {
                $scope.labelsValue.push({ label_id: labelIndex, labels: item.lookupItemCode });
            } else {
                delete $scope.labelsValue[labelIndex];
                delete $scope.inputValue[labelIndex];
            }
        }

        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }
                displayData.push(item);
            });
            if (displayData.length == 1) {
                $scope.selectedName = displayData[0];
            }
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.ClaimantNameJsonData);

        };

        inintPage();

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcReSectionDropdownwControls', function (event) {
        try {
            if ($scope.CtrlEnableRe0) {
                var id = shareData.shareOutputXML.getElementsByTagName("NJM_RE_OPT").length;
                HomeService.createSecondaryTableXML("NJM_RE_OPT");
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_NAME", 'Loss Location:', id);
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_VAL", $scope.LossLocation, id);
            }

            for (var i = 0; i < $scope.chkReItem.length; i++) {
                if ($scope.chkReItem[i]) {
                    var id = shareData.shareOutputXML.getElementsByTagName("NJM_RE_OPT").length;
                    HomeService.createSecondaryTableXML("NJM_RE_OPT");
                    HomeService.createSecondaryXMLValue("NJM_RE_OPT", "CLM_FK", '1', id);
                    HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_NAME", $scope.ReLabels[i].lookupItemValue, id);

                    var val = '';
                    if ($scope.inputValue[i]) {
                        val = $scope.inputValue[i].trim();
                    }
                    HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_VAL", val, id);
                }
            }

            if ($scope.CtrlEnableRe1 && $scope.selectedName) {
                var id = shareData.shareOutputXML.getElementsByTagName("NJM_RE_OPT").length;
                HomeService.createSecondaryTableXML("NJM_RE_OPT");
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_NAME", 'Claimant:', id);
                HomeService.createSecondaryXMLValue("NJM_RE_OPT", "RE_OPT_VAL", $scope.selectedName.displayName.replace('  ', ' '), id);
            }

            if ($scope.CtrlEnableRe2) {
                HomeService.createPrimaryXML("MEDICARE_NO", $scope.txtRe2);
            }
            if ($scope.CtrlEnableRe3) {
                HomeService.createPrimaryXML("CASE_NO", $scope.txtRe3);
            }


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

