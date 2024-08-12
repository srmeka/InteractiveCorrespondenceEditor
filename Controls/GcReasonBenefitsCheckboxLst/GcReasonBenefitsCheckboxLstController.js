app.controller('GcReasonBenefitsCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedData = [];
     
        $scope.ReasonData = [
            {insert_text:'IME', insert_value:'an Independent Medical Examination'},
            {insert_text:'discontinued treatment', insert_value:'the patient discontinuing treatment'},
            {insert_text:'recovery', insert_value:'the patient?s recovery'}
        ];

        $scope.clearAllSelectedData = function () {
            $scope.selectedData = [];
            $scope.ReasonData.map(function (item) {
                item.checked = false;
            })
        }

        $scope.selectItem = function (item) {
            $scope.selectedData = $scope.selectedData || [];
            if (item.checked) {
                $scope.selectedData.push(item);
            }
            else {
                $scope.selectedData.splice($scope.selectedData.indexOf(item), 1);
            }
        }

        $(document).ready($scope.clearAllSelectedData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcReasonBenefitsCheckboxLst', function (event) {
        try {
            for(var i = 0; i< $scope.selectedData.length;i++ ){
                if($scope.selectedData[i]){
                    var id = shareData.shareOutputXML.getElementsByTagName("REASON_BENEFITS_CEASED_REC").length;
                  
                      HomeService.createSecondaryTableXML("REASON_BENEFITS_CEASED_REC");
                      HomeService.createSecondaryXMLValue("REASON_BENEFITS_CEASED_REC", "CLM_FK", "1", id);
                      HomeService.createSecondaryXMLValue("REASON_BENEFITS_CEASED_REC", "REASON_BENE_CEASED", $scope.selectedData[i].insert_text, id);
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

