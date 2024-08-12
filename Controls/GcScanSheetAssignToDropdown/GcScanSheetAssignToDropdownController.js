app.controller('GcScanSheetAssignToDropdownController', function ($rootScope, $scope, $http, shareData, HomeService) {
    try {

        $scope.Authors = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.userName = shareData.shareUserFullName.trim();

        function setDefaultName(userName) {
            if ($scope.Authors) {
                var UserMatch;
                $scope.Authors.forEach(function (item) {
                    if (userName == item.FirstName + ' ' + item.LastName) {
                        UserMatch = item;
                    }
                })
                if (UserMatch) {
                    $scope.selectedAuthor = UserMatch;
                    $rootScope.defaultAuthor = UserMatch;
                }
            }
        };

        $(document).ready(setDefaultName($scope.userName));

        $scope.selecAuthor = function () {
            if ($scope.selectedAuthor) {
                $rootScope.$broadcast('Selected Author', { authorEmail: $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue });
            } else {
                $rootScope.$broadcast('Selected Author', { authorEmail: undefined });
            }
        };

        switch ($scope.SelectedDocument.documentFriendlyName) {

            case 'Attorney Correspondence':
                $scope.LabelName2 = "Assign To 2:";

                $scope.Authors2 = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.userName2 = shareData.shareUserFullName.trim();

                function setDefaultName2(userName) {
                    if ($scope.Authors2) {
                        var UserMatch;
                        $scope.Authors2.forEach(function (item) {
                            if (userName == item.FirstName + ' ' + item.LastName) {
                                UserMatch = item;
                            }
                        })
                        if (UserMatch) {
                            $scope.selectedAuthor2 = UserMatch;
                            $rootScope.defaultAuthor2 = UserMatch;
                        }
                    }
                };

                $(document).ready(setDefaultName($scope.userName));

                $scope.selecAuthor2 = function () {
                    if ($scope.selectedAuthor2) {
                        $rootScope.$broadcast('Selected Author', { authorEmail: $scope.selectedAuthor2.EmailAddresses.EmailAddress.EmailAddressValue });
                    } else {
                        $rootScope.$broadcast('Selected Author', { authorEmail: undefined });
                    }
                };

                $scope.LabelName3 = "Assign To 3:";

                $scope.Authors3 = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'User'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.userName3 = shareData.shareUserFullName.trim();

                function setDefaultName3(userName) {
                    if ($scope.Authors3) {
                        var UserMatch;
                        $scope.Authors3.forEach(function (item) {
                            if (userName == item.FirstName + ' ' + item.LastName) {
                                UserMatch = item;
                            }
                        })
                        if (UserMatch) {
                            $scope.selectedAuthor3 = UserMatch;
                            $rootScope.defaultAuthor3 = UserMatch;
                        }
                    }
                };

                $(document).ready(setDefaultName($scope.userName));

                $scope.selecAuthor3 = function () {
                    if ($scope.selectedAuthor3) {
                        $rootScope.$broadcast('Selected Author', { authorEmail: $scope.selectedAuthor3.EmailAddresses.EmailAddress.EmailAddressValue });
                    } else {
                        $rootScope.$broadcast('Selected Author', { authorEmail: undefined });
                    }
                };
                break;
        };

    } //try

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcScanSheetAssignToDropdown', function (event) {
        try {

            var author_uid = '';
            var author_uid2 = '';
            var author_uid3 = '';

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'Undeliverable Mail':
                    if ($scope.selectedAuthor) {

                        if ($scope.selectedAuthor.EmployeeUserName) {
                            author_uid = $scope.selectedAuthor.EmployeeUserName;
                        }
                    };

                    if (author_uid) {
                        HomeService.createPrimaryXML("TAG7", "Assigned To ID:");
                        HomeService.createPrimaryXML("TAG7_NUM", "047:");
                        HomeService.createPrimaryXML("VALUE7", author_uid.trim());
                    };
                    break;

                case 'Attorney Correspondence':
                    if ($scope.selectedAuthor) {

                        if ($scope.selectedAuthor.EmployeeUserName) {
                            author_uid = $scope.selectedAuthor.EmployeeUserName;
                        }
                    };

                    if (author_uid) {
                        HomeService.createPrimaryXML("TAG10", "Assigned To ID:");
                        HomeService.createPrimaryXML("TAG10_NUM", "047:");
                        HomeService.createPrimaryXML("VALUE10", author_uid.trim());
                    } else {
                        HomeService.createPrimaryXML("TAG10", "");
                        HomeService.createPrimaryXML("TAG10_NUM", "");
                        HomeService.createPrimaryXML("VALUE10", "");
                    };

                    if ($scope.selectedAuthor2) {

                        if ($scope.selectedAuthor2.EmployeeUserName) {
                            author_uid2 = $scope.selectedAuthor2.EmployeeUserName;
                        }
                    };

                    if (author_uid2) {
                        HomeService.createPrimaryXML("TAG11", "Assigned To ID2:");
                        HomeService.createPrimaryXML("TAG11_NUM", "049:");
                        HomeService.createPrimaryXML("VALUE11", author_uid2.trim());
                    } else {
                        HomeService.createPrimaryXML("TAG11", "");
                        HomeService.createPrimaryXML("TAG11_NUM", "049:");
                        HomeService.createPrimaryXML("VALUE11", "");
                    };

                    if ($scope.selectedAuthor3) {

                        if ($scope.selectedAuthor3.EmployeeUserName) {
                            author_uid3 = $scope.selectedAuthor3.EmployeeUserName;
                        }
                    };

                    if (author_uid3) {
                        HomeService.createPrimaryXML("TAG12", "Assigned To ID3:");
                        HomeService.createPrimaryXML("TAG12_NUM", "051:");
                        HomeService.createPrimaryXML("VALUE12", author_uid3.trim());
                    } else {
                        HomeService.createPrimaryXML("TAG12", "");
                        HomeService.createPrimaryXML("TAG12_NUM", "");
                        HomeService.createPrimaryXML("VALUE12", "");
                    };
                    break;
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

