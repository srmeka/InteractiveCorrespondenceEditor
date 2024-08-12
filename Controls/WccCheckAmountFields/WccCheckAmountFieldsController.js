app.controller('WccCheckAmountFieldsController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.displayData = [
          { fieldLabel: 'Check Amount 1:', bindValue: '', tagName: 'CHK_AMT_1' },
          { fieldLabel: 'Check Amount 2:', bindValue: '', tagName: 'CHK_AMT_2' },
          { fieldLabel: 'Check Amount 3:', bindValue: '', tagName: 'CHK_AMT_3' },
          { fieldLabel: 'Check Amount 4:', bindValue: '', tagName: 'CHK_AMT_4' },
          { fieldLabel: 'Check Amount 5:', bindValue: '', tagName: 'CHK_AMT_5' },
          { fieldLabel: 'Check Amount 6:', bindValue: '', tagName: 'CHK_AMT_6' }
        ];

        $scope.haveValue = function () {
            if ($scope.displayData) {

                for (i = 0; i < $scope.displayData.length; i++) {
                    if ($scope.displayData[i].bindValue) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccCheckAmountFields', function (event) {
        try {
            var j = 0;

            for (var i = 0; i < $scope.displayData.length; i++) {
                if (!angular.isUndefined($scope.displayData[i].bindValue) || !$scope.displayData[i].bindValue === null) {
                    if ($scope.displayData[i].bindValue.trim()) {
                        j++;
                        HomeService.createPrimaryXML("CHK_AMT_" + j, $scope.displayData[i].bindValue.trim());
                    }
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

