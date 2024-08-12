app.controller('WccRecipientRoleAndAddressController', function ($scope, $http, shareData, HomeService) {
    try {
       
        $scope.Authors = JSPath.apply(".Claim.InvolvedParties.Party{.Role != 'Other'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.RoleData = [];
        $scope.AuthorsData = [];
        function getData(sourceData, roleType) {
            var displayData = [];
            sourceData.forEach(function (item) {
                if (item.Type === 'Person') {

                    item.displayName = item.FirstName + ' ' + item.MiddleInitial + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ').trim();
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

        $scope.selectedAutherRole = function (role) {
            $scope.AuthorsData = getData($scope.Authors, role);
            if ($scope.AuthorsData.length === 1) {
                $scope.selectedAuthor = $scope.AuthorsData[0];
            }
        }

        function inintPage() {
            $scope.RoleData = getRole($scope.Authors);
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
            return roleArray;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccRecipientRoleAndAddress', function (event) {
        try {
            var complete_name = '';

            if ($scope.selectedAuthor) {
                outputName = $scope.selectedAuthor.displayName;
                if (outputName) {
                    complete_name = outputName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }
            }

            HomeService.createPrimaryXML("CC_RECIPIENT2", complete_name);
           
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

