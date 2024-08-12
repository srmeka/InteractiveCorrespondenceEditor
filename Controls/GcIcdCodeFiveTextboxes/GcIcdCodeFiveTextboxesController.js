app.controller('GcIcdCodeFiveTextboxesController', function ($scope, $http, shareData, HomeService) {
    try {
        
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcIcdCodeFiveTextboxes', function (event) {
        try {
            var codeNum = 0;
           
            if ($scope.ICD9Code1) {
                codeNum++;
                HomeService.createPrimaryXML("ICD9_CODE_" + codeNum, $scope.ICD9Code1.trim());
            }
            if ($scope.ICD9Code2) {
                codeNum++;
                HomeService.createPrimaryXML("ICD9_CODE_" + codeNum, $scope.ICD9Code2.trim());
            }
            if ($scope.ICD9Code3) {
                codeNum++;
                HomeService.createPrimaryXML("ICD9_CODE_" + codeNum, $scope.ICD9Code3.trim());
            }
            if ($scope.ICD9Code4) {
                codeNum++;
                HomeService.createPrimaryXML("ICD9_CODE_" + codeNum, $scope.ICD9Code4.trim());
            }
            if ($scope.ICD9Code5) {
                codeNum++;
                HomeService.createPrimaryXML("ICD9_CODE_" + codeNum, $scope.ICD9Code5.trim());
            }
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

