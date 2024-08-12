app.controller('UsMailCheckboxController', function ($scope, shareData, $http, HomeService, $filter) {
    try{
        $scope.UsMailCheckboxValue = false;
       
    }
    catch (ex){
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('UsMailCheckbox', function (event) {
        try {
            if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {
                root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                var elementToRemove = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0];
                root.removeChild(elementToRemove);
            }
            if (shareData.shareOutputXML.getElementsByTagName("ARCHIVE_IND")[0]) {
                root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                var elementToRemove = shareData.shareOutputXML.getElementsByTagName("ARCHIVE_IND")[0];
                root.removeChild(elementToRemove);
            }
            if ($scope.UsMailCheckboxValue == true) {
                HomeService.createPrimaryXML("PRINT_IND", "BATCH");
                HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});