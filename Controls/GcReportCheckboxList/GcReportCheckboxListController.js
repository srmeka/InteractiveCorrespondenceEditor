app.controller('GcReportCheckboxListController', function ($scope, shareData, HomeService) {
    try {

        function getLOB() {
            HomeService.LookupValue('LineOfBusiness').then(function (response) {
                $scope.LOBData = response.data
            })
        }
       
        $scope.LOBData = [];
        getLOB();

        $scope.displayData = [
            { labelText: 'Accident Involved One or More Fatalities', onChecked: false, tagName: 'FATAL_ACC_IND', checkboxName: 'InvolvedInFatalAccident(s)', outputValue: 'N' },
            { labelText: 'Fraud Suspected', onChecked: false, tagName: 'FRAUD_IND', checkboxName: 'DifficultyInAdjustingClaim', outputValue: 'N' },
            { labelText: 'Difficulty In Adjusting Claim', onChecked: false, tagName: 'DIFF_ADJG_CLM_IND', checkboxName: 'DifficultyInAdjustingClaim', outputValue: 'N' },
            { labelText: 'Insured Failed To Maintain Primary Health Care Coverage', onChecked: false, tagName: 'INSD_HLTHCR_NOT_MNTND_IND', checkboxName: 'InsuredFailed', outputValue: 'N' },
            { labelText: 'Not Principally Garaged At Policy Location', onChecked: false, tagName: 'NOT_MAINLY_GRGED_AT_POL_LOC_IND', checkboxName: 'NotPrincipallyGaraged', outputValue: 'N' },
            { labelText: 'Vehicle Away At College', onChecked: false, tagName: 'VEH_AWAY_AT_COLLEGE_IND', checkboxName: 'VehicleAwayAtCollege', outputValue: 'N' },
            { labelText: 'Insured Auto Registered To Other Than Insured', onChecked: false, tagName: 'INSD_AUTO_NOT_REGD_TO_INSD_IND', checkboxName: 'InsuredAutoRegistered', outputValue: 'N' },
            { labelText: 'Insured Does Not Reside In Risk Location', onChecked: false, tagName: 'INSD_NOT_RESD_IN_RISK_LOC_IND', checkboxName: 'InsuredDoesNotReside', outputValue: 'N' },
            { labelText: 'One Or Both Named Insured(S) Deceased', onChecked: false, tagName: 'NAMED_INSD_DECEASED_IND', checkboxName: 'OneOrBothNamed', outputValue: 'N' },
            { labelText: 'Insured And Spouse Do Not Live Together', onChecked: false, tagName: 'INSD_SPOUSE_NOT_LIVE_TGTHR_IND', checkboxName: 'Insd-Spouse', outputValue: 'N' },
            { labelText: 'Unusual HAZARDS-UW Concerns', onChecked: false, tagName: 'UNUS_HZRDS_UW_CONCRN_IND', checkboxName: 'Unusualhazards-UW', outputValue: 'N' },
            { labelText: 'Other Pertinent Information', onChecked: false, tagName: 'OTH_PERT_INFO_IND', checkboxName: 'OtherPertinentInformation', outputValue: 'N' },
            { labelText: 'Claim Subject To Title 59', onChecked: false, tagName: 'CLM_SUBJ_TO_TITLE_59_IND', checkboxName: 'ClaimSubjectToTitle59', outputValue: 'N' },
            { labelText: 'Claim Reported By Claimant Carrier', onChecked: false, tagName: 'CLM_RPTD_BY_CLMT_CARR_IND', checkboxName: 'ClaimReportedByClaimantCarrier', outputValue: 'N' }
        ];

       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcReportCheckboxList', function (event) {
        try {
         
            var lob_name = '';
            if ($scope.selectedLOB) {
                lob_name = $scope.selectedLOB.lookupItemCode;
            }

            HomeService.createPrimaryXML("LINE_OF_BUS", lob_name);

            for (var i = 0; i < $scope.displayData.length; i++) {

                if ($scope.displayData[i].onChecked) {
                    $scope.displayData[i].outputValue = 'Y';
                }
                else {
                    $scope.displayData[i].outputValue = 'N';
                }

                HomeService.createPrimaryXML($scope.displayData[i].tagName, $scope.displayData[i].outputValue);
            }


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

