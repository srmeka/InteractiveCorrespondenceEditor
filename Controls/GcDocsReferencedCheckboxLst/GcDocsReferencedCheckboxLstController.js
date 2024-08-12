app.controller('GcDocsReferencedCheckboxLstController', function ($scope, shareData, HomeService) {
    try {

        $scope.selectedData = [];
        $scope.DocsData = [];

        function getDocsLabel() {
            HomeService.LookupValue('DocumentsReferenced').then(function (response) {
                $scope.DocsData = response.data
            }, function (error) {
                $scope.error = error;
            })
        };

        getDocsLabel();

        $scope.clearAllSelectedData = function () {
            $scope.selectedData = [];
            $scope.DocsData.map(function (item) {
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
    $scope.$on('GcDocsReferencedCheckboxLst', function (event) {
        try {
            for(var i = 0; i< $scope.selectedData.length;i++ ){
                if($scope.selectedData[i]){
                    var id = shareData.shareOutputXML.getElementsByTagName("NJM_MULTIDOCS_REC").length;

                    HomeService.createSecondaryTableXML("NJM_MULTIDOCS_REC");
                    HomeService.createSecondaryXMLValue("NJM_MULTIDOCS_REC", "CLM_FK", "1", id);
                    HomeService.createSecondaryXMLValue("NJM_MULTIDOCS_REC", "DOCS_REFERENCED", $scope.selectedData[i].lookupItemCode, id);
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

