app.controller('WccAuthorRoleAndNameController', function ($rootScope, $scope, $http, shareData, HomeService) {
    try {

        //$scope.Authors = JSPath.apply(".Claim.InvolvedParties.Party{.Role == 'Adjuster' || .Role == 'Petitioners Attorney' || .Role == 'Award Rep' || .Role == 'Case Management Rep' || .Role == 'Coder' || .Role == 'DME Rep' || .Role == 'Medical Services' || .Role == 'Provider Services Rep' || .Role == 'Subrogation Rep' || .Role == 'Supervisor' || .Role == 'Utilization Review Rep'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.Authors = JSPath.apply(".Claim.InvolvedParties.Party", shareData.shareJSONClaim.CorrespondenceDataResponse);
        if (JSPath.apply(".Claim.CurrentUser", shareData.shareJSONClaim.CorrespondenceDataResponse)[0]) {
            $scope.Authors.push(JSPath.apply(".Claim.CurrentUser", shareData.shareJSONClaim.CorrespondenceDataResponse)[0]);
        }
        $scope.RoleData = [];
        $scope.AuthorsData = [];
        function getData(sourceData, roleType) {
            var displayData = [];
            sourceData.forEach(function (item) {
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
            if ($scope.AuthorsData.length) {
                if ($scope.AuthorsData.length == 1) {
                    $scope.selectedAuthor = $scope.AuthorsData[0];
                }
            }
        }

        function inintPage() {
            $scope.RoleData = getRole($scope.Authors);
            $scope.RoleData.push("Current User");
            //default dropdown to current user
            $scope.selectedAuthorRole = "Current User";
            $scope.AuthorsData = getData($scope.Authors, "Current User");
            $scope.selectedAuthor = $scope.AuthorsData[0];
        };

        inintPage();

        function getRole(sourceData) {
            var roleArray = [];

            // these Role Types come from GuideWire. 
            var FilteredRoles = ["Actuarial Representative", "Adjuster", "Administrative Services Representative",
                "API Service Account", "Attorney", "Attorney of Record", "Awards Rep", "Batch Script User", "Bill Processor",
                "Bill Processor - Create Expense Payments", "Case Management Rep", "ClaimCenter Administrator",
                "Claims Association", "Claims Supervisor", "Conversion User", "Data Change Admin", "EFT Editor",
                "FNOL Rep", "General Accounting Representative", "Indexing Representative", "Integration Admin",
                "Internal Audit Representative", "IT Production Support", "Litigation Support", " LSNTL User",
                "Manual Check creator", "Matter Creator", "Medical Services", "Message Viewer", "MSA Stop_Void",
                "MSP Gatekeeper", "Negative Payment Creator", "Negative Time Tracker", "Part II Lawsuit Representative",
                "Payment Auditor", "Provider Services Rep", "Provider Services Representative", "Reserve Rep", "Reserves Rep", "Reserves- Viewer", "RPO Editor", "Rule Admin", "SIU Rep", "SOAP User",
                "Statistical Representative", "Statistical Representative (Edit)", "Subrogation Rep", "Superuser",
                "Supervisor", "Supervisor - EDMA", "Supervisor- Administrative Services", "Supervisor- Internal Audit",
                "Supervisor- Reserves", "Support Staff", "Time Tracker Administrator", "Time Tracker User", "Time Tracker Viewer",
                "Trusted for Sensitive Claims", "Underwriting Representative", "User Admin", "Utilization Review Rep",
                "Viewer", "WCC CC Administrator"];

            sourceData.forEach(function (item) {
                if (Array.isArray(item.Role)) {
                    item.Role.forEach(function (role) {
                        if (roleArray.indexOf(role) < 0 && FilteredRoles.indexOf(role) > -1) {
                            roleArray.push(role);
                        }
                    });
                } else if (roleArray.indexOf(item.Role) < 0 && FilteredRoles.indexOf(item.Role) > -1) {
                    roleArray.push(item.Role);
                }
            });
            return roleArray.sort();
        }

        $scope.selecAuthor = function () {
            if ($scope.selectedAuthor) {
                $rootScope.$broadcast('Selected Author', { authorEmail: $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue })
            } else {
                $rootScope.$broadcast('Selected Author', { authorEmail: undefined })
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccAuthorRoleAndName', function (event) {
        try {
            var complete_name = '', author_name = '', author_email = '', author_fax = '',
                author_titl = '', author_work_phn = '', author_work_ext = '', author_creds = '',
                author_exec_ind = '', author_uid = '', author_uid_arch = '';

            if ($scope.selectedAuthor) {
                var outputName = '', completedName = '';
                if ($scope.selectedAuthor.FirstName) {
                    outputName += $scope.selectedAuthor.FirstName + ' ';
                    completedName += $scope.selectedAuthor.FirstName + ' ';
                }
                if ($scope.selectedAuthor.MiddleInitial) {
                    completedName += $scope.selectedAuthor.MiddleInitial + ' ';
                }
                if ($scope.selectedAuthor.LastName) {
                    outputName += $scope.selectedAuthor.LastName;
                    completedName += $scope.selectedAuthor.LastName + ' ';
                }

                if ($scope.selectedAuthor.Suffix) {
                    completedName += $scope.selectedAuthor.Suffix;
                }
                if (outputName) {
                    outputName = outputName.replace(/undefined/, '').replace('  ', ' ');
                }
                if (completedName) {
                    completedName = completedName.replace(/undefined/, '').replace('  ', ' ');
                }


                author_name = outputName;
                complete_name = completedName;
                //]/PhoneNumbers/PhoneNumber[Category='Business' and Type='Fax']
                if ($scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue) {
                    author_email = $scope.selectedAuthor.EmailAddresses.EmailAddress.EmailAddressValue;
                }
                if ($scope.selectedAuthor.PhoneNumbers && $scope.selectedAuthor.PhoneNumbers.PhoneNumber) {
                    var phoneData = $scope.selectedAuthor.PhoneNumbers.PhoneNumber;
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

            if (completedName) {
                HomeService.createPrimaryXML("AUTH_NAME_CLOSING_FOR_MANUAL", completedName.trim());
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

