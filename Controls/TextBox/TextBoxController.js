app.controller('TextBoxController', function ($scope, shareData, $http, HomeService, $filter) {
    try {

        //Add code for labels

        $(document).ready(function () {
            $('input[name="Date"]').datepicker({
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
                orientation: "bottom auto"
            });
        })
        $scope.SelectedDate = new Date();
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('TextBox', function (event) {
        try {

            var lob = HomeService.getUrlParameter('LOB');

            switch (lob) {
                case 'PC-CA':
                    HomeService.createPrimaryXML("Tag8", "Certificate Holder:");
                    HomeService.createPrimaryXML("Tag8Num", "009:");
                    HomeService.createPrimaryXML("Value8", $scope.TextBoxValue);
                    break;
              
                case 'PC-PA':
                    HomeService.createPrimaryXML("TAG9", "Certificate Holder:");
                    HomeService.createPrimaryXML("TAG9_NUM", "009:");
                    HomeService.createPrimaryXML("VALUE9", $scope.TextBoxValue);
                    break;

                case 'PC-HO':
                case 'PC-UMB':
                case 'PC-DW':
                    HomeService.createPrimaryXML("TAG10", "Certificate Holder:");
                    HomeService.createPrimaryXML("TAG10_NUM", "009:");
                    HomeService.createPrimaryXML("VALUE10", $scope.TextBoxValue);
                    break;
            }; //(lob)

        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});