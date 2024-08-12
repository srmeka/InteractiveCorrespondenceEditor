app.controller('PcpaClaimCheckboxwCheckboxController', function ($scope, shareData, $http, HomeService, $timeout) {
    try {

        $scope.ClaimCheckbox = new Array;
        $scope.ClaimDate = new Array;
        $scope.DriverNmCheck = new Array;
        $scope.PoliceReportCheck = new Array;
        $scope.InsLtrCheck = new Array;

        $scope.TotalCount = [1];
        $scope.MaxCtls = [10];

        $scope.AddNewClaimSection = function () {
            if ($scope.TotalCount.length < 10) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }

        $scope.RemoveClaimSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo > 0) {
                $scope.ClaimCheckbox[newItemNo] = false;
                $scope.ClearData(newItemNo);
                $scope.TotalCount.pop();
            }
        }

        $scope.ClearData = function (index) {
            $scope.ClaimDate[index] = "";
            var DateId = '#ClaimDate' + index + 'Id';
            $(DateId)[0] = "";
            $scope.DriverNmCheck[index] = "";
            $scope.PoliceReportCheck[index] = "";
            $scope.InsLtrCheck[index] = "";
        }
       
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaClaimCheckboxwCheckbox', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("ACC_INFO").length;
            for (i = 0; i <= $scope.ClaimCheckbox.length; i++) {
                if ($scope.ClaimCheckbox[i] == true) {
                    HomeService.createSecondaryTableXML("ACC_INFO");
                    if ($scope.ClaimDate[i]) {
                        HomeService.createSecondaryXMLValue("ACC_INFO", "ACC_DT", $scope.ClaimDate[i], id);
                    }
                    if ($scope.DriverNmCheck[i]) {
                        HomeService.createSecondaryXMLValue("ACC_INFO", "ACC_INFO_NAME_IND", "Y", id);
                    }
                    if ($scope.PoliceReportCheck[i]) {
                        HomeService.createSecondaryXMLValue("ACC_INFO", "ACC_INFO_POLICE_RPT_IND", "Y", id);
                    }
                    if ($scope.InsLtrCheck[i]) {
                        HomeService.createSecondaryXMLValue("ACC_INFO", "ACC_INFO_INS_LTR_IND", "Y", id);
                    }
                    HomeService.createSecondaryXMLValue("ACC_INFO", "POL_FK", "1", id);
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



