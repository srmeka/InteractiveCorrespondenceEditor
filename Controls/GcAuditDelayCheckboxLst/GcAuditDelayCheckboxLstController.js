app.controller('GcAuditDelayCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.displayData = [
            { labelText: 'Admission and Discharge Summary', onChecked: false, tagName: 'ADMSN_DISCHRG_SUMM', checkboxName: 'AdmissionandDischargeSummary', outputValue: 'N' },
            { labelText: 'Physical Therapy Treatment Record', onChecked: false, tagName: 'PHYSICAL_THERAPY_TRTMNT_REC', checkboxName: 'PhysicalTherapyTreatmentRecord', outputValue: 'N' },
            { labelText: 'Physicians Orders Progress Notes', onChecked: false, tagName: 'PHYS_ORDER_PROG_NOTES', checkboxName: 'PhysiciansOrdersProgressNotes', outputValue: 'N' },
            { labelText: 'Emergency Room Record', onChecked: false, tagName: 'ER_REC', checkboxName: 'EmergencyRoomRecord', outputValue: 'N' },
            { labelText: 'All MRI CT Scan X-Ray and Ultrasound', onChecked: false, tagName: 'ALL_MRI_CT_SCAN_XRAY_ULTRA', checkboxName: 'AllMRICTScanXRayandUltrasound', outputValue: 'N' },
            { labelText: 'Anesthesia Time Sheet', onChecked: false, tagName: 'ANEST_TIME_SHEET', checkboxName: 'AnesthesiaTimeSheet', outputValue: 'N' },
            { labelText: 'Operative Report', onChecked: false, tagName: 'OPER_RPT', checkboxName: 'OperativeReport', outputValue: 'N' },
            { labelText: 'Consultation Report', onChecked: false, tagName: 'CONSULTATION_RPT', checkboxName: 'ConsultationReport', outputValue: 'N' },
            { labelText: 'Ambulance Call Report-or MICU', onChecked: false, tagName: 'AMB_CALL_RPT_MICU', checkboxName: 'AmbulanceCallReportorMICU', outputValue: 'N' },
            { labelText: 'Medication Record', onChecked: false, tagName: 'MEDICATION_REC', checkboxName: 'MedicationRecord', outputValue: 'N' },
            { labelText: 'Laboratory Studies', onChecked: false, tagName: 'LAB_STUDIES', checkboxName: 'LaboratoryStudies', outputValue: 'N' },
            { labelText: 'Nurses Notes', onChecked: false, tagName: 'NURSE_NOTES', checkboxName: 'NursesNotes', outputValue: 'N' },
            { labelText: 'Occupational Therapy Notes', onChecked: false, tagName: 'OCCPTNL_THERAPY_NOTES', checkboxName: 'OccupationalTherapyNotes', outputValue: 'N' },
            { labelText: 'Speech Therapy Notes', onChecked: false, tagName: 'SPEECH_THERAPY_NOTES', checkboxName: 'SpeechTherapyNotes', outputValue: 'N' },
            { labelText: 'CognitiveTherapyNotes', onChecked: false, tagName: 'COG_THERAPY_NOTES', checkboxName: 'CognitiveTherapyNotes', outputValue: 'N' }
        ];

       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcAuditDelayCheckboxLst', function (event) {
        try {
            
            for(var i = 0; i< $scope.displayData.length;i++ ){
                if ($scope.displayData[i].onChecked) {
                    $scope.displayData[i].outputValue = 'Y';
                }
                else {
                    $scope.displayData[i].outputValue = 'N';
                }

                HomeService.createPrimaryXML($scope.displayData[i].tagName, $scope.displayData[i].outputValue);
            }

            var misc_Explanation = '';
            if ($scope.miscExplanation) {
                misc_Explanation = $scope.miscExplanation;
            }

            HomeService.createPrimaryXML("MISC_EXPLANATION", misc_Explanation.trim());

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

