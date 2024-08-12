app.controller('GcParagraphCheckboxListController', function ($scope, shareData, HomeService) {
    try {

        //controlType: 1:checkbox 2:controlWithCheckbox 3:date picker
        $scope.displayData = [
            { controlType: '1', labelText: 'Notification of Revised DPR Enclosed', bindValue: '', tagName: 'REVISED_DPR_ENCL_CHKBOX', checkboxName: 'RevisedDPREnclosed', ctrlSelected: false },
            { controlType: '1', labelText: 'Pursuant to a Physician Review', bindValue: '', tagName: 'PURSUANT_PHYS_REV_CHKBOX', checkboxName: 'PursuantToAPhysician Review', ctrlSelected: false },
            { controlType: '1', labelText: 'Not clinically supported as Med Nec', bindValue: '', tagName: 'NOT_CLIN_SUPP_CHKBOX', checkboxName: 'NotclinicallysupportedasMedNec', ctrlSelected: false },
            { controlType: '2', labelText: 'Not causally related - Other', bindValue: '', tagName: 'NOT_CAUS_REL_OTHER_VALUE', checkboxName: 'NotcausallyrelatedOther', ctrlSelected: false },
            { controlType: '1', labelText: 'Not in accordance with Care Paths or accepted standard', bindValue: '', tagName: 'NOT_IN_ACCORD_CHKBOX', checkboxName: 'NotInAccordance', ctrlSelected: false },
            { controlType: '1', labelText: 'Med treatment/testing based on IME', bindValue: '', tagName: 'MED_TRMNT_BASED_IME_CHKBOX', checkboxName: 'TestingbasedonIME', ctrlSelected: false },
            { controlType: '1', labelText: 'Diagnosis not previously claimed', bindValue: '', tagName: 'DIAG_NOT_PREV_CLAIMED_CHKBOX', checkboxName: 'Diagnosisnotpreviouslyclaimed', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of updated medical documentation', bindValue: '', tagName: 'LACK_UPDATED_MED_DOC_CHKBOX', checkboxName: 'Lackofupdatedmedicaldocumentation', ctrlSelected: false },
            { controlType: '1', labelText: 'Req treatment/test/DME med unnecess or not supp', bindValue: '', tagName: 'REQ_TRMNT_MED_UNNECSS_CHKBOX', checkboxName: 'DMEmedunnecessornotsupp', ctrlSelected: false },
            { controlType: '1', labelText: 'Submitted med doc does not supp req treatment/testing/DME', bindValue: '', tagName: 'SUB_MED_DOC_NOT_SUPP_TRMNT_CHKBOX', checkboxName: 'Submittedmeddocdoesnotsuppreqtreatment', ctrlSelected: false },
            { controlType: '1', labelText: 'Unable to causally relate current diagnosis to MVA', bindValue: '', tagName: 'UNABLE_CAS_REL_TO_MVA_CHKBOX', checkboxName: 'UnabletocausallyrelatecurrentdiagnosistoMVA', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of conservative care to support medical necessity', bindValue: '', tagName: 'LACK_CONSRV_CARE_SUPP_MED_CHKBOX', checkboxName: 'Lackofconservativecaretosupportmedicalnecessity', ctrlSelected: false },
            { controlType: '1', labelText: 'Treatment not consistent with diagnosis', bindValue: '', tagName: 'TRMNT_NOT_CONSIST_W_DIAG_CHKBOX', checkboxName: 'Treatmentnotconsistentwithdiagnosis', ctrlSelected: false },
            { controlType: '1', labelText: 'Additional medicals/results required', bindValue: '', tagName: 'ADDTL_MED_RESULTS_REQ_CHKBOX', checkboxName: 'Additionalmedicals', ctrlSelected: false },
            { controlType: '2', labelText: 'Other details', bindValue: '', tagName: 'OTHER_DETAILS1_VALUE', checkboxName: 'Otherdetails', ctrlSelected: false },
            { controlType: '3', labelText: 'Benefits Termination Date', bindValue: '', tagName: 'BENEFITS_TERM_DT', checkboxName: 'BenefitsTerminationDate', dateFormat: 'MM/dd/yy', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of legible med documentation', bindValue: '', tagName: 'LACK_OF_LEG_MED_DOC_CHKBOX', checkboxName: 'Lackoflegiblemeddocumentation', ctrlSelected: false },
            { controlType: '1', labelText: 'Lack of current PT Rx/re-eval', bindValue: '', tagName: 'LACK_OF_CURR_PT_CHKBOX', checkboxName: 'LackofcurrentPTRx', ctrlSelected: false },
            { controlType: '1', labelText: 'Testing not reimbursable', bindValue: '', tagName: 'TEST_NOT_REIMBURSE_CHKBOX', checkboxName: 'Testingnotreimbursable', ctrlSelected: false },
            { controlType: '1', labelText: 'Failure to submit to IME', bindValue: '', tagName: 'FAIL_TO_SUBMIT_IME_CHKBOX', checkboxName: 'FailureToIME', ctrlSelected: false },
            { controlType: '1', labelText: 'Policy Limits Exhausted', bindValue: '', tagName: 'POL_LIMITS_EXHAUST_CHKBOX', checkboxName: 'PolicyLimitsExhausted', ctrlSelected: false },
            { controlType: '2', labelText: 'Additional Medical Documentation', bindValue: '', tagName: 'ADDTL_MED_DOC_VALUE', checkboxName: 'AdditionalMedicalDocumentation', ctrlSelected: false },
            { controlType: '1', labelText: 'Pursuant to N.J.A.C. 11:3-4 et seq', bindValue: '', tagName: 'PURSUANT_TO_NJAC_CHKBOX', checkboxName: 'PursuantToNJAC', ctrlSelected: false },
            { controlType: '1', labelText: 'Pursuant to the NJ PIP Fee Schedule', bindValue: '', tagName: 'PURSUANT_NJ_PIP_FEE_SCH', checkboxName: 'PursuantToNJPIP', ctrlSelected: false },
            { controlType: '1', labelText: 'Health Insurance Primary', bindValue: '', tagName: 'HLTH_INS_PRI_CHKBOX', checkboxName: 'HealthInsurancePrimary', ctrlSelected: false },
            { controlType: '1', labelText: 'Eligibility', bindValue: '', tagName: 'ELIGIBILITY_CHKBOX', checkboxName: 'Eligibility', ctrlSelected: false },
            { controlType: '1', labelText: 'Funds', bindValue: '', tagName: 'FUNDS_CHKBOX', checkboxName: 'Funds', ctrlSelected: false },
            { controlType: '1', labelText: 'DME', bindValue: '', tagName: 'DME', checkboxName: 'DME', ctrlSelected: false }
        ];

        //
        $scope.selectedItem = function (item) {
            if (!item.ctrlSelected) {
                item.bindValue = '';
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcParagraphCheckboxList', function (event) {
        try {
            
            for (var i = 0; i < $scope.displayData.length; i++) {
                if ($scope.displayData[i].controlType === '1') {
                    var outputValue = 'N';
                    if ($scope.displayData[i].bindValue) {
                        outputValue = 'Y';
                    }
                    HomeService.createPrimaryXML($scope.displayData[i].tagName, outputValue);
                }
          
                if ($scope.displayData[i].controlType === '2' || $scope.displayData[i].controlType === '3') {
                    var outputValue = '';
                    if($scope.displayData[i].ctrlSelected && $scope.displayData[i].bindValue) {
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

