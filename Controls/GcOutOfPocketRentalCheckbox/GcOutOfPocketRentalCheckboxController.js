app.controller('GcOutOfPocketRentalCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.VehicleData = JSPath.apply(".Claim.InvolvedVehicles.Vehicle{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.enableVehicle = function () {
            if (!$scope.includeVeh) {
                $scope.selectedVehicle = undefined;
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcOutOfPocketRentalCheckbox', function (event) {
        try {
            var veh_yaer = '', veh_mk = '', veh_mdl = '', OOP_value = '';
           
            if ($scope.includeVeh) {
                OOP_value = "Y";
                if ($scope.selectedVehicle) {
                    veh_yaer = $scope.selectedVehicle.Year;
                    veh_mk = $scope.selectedVehicle.Make;
                    veh_mdl = $scope.selectedVehicle.Model;
                }

                HomeService.createPrimaryXML("VEH_YR", veh_yaer);
                HomeService.createPrimaryXML("VEH_MK", veh_mk);
                HomeService.createPrimaryXML("VEH_MDL", veh_mdl);
            }
            else {
                OOP_value = "N"
            }

            HomeService.createPrimaryXML("OOP_RENTAL_INCLUDED", OOP_value);

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

