app.controller('WcuRetroDetailsRepeaterController', function ($scope, $http, $filter, shareData, HomeService) {
    try {
      
        $scope.SelectedRetro = [];
        $scope.retFileNum = [];
        $scope.retPolNum = [];
        $scope.retPolName = [];
        $scope.retPolDate = [];
        $scope.retPolYear = [];
     
        $scope.showAddBtn = true;
        $scope.showRemoveBtn = true;
        
        $scope.clearAllData = function (clearId) {
            
            $scope.retFileNum[clearId] = undefined;
            $scope.retPolNum[clearId] = undefined;
            $scope.retPolName[clearId] = undefined;
            $scope.retPolDate[clearId] = undefined;
            $scope.retPolYear[clearId] = undefined;  
        }

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        } 
        

        $scope.MaxCtls = 10;
        $scope.TotalCount = [1];

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.SelectedRetro[newItemNo] = false;
                $scope.clearAllData(newItemNo);
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuRetroDetailsRepeater', function (event) {
        try {
            var isCreateTable;
            if ($scope.SelectedRetro.length > 0) {

                isCreateTable = $scope.SelectedRetro.some(function (item) {
                    if (item) {
                        return true;
                    }

                });
                var id;
                for (var i = 0; i < $scope.TotalCount.length; i++) {

                    if ($scope.SelectedRetro[i]) {

                        id = shareData.shareOutputXML.getElementsByTagName("RETRO_TO_CRIB_REC").length;
                        HomeService.createSecondaryTableXML("RETRO_TO_CRIB_REC");

                        if ($scope.retFileNum[i]) {
                            HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "RETRO_BUREAU_FILE_NUM", $scope.retFileNum[i], id);
                        }

                        if ($scope.retPolNum[i]) {
                            HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "RETRO_POL_NUM", $scope.retPolNum[i], id);
                        }

                        if ($scope.retPolName[i]) {
                            HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "RETRO_POL_NAME", $scope.retPolName[i], id);
                        }

                        if ($scope.retPolDate[i]) {
                            HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "RETRO_POL_EFF_DT", $scope.retPolDate[i], id);
                        }

                        if ($scope.retPolYear[i]) {
                            HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "RETRO_POL_EFF_YR", $scope.retPolYear[i], id);
                        }
                        HomeService.createSecondaryXMLValue("RETRO_TO_CRIB_REC", "POL_FK", "1", id);
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
