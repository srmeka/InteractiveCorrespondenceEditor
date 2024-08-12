app.controller('GcVehicleDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.VehicleData = JSPath.apply(".Claim.InvolvedVehicles.Vehicle{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.VehicleClmData = angular.copy($scope.VehicleData);

        $scope.ShowClm = false;
        $scope.ShowIns = false;
        $scope.VehLabel = "Vehicle:"

        if ((['Abandonment Ltr', 'Appraiser Ltr', 'Auth for Salv Tow Ltr',
              'Auto-Partial Denial', 'Basic No Ordinance Ltr', 'Basic with Ordinance Ltr',
              'Limited Power of Attorney', 'Ltr of Authorization', 'NJTPK-GSP Tow Ltr',
              'No Breakdown Ltr', 'No Breakdown-Appraiser Combo Ltr', 'No Financial Interest Ltr',
              'Notarized Mileage Error Ltr', 'Notification of Salvage Facility',
              'Out of State Facility Ltr', 'Standard Reimbursement Ltr', 'State Police Ltr',
              'Title Transfer Request Ltr'].indexOf($scope.SelectedDocument.documentFriendlyName) > -1)) {
            $scope.ShowClm = true;
        }
        else if ($scope.SelectedDocument.documentFriendlyName == 'Storage Ltr No 1st Party Coverage') {
            $scope.VehLabel = "Veh Year, Make & Model:"
            $scope.vehStorage = true;
        }
        else if ($scope.SelectedDocument.documentFriendlyName == 'Appraisal Request') {
            $scope.ShowClm = true;
            $scope.ShowIns = true;
            $scope.VehLabel = "Insured's Vehicle:"
        }
        else {
            $scope.ShowIns = true;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcVehicleDropdown', function (event) {
        try {
            var veh_year = '', veh_mk = '', veh_mdl = '', veh_vin = '';

            if ($scope.ShowIns) {
                if ($scope.selectedVehicle) {
                    veh_year = $scope.selectedVehicle.Year;
                    veh_mk = $scope.selectedVehicle.Make;
                    veh_mdl = $scope.selectedVehicle.Model;
                    veh_vin = $scope.selectedVehicle.Vin;

                }
                HomeService.createPrimaryXML("VEH_YR", veh_year);
                HomeService.createPrimaryXML("VEH_MK", veh_mk);
                HomeService.createPrimaryXML("VEH_MDL", veh_mdl);
                HomeService.createPrimaryXML("VEH_VIN", veh_vin);
            }
            if ($scope.ShowClm) {
                if ($scope.selectedVehicleClm) {
                    veh_year = $scope.selectedVehicleClm.Year;
                    veh_mk = $scope.selectedVehicleClm.Make;
                    veh_mdl = $scope.selectedVehicleClm.Model;
                    veh_vin = $scope.selectedVehicleClm.Vin;

                }
                HomeService.createPrimaryXML("CLMT_VEH_YR", veh_year);
                HomeService.createPrimaryXML("CLMT_VEH_MK", veh_mk);
                HomeService.createPrimaryXML("CLMT_VEH_MDL", veh_mdl);
                HomeService.createPrimaryXML("CLMT_VEH_VIN", veh_vin);
            }
            if ($scope.vehStorage) {
                if ($scope.selectedVehicle) {
                    $scope.vehicleString = "";

                    if ($scope.selectedVehicle.Year) {
                        veh_year = $scope.selectedVehicle.Year;
                    }
                    if ($scope.selectedVehicle.Make) {
                        veh_mk = $scope.selectedVehicle.Make;
                    }
                    if ($scope.selectedVehicle.Model) {
                        veh_mdl = $scope.selectedVehicle.Model;
                    }
                    $scope.vehicleString = veh_year + " " + veh_mk + " " + veh_mdl;
                    HomeService.createPrimaryXML("VEH_YR_MK_MDL", $scope.vehicleString.trim());
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

