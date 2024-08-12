app.controller('LetterDatePickerController', function ($scope, shareData, $http, HomeService, $filter) {
    try {
        if ($scope.SelectedDocument.documentFriendlyName == "Vehicle Coverage Verification") {
            $scope.DateOutputFormat = "yyyy-mm-dd";
            $scope.TagName = "COV_EFF_DT";
            $scope.LabelName = "Coverage Effective Date";
            $scope.Required = false;
        }
        else {
            $scope.DateOutputFormat = "MM dd, yyyy";
            $scope.TagName = "LTR_DT";
            $scope.LabelName = "* Letter Date";
            $scope.Required = true;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('LetterDatePicker', function (event) {
        try {
            HomeService.createPrimaryXML($scope.TagName, $scope.SelectedDate);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});