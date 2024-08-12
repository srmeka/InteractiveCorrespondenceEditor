app.controller('PlScanSheetYearDropdownController', function ($scope, shareData, $http, HomeService) {
    try {

        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        var years = [];
        var currentYear = currentDate.getFullYear();

        var currentTime = new Date()
        var theYear = currentTime.getFullYear()
        for (var i = (theYear - 10) ; i < (theYear + 2) ; i++) {
            years.push(i);
        }
        $scope.PopulateYearDropdown = years.sort();
        if (currentYear && currentYear < theYear + 1) {
            $scope.SelectedYearDropdownValue =  currentYear 
        } else {
            $scope.SelectedYearDropdownValue = theYear
        };
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PlScanSheetYearDropdown', function (event) {
        try {
            if ($scope.SelectedYearDropdownValue) {

                HomeService.createPrimaryXML("TAG7", "Year:");
                HomeService.createPrimaryXML("TAG7_NUM", "006:");
                HomeService.createPrimaryXML("VALUE7", $scope.SelectedYearDropdownValue);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});