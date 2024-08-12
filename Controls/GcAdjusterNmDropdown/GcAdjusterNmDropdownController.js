app.controller('GcAdjusterNmDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.AdjusterNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.AdjusterNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.LastName;
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
            $scope.AdjusterNameData = getData($scope.AdjusterNameJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcAdjusterNmDropdown', function (event) {
        try {
            var outputName = '', adjust_ext = '';

            if ($scope.selectedName) {
                var outputName = $scope.selectedName.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }

                if ($scope.selectedName.PhoneNumbers && $scope.selectedName.PhoneNumbers.PhoneNumber) {

                    var phoneData = $scope.selectedName.PhoneNumbers.PhoneNumber;
                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].Category == 'Business' && phoneData[i].Type == 'Number') {
                                adjust_ext = phoneData[i].Extension;
                            }
                        }
                    }

                    else {
                        if (phoneData.Category == 'Business' && phoneData.Type == 'Number') {
                            adjust_ext = phoneData.Extension;
                        }
                    }
                }
            }
            HomeService.createPrimaryXML("ADJUSTERS_NAME", outputName.trim());
            HomeService.createPrimaryXML("ADJUSTERS_EXT", adjust_ext);

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

