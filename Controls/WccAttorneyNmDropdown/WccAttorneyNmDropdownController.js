app.controller('WccAttorneyNmDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.claimJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Attorney'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.ClaimantNameData = [];


        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '')
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
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
    $scope.$on('WccAttorneyNmDropdown', function (event) {
        try {
            var outputName = '', author_fax = '', author_work_phn = '', author_work_ext = '';

            if ($scope.selectedAttorney) {
                outputName = $scope.selectedAttorney.displayName;
                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '');
                }

                if ($scope.selectedAttorney.PhoneNumbers.PhoneNumber) {
                    var phoneData = $scope.selectedAttorney.PhoneNumbers.PhoneNumber;
                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].Type == 'Fax') {
                                author_fax = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                            }
                            if (phoneData[i].Type == 'Number') {
                                author_work_phn = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                                author_work_ext = phoneData[i].Extension;
                            }
                        }
                    } else {
                        if (phoneData.Type == 'Fax') {
                            author_fax = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                        }
                        if (phoneData.Type == 'Number') {
                            author_work_phn = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                            author_work_ext = phoneData.Extension;
                        }
                    }
                   
                }
            }

            HomeService.createPrimaryXML("NJM_ATTORNEY_SYS", outputName.trim());
            HomeService.createPrimaryXML("NJM_ATTNY_PHN", author_work_phn);
            HomeService.createPrimaryXML("NJM_ATTNY_FAX", author_fax);
            HomeService.createPrimaryXML("NJM_ATTNY_EXT", author_work_ext);

           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

