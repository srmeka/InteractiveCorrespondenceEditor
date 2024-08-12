app.controller('PchoAddtlPolNumCheckboxwCheckboxController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.SelectedPolicy = [];
        $scope.Policy = JSPath.apply(".Policy.PolicyPeriod.RelatedPolicies{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.SelectedPolicy = [];
            $scope.Policy.map(function (Policy) {
                Policy.checked = false;
            })
        }

        $scope.selectPolicy = function (Policy) {
            var PolicyId = "PolicyLstId" + Policy._id;
            $scope.SelectedPolicy = $scope.SelectedPolicy || [];
            if (document.getElementById(PolicyId).checked) {
                $scope.SelectedPolicy.push(Policy);
            }
            else {
                $scope.SelectedPolicy.splice($scope.SelectedPolicy.indexOf(Policy), 1);
            }
        }
        $(document).ready($scope.clearAllSelectedData());
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PchoAddtlPolNumCheckboxwCheckbox', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("ADDL_POL_NUM").length;
            if ($scope.SelectedPolicy.length !== 0) {

                for (var i = 0; i < $scope.SelectedPolicy.length; i++) {
                    HomeService.createSecondaryTableXML("ADDL_POL_NUM");
                    HomeService.createSecondaryXMLValue("ADDL_POL_NUM", "ADDL_POLNUM", $scope.SelectedPolicy[i].Policy.PolicyNumber.trim(), id);
                    HomeService.createSecondaryXMLValue("ADDL_POL_NUM", "POL_FK", "1", id);

                    id += 1;
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