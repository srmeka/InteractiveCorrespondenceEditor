app.controller('PcpaMidtermCancelReasonDrpdwnwCntrlsController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.ReasonData = [
            { optionValue: "III.B-Lic/Reg Susp-Named Insured", output: "Lic/Reg Susp-Named Insured", slectedType: 'IIIB' },
            { optionValue: "III.C-Serious Violation", output: "Serious Violation", slectedType: 'IIIC' },
            { optionValue: "III.D-Operating w/o Liability Ins", output: "Operating w/o Liability Ins", slectedType: 'IIID' },
            { optionValue: "III.E-Evidence Exists", output: "Evidence Exists", slectedType: 'IIIE' },
            { optionValue: "III.F-Misrepresentation", output: "Misrepresentation", slectedType: 'IIIF' },
            { optionValue: "III.G-60 Day Decline-Cancel", output: "60 Day Decline-Cancel", slectedType: 'IIIG' }
            //,Per Aimee's request, Free Form Entry removed from Dropdown Only
            //{ optionValue: "Free Form Entry", output: "Free Form Entry", slectedType: 'Free Form Entry' }
        ];
        $scope.Addressee = JSPath.apply('.Policy.PolicyPeriod.ListedParties.Party{(.PartyRoles == "Primary Named Insured" || .PartyRoles == "Secondary Named Insured" || .PartyRoles == "Spouse" || .PartyRoles == "Broker" || .PartyRoles == "Executor Executrix" || .PartyRoles == "Guardian" || .PartyRoles == "ThirdParty" || .PartyRoles == "Trust" || .PartyRoles == "Trustee" || .PartyRoles == "Additional Interest" || .PartyRoles == "Certificate Of Insurance Holder" || .PartyRoles == "Power Of Attorney")&& .PartyTypeCd != "Organization"}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.ViolationReasonArray = [{ optionValue: "DUI" }, { optionValue: "Chemical Test Refusal" },
                                       { optionValue: "Vehicular Homicide" }, { optionValue: "Driving While Suspended" },
                                       { optionValue: "Driving w/o Liability Insurance" }, { optionValue: "Misrepresentation of Insurance Cov" }
                                       ,{ optionValue: "Reckless Driving"}];
       // $scope.selectedViolationReason;
        $scope.clearAll = function () {
            $scope.clearAllSelectedData();
            $scope.selectedReason = undefined;
            
        }
        $scope.clearAllSelectedData = function () {
            $scope.SelectedAddressee = undefined;
            $scope.sDate = "";
            $scope.oDate = "";
            $('#suspendDateId')[0].value = "";
            $('#operateDateId')[0].value = ""
            $scope.userEnteredName = "";
            $scope.selectedViolationReason = undefined;
        }
        $scope.clearuserEnteredName = function () {
            $scope.userEnteredName = "";
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaMidtermCancelReasonDrpdwnwCntrls', function (event) {
        try {
            if ($scope.isDeletionSelected && $scope.selectedReason) {
                HomeService.createPrimaryXML("MIDTRM_CNCL_IND", $scope.selectedReason.slectedType);
             
                if ($scope.oDate && ($scope.selectedReason.slectedType == 'IIIE')) {
                    HomeService.createPrimaryXML("VEH_OPERTNG_DT", $scope.oDate.trim());
                }
                if ($scope.SelectedAddressee && ($scope.selectedReason.slectedType == 'IIIB' || $scope.selectedReason.slectedType == 'IIIE')) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;

                        if ($scope.SelectedAddressee.Person.PersonName.FirstGivenNm) {
                            partnerName = $scope.SelectedAddressee.Person.PersonName.FirstGivenNm + ' ';
                        }
                        if ($scope.SelectedAddressee.Person.SecondGivenNameInitial) {
                            partnerName += $scope.SelectedAddressee.Person.SecondGivenNameInitial + ' ';
                        }
                        if ($scope.SelectedAddressee.Person.PersonName.FamilyNm) {
                            partnerName += $scope.SelectedAddressee.Person.PersonName.FamilyNm;
                        }
                        if ($scope.SelectedAddressee.Person.PersonName.FamilyNameGenerationCd) {
                            partnerName += $scope.SelectedAddressee.Person.PersonName.FamilyNameGenerationCd;
                        }
                        partnerName = partnerName.replace(/undefined/g, '');
                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", partnerName.trim(), table_id);
                        if ($scope.sDate && ($scope.selectedReason.slectedType == 'IIIB')) {
                            HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "LIC_MVR_SUSPEND_DT", $scope.sDate.trim(), table_id);
                        }
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1",table_id);
                }
                if ($scope.userEnteredName && ($scope.selectedReason.slectedType == 'IIIB' || $scope.selectedReason.slectedType == 'IIIE')) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
               
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", $scope.userEnteredName.trim(), table_id);
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", table_id);
                }
                if ($scope.selectedViolationReason && ($scope.selectedReason.slectedType == 'IIIC')) {
                    HomeService.createPrimaryXML("VIOL_RSN_IND", $scope.selectedViolationReason.optionValue.trim());
                }
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});