app.controller('GcOperatorCheckboxListController', function ($scope, shareData, HomeService) {
    try {

        $scope.displayData = [
            { labelText: 'Left Scene Of Accident', onChecked: false, tagName: 'LEFT_ACC_SCENE_IND', checkboxName: 'LeftSceneOfAccident', outputValue: 'N' },
            { labelText: 'Suffered Blackout', onChecked: false, tagName: 'SUFFRD_BLKOUT_IND', checkboxName: 'SufferedBlackout', outputValue: 'N' },
            { labelText: 'Physically Or Mentally Impaired', onChecked: false, tagName: 'IMPRD_IND', checkboxName: 'PhysicallyOrMentallyImpaired', outputValue: 'N' },
            { labelText: 'Using Vehicle In Criminal Offense', onChecked: false, tagName: 'CRMNL_OFFNS_IND', checkboxName: 'UsingVehicleInCriminalOffense', outputValue: 'N' },
            { labelText: 'Charged With Reckless Driving', onChecked: false, tagName: 'RCKLSS_DRV_IND', checkboxName: 'ChargedWithRecklessDriving', outputValue: 'N' },
            { labelText: 'Fell Asleep At Wheel', onChecked: false, tagName: 'ASLEEP_AT_WHEEL_IND', checkboxName: 'AsleepatWheelIndicator', outputValue: 'N' },
            { labelText: 'Emergency Responder On Claim', onChecked: false, tagName: 'EMERG_RESPDR_ON_CLM_IND', checkboxName: 'EmergencyResponderOnClaim', outputValue: 'N' },
            { labelText: 'Not on Policy', onChecked: false, tagName: 'NOT_ON_POL_IND', checkboxName: 'NotonPolicyIndicator', outputValue: 'N' },
            { labelText: 'Under Influence Of Drugs Or Alcohol', onChecked: false, tagName: 'DUI_IND', checkboxName: 'DUIIndicator', outputValue: 'N' }
        ];

       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcOperatorCheckboxList', function (event) {
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


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

