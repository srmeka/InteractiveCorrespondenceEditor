app.controller('CheckBoxController', function ($scope, shareData, $http, HomeService, $filter) {
    try{
        $scope.CheckBoxValue = false;
       
    }
    catch (ex){
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('CheckBox', function (event) {
        try{
            if ($scope.CheckBoxValue == true) {
                HomeService.createPrimaryXML("REMITTANCE_IND", "Y");
            }
            else {
                HomeService.createPrimaryXML("REMITTANCE_IND", "N");
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});