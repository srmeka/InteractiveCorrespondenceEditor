app.controller('WccDoctypeDropdownController', function ($scope, $rootScope, $http, shareData, HomeService) {
    try {
        var LOBName = HomeService.getUrlParameter('LOB');

        if ($scope.SelectedDocument.documentFriendlyName == 'HIPAA Signed Rxst Records') {
            var docType = new Array();
            docType.push({ categoryFriendlyName: 'Adjuster' });
            docType.push({ categoryFriendlyName: 'Legal' })
            $scope.displayData = docType;
        }
        else {

            try {
                HomeService.GetLOBandCategoryWithParam(1, LOBName, "none").then(function (response) {
                    var categoryArray = response.data;
                    var excludeCateogry = ['WCC', 'Custom Letter', 'Medical Utilization', 'NY Forms', 'PA Forms'];

                    for (i = 0; i < excludeCateogry.length; i++) {

                        excludecategoryItem(categoryArray, excludeCateogry[i]);
                    }
                    $scope.displayData = categoryArray;
                },
               function (error) {

                   if (error.data.message) {
                       $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data.message;
                   }

                   else if (error.data) {
                       $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data;
                   }
                   else {
                       $scope.errorDetail = "Error occurred while retrieving categories.";
                   }
               });
            }
            catch (ex) {
                $scope.errorDetail = "Error occurred while retrieving categories -- " + ex.message;
                return;
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    function excludecategoryItem(categoryArray,categorytoRemove) {
        for (j = 0; j < categoryArray.length; j++) {
            if (categorytoRemove == categoryArray[j].categoryFriendlyName)
                categoryArray.splice(j, 1);
        }
    }
    $scope.$on('WccDoctypeDropdown', function (event) {
        try {
            if (shareData.shareOutputXML.getElementsByTagName("OUTBND_DOCTYPE")[0]) {
                root = shareData.shareOutputXML.getElementsByTagName("WCC_CLAIM_REC")[0];
                var elementToRemove = shareData.shareOutputXML.getElementsByTagName("OUTBND_DOCTYPE")[0];
                root.removeChild(elementToRemove);
            }
            if ($scope.selectedDocType) {
                HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.selectedDocType.categoryFriendlyName);
            }
         
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

