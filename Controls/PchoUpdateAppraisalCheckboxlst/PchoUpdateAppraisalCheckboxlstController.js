app.controller('PchoUpdateAppraisalCheckboxlstController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Selections = [];
        $scope.ScheduledItems = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.HomeownersLine.ListedDwellings.ScheduledItems{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.Selections = [];
            $scope.ScheduledItems.map(function (ScheduledItem) {
                ScheduledItem.checked = false;
            })
        }

        $scope.selectItem = function (ScheduledItem) {
            var ScheduleItemId = "SheduledItemsCheckboxLstId" + ScheduledItem._id;
            $scope.SelectedPolicy = $scope.SelectedPolicy || [];
            if (document.getElementById(ScheduleItemId).checked) {
                $scope.Selections.push(ScheduledItem);
            }
            else {
                $scope.Selections.splice($scope.Selections.indexOf(ScheduledItem), 1);
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PchoUpdateAppraisalCheckboxlst', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("HO61_ADTL_INFO").length;

            if ($scope.Selections.length) {
                HomeService.createPrimaryXML("HO_61_UPD_APPR", "Y");

                for (var i = 0; i < $scope.Selections.length; i++) {

                    HomeService.createSecondaryTableXML("HO61_ADTL_INFO");
                    HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_ADDL_TYPE", "Appraisal", id);
                    HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_DESC", $scope.Selections[i].ScheduledItemDescriptionTx, id);

                    id = id + 1;
                }
            }
            else {
                HomeService.createPrimaryXML("HO_61_UPD_APPR", "N");
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});