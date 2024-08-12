app.controller('WcuScanSheetDatePickerController', function ($scope, shareData, $http, HomeService, $filter) {
    try {

        $(document).ready(function () {
            $('input[name="Date1"]').datepicker({
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
                orientation: "top auto"
            });
        })

        $scope.DateOutputFormat1 = "mm/dd/yyyy";
        $scope.LabelName1 = "* Date:";
        $scope.Required1 = true;
        $scope.SelectedDate1 = new Date();
        $scope.SelectedDate1 = $filter('date')($scope.SelectedDate1, "MM/dd/yyyy");

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WcuScanSheetDatePicker', function (event) {
        try {

            if ($scope.SelectedDocument.documentFriendlyName == 'WCU Correspondence') {
                switch ($scope.Category.categoryFriendlyName) {

                    case 'ZScansheet Engineering':
                        HomeService.createPrimaryXML("TAG10", "Date:");
                        HomeService.createPrimaryXML("TAG10_NUM", "031:");
                        HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate1);
                        break;
                    case 'ZScansheet Premium Audit':
                    case 'ZScansheet WCU':
                        HomeService.createPrimaryXML("TAG9", "Date:");
                        HomeService.createPrimaryXML("TAG9_NUM", "031:");
                        HomeService.createPrimaryXML("VALUE9", $scope.SelectedDate1);
                        break;
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