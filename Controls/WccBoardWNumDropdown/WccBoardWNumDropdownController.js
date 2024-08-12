app.controller('WccBoardWNumDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.numberData = JSPath.apply(".Claim.Matters.Matter", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccBoardWNumDropdown', function (event) {
        try {
            var board_num = ''
            if ($scope.BoardWNumber) {
                board_num = $scope.BoardWNumber.CaseNumber;
            }

            if (board_num != '') {

                if (shareData.shareOutputXML.getElementsByTagName("BOARD_W_NUMBER")[0]) {

                    shareData.shareOutputXML.getElementsByTagName("BOARD_W_NUMBER")[0].nodeTypedValue = board_num;
                } else {

                    HomeService.createPrimaryXML("BOARD_W_NUMBER", board_num);
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

