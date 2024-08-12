app.controller('WccOverpaymentSectionController', function ($scope, shareData, HomeService) {
    try {
 
        $scope.selectedOther = true;
        $scope.displayData = [
            { outputValue: 'Duplicate payment', labelText: 'Duplicate payment', checkboxName: 'DuplicatePayment', ctrlSelected: false },
            { outputValue: 'Overpaid based on history', labelText: 'Overpaid based on history', checkboxName: 'Over[aidHistory', ctrlSelected: false },
            { outputValue: 'Overpaid agreement amount', labelText: 'Overpaid agreement amount', checkboxName: 'OverpaidAmount', ctrlSelected: false },
            { outputValue: 'Incorrect provider', labelText: 'Incorrect provider', checkboxName: 'IncorrectProvider', ctrlSelected: false },
            { outputValue: 'NJM not the Worker\'s Compensation carrier', labelText: 'NJM not the WC carrier', checkboxName: 'WCCarrier', ctrlSelected: false },
            { outputValue: 'No provision for medical treatment', labelText: 'No provision for medical treatment', checkboxName: 'NoProvision', ctrlSelected: false },
            { outputValue: 'Service included within the global period', labelText: 'Service included within the global period', checkboxName: 'GlobalPeriod', ctrlSelected: false },
            { outputValue: 'Statute has expired', labelText: 'Statute has expired', checkboxName: 'ExpiredStatus', ctrlSelected: false },
            { outputValue: 'Treatment not authorized', labelText: 'Treatment not authorized', checkboxName: 'TreatmentNotAuthorized', ctrlSelected: false },
            { outputValue: 'Treatment not related to injury', labelText: 'Treatment not related to injury', checkboxName: 'NotRelatedToInjury', ctrlSelected: false }
      
        ];
        $scope.ReasonType = ['Single Overpayment', 'Multiple Overpayments'];

        $scope.checkNumber = [];
        $scope.checkDate = [];
        $scope.checkAmount = [];
        $scope.serviceDate = [];
        $scope.checkOverpayment = [];

        $scope.enabledCtrl = function () {
            if (!$scope.selectedOther) {
                $scope.otherReasonInfo = undefined;
            }
        };

        $scope.reasonTypeSelect = function () {
            if ($scope.selectedType === 'Multiple Overpayments') {
                $scope.totalAmountCalc();
            } else {
                $scope.totalAmount = undefined;
            }
            if (!$scope.selectedType) {
                $scope.checkNumber = [];
                $scope.checkDate = [];
                $scope.checkAmount = [];
                $scope.serviceDate = [];
                $scope.checkOverpayment = [];
            } else {
                $scope.checkNumber.length = 1;
                $scope.checkDate.length = 1;
                $scope.checkAmount.length = 1;
                $scope.serviceDate.length = 1;
                $scope.checkOverpayment.length = 1;
                $scope.TotalCount.length = 1;
            }
       
        };

        $scope.totalAmountCalc = function () {
            if ($scope.selectedType === 'Multiple Overpayments') {
                var total_value = 0;
                for (var i = 0; i < $scope.checkOverpayment.length; i++) {
                    var added_value = Number($scope.checkOverpayment[i]);

                    if (!isNaN(added_value)) {
                        total_value += added_value;
                    }
                }
                if (total_value > 0) {
                    $scope.totalAmount = $scope.formatDollar(total_value);
                }
            }
        }
        $scope.formatDollar = function (amt) {
            return parseFloat(Math.round(amt * 100) / 100).toFixed(2);
        }
       

        $scope.MaxCtls = 100;
        $scope.TotalCount = [1];

        $scope.clearAllData = function (clearId) {
            $scope.checkNumber[clearId] = undefined;
            $scope.checkDate[clearId] = undefined;
            $scope.checkAmount[clearId] = undefined;
            $scope.serviceDate[clearId] = undefined;
            $scope.checkOverpayment[clearId] = undefined;
            $scope.totalAmountCalc();
        }

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
                $scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccOverpaymentSection', function (event) {
        try {

            for (var i = 0; i < $scope.displayData.length; i++) {
                if($scope.displayData[i].ctrlSelected){
                    var table_id = shareData.shareOutputXML.getElementsByTagName("OVERPAYMENT_PARENT_REC").length;
                    HomeService.createSecondaryTableXML("OVERPAYMENT_PARENT_REC");
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OVERPYMNT_REASON", $scope.displayData[i].outputValue, table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "CLM_FK", "1", table_id);
                }
            }
            if ($scope.selectedOther) {
                if ($scope.otherReasonInfo) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("OVERPAYMENT_PARENT_REC").length;
                    HomeService.createSecondaryTableXML("OVERPAYMENT_PARENT_REC");
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OTH_OVERPYMNT_REASON", $scope.otherReasonInfo, table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "OVERPYMNT_REASON", "Other", table_id);
                    HomeService.createSecondaryXMLValue("OVERPAYMENT_PARENT_REC", "CLM_FK", "1", table_id);
                }
            }

            var overpayment_type = '';
            if ($scope.selectedType) {
                overpayment_type = $scope.selectedType;

                for (var i = 0; i < $scope.TotalCount.length; i++) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("MULTI_OVERPAYMENT_REC").length;
                    HomeService.createSecondaryTableXML("MULTI_OVERPAYMENT_REC");

                   if ($scope.checkNumber[i]) {
                       HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_NO_MULTI", $scope.checkNumber[i].trim(), table_id);
                   }
                   if ($scope.checkDate[i]) {
                       HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_DT_MULTI", $scope.checkDate[i].trim(), table_id);
                   }
                   if ($scope.checkAmount[i]) {
                       HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_AMT_MULTI", $scope.formatDollar($scope.checkAmount[i]), table_id);
                   }
                   if ($scope.serviceDate[i]) {
                       HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "DT_SERVICE_MULTI", $scope.serviceDate[i].trim(), table_id);
                   }
                   if ($scope.checkOverpayment[i]) {
                       HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CHK_OVERPYMT_AMT_MULTI", $scope.formatDollar($scope.checkOverpayment[i]), table_id);
                   }

                   HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CLM_FK", "1", table_id);
                }
                
                if ($scope.totalAmount) {
                    var table_id = shareData.shareOutputXML.getElementsByTagName("MULTI_OVERPAYMENT_REC").length;
                    HomeService.createSecondaryTableXML("MULTI_OVERPAYMENT_REC");
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "TOT_CHK_AMT", $scope.totalAmount, table_id);
                    HomeService.createSecondaryXMLValue("MULTI_OVERPAYMENT_REC", "CLM_FK", "1", table_id);
                }
            }

            HomeService.createPrimaryXML('OVERPYMNT_TYPE', overpayment_type)
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

