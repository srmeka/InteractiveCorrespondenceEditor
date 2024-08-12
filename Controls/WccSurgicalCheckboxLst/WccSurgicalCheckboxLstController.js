app.controller('WccSurgicalCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        //controlType: 1:checkbox 2:controlWithCheckbox 3:text box
        $scope.displayData = [
            //{ controlType: '3', labelText: 'Provider Fax Number', bindValue: '', tagName: 'PROVIDER_FAX_NO', checkboxName: 'ProviderFaxNumber', ctrlSelected: false },
            { controlType: '2', labelText: 'Surgery Comments Additional Information:', bindValue: '', tagName: 'SURGERY_COMMENTS_ADDL_INFO', checkboxName: 'PursuantToAPhysician Review', ctrlSelected: false },
            { controlType: '1', labelText: 'Not clinically supported as medically necessary', bindValue: '', tagName: 'NOT_CLINIC_SUP_MED_NECESSARY', checkboxName: 'NotClinicallySupportedAsMedicallyNecessary', ctrlSelected: false },
            { controlType: '1', labelText: 'Not in accordance with accepted standards', bindValue: '', tagName: 'NOT_ACCORD_ACCEPT_STD', checkboxName: 'NotInAccordanceWithAcceptedStandards', ctrlSelected: false },
            { controlType: '1', labelText: 'Denied as non compensable', bindValue: '', tagName: 'DENIED_NON_COMPENSABLE', checkboxName: 'DeniedAsNonCompensable', ctrlSelected: false },
            { controlType: '1', labelText: 'Not causally related', bindValue: '', tagName: 'NOT_CAUSALLY_REL', checkboxName: 'NotCausallyRelated', ctrlSelected: false },
            { controlType: '1', labelText: 'Decision pending IME/DME', bindValue: '', tagName: 'DECISION_PEND_IME', checkboxName: 'DecisionpendingIME', ctrlSelected: false },
            { controlType: '1', labelText: 'Decision pending second opinion', bindValue: '', tagName: 'DECISION_PEND_SEC_OPINION', checkboxName: 'DecisionPendingSecondOpinion', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of updated medical documentation', bindValue: '', tagName: 'LACK_UPDATED_MED_DOC', checkboxName: 'LackOfUpdatedMedicalDocumentation', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of conservative care to support medical necessity', bindValue: '', tagName: 'LACK_CONSERV_CARE_SUP_MED_NECESSITY', checkboxName: 'LackOfConservativeCareToSupportMedicalNecessity', ctrlSelected: false }
           
        ];

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccSurgicalCheckboxLst', function (event) {
        try {
            
            for (var i = 0; i < $scope.displayData.length; i++) {
                if ($scope.displayData[i].controlType === '1') {
                    var outputValue = 'N';
                    if ($scope.displayData[i].ctrlSelected) {
                        outputValue = 'Y';
                    }
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue);
                }
          
                if ($scope.displayData[i].controlType === '2') {
                    var outputValue = '';
                    if($scope.displayData[i].ctrlSelected && $scope.displayData[i].bindValue) {
                        outputValue = $scope.displayData[i].bindValue;
                    }
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue.trim());
                }

                if ($scope.displayData[i].controlType === '3') {
                    var outputValue = '';
                    if ($scope.displayData[i].bindValue) {
                        outputValue = $scope.displayData[i].bindValue;
                    }
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue.trim());
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

