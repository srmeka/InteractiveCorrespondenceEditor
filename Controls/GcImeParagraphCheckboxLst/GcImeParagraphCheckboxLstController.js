app.controller('GcImeParagraphCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedFlag = [];
        $scope.displayData = [
            {controlId:00, labelText: 'Does the claimant require MRI \'s', tagName: 'CLMT_REQ_MRI', checkboxName: 'claimantRequire', ctrlSelected: false },
            { controlId: 00, labelText: 'Does the clmnt req EDX testing', tagName: 'CLMT_REQ_EDX', checkboxName: 'EDXTesting', ctrlSelected: false },
            { controlId: 01, labelText: 'Is any further treatment req', tagName: 'REQ_FURTHER_TRMNT', checkboxName: 'TreatmentReq', ctrlSelected: false },
            { subId: 01, labelText: 'Conservative treatment', tagName: 'CONSERVE_TRMNT', checkboxName: 'ConservationTreatment', ctrlSelected: false },
            { subId: 01, labelText: 'Interventional treatment', tagName: 'INTERVENT_TRMNT', checkboxName: 'InterventTreatment', ctrlSelected: false },
            { subId: 01, labelText: 'Surgical treatment', tagName: 'SURGICAL_TRMNT', checkboxName: 'SurgicalTreatment', ctrlSelected: false },
            { subId: 01, labelText: 'Medication required', tagName: 'MED_REQ', checkboxName: 'MedicationRequired', ctrlSelected: false },
            { controlId: 02, labelText: 'Please evaluate and address', tagName: 'EVAL_AND_ADDRESS', checkboxName: 'EvaluateAddress', ctrlSelected: false },
            { subId: 02, labelText: 'Req complementary acupuncture', tagName: 'REQ_COMPLE_ACUPUNCT', checkboxName: 'CompleAcupunct', ctrlSelected: false },
            { subId: 02, labelText: 'Should continue with acupuncture', tagName: 'CONTINUE_ACUPUNCT', checkboxName: 'ContinueAcupunct', ctrlSelected: false },
            { subId: 02, labelText: 'No Clinical condition to support', tagName: 'NO_CLINICAL_SUPPORT', checkboxName: 'Condition', ctrlSelected: false },
            { controlId: 00, labelText: 'Are the CPT Codes submitted', tagName: 'CPT_CODES_SUB', checkboxName: 'CPTCodes', ctrlSelected: false },
            { controlId: 00, labelText: 'Med necessity for DME supplies', tagName: 'NEC_MED_DME', checkboxName: 'DMESupplies', ctrlSelected: false },
            { controlId: 00, labelText: 'For Chiropractors only', tagName: 'CHIRO_ONLY', checkboxName: 'ChiropractorsOnly', ctrlSelected: false },
            //{ labelText: 'Additional Questions', tagName: 'CLMT_REQ_MRI', checkboxName: 'AdditionalQuestions', ctrlSelected: false }
            
        ];

        $scope.selectedItem = function (item) {
                if (item.ctrlSelected) {
                    if ($scope.selectedFlag.indexOf(item.controlId) < 0) {
                        $scope.selectedFlag.push(item.controlId);
                    }
                }
                else {
                    var itemIndex = $scope.selectedFlag.indexOf(item.controlId);
                    if (itemIndex > -1) {
                        $scope.selectedFlag.splice(itemIndex, 1);
                        $scope.displayData.map(function (controls) {
                            if (controls.subId && controls.subId === item.controlId) {
                                controls.ctrlSelected = false;
                            }
                        });
                    }
                }
            }

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcImeParagraphCheckboxLst', function (event) {
        try {
            
            for (var i = 0; i < $scope.displayData.length; i++) {
               var outputValue = '';
               if ($scope.displayData[i].ctrlSelected) {
                   outputValue = 'Y';
                   HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue);
               } else {
                   if (!$scope.displayData[i].subId) {
                       HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue);
                   }
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

