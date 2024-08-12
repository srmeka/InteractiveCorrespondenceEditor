app.controller('GcScanSheetClmtExpController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.ClaimantNameData = [];
        $scope.typeData = [];

        $scope.ShowItems = false;
        $scope.chkExpItem = new Array;

        function getData(sourceData) {
            var displayData = [];
            for (i=0; i< sourceData.length;i++){

                if (sourceData[i].Type === 'Person') {

                    sourceData[i].displayName = sourceData[i].FirstName + ' ' + sourceData[i].MiddleInitial + ' ' + sourceData[i].LastName + ' ' + sourceData[i].Suffix;
                    sourceData[i].displayName = sourceData[i].displayName.replace(/undefined/g, '').replace('  ', ' ');
                }
                if (sourceData[i].Type == 'Company') {
                    sourceData[i].displayName = sourceData[i].Name;
                }
                displayData.push(sourceData[i]);
            };
            var newArrrayItem = [{ displayName: 'No Coverage' }];
            sourceData[i] = newArrrayItem[0];
            displayData.push(sourceData[i]);
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.ClaimantNameJsonData);
        };

        inintPage();

        $scope.clearAllSelectedData = function () {
            if ($scope.chkExpItem.length > 0) {
                $scope.chkExpItem = new Array;
                //for (var i = 0; i < $scope.chkExpItem.length ; i++) {
                //    $scope.chkExpItem[i] = false;
                //}
            }
        };

        $scope.selectedClaimant = function () {

            var exposureType = [];
            $scope.typeData = [];
            $scope.clearAllSelectedData()

            if ($scope.selectedName.Exposures) {

                $scope.ShowItems = true;

                if ($scope.selectedName.Exposures.Exposure.length) {
                    for (i = 0; i < $scope.selectedName.Exposures.Exposure.length; i++) {
                        exposureType.push($scope.selectedName.Exposures.Exposure[i]);
                        $scope.typeData = exposureType;
                    }
                }
                else {
                    exposureType.push($scope.selectedName.Exposures.Exposure);
                    $scope.typeData = exposureType;
                    $scope.selectedType = exposureType[0];
                }
            }
        };

        switch ($scope.SelectedDocument.documentFriendlyName) {
            case 'Undeliverable Mail':
                $scope.LabelName1 = "*Assigned To:";
                $scope.Required1 = true;

                break;
        };
    } //try
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcScanSheetClmtExp', function (event) {
        try {

            if ($scope.selectedName) {
                HomeService.createPrimaryXML("CLMT_NAME", $scope.selectedName.displayName.trim());
            } else {
                HomeService.createPrimaryXML("CLMT_NAME", "No Coverage");
            };

            var expNos = undefined;

            HomeService.createPrimaryXML("TAG6", "Exposure Number:");
            HomeService.createPrimaryXML("TAG6_NUM", "043:");

            if ($scope.chkExpItem.length > 0) {

                for (var i = 0; i < $scope.chkExpItem.length ; i++) {
                    if ($scope.chkExpItem[i] == true) {
                        if ($scope.chkExpItem.length != 1) {
                            if (!expNos) {
                                expNos = $scope.selectedName.Exposures.Exposure[i].ExposureNumber;
                            }
                            else {
                                expNos += ";" + $scope.selectedName.Exposures.Exposure[i].ExposureNumber;
                            }
                        } else {

                            if ($scope.chkExpItem) {
                                if (!expNos) {
                                    try {
                                        expNos = $scope.selectedName.Exposures.Exposure[0].ExposureNumber;
                                    }
                                    catch (ex) {
                                        
                                        try {
                                            expNos = $scope.selectedName.Exposures.Exposure.ExposureNumber;
                                        }
                                        catch (ex) { }
                                    }
                                }
                                else {
                                    expNos += ";" + $scope.selectedName.Exposures.Exposure[0].ExposureNumber;
                                }
                            }
                        }
                    }
                }
            };

            if (expNos) {
                HomeService.createPrimaryXML("VALUE6", expNos);
            } else {
                HomeService.createPrimaryXML("VALUE6", "0");
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});