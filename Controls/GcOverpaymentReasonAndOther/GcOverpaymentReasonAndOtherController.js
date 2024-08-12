app.controller('GcOverpaymentReasonAndOtherController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedOther = true;
        $scope.displayData = [
            { outputValue: 'Duplicate payment', labelText: 'Duplicate payment', checkboxName: 'DuplicatePayment', ctrlSelected: false },
            { outputValue: 'Incorrect provider', labelText: 'Incorrect provider', checkboxName: 'Incorrectprovider', ctrlSelected: false },
            { outputValue: 'Overpayment', labelText: 'Overpayment', checkboxName: 'Overpayment', ctrlSelected: false },
            { outputValue: 'Overpayment of contract amount', labelText: 'Overpayment of contract amount', checkboxName: 'ContractAmount', ctrlSelected: false },
            { outputValue: 'Statute of Limitation expired', labelText: 'Statute of Limitation expired', checkboxName: 'ExpiredStatute', ctrlSelected: false },
            { outputValue: 'Treatment not related to injury', labelText: 'Treatment not related to injury', checkboxName: 'NotRelatedToInjury', ctrlSelected: false }
      
        ];

        $scope.enabledCtrl = function () {
            if (!$scope.selectedOther) {
                $scope.otherReasonInfo = undefined;
            }
        }

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcOverpaymentReasonAndOther', function (event) {
        try {

            for (var i = 0; i < $scope.displayData.length; i++) {
                if($scope.displayData[i].ctrlSelected){
                    var table_id = shareData.shareOutputXML.getElementsByTagName("OVERPAYMENT_PARENT_REC").length;
                    HomeService.createSecondaryTableXML("OVERPAYMENT_PARENT_REC");
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OVERPYMNT_REASON", $scope.displayData[i].outputValue, table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "CLM_FK", "1", table_id);
                }
            }
            if ($scope.selectedOther) {
                if ($scope.otherReasonInfo) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("OVERPAYMENT_PARENT_REC").length;
                    HomeService.createSecondaryTableXML("OVERPAYMENT_PARENT_REC");
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OTH_OVERPYMNT_REASON", $scope.otherReasonInfo, table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OVERPYMNT_REASON", "Other", table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "CLM_FK", "1", table_id);
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

