app.controller('WccInfoForAddtlTreatmentAndOtherController', function ($scope, shareData, HomeService) {
    try {

        $scope.displayData = [
            { outputValue: 'Complete initial assessment.', labelText: 'Complete initial assessment', checkboxName: 'AddtlTreatment1', ctrlSelected: false },
            { outputValue: 'Complete reassessment with objective and functional measures contrasted to prior measures.', labelText: 'Complete reassessment', checkboxName: 'AddtlTreatment2', ctrlSelected: false },
            { outputValue: 'Complete copy of daily notes.', labelText: 'Complete copy of daily notes', checkboxName: 'AddtlTreatment3', ctrlSelected: false },
            { outputValue: 'Current physician referral.', labelText: 'Current physician referral', checkboxName: 'AddtlTreatment4', ctrlSelected: false }
        ];

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccInfoForAddtlTreatmentAndOther', function (event) {
        try {

            for (var i = 0; i < $scope.displayData.length; i++) {
                if ($scope.displayData[i].ctrlSelected) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("INFO_ADD_TRTMNT_PARENT_REC").length;
                    HomeService.createSecondaryTableXML("INFO_ADD_TRTMNT_PARENT_REC");
                    HomeService.createSecondaryXMLValue("INFO_ADD_TRTMNT_PARENT_REC", "INFO_ADD_TRTMNT", $scope.displayData[i].outputValue, table_id);
                    HomeService.createSecondaryXMLValue("INFO_ADD_TRTMNT_PARENT_REC", "CLM_FK", "1", table_id);
                }
            }
            if ($scope.otherTreatmentInfo) {
                var table_id = shareData.shareOutputXML.getElementsByTagName("INFO_ADD_TRTMNT_PARENT_REC").length;
                HomeService.createSecondaryTableXML("INFO_ADD_TRTMNT_PARENT_REC");
                HomeService.createSecondaryXMLValue("INFO_ADD_TRTMNT_PARENT_REC", "OTH_INFO_ADD_TRTMNT", $scope.otherTreatmentInfo, table_id);
                HomeService.createSecondaryXMLValue("INFO_ADD_TRTMNT_PARENT_REC", "INFO_ADD_TRTMNT", "Other", table_id);
                HomeService.createSecondaryXMLValue("INFO_ADD_TRTMNT_PARENT_REC", "CLM_FK", "1", table_id);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

