app.controller('DropdownwTextboxController', function ($scope, shareData, $http, HomeService) {
    try{
        $scope.ReturnPayment = [{
            Id: 1,
            name: 'Duplicate Payment'
        },
        {
            Id: 2,
            name: 'Insufficient Deposit'
        }, {
            Id: 3,
            name: 'Incorrect Amount'
        }, {
            Id: 4,
            name: 'Return Payment No Signature'
        }, {
            Id: 5,
            name: 'Incorrect Payee'
        }, {
            Id: 6,
            name: 'Policy Paid in Full'
        }, {
            Id: 7,
            name: 'Customer Request'
        }, {
            Id: 8,
            name: 'Damaged Check'
        }, {
            Id: 9,
            name: 'Legal Line'
        }, {
            Id: 10,
            name: 'Illegible'
        }, ]
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('DropdownwTextbox', function (event) {
        try{
            if ($scope.SelectedPayment)
            {
                HomeService.createPrimaryXML("RETURN_PYMT", $scope.SelectedPayment.name);
            }
            if($scope.Depositamount)
            {
                HomeService.createPrimaryXML("DEP_AMT", $scope.Depositamount)
            }
            if ($scope.InstallmentAmount) {
                HomeService.createPrimaryXML("INSTMNT_AMT", $scope.InstallmentAmount)
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});

