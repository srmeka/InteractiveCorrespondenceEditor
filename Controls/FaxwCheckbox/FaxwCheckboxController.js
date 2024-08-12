app.controller('FaxwCheckboxController', function ($rootScope, $scope, shareData, $http, HomeService) {
    try {
        $scope.showFaxControl = true;

        var LOBName = HomeService.getUrlParameter('LOB').toUpperCase();

        $scope.clearAllSelectedData = function () {
            $scope.FaxNum1 = '';
            $scope.RecipientName1 = '';
            $scope.FaxNum2 = '';
            $scope.RecipientName2 = '';
            $scope.FaxNum3 = '';
            $scope.RecipientName3 = '';

            $scope.faxSubject = $scope.GetFaxSubject();
        }

        $scope.GetFaxSubject = function () {
            var LOBtext = '';

            if (LOBName == 'PC-PA') {
                LOBtext = 'Automobile';
            }
            else if (LOBName == 'PC-HO') {
                LOBtext = 'Homeowners';
            }
            else if (LOBName == 'PC-DW') {
                LOBtext = 'Dwelling';
            }
            else if (LOBName == 'PC-UMB') {
                LOBtext = 'Umbrella';
            }

            return 'Requested NJM ' + LOBtext + ' Information';
        }

        $scope.removeSpecialChars = function (item) {
            if (item) {
                return item.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
            }
        }
        $scope.numbersOnly = function (item) {
            if (item) {
                return item.replace(/[^0-9]/g, "");
            }
        }

        $rootScope.$on('newPolicySelect', function (event, data) {
            if (data.lookupItemCode === "New Policy") {
                $scope.clearAllSelectedData();
                $scope.SelectedFax = false;
                $scope.showFaxControl = false;
            } else {
                $scope.showFaxControl = true;
            }
          
        })

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('FaxwCheckbox', function (event) {
        try {
            if ($scope.SelectedFax) {
                var slectFax = "Y";
                HomeService.createPrimaryXML("FAX_IND", slectFax);
                var values = '';
                if($scope.FaxNum1 && $scope.RecipientName1){
                    values += '/name=' + $scope.RecipientName1.replace(/ /g, "%20")  + '/fax=' + $scope.FaxNum1 + '@rfax.njmgroup.com;';
                }
                if($scope.FaxNum2 && $scope.RecipientName2){
                    values += '/name=' + $scope.RecipientName2.replace(/ /g, "%20") + '/fax=' + $scope.FaxNum2 + '@rfax.njmgroup.com;';
                }
                if($scope.FaxNum3 && $scope.RecipientName3){
                    values += '/name=' + $scope.RecipientName3.replace(/ /g, "%20") + '/fax=' + $scope.FaxNum3 + '@rfax.njmgroup.com;';
                }
                    
               values && HomeService.createPrimaryXML("RIGHTFAX_NUM", values);
            
                HomeService.createPrimaryXML("FAX_SUBJECT", $scope.faxSubject);
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});