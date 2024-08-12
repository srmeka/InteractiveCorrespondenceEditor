app.controller('GcAuthorDropdownController', function ($rootScope, $scope, $http, shareData, HomeService) {
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

        //setDefaultName($scope.userName);
        $(document).ready(setDefaultName($scope.userName));


        $scope.selecAuthor = function () {
            if ($scope.selectedAuthor) {
                $rootScope.$broadcast('Selected Author', { authorEmail: $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue });
            } else {
                $rootScope.$broadcast('Selected Author', { authorEmail: undefined });
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcAuthorDropdown', function (event) {
        try {
            var author_name = '', author_email = '', author_fax = '',
                author_titl = '', author_work_phn = '', author_work_ext = '', author_creds = '',
                author_exec_ind = '', author_uid = '', author_uid_arch = '';

            if ($scope.selectedAuthor) {
                var outputName = '';
                if ($scope.selectedAuthor.FirstName) {
                    outputName += $scope.selectedAuthor.FirstName + ' ';
                }
                if ($scope.selectedAuthor.LastName) {
                    outputName += $scope.selectedAuthor.LastName;
                }
                if (outputName) {
                    outputName = outputName.replace(/undefined/, '');
                }

                author_name = outputName;
                //]/PhoneNumbers/PhoneNumber[Category='Business' and Type='Fax']
                if ($scope.selectedAuthor && $scope.selectedAuthor.EmailAddresses &&
                    $scope.selectedAuthor.EmailAddresses.EmailAddress && $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue) {
                    author_email = $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue;
                }
                if ($scope.selectedAuthor.PhoneNumbers && $scope.selectedAuthor.PhoneNumbers.PhoneNumber) {
                    var phoneData = $scope.selectedAuthor.PhoneNumbers.PhoneNumber;
                    if (Array.isArray(phoneData)) {
                        for (var i = 0; i < phoneData.length; i++) {
                            if (phoneData[i].Category == 'Business' && phoneData[i].Type == 'Fax') {
                                author_fax = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                            }
                            else if (phoneData[i].Category == 'Business' && phoneData[i].Type == 'Number') {
                                author_work_phn = '(' + phoneData[i].AreaCode + ') ' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                                author_work_ext = phoneData[i].Extension;
                            }
                        }
                    }
                    else {
                        if (phoneData.Category == 'Business' && phoneData.Type == 'Fax') {
                            author_fax = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                        }
                        else if (phoneData.Category == 'Business' && phoneData.Type == 'Number') {
                            author_work_phn = '(' + phoneData.AreaCode + ') ' + phoneData.Exchange + '-' + phoneData.Number;
                            author_work_ext = phoneData.Extension;
                        }
                    }
                }

                if ($scope.selectedAuthor.JobTitle) {
                    if (Array.isArray($scope.selectedAuthor.JobTitle)) {
                        author_titl = $scope.selectedAuthor.JobTitle[0];
                    }
                    else {
                        author_titl = $scope.selectedAuthor.JobTitle;
                    }
                }

                if ($scope.selectedAuthor.Credentials) {
                    author_creds = $scope.selectedAuthor.Credentials;
                }
                if ($scope.selectedAuthor.IsOfficerOrManager) {
                    if ($scope.selectedAuthor.IsOfficerOrManager == "true") {
                        author_exec_ind = "Y";
                    }
                    else {
                        author_exec_ind = "N";
                    }
                }
                if ($scope.selectedAuthor.EmployeeUserName) {
                    author_uid = $scope.selectedAuthor.EmployeeUserName;
                }
                if ($scope.selectedAuthor.EmployeeUserName) {
                    author_uid_arch = $scope.selectedAuthor.EmployeeUserName;
                }


            }

            if (author_name) {
                HomeService.createPrimaryXML("AUTHOR_NAME", author_name.trim());
            }
            if (author_email) {
                HomeService.createPrimaryXML("AUTHOR_EMAIL", author_email.trim());
            }
            if (author_fax) {
                HomeService.createPrimaryXML("AUTHOR_FAX", author_fax.trim());
            }
            if (author_titl) {
                HomeService.createPrimaryXML("AUTHOR_TITL", author_titl.trim());
            }
            if (author_work_phn) {
                HomeService.createPrimaryXML("AUTHOR_WORK_PHN", author_work_phn.trim());
            }
            if (author_work_ext) {
                HomeService.createPrimaryXML("AUTHOR_WORK_EXT", author_work_ext.trim());
            }
            if (author_creds) {
                HomeService.createPrimaryXML("AUTHOR_CREDS", author_creds.trim());
            }
            if (author_exec_ind) {
                HomeService.createPrimaryXML("AUTHOR_EXEC_IND", author_exec_ind.trim());
            }
            if (author_uid) {
                HomeService.createPrimaryXML("AUTHOR_UID", author_uid.trim());
            }
            if (author_uid_arch) {
                HomeService.createPrimaryXML("AUTHOR_UID_ARCH", author_uid_arch.trim());
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

