app.controller('ClScanSheetYearDropdownController', function ($scope, shareData, $http, HomeService) {
    try {

        var LOBName = HomeService.getUrlParameter('LOB');
                

        if ((LOBName == "PC-CA") || (LOBName == "PC-CGL") || (LOBName == "PC-BOP") ||(LOBName == "PC-CUMB") )
        {
            var currentDate = new Date(JSPath.apply('.Policy.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        }
        else
        {
        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        }

        var years = [];
        var currentYear = currentDate.getFullYear();

        if (currentYear == "2019") {
            years.push(currentYear);
            years.push(currentYear + 1);
            $scope.PopulateYearDropdown = years.sort();
            $scope.SelectedYearDropdownValue = currentYear;
        }

        else if (currentYear > "2019") {
            for (var i = currentYear; i >= 2019 && i >= currentYear - 5 ; i--) {
                years.push(i);
            }
            years.push(currentYear + 1);
            $scope.PopulateYearDropdown = years.sort();
            $scope.SelectedYearDropdownValue = currentYear;
        }
        else {
            years.push(currentYear);
            years.push(currentYear + 1);
            $scope.PopulateYearDropdown = years.sort();
            $scope.SelectedYearDropdownValue = currentYear;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('ClScanSheetYearDropdown', function (event) {
        try {
            if ($scope.SelectedYearDropdownValue) {

                HomeService.createPrimaryXML("Tag11", "Year:");
                HomeService.createPrimaryXML("Tag11Num", "006:");
                HomeService.createPrimaryXML("Value11", $scope.SelectedYearDropdownValue);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});