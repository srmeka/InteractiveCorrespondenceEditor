app.controller('GcBatchCheckboxController', function ($scope, $rootScope, shareData, HomeService) {
    try {

        $scope.showEmail = true;
        $scope.setBatchService = function () {
            $scope.showEmail = !$scope.showEmail;
            $rootScope.$broadcast('HIDEN_CCBCC', { hiddenStatus: $scope.showEmail })
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcBatchCheckbox', function (event) {
        try {
            var print_ind = 'N';
           

            if ($scope.enableBatchService) {
                print_ind = 'BATCH';
            }

          
            HomeService.createPrimaryXML("PRINT_IND", print_ind);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

