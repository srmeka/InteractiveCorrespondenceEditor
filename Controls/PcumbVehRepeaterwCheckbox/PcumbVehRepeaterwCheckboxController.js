app.controller('PcumbVehRepeaterwCheckboxController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.UmbrellaLine.VehicleExposures{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.CtrlEnabledCheckbox = new Array;
        $scope.SelectedVeh = new Array;
        $scope.VTypeCheck = new Array;
        $scope.VYearCheck = new Array;
        $scope.VMakeCheck = new Array;
        $scope.UndPolicy = new Array;
        $scope.VOwner = new Array;
        $scope.VRegister = new Array;
        $scope.TotalCount = [1];
        $scope.freeTextGroup = new Array;
        $scope.AddNewVehInfoSection = function () {
            if ($scope.TotalCount.length < 7) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }
        $scope.RemoveVehInfoSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.CtrlEnabledCheckbox[newItemNo] = false;
                $scope.ClearData(newItemNo);
                $scope.TotalCount.pop();
            }
        }
 
        $scope.ClearData = function (index) {
            $scope.SelectedVeh[index] = undefined;
            $scope.VTypeCheck[index] = false;
            $scope.VYearCheck[index] = false;
            $scope.VMakeCheck[index] = false;
            $scope.UndPolicy[index] = false;
            $scope.VOwner[index] = false;
            $scope.VRegister[index] = false;
            $scope.freeTextGroup[index] = "";
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbVehRepeaterwCheckbox', function (event) {
        try {
            var AI_value = 'N';
            var output;
            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DET").length;
            for (i = 0; i <= $scope.CtrlEnabledCheckbox.length; i++) {
                if ($scope.CtrlEnabledCheckbox[i] == true) {
                    AI_value = 'Y';
                    HomeService.createSecondaryTableXML("VEH_DET");
                   if ($scope.SelectedVeh[i]) {
                        if($scope.SelectedVeh[i].Vehicle.ModelYearNr)
                        {
                            output =  $scope.SelectedVeh[i].Vehicle.ModelYearNr ;
                        }
                    if($scope.SelectedVeh[i].Vehicle.VehicleTradeNm )
                        {
                        output = output + " " + $scope.SelectedVeh[i].Vehicle.VehicleTradeNm ;
                    }

                    HomeService.createSecondaryXMLValue("VEH_DET", "VEH", output.trim(), id)
                    }
                    else
                    {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH", $scope.freeTextGroup[i].trim(), id);
                    }
                    if($scope.VTypeCheck[i] == true) 
                    {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_TYPE", "Y", id);
                    }
                    if ($scope.VYearCheck[i] == true) {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_YEAR", "Y", id);
                    }
                    if ($scope.VMakeCheck[i] == true) {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_MAKE", "Y", id);
                    }
                    if ($scope.UndPolicy[i] == true) {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_UNDRLY_POL", "Y", id);
                    }
                    if ($scope.VOwner[i] == true) {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_OWN", "Y", id);
                    }
                    if ($scope.VRegister[i] == true) {
                        HomeService.createSecondaryXMLValue("VEH_DET", "VEH_REG", "Y", id);
                    }
                    HomeService.createSecondaryXMLValue("VEH_DET", "POL_FK", "1", id);
                    id += 1;
                }
            }
            
            HomeService.createPrimaryXML('AI_VEH', AI_value)
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});
