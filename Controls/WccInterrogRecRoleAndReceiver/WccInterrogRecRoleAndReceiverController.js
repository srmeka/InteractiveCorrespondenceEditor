app.controller('WccInterrogRecRoleAndReceiverController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.numberJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'Other'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.repeatCount = new Array(5);
        $scope.RoleData = [];
        $scope.receiverData = [];
        $scope.selectedRoleData = [];
        $scope.numberData = []

        function getData(sourceData, roleType) {
            var displayData = [];
            sourceData.forEach(function (item) {
                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '')
                    item.displayName = item.displayName.replace('  ', ' ')

                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }

                if (Array.isArray(item.Role)) {
                    if (item.Role.indexOf(roleType) > -1) {
                        displayData.push(item);
                    }
                } else {
                    if (roleType === item.Role) {
                        displayData.push(item);
                    }
                }
            });
            return displayData;
        }

        $scope.selectedRole = function (role, itemIndex) {
            $scope.numberData[itemIndex] = getData($scope.numberJsonData, role);
            if ($scope.numberData[itemIndex].length === 1) {
                $scope.receiverData[itemIndex] = $scope.numberData[itemIndex][0];
            }
        }

        function inintPage() {
            $scope.RoleData = getRole($scope.numberJsonData);
        };

        inintPage();

        function getRole(sourceData) {
            var roleArray = [];
            sourceData.forEach(function (item) {
                if (Array.isArray(item.Role)) {
                    item.Role.forEach(function (role) {
                        if (roleArray.indexOf(role) < 0) {
                            roleArray.push(role);
                        }
                    });
                } else {
                    if (roleArray.indexOf(item.Role) < 0) {
                        roleArray.push(item.Role);
                    }
                }
            });
            roleArray.sort();
            return roleArray;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccInterrogRecRoleAndReceiver', function (event) {
        try {

            var nameIndex = 0;
            for (var i = 0; i < $scope.repeatCount.length; i++) {
                var tableLabel = '';
                var nameValue = '';
                if ($scope.receiverData[i]) {
                    nameValue = $scope.receiverData[i].displayName;
                    nameIndex++;
                    if (nameIndex == 1) {
                        tableLabel = 'INTERR_RCVR';
                    } else {
                        var tableLabel = 'INTERR_RCVR' + nameIndex;
                    }
                    HomeService.createPrimaryXML(tableLabel, nameValue.trim());
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

