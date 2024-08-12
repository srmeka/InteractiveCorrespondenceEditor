app.controller('PcpaVehicleInfoRepeaterController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Vehicle = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails.Vehicle{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.VehInfoCheckbox = new Array;
        $scope.SelectedVeh = new Array;
        $scope.VINCheck = new Array;
        $scope.FinCompCheck = new Array;
        $scope.LeaseCompCheck = new Array;

        $scope.TotalCount = [1];
        $scope.MaxCtls = [3];

        $scope.AddNewVehInfoSection = function () {
            if ($scope.TotalCount.length < 3) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }
        $scope.RemoveVehInfoSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.VehInfoCheckbox[newItemNo] = false;
                $scope.ClearData(newItemNo);
                $scope.TotalCount.pop();
            }
        }

        $scope.ClearData = function (index) {
            $scope.SelectedVeh[index] = undefined;
            $scope.VINCheck[index] = "";
            $scope.FinCompCheck[index] = "";
            $scope.LeaseCompCheck[index] = "";
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaVehicleInfoRepeater', function (event) {
        try {
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            for (i = 0; i <= $scope.VehInfoCheckbox.length; i++) {
                if ($scope.VehInfoCheckbox[i] == true && $scope.SelectedVeh[i]) {
                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN_IND", (($scope.VINCheck[i]) ? "Y" : "N"), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_FIN_IND", (($scope.FinCompCheck[i]) ? "Y" : "N"), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_LEASE_IND", (($scope.LeaseCompCheck[i]) ? "Y" : "N"), id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.SelectedVeh[i].ModelYearNr, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.SelectedVeh[i].VehicleTradeNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MDL", $scope.SelectedVeh[i].ModelNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.SelectedVeh[i].ManufacturerVehicleIdentificationNr, id);
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
