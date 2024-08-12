app.controller('PcpaClaimOnPolDrpdwnwCntrlswCheckboxController', function ($scope, $http, $filter, shareData, HomeService) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
    
        $scope.ClaimData = [
            {optionValue: 'No Claims on Policy', output: 'None', selectedType: 1},
            { optionValue: 'Policy with Claim', output: 'Policy Claim', selectedType: 2 },
            { optionValue: 'Policy with Claim-Driver(s)', output: 'Driver Claim', selectedType: 3},
            { optionValue: ' Policy with Claim-Vehicle', output: 'Vehicle Claim', selectedType: 4},
        ];

   

        $scope.MaxCtls = 6;
        $scope.TotalCount = [1];

        $scope.claimDate = [];
        $scope.claimNumber = [];
        $scope.claimDescription = [];

        $scope.clearAllData = function () {
            $scope.TotalCount = [1];
            $scope.selectedValue = undefined;
            $scope.claimDate = [];
            $scope.claimNumber = [];
            $scope.claimDescription = [];
            $scope.reportedNum = undefined;
        }

        $scope.clearData = function (clearId) {
            $scope.claimNumber[clearId] = undefined;
            $scope.claimDate[clearId] = undefined;
            $scope.claimDescription[clearId] = undefined;
           
        }

        $scope.$watch('selectedValue', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            $scope.TotalCount = [1];
                    $scope.claimDate = [];
                    $scope.claimNumber = [];
                    $scope.reportedNum = undefined;
                    $scope.claimDescription = [];
        }, true);


      
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
                $scope.clearData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaClaimOnPolDrpdwnwCntrlswCheckbox', function (event) {
        try {
            if($scope.selectedValue){
                HomeService.createPrimaryXML("CLAIMS_POL_IND", $scope.selectedValue.output);

                if($scope.reportedNum) {
                    HomeService.createPrimaryXML("NUM_CLM_RPT", $scope.reportedNum);
                }

                if ($scope.selectedValue.selectedType !== 1) {
                    for (var index in $scope.TotalCount) {

                        var id = shareData.shareOutputXML.getElementsByTagName("CLAIMS_POL").length;
                        HomeService.createSecondaryTableXML("CLAIMS_POL");
                        if ($scope.claimNumber[index]) {
                            HomeService.createSecondaryXMLValue("CLAIMS_POL", "CLAIM_NUM", $scope.claimNumber[index], id);
                        }
                        
                        var selectedDate = $filter('date')($('#claimDateId' + index)[0].value, "yyyy-MM-dd");

                        if (selectedDate) {
                            HomeService.createSecondaryXMLValue("CLAIMS_POL", "CLAIM_DT", selectedDate, id);
                        }
                        if ($scope.claimDescription[index]) {
                            HomeService.createSecondaryXMLValue("CLAIMS_POL", "CLAIM_DESC", $scope.claimDescription[index], id);
                        }
                        HomeService.createSecondaryXMLValue("CLAIMS_POL", "POL_FK", "1", id);

                        id++;
                    }
                }
              
            }
            
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

