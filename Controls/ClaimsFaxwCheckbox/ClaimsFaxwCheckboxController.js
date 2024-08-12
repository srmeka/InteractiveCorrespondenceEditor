app.controller('ClaimsFaxwCheckboxController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.JsonData = JSPath.apply(".Claim.InvolvedParties.Party{.PhoneNumbers.PhoneNumber.Type =='Fax' && .PhoneNumbers.PhoneNumber.AreaCode != '' && .PhoneNumbers.PhoneNumber.Exchange != '' && .PhoneNumbers.PhoneNumber.Number != '' }", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.faxData = [];

        var userEmail = '';
        //new function to get user full name for creator name field
        HomeService.GetUserEmail().then(function (response) {
            userEmail = response.data;
        });

        $scope.JsonData.forEach(function (item) {
            var numberArray = {};
            if (Array.isArray(item.PhoneNumbers.PhoneNumber)) {
                item.PhoneNumbers.PhoneNumber.forEach(function (faxItem) {
                    if (faxItem.Type == 'Fax') {
                        numberArray = faxItem;
                    }
                });
            } else {
                numberArray = item.PhoneNumbers.PhoneNumber;
            }
            $scope.faxData.push({
                _id:item._id,
                FirstName: item.FirstName,
                MiddleInitial: item.MiddleInitial,
                LastName: item.LastName,
                Name: item.Name,
                PhoneNumbers: numberArray
            });

        });

        $scope.MaxCtls = 10;
        $scope.TotalCount = [1];


        $scope.clearAllData = function () {
            $scope.selectData = [];
            $scope.freeFax = [];
            $scope.faxSelection = [];
            $scope.freeFaxGroup = [];
            $scope.freeAttentionGroup = [];
            $scope.faxComment = undefined;
            $scope.faxData.map(function (faxData) {
                faxData.checked = false;
            })
        }

        $scope.haveChecked = function () {
            $scope.HaveCheckedFax = false;

            if ($scope.CtrlEnabledCheckbox) {
  
                if ($scope.freeFaxGroup.length == 0 || !$scope.HaveCheckedFax) {

                    for (i = 0; i < $scope.faxData.length; i++) {
                        if ($scope.faxData[i].checked) {
                            $scope.HaveCheckedFax = true;
                        }
                    }
                }
            }
            return $scope.HaveCheckedFax;
        }

        $scope.clearInputData = function (clearId) {
            $scope.freeFaxGroup[clearId] = undefined;
            $scope.freeAttentionGroup[clearId] = undefined;
        }

        $scope.clearAllData();
        $scope.selectItem = function (item) {
            $scope.selectData = $scope.selectData || [];
            var selectedFaxId = "faxSelectionId" + item._id;
            if (document.getElementById(selectedFaxId).checked) {
                $scope.selectData.push(item);
            }
            else {
                $scope.selectData.splice($scope.selectData.indexOf(item), 1);
            }
            if ($scope.selectData.length >= 1) {
                var count = 10 - $scope.selectData.length;
                $scope.freeFaxGroup[count] = undefined;
                $scope.freeAttentionGroup[count] = undefined;
            }
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

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.clearInputData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('ClaimsFaxwCheckbox', function (event) {
        try {
            var fax_ind = '';

            if ($scope.CtrlEnabledCheckbox) {
                fax_ind = 'Y';

                if ($scope.faxComment) {
                    HomeService.createPrimaryXML("FAX_SUBJECT", $scope.faxComment.trim());
                }
                if ($scope.selectData || $scope.freeFaxGroup) {

                    var outputValue;

                    if ($scope.selectData.length != 0) {
                        for (var i = 0; i < $scope.selectData.length; i++) {
                            var faxData;
                            var nameData;
                            if ($scope.selectData[i]) {
                                faxData = $scope.selectData[i].PhoneNumbers.AreaCode + $scope.selectData[i].PhoneNumbers.Exchange + $scope.selectData[i].PhoneNumbers.Number;
                                if ($scope.selectData[i].attn) {
                                    nameData = '/name=' + $scope.selectData[i].attn.replace(/ /g, "%20");
                                }
                                outputValue += nameData + '/fax=' + '1' + faxData + '@rfax.njmgroup.com;';
                            }
                        }

                    };

                    if ($scope.freeFaxGroup.length > 0) {
                        for (var i = 0; i < $scope.freeFaxGroup.length; i++) {
                            var faxData;
                            var nameData;
                            if ($scope.freeFaxGroup[i]) {
                                if ($scope.freeAttentionGroup[i]) {
                                    nameData = '/name=' + $scope.freeAttentionGroup[i].replace(/ /g, "%20");
                                }
                                outputValue += nameData + '/fax=' + '1' + $scope.freeFaxGroup[i] + '@rfax.njmgroup.com;';
                            }
                        }
                    };


                    if (outputValue) {
                        outputValue = outputValue.replace(/undefined/g, '');
                        HomeService.createPrimaryXML("FAX_TO", outputValue.trim());

                    }
                }
                HomeService.createPrimaryXML("FAX_FROM", userEmail);

            }
            HomeService.createPrimaryXML("FAX_IND", fax_ind);

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

