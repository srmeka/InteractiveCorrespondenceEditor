app.controller('GcEmailwCheckboxController', function ($rootScope, $scope, $http, shareData, HomeService) {
    try {

        var defaultEmailAddress = '';

        $scope.emailData = JSPath.apply(".Claim.InvolvedParties.Party{.EmailAddresses.EmailAddress.EmailAddressValue!=''}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $rootScope.$on('Selected Author', function (event, data) {
            $scope.fromInput = data.authorEmail;
            defaultEmailAddress = data.authorEmail;
            console.log($scope.fromInput);
        })

        $scope.emailData.map(function (item) {
            item.checked = false;
        });

        function setDefaultEmail() {
            if ($rootScope.defaultAuthor) {
                $scope.fromInput = $rootScope.defaultAuthor.EmailAddresses.EmailAddress.EmailAddressValue;
            } else {
                $scope.fromInput = defaultEmailAddress;
            }
        };
        function setDefaultToEmail() {
            if ($scope.SelectedDocument.documentFriendlyName == 'HSP-SL Notice of Loss') {
                $scope.freeTextGroup[0] = 'new_loss@hsb.com';
            }
        }

        setDefaultEmail();

        $scope.TotalCount = [1];

        $scope.clearAllData = function () {
            if (!$scope.SelectedEmail) {
                $scope.selectData = [];
                $scope.freeTextGroup = [];
                $scope.subjectInput = undefined;
                $scope.emailEncrypted = true;
                $scope.emailData.map(function (item) {
                    item.checked = false;
                });
            }
            setDefaultToEmail();
            setDefaultEmail();
        }

        $scope.clearInputData = function (clearId) {
            $scope.freeTextGroup[clearId] = undefined;
        }

        $scope.selectData = [];
        $scope.freeTextGroup = [];
        setDefaultToEmail();
        $scope.selectEmail = function (item) {
            var SelectedEmailId = "emailSelectionId" + item._id;
            if (document.getElementById(SelectedEmailId).checked) {
                $scope.selectData.push(item.EmailAddresses.EmailAddress.EmailAddressValue);
            } else {
                var index = $scope.selectData.indexOf(item.EmailAddresses.EmailAddress.EmailAddressValue);
                $scope.selectData.splice(index, 1);
            }
        }

        $scope.addCtlRow = function () {
            var newItemNo = $scope.TotalCount.length + 1;
            $scope.TotalCount.push(newItemNo);
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.clearInputData(newItemNo);
            }
        }

        $scope.validEmail = function (item) {
            //regex to validate email
            var isValid = item.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
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

        $scope.isRequired = function () {
            $scope.flag_a = true;

            if ($scope.CtrlEnabledCheckbox) {

                if ($scope.freeFaxGroup.length == 0) {
                    for (i = 0; i < $scope.freeFaxGroup.length; i++) {
                        if ($scope.freeFaxGroup[i].trim.length != 0) {
                            $scope.flag_a = false;
                        }
                    }
                }
            }
            return $scope.flag_a;
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcEmailwCheckbox', function (event) {
        try {
            var email_ind = 'N';

            if ($scope.SelectedEmail) {
                email_ind = 'Y';
                var encrypt = '';
                if ($scope.fromInput) {
                    HomeService.createPrimaryXML("EMAIL_FROM", $scope.fromInput.trim());
                }
                if ($scope.subjectInput) {
                    HomeService.createPrimaryXML("EMAIL_SUBJECT", $scope.subjectInput.trim());
                }
                if ($scope.selectData || $scope.freeTextGroup) {
                    var outputValue;

                    if ($scope.selectData.length > 0) {
                        outputValue += outputEmail($scope.selectData)
                    };
                    if ($scope.freeTextGroup.length > 0) {
                        outputValue += outputEmail($scope.freeTextGroup);
                    };


                    if (outputValue) {
                        outputValue = outputValue.replace(/undefined/g, '');
                        HomeService.createPrimaryXML("EMAIL_TO", outputValue.trim());

                    }

                    function outputEmail(dataArr) {
                        var outputStr;
                        for (var i = 0; i < dataArr.length; i++) {
                            if (dataArr[i]) {
                                outputStr += dataArr[i] + ';';
                            }
                        }

                        return outputStr;
                    }

                    if ($scope.emailEncrypted) {
                        encrypt = 'NJMENCRYPT';
                    }
                    HomeService.createPrimaryXML("NJM_ENCRYPT", encrypt);
                }
            }
            HomeService.createPrimaryXML("EMAIL_IND", email_ind);

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

