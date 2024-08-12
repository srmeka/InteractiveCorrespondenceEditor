app.controller('WcuYearModRepeaterController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.YearModCheckbox = new Array;
        $scope.YMYear = new Array;
        $scope.YMMod = new Array;

        $scope.TotalCount = [1];
        $scope.MaxCtls = [5];
        $scope.showAddBtn = true;

        $scope.DateOutputFormat = "yyyy-mm-dd";
        $scope.EffExpDate = false;
        
        $scope.clearAllData = function (clearId) {

            $scope.YMYear[clearId] = undefined;
            $scope.YMMod[clearId] = undefined;

            if ($scope.SelectedDocument.documentFriendlyName == 'Exp Mod Letter Bidding-Dates') {
                $scope.EffDate[clearId] = null;
                $scope.ExpDate[clearId] = null;
            }
  
            if ($scope.populateData.length === 1) {

                $scope.showAddBtn = true;
                $scope.showRemoveBtn = false;
            }

        }

        if ($scope.SelectedDocument.documentFriendlyName == 'Exp Mod Letter Bidding-Dates') {
            $scope.EffExpDate = true;
            $scope.EffDate = [];
            $scope.ExpDate = [];
        }

        $scope.AddNewYearModSection = function () {
            if ($scope.TotalCount.length < 5) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }

        $scope.RemoveYearModSection = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.YearModCheckbox[newItemNo] = false;
                $scope.TotalCount.pop();
                $scope.clearAllData(newItemNo)
            }
        }

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        }

        $scope.selectedYM = function (clearId) {
            $scope.clearAllData(clearId);
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuYearModRepeater', function (event) {
        try {

            var id = 0;

            for (i = 0; i <= $scope.YearModCheckbox.length; i++) {
                if ($scope.YearModCheckbox[i] == true) {

                    HomeService.createSecondaryTableXML("EXP_RATE");
                    HomeService.createSecondaryXMLValue("EXP_RATE", "POL_FK", "1", id);

                    if ($scope.YMYear[i]) {
                        HomeService.createSecondaryXMLValue("EXP_RATE", "POL_YR", $scope.YMYear[i], id);
                    }

                    if ($scope.YMMod[i]) {
                        HomeService.createSecondaryXMLValue("EXP_RATE", "MOD", $scope.YMMod[i], id);
                    }

                    if ($scope.SelectedDocument.documentFriendlyName == 'Exp Mod Letter Bidding-Dates') {
                        if ($scope.EffDate[i]) {
                            HomeService.createSecondaryXMLValue("EXP_RATE", "EMR_EFF_DT", $scope.EffDate[i], id);
                        }

                        if ($scope.ExpDate[i]) {
                            HomeService.createSecondaryXMLValue("EXP_RATE", "EMR_EXP_DT", $scope.ExpDate[i], id);
                        }
                    }

                    id = id + 1;
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
