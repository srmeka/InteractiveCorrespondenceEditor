app.controller('PcpaCsfBlankPrefilledDropdownController', function ($scope, shareData, $http, HomeService) {
    try {
      
        $scope.CFSData = [{ text: 'CSF Blank', value: 'Blank' }, { text: 'Pre-Filled', value: 'Pre-Filled' }];
     
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaCsfBlankPrefilledDropdown', function (event) {
        try {
            if ($scope.SelectedCSF) {
                HomeService.createPrimaryXML("CSF_BLK_PREFLL", $scope.SelectedCSF.value);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});