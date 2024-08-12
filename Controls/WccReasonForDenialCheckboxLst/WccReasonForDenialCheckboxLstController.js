app.controller('WccReasonForDenialCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedData = [];
     
        $scope.DenialData = [
            {insert_text:'not causally related to WC inj', insert_value:'not causally related to WC inj'},
            {insert_text:'not clinically supported', insert_value:'not clinically supported'},
            {insert_text:'treatment not consistent', insert_value:'treatment not consistent'},
            {insert_text:'medical necessity of further tx', insert_value:'medical necessity of further tx'},
            {insert_text:'lack of updated med doc', insert_value:'lack of updated med doc'}
        ];

        $scope.clearAllSelectedData = function () {
            $scope.selectedData = [];
            $scope.DenialData.map(function (item) {
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
    $scope.$on('WccReasonForDenialCheckboxLst', function (event) {
        try {
            for(var i = 0; i< $scope.selectedData.length;i++ ){
                if($scope.selectedData[i]){
                    var id = shareData.shareOutputXML.getElementsByTagName("DENIAL").length;
                  
                    HomeService.createSecondaryTableXML("DENIAL");
                    HomeService.createSecondaryXMLValue("DENIAL", "REASON_DENIAL", $scope.selectedData[i].insert_value, id);
                    HomeService.createSecondaryXMLValue("DENIAL", "CLM_FK", "1", id);
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

