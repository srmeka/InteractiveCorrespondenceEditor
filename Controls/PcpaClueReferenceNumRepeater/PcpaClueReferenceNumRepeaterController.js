app.controller('PcpaClueReferenceNumRepeaterController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.ClueNumCheckbox = new Array;
        $scope.ClueNumName = new Array;

        $scope.TotalCount = [1];
        $scope.MaxCtls = [3];
        $scope.showAddBtn = true;

        if ($scope.SelectedDocument.documentFriendlyName == "NB 60 Day Decline-Cancel" || $scope.SelectedDocument.documentFriendlyName == "NJ Decline Ltr-Auto") {
            $scope.showAddBtn = false;
        }
        else {
            $scope.showAddBtn = true;
        }

        $scope.AddNewClueNumSection = function () {
            if ($scope.TotalCount.length < 3) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }
        $scope.RemoveClueNumSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.ClueNumCheckbox[newItemNo] = false;
                $scope.ClueNumName[newItemNo] = "";
                $scope.TotalCount.pop();
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaClueReferenceNumRepeater', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;
            for (i = 0; i <= $scope.ClueNumCheckbox.length; i++) {
                if ($scope.ClueNumCheckbox[i] == true) {
                    HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                    if ($scope.ClueNumName[i]) {
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "CLUE_REF_NO", $scope.ClueNumName[i], id);
                    }
                    HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                    id += 1;
                }
            }

            var checkedValue = "N"

            for (var i = 0; i < $scope.ClueNumCheckbox[i]; i++) {
                if ($scope.ClueNumCheckbox[i] == true) {
                    checkedValue = "Y";
                }
            }

            var RefInd = shareData.shareOutputXML.getElementsByTagName("MVR_CLUE_REF_INDICATOR")[0];

            if (checkedValue == "Y") {

                if (RefInd) {
                    if (RefInd.text != "Y") {
                        var root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("MVR_CLUE_REF_INDICATOR");
                        root.removeChild(elementToRemove);
                    }
                } else {
                    HomeService.createPrimaryXML("MVR_CLUE_REF_INDICATOR", "Y");
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
