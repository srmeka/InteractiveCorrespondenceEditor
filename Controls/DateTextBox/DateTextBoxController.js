app.controller('DateTextBoxController', function ($scope, shareData, $http, HomeService, $filter) {
    try {
        $('input[name="Date"]').datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true,
            autoclose: true,
            orientation: "top auto"
        });
        $scope.SelectedDate = new Date();

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('DateTextBox', function (event) {
        try{
            var selectedDate = $filter('date')($('#Date')[0].value, "MM/dd/yyyy");
            HomeService.createPrimaryXML("Tag9", "Date:");
            HomeService.createPrimaryXML("Tag9Num", "016:");
            HomeService.createPrimaryXML("Value9", selectedDate);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});