app.controller('GcHealthBenefitsCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedData = [];
     
        $scope.BenefitsData = [
            { insert_text: 'You failed to treat within the health carrier\'s guidelines.', insert_value: '1' },
            { insert_text: 'You didn\'t have health insurance on the date of accident.', insert_value: '2' },
            { insert_text: 'Your health insurance carrier cannot be selected as primary for PIP benefits.', insert_value:'3'}
        ];

        $scope.clearAllSelectedData = function () {
            $scope.selectedData = [];
            $scope.BenefitsData.map(function (item) {
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
    $scope.$on('GcHealthBenefitsCheckboxLst', function (event) {
        try {
            for(var i = 0; i< $scope.selectedData.length;i++ ){
                if($scope.selectedData[i]){
                    var id = shareData.shareOutputXML.getElementsByTagName("HEALTH_BEN_NOT_PROVIDED_REC").length;
                  
                    HomeService.createSecondaryTableXML("HEALTH_BEN_NOT_PROVIDED_REC");
                    HomeService.createSecondaryXMLValue("HEALTH_BEN_NOT_PROVIDED_REC", "HEALTH_BEN_NOT_PROVIDED", $scope.selectedData[i].insert_value, id);
                    HomeService.createSecondaryXMLValue("HEALTH_BEN_NOT_PROVIDED_REC", "CLM_FK", "1", id);
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

