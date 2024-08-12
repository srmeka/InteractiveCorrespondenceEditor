app.controller('GcDeleteCoverageCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        //controlType: 1:checkbox 2:text box
        $scope.displayData = [
            { controlType: '1', labelText: 'Delete HO-61', tagName: 'DEL_HO_61_IND', checkboxName: 'DeleteHO-61', ctrlSelected: false },
            { controlType: '2', labelText: 'Delete HO-61 Item No.:', tagName: 'DEL_HO_61_ITEM_NO', checkboxName: 'DeleteHO-61ItemNo', ctrlSelected: false },
            { controlType: '1', labelText: 'Fur', tagName: 'FUR_IND', checkboxName: 'Fur', ctrlSelected: false },
            { controlType: '1', labelText: 'Jewelry', tagName: 'JEWELRY_IND', checkboxName: 'Jewelry', ctrlSelected: false },
            { controlType: '1', labelText: 'Silverware', tagName: 'SILVERWARE_IND', checkboxName: 'Silverware', ctrlSelected: false },
            { controlType: '2', labelText: 'Replaced Item No.:', tagName: 'REPL_ITEM_NO', checkboxName: 'ReplacedItemNo', ctrlSelected: false },
            { controlType: '1', labelText: 'Appraisal Attached', tagName: 'APPRSL_ATTCHD_IND', checkboxName: 'AppraisalAttached', ctrlSelected: false },
            { controlType: '1', labelText: 'Appraisal Requested', tagName: 'APPRSL_RQSTD_IND', checkboxName: 'AppraisalRequested', ctrlSelected: false }
        ];
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcDeleteCoverageCheckboxLst', function (event) {
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
                    if($scope.displayData[i].bindValue) {
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

