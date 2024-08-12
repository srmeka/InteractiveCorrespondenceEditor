app.controller('WccReSectionDropdownwControlsController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.ClaimData = JSPath.apply(".Claim.ClaimPolicy.PolicyNumber", shareData.shareJSONClaim.CorrespondenceDataResponse);
       
        //initialize all values
        $scope.PolicyNum = "";
        $scope.txtMPCapplicant = "";
        $scope.txtClaimPetNum = "";
        $scope.txtStateNum = "";
        $scope.txtDocketNum = "";
        $scope.txtListDate = "";
        $scope.txtNYWCBnum = "";
        $scope.txtRefNum = "";
        $scope.txtCMSCaseCtrl = "";

        //default value to show each row
        $scope.ShowPolicyNum = true;
        $scope.ShowMPCapplicant = false;
        $scope.ShowClaimPetNum = false;
        $scope.ShowStateNum = true;
        $scope.ShowDocketNum = true;
        $scope.ShowListDate = true;
        $scope.ShowNYWCBnum = true;
        $scope.ShowRefNum = true;
        $scope.ShowCMSCaseCtrl = false;

        //default value for the checkboxes
        $scope.CtrlEnableRe1 = false;
        $scope.CtrlEnableRe2 = false;
        $scope.CtrlEnableRe3 = false;
        $scope.CtrlEnableRe4 = false;
        $scope.CtrlEnableRe5 = false;
        $scope.CtrlEnableRe6 = false;
        $scope.CtrlEnableRe7 = false;
        $scope.CtrlEnableRe8 = false;
        $scope.CtrlEnableRe9 = false;

        $scope.HideCtrlEnableRe5 = false;
        $scope.HideCtrlEnableRe7 = false;

        // adjust for the exceptions to the above defaults
        switch ($scope.Category.categoryName) {
            case 'WCC_ADJUSTER':
                $scope.ShowClaimPetNum = ($scope.SelectedDocument.documentFriendlyName == 'Machine Information Request' || $scope.SelectedDocument.documentFriendlyName == 'Temp Overpayment');
                break;
            case 'WCC_AWARDS_PROCESSING':
                break;
            case 'WCC_DEPENDENCY':
                break;
            case 'WCC_FIRST_NOTICE_OF_LOSS':
                break;
            case 'WCC_FOLLOW_UP':
                break;
            case 'WCC_LEGAL':
                if ($scope.SelectedDocument.documentFriendlyName == 'CMS Denial') {
                    $scope.ShowCMSCaseCtrl = true;
                    $scope.CtrlEnableRe9 = true;
                    $scope.ShowPolicyNum = false;
                    $scope.ShowStateNum = false;
                    $scope.ShowDocketNum = false;
                    $scope.ShowListDate = false;
                    $scope.ShowNYWCBnum = false;
                    $scope.ShowRefNum = false;
                }
                else if ($scope.SelectedDocument.documentFriendlyName == 'Motion to Compel Ans Special Rogs') {
                    $scope.ShowMPCapplicant = true;
                    $scope.CtrlEnableRe2 = true;
                }
                else if ($scope.SelectedDocument.documentFriendlyName == 'Non-EPLI Cost Share Ltr') {
                    $scope.ShowDocketNum = true;
                    $scope.CtrlEnableRe5 = true;
                    $scope.HideCtrlEnableRe5 = true;
                }
            break;
            case 'WCC_MEDICAL_UTILIZATION':
                break;
            case 'WCC_NY_FORMS':
                break;
            case 'WCC_OUT_OF_STATE':
                if ($scope.SelectedDocument.documentFriendlyName == 'NY Hearing Notice' || $scope.SelectedDocument.documentFriendlyName == 'NY Procedure Auth'){
                    $scope.CtrlEnableRe7 = true;
                    $scope.HideCtrlEnableRe7 = true;
                }
                break;
            case 'WCC_PA_FORMS':
                break;
            case 'WCC_SUBROGATION':
                break;
            default:
                //use the defaults
                break;
        }

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccReSectionDropdownwControls', function (event) {
        try {
            
            if ($scope.ShowPolicyNum && $scope.CtrlEnableRe1) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'Policy Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.PolicyNum, id);
            }

            if ($scope.ShowMPCapplicant && $scope.CtrlEnableRe2) {
                HomeService.createPrimaryXML("MPC_APPLICANT", $scope.txtMPCapplicant);
            }

            if ($scope.ShowClaimPetNum && $scope.CtrlEnableRe3) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'Claim Petition Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtClaimPetNum, id);
            }

            if ($scope.ShowStateNum && $scope.CtrlEnableRe4) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'State ID Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtStateNum, id);
            }

            if ($scope.ShowDocketNum && $scope.CtrlEnableRe5) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'Docket Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtDocketNum, id);
            }

            if ($scope.ShowListDate && $scope.CtrlEnableRe6) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'Listing Date', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtListDate, id);
            }

            if ($scope.ShowNYWCBnum && $scope.CtrlEnableRe7) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'NY WCB Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtNYWCBnum, id);
            }

            if ($scope.ShowRefNum && $scope.CtrlEnableRe8) {
                var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;
                HomeService.createSecondaryTableXML("WCC_RE_OPT");
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", '1', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", 'Reference Number', id);
                HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", $scope.txtRefNum, id);
            }

            if ($scope.ShowCMSCaseCtrl && $scope.CtrlEnableRe9) {
                HomeService.createPrimaryXML("CMS_CASE_CNTRL_NO", $scope.txtCMSCaseCtrl);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

