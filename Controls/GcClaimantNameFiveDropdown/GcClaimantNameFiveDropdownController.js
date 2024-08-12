app.controller('GcClaimantNameFiveDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }
                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.ClaimantNameJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcClaimantNameFiveDropdown', function (event) {
        try {
            var outputName = '', outputName2 = '', outputName3 = '', outputName4 = '', outputName5 = '';
            var codeNum = 0;
            if( $scope.selectedName){
                 outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }

            }

            if ($scope.selectedName2) {
                 outputName2 = $scope.selectedName2.displayName;
                if (outputName2) {
                    outputName2 = outputName2.replace(/undefined/g, '').replace('  ', ' ');
                }

            }

            if ($scope.selectedName3) {
                outputName3 = $scope.selectedName3.displayName;
                if (outputName3) {
                    outputName3 = outputName3.replace(/undefined/g, '').replace('  ', ' ');
                }

            }

            if ($scope.selectedName4) {
                outputName4 = $scope.selectedName4.displayName;
                if (outputName4) {
                    outputName4 = outputName4.replace(/undefined/g, '').replace('  ', ' ');
                }

            }


            if ($scope.selectedName5) {
                outputName5 = $scope.selectedName5.displayName;
                if (outputName5) {
                    outputName5 = outputName5.replace(/undefined/g, '').replace('  ', ' ');
               }

            }

            if (outputName) {
                codeNum++;
                HomeService.createPrimaryXML("CLMT_NAME_" + codeNum, outputName.trim());
            }
            if (outputName2) {
                codeNum++;
                HomeService.createPrimaryXML("CLMT_NAME_" + codeNum, outputName2.trim());
            }
            if (outputName3) {
                codeNum++;
                HomeService.createPrimaryXML("CLMT_NAME_" + codeNum, outputName3.trim());
            }
            if (outputName4) {
                codeNum++;
                HomeService.createPrimaryXML("CLMT_NAME_" + codeNum, outputName4.trim());
            }
            if (outputName5) {
                codeNum++;
                HomeService.createPrimaryXML("CLMT_NAME_" + codeNum, outputName5.trim());
            }
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

