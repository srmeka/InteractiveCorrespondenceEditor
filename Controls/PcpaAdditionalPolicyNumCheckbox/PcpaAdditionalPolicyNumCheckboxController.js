app.controller('PcpaAdditionalPolicyNumCheckboxController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.SelectedData = [];
        $scope.additionalPolicyNum = JSPath.apply(".Policy.PolicyPeriod.AssociatedPolicies{.AssociationReasonCd !== 'Health Insurance Policy'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.selectItem = function (item) {
            $scope.SelectedData = $scope.SelectedData || [];
            if (item.checked) {
                $scope.SelectedData.push(item);
            } else {
                $scope.SelectedData.splice($scope.SelectedData.indexOf(item), 1);
            }
        }
    } catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaAdditionalPolicyNumCheckbox', function (event) {
        try {
            if ($scope.SelectedData.length !== 0) {
                var id = shareData.shareOutputXML.getElementsByTagName("ADDL_POL_NUM").length;
               
                for (var i = 0; i < $scope.SelectedData.length; i++) {
                    HomeService.createSecondaryTableXML("ADDL_POL_NUM");
                    HomeService.createSecondaryXMLValue("ADDL_POL_NUM", "ADDL_POLNUM", $scope.SelectedData[i].PolicyId.trim(), id);
                    HomeService.createSecondaryXMLValue("ADDL_POL_NUM", "POL_FK", "1", id);
                
                    id += 1;
                }
            }
        } catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});