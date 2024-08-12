app.controller('GcOverpaymentTypeDropdownwControlsController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
       
        $scope.TypeData = [{ typeValue: 'Single Overpayment' }, { typeValue: 'Multiple Overpayments' }];

        $scope.checkNum = [];
        $scope.checkDate = [];
        $scope.checkAmount = [];
        $scope.serviceDate = [];
        $scope.overpayment = [];

        $scope.clearInputData = function () {
            $scope.checkNum.pop();
            $scope.checkDate.pop();
            $scope.checkAmount.pop();
            $scope.serviceDate.pop();
            $scope.overpayment.pop();
        }
        $scope.$watch('typeSelector', function (newValue, oldValue) {
            if (newValue === oldValue) { return; }
            if (newValue.typeValue === 'Single Overpayment') {
                $scope.checkNum = [];
                $scope.checkDate = [];
                $scope.checkAmount = [];
                $scope.serviceDate = [];
                $scope.overpayment = [];
            }
        }, true);

        $scope.MaxCtls = 100;
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
                $scope.TotalCount.pop(1);
                $scope.clearInputData();
            }
        }

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9.]/g, '');
            }
            return inputValue;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('GcOverpaymentTypeDropdownwControls', function (event) {
        try {
            var payment_type = '', totalCount = 0; 

            function outputData(dataIndex) {
                var table_id = shareData.shareOutputXML.getElementsByTagName("MULTI_OVERPAYMENT_REC").length;
                HomeService.createSecondaryTableXML("MULTI_OVERPAYMENT_REC");

                if ($scope.checkNum[dataIndex]) {
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_NO_MULTI", $scope.checkNum[dataIndex].trim(), table_id);
                }
                if ($scope.checkDate[dataIndex]) {
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_DT_MULTI", $scope.checkDate[dataIndex], table_id);
                }
                if ($scope.checkAmount[dataIndex]) {
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_AMT_MULTI", $scope.checkAmount[dataIndex], table_id);
                }
                if ($scope.serviceDate[dataIndex]) {
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "DT_SERVICE_MULTI", $scope.serviceDate[dataIndex], table_id);

                }
                if ($scope.overpayment[dataIndex]) {
                    totalCount += Number($scope.overpayment[dataIndex])
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_OVERPYMT_AMT_MULTI", $scope.overpayment[dataIndex], table_id);
                }

                HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CLM_FK", "1", table_id);
            }

            if ($scope.typeSelector) {

                payment_type = $scope.typeSelector.typeValue;

                if (payment_type === 'Single Overpayment') {
                    outputData(0);

                }
                if (payment_type === 'Multiple Overpayments') {
                    var i;
                    for (i = 0; i < $scope.TotalCount.length; i++) {
                        outputData(i)
                    }
                    if (i > 1 && totalCount >= 0) {
                        var id = shareData.shareOutputXML.getElementsByTagName("MULTI_OVERPAYMENT_REC").length;
                        HomeService.createSecondaryTableXML("MULTI_OVERPAYMENT_REC");
                        HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "TOT_CHK_AMT", totalCount, id);
                        HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CLM_FK", "1", id);
                    }
                }

            }
                HomeService.createPrimaryXML("OVERPYMNT_TYPE", payment_type);
            
                         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});