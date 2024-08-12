app.controller('EmailwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.personData = JSPath(".Policy.PolicyPeriod.ListedParties.Party.Person.", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.emailData = [];
        $scope.personData.forEach(function (item) {

            var email = '';

            if (Array.isArray(item.EmailAddresses)) {

                item.EmailAddresses.forEach(function (emailItem) {
                    if (emailItem.EmailAddress) {
                        email = emailItem.EmailAddress.UnparsedEmailAddress;
                    }
                    else {
                        email = emailItem.UnparsedEmailAddress;
                    }
                    if (email) {
                        $scope.emailData.push({
                            _id:item._id,
                            FirstName: item.PersonName.FirstGivenNm,
                            LastName: item.PersonName.FamilyNm,
                            EmailAddress: email
                        });
                    }
                });
            }
            else if (item.EmailAddresses) {
                if (item.EmailAddresses.EmailAddress) {
                    email = item.EmailAddresses.EmailAddress.UnparsedEmailAddress;
                }
                else if (item.EmailAddresses.UnparsedEmailAddress) {
                    email = item.EmailAddresses.UnparsedEmailAddress;
                }
                if (email) {
                    $scope.emailData.push({
                        _id: item._id,
                        FirstName: item.PersonName.FirstGivenNm,
                        LastName: item.PersonName.FamilyNm,
                        EmailAddress: email
                    });
                }
            }
        });

        $scope.validEmail = function (item) {
            //regex to validate email
          var isValid= item.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          return isValid;
        }
        $scope.inCount = function (item, match) {
            return item.split(match).length - 1;
        }

        $scope.removeSpecialChars = function (item) {
            if (item) {
                return item.replace(/[`~!#$%^&*()|+\=?;:'",<>\{\}\[\]\\\/]/gi, "");
            }
        }

        $scope.selectData = [];
        $scope.selectEmail = function (item) {
            var emailSelected = "emailSelection" + item._id;
            if (document.getElementById(emailSelected).checked) {
                $scope.selectData.push(item.EmailAddress);
            } else {
                var index = $scope.selectData.indexOf(item.EmailAddress);
                $scope.selectData.splice(index, 1);
            }
        }

        $scope.clearAllSelectedData = function () {
            $scope.emailData.map(function (item) {
                item.checked = false;
            });
            $scope.selectData = [];
            $scope.freeText1 = undefined;
            $scope.freeText2 = undefined;
            $scope.freeText3 = undefined;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('EmailwCheckbox', function (event) {
        try {
            if ($scope.SelectedEmail) {
                var outputValue;
                if ($scope.selectData.length !== 0) {
                    for (var i = 0; i < $scope.selectData.length; i++) {
                        outputValue += $scope.selectData[i] + ';';
                    }
                }

                if ($scope.freeText1) {
                    outputValue += $scope.freeText1 + ';';
                }
                if ($scope.freeText2) {
                    outputValue += $scope.freeText2 + ';';
                }
                if ($scope.freeText3) {
                    outputValue += $scope.freeText3 + ';';
                }

                if (outputValue) {
                    outputValue = outputValue.replace(/undefined/g, '');

                    HomeService.createPrimaryXML("EMAIL_TO", outputValue);

                }
                HomeService.createPrimaryXML("EMAIL_IND", 'Y');

            } else {
                HomeService.createPrimaryXML("EMAIL_IND", 'N');
            }

            //if the letter doesn't have an option to send to Printer, we need to add the Archive Ind here
            if ($scope.SelectedDocument.documentFriendlyName == 'NJM SafeDrive Email') {
                HomeService.createPrimaryXML("ARCHIVE_IND", 'Y');
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});