app.controller('WccReferredDropdownController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.claimJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Medical Personnel' || .Role == 'Assistant Surgeon' || .Role == 'Co Surgeon' || .Role == 'Occupational Therapist' || .Role == 'Physical Therapist' || .Role == 'Surgeon' || .Role == 'Doctor' || .Role == 'Other' || .Role == 'Hospital' || .Role == 'Medical Practice' || .Role == 'Occupational Therapy facility' || .Role == 'Physical Therapy facility'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.outputName = item.FirstName + '' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.Name + ' ' + item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                    item.outputName = item.Name;
                }
                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ClaimantNameData = getData($scope.claimJsonData);

        };

        inintPage();
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccReferredDropdown', function (event) {
        try {
            var refName = '', ref_fax = '', ref_work_phn = '', ref_work_ext = '';

            if ($scope.selectedName) {
                refName = $scope.selectedName.outputName;
                if (refName) {
                    refName = refName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }

                if ($scope.selectedName.PhoneNumbers) {
                    if ($scope.selectedName.PhoneNumbers.PhoneNumber) {
                        var phoneData = $scope.selectedName.PhoneNumbers.PhoneNumber;
                        if (Array.isArray(phoneData)) {
                            for (var i = 0; i < phoneData.length; i++) {
                                if (phoneData[i].Type == 'Fax') {
                                    ref_fax = '(' + phoneData[i].AreaCode + ')' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                                }
                                if (phoneData[i].Type == 'Number') {
                                    ref_work_phn = '(' + phoneData[i].AreaCode + ')' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                                    ref_work_ext = phoneData[i].Extension;
                                }
                            }
                        } else {
                            if (phoneData.Type == 'Fax') {
                                ref_fax = '(' + phoneData.AreaCode + ')' + phoneData.Exchange + '-' + phoneData.Number;
                            }
                            if (phoneData.Type == 'Number') {
                                ref_work_phn = '(' + phoneData.AreaCode + ')' + phoneData.Exchange + '-' + phoneData.Number;
                                ref_work_ext = phoneData.Extension;
                            }
                        }
                    }
                }
            }

            HomeService.createPrimaryXML("REFERRED_BY", refName);
            HomeService.createPrimaryXML("NJM_ATTNY_PHN", ref_work_phn);
            HomeService.createPrimaryXML("NJM_ATTNY_FAX", ref_fax);
            HomeService.createPrimaryXML("NJM_ATTNY_EXT", ref_work_ext);


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

