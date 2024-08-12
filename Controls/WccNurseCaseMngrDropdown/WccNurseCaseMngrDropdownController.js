﻿app.controller('WccNurseCaseMngrDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimantNameJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Adjuster' || .Role == 'Attorney' || .Role == 'Attorney of Record' || .Role == 'Coder' || .Role == 'Supervisor' || .Role == 'Medical Services' || .Role == 'Awards Rep' || .Role == 'Case Management Rep' || .Role == 'DME Rep' || .Role == 'Provider Services Rep' || .Role == 'FNOL Rep' || .Role == 'Utilization Review Rep' || .Role == 'Subrogation Rep'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
      
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
    $scope.$on('WccNurseCaseMngrDropdown', function (event) {
        try {
            var outputName = '', fax_data = '',
                creds_data = '';
           
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
                if(outputName){
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }

                if ($scope.selectedName.PhoneNumbers && $scope.selectedName.PhoneNumbers.PhoneNumber) {
                    var phoneData = $scope.selectedName.PhoneNumbers.PhoneNumber;
                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].Category == 'Business' && phoneData[i].Type == 'Fax') {
                                fax_data = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                            }
                        }
                    } else {
                        if (phoneData.Category == 'Business' && phoneData.Type == 'Fax') {
                            fax_data = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                        }

                    }
                }
                if($scope.selectedName.Credentials){
                    creds_data = $scope.selectedName.Credentials.trim();
                }
            }
          
            HomeService.createPrimaryXML("NURSE_CASE_MGR_NM", outputName);
            HomeService.createPrimaryXML("NURSE_CASE_MGR_FX_NUM", fax_data);
            HomeService.createPrimaryXML("NURSE_CASE_MGR_CREDS", creds_data);
           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
