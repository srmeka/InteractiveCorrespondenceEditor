app.controller('PcpaPolReinstCancelRepeaterwCheckboxController', function ($scope, shareData, $http, HomeService, $timeout) {
    try {

        $scope.TotalCount = [1];
        $scope.MaxCtls = [3];
        $scope.ReinstDates = ["", "", ""];
        $scope.CancelDates = ["", "", ""];

        $scope.ReinstCancelCheckboxes = [];

        $scope.AddNewReinstCancelSection = function () {
            var newItemNum = $scope.TotalCount.length + 1;
            if ($scope.TotalCount.length < 3) {
                $scope.TotalCount.push(newItemNum);
            }
        }
        $scope.RemoveReinstCancelSection = function () {
            if ($scope.TotalCount.length > 1) {
                $scope.TotalCount.pop();
                $scope.ClearReinstCancelData($scope.TotalCount.length);
                $scope.ReinstCancelCheckboxes[$scope.TotalCount.length] = false;
            }
        }

        $scope.ClearReinstCancelData = function (index) {
            $scope.ReinstDates[index] = "";
            $scope.CancelDates[index] = "";
            var ReinstDateId = '#ReinstDate' + index + 'Id';
            var CancelDateId = '#CancelDate' + index + 'Id';
            $(ReinstDateId)[0].value = "";
            $(CancelDateId)[0].value = "";
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaPolReinstCancelRepeaterwCheckbox', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("REINSTATE_CNCL_DT").length;
            for (i = 0; i <= $scope.ReinstDates.length; i++) {
                if ($scope.ReinstDates[i] || $scope.CancelDates[i]) {
                    HomeService.createSecondaryTableXML("REINSTATE_CNCL_DT");
                    if ($scope.ReinstDates[i]) {
                        HomeService.createSecondaryXMLValue("REINSTATE_CNCL_DT", "REINSTD_DT", $scope.ReinstDates[i], id);
                    }
                    if ($scope.CancelDates[i]) {
                        HomeService.createSecondaryXMLValue("REINSTATE_CNCL_DT", "CNCL_DT", $scope.CancelDates[i], id);
                    }
                    HomeService.createSecondaryXMLValue("REINSTATE_CNCL_DT", "POL_FK", "1", id);
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