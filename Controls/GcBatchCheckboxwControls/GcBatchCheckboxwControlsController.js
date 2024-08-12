app.controller('GcBatchCheckboxwControlsController', function ($scope, $rootScope, shareData, HomeService) {
    try {

        $scope.showEmail = true;
        $scope.justCert = false;
        $scope.labelName = "Print Services";
        $scope.setBatchService = function () {
            $scope.showEmail = !$scope.showEmail;
            if (!$scope.showEmail) {
                $scope.certifiedMailIndicator = undefined;
            }
            $rootScope.$broadcast('HIDEN_CCBCC', { hiddenStatus: $scope.showEmail })
        }
        if ($scope.SelectedDocument.documentFriendlyName == 'NY Fire District Ltr') {
            $scope.justCert = true;
            $scope.certifiedMailIndicator = true;
        }
        if ($scope.SelectedDocument.documentFriendlyName == 'New York Denial') { // MSA batch 58
            $scope.labelName = "Certified Mail"
            $scope.justCert = true;
            $scope.showEmail = false;
        }
       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcBatchCheckboxwControls', function (event) {
        try {
            var print_ind = 'N';
            var cert_mail = 'N';


            if ($scope.certifiedMailIndicator) {
                cert_mail = 'Y';
                print_ind = 'DEPT';
                HomeService.createPrimaryXML("CERT_MAIL_IND", cert_mail);
                //HomeService.createPrimaryXML("PRINT_IND", print_ind);
            }

            if ($scope.enableBatchService) {
                print_ind = 'BATCH';
                HomeService.createPrimaryXML("CERT_MAIL_IND", cert_mail);
                HomeService.createPrimaryXML("PRINT_IND", print_ind);
            }
            HomeService.createPrimaryXML("PRINTER_NAME", "");

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

