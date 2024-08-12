app.controller('PcpaAddedPipCheckboxListController', function ($scope, shareData, HomeService) {
    try {

        $scope.displayData = [
            { labelText: 'Higher Limits Not Selected', onChecked: false, tagName: 'HIGHER_LMT_NOT_SELECT_IND', checkboxName: 'HigherLimitsNotSelected', outputValue: 'N' },
            { labelText: 'Individual Has Other Insurance', onChecked: false, tagName: 'OTHER_INS_IND', checkboxName: 'OtherInsurance', outputValue: 'N' },
            { labelText: 'Have PIP Medical Expense Only', onChecked: false, tagName: 'PIP_MED_EXP_IND', checkboxName: 'PIPMedicalExpense', outputValue: 'N' },
            { labelText: 'Not Resident Relative', onChecked: false, tagName: 'NON_REL_RESIDENT_IND', checkboxName: 'NotResidentRelative', outputValue: 'N' },
        ];


    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaAddedPipCheckboxList', function (event) {
        try {
            for (var i = 0; i < $scope.displayData.length; i++) {
                if ($scope.displayData[i].onChecked) {
                    $scope.displayData[i].outputValue = 'Y';
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, $scope.displayData[i].outputValue);
                }
                else {
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, $scope.displayData[i].outputValue);
                }
                if ($scope.displayData[i].labelText == 'Higher Limits Not Selected' && $scope.displayData[i].outputValue == 'Y') {
                    HomeService.createPrimaryXML('CSF_BLK_PREFILL', 'Blank');
                }

                $scope.displayData[i].outputValue = 'N';
            }
           


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

