app.controller('WcuAddresseeRepeaterController', function ($scope, $http, $filter, shareData, HomeService) {
    try {

        $scope.SelectedAddressee = [];
        $scope.addrName = [];
        $scope.companyName = [];
        $scope.addrLine1 = [];
        $scope.addrLine2 = [];
        $scope.addrLine3 = [];
        $scope.city = [];
        $scope.state = [];
        $scope.zip = [];

        $scope.showAddBtn = true;
        $scope.showRemoveBtn = true;

        $scope.clearAllData = function (clearId) {

            $scope.addrName[clearId] = undefined;
            $scope.companyName[clearId] = undefined;
            $scope.addrLine1[clearId] = undefined;
            $scope.addrLine2[clearId] = undefined;
            $scope.addrLine3[clearId] = undefined;
            $scope.city[clearId] = undefined;
            $scope.state[clearId] = undefined;
            $scope.zip[clearId] = undefined;
        }

        $scope.MaxCtls = 5;
        $scope.TotalCount = [1];

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        }

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.SelectedAddressee[newItemNo] = false;
                $scope.clearAllData(newItemNo);
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuAddresseeRepeater', function (event) {
        try {
            var isCreateTable;
            if ($scope.SelectedAddressee.length > 0) {

                isCreateTable = $scope.SelectedAddressee.some(function (item) {
                    if (item) {
                        return true;
                    }

                });
                var id;
                for (var i = 0; i < $scope.TotalCount.length; i++) {

                    if ($scope.SelectedAddressee[i]) {

                        id = shareData.shareOutputXML.getElementsByTagName("POLICY_CC_OPT").length;
                        HomeService.createSecondaryTableXML("POLICY_CC_OPT");

                        if ($scope.addrName[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_NAME", $scope.addrName[i], id);
                        }

                        if ($scope.companyName[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_CO_NM", $scope.companyName[i], id);
                        }

                        if ($scope.addrLine1[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_1", $scope.addrLine1[i], id);
                        }

                        if ($scope.addrLine2[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_2", $scope.addrLine2[i], id);
                        }

                        if ($scope.addrLine3[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ADDR_3", $scope.addrLine3[i], id);
                        }

                        if ($scope.city[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_CTY", $scope.city[i], id);
                        }

                        if ($scope.state[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ST", $scope.state[i], id);
                        }

                        if ($scope.zip[i]) {
                            HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_ADDRESSEE_ZIP", $scope.zip[i], id);
                        }
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("POLICY_CC_OPT", "CC_BCC_IND", "Y", id);
                    }
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
