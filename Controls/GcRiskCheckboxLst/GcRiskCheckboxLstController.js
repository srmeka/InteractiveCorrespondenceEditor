app.controller('GcRiskCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.displayData = [
            { labelText: 'Risk Adequately Insured', tagName: 'ADEQ_INSD_IND', checkboxName: 'RiskAdequatelyInsured', ctrlSelected: false },
            { labelText: 'Risk Over Insured', tagName: 'OVER_INSD_IND', checkboxName: 'OverInsuredIndicator', ctrlSelected: false },
            { labelText: 'Risk Underinsured', tagName: 'UNDERINS_IND', checkboxName: 'RiskUnderinsured', ctrlSelected: false }
        ];


    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcRiskCheckboxLst', function (event) {
        try {
            
            for (var i = 0; i < $scope.displayData.length; i++) {
               var outputValue = 'N';
               if ($scope.displayData[i].ctrlSelected) {
                   outputValue = 'Y';
               }
               else {
                   outputValue = 'N'
               };

               HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

