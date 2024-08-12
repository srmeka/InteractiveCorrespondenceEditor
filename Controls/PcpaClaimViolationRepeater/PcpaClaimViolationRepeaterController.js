app.controller('PcpaClaimViolationRepeaterController', function ($scope, $http, shareData, HomeService, $rootScope) {
    try {
        var LOBName = HomeService.getUrlParameter('LOB');
        if ($scope.SelectedDocument.documentFriendlyName == "NB 60 Day Decline-Cancel" || $scope.SelectedDocument.documentFriendlyName == "NJ Decline Ltr-Auto" || $scope.SelectedDocument.documentFriendlyName == "CT Decline Ltr" || $scope.SelectedDocument.documentFriendlyName == "CT NB 60 Day Decline-Cancel" || $scope.SelectedDocument.documentFriendlyName == "CT Notice of Nonrenewal" || $scope.SelectedDocument.documentFriendlyName == "CT Midterm Cancellation") {
            $scope.showAdverseData = true;
        }
        else {
            $scope.showAdverseData = false;
        }

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver' || .PartyRoles === 'Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.CtrlEnabledCheckbox = new Array;
        $scope.SelectedDriver = new Array;
        $scope.DriverText = new Array;
        $scope.ActivityDescText = new Array;
        $scope.SelectedADSValue = new Array;
        $scope.SelectedEventDate = new Array;
        $scope.SelectedPostDate = new Array;
        if ($scope.SelectedDocument.documentFriendlyName == "CT Notice of Nonrenewal") {
            $scope.showControl = false;
        }
        else {
            $scope.showControl = true;
        }

        $scope.MaxCtls = [16];  //max # of controls allowed to be repeated

        $scope.ClearData = function (index) {
            $scope.SelectedDriver[index] = undefined;
            $scope.DriverText[index] = [];
            $scope.ActivityDescText[index] = [];
            $scope.SelectedADSValue[index] = undefined;
            $scope.SelectedEventDate[index] = [];
            $scope.SelectedPostDate[index] = [];
        }

        $rootScope.$on('ShowHideClaimViolation', function (event, data) {
            if (data.hiddenStatus) {
                $scope.showControl = false;
            } else {
                $scope.showControl = true;
            }
        })

        $scope.TotalCount = [1];

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        }
        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.ClearData(newItemNo);
                $scope.TotalCount.pop();
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcpaClaimViolationRepeater', function (event) {
        try {
            if (LOBName == 'PC-UMB') {
                var id = shareData.shareOutputXML.getElementsByTagName("DRIVER_DET").length;
                var Indicator = "N";

                for (index = 0; index < $scope.TotalCount.length; index++) {
                    if ($scope.CtrlEnabledCheckbox[index] == true) {
                        Indicator = "Y";

                        HomeService.createSecondaryTableXML("DRIVER_DET");

                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACTIVITY_DESCRIPTION", $scope.ActivityDescText[index], id);
                        if ($scope.showAdverseData) {
                            HomeService.createSecondaryXMLValue("DRIVER_DET", "ADVERSE_DATA_SOURCE", $scope.SelectedADSValue[index], id);
                        }
                        var selectedData = $scope.SelectedDriver[index];
                        if (selectedData || $scope.DriverText[index]) {
                            var outputValue = "";
                            if (selectedData) {

                                if (selectedData.Person.PersonName.FirstGivenNm) {
                                    outputValue = selectedData.Person.PersonName.FirstGivenNm + ' ';
                                }
                                if (selectedData.Person.PersonName.SecendGivenNmInitial) {
                                    outputValue += selectedData.Person.PersonName.SecendGivenNmInitial + ' ';
                                }
                                if (selectedData.Person.PersonName.FamilyNm) {
                                    outputValue += selectedData.Person.PersonName.FamilyNm + ' ';
                                }
                                if (selectedData.Person.PersonName.FamilyNameGenerationCd) {
                                    outputValue += selectedData.Person.PersonName.FamilyNameGenerationCd;
                                }

                            } else {
                                outputValue = $scope.DriverText[index];
                            }
                            HomeService.createSecondaryXMLValue("DRIVER_DET", "ACCIDENT_VIOLATION_DRIVER_NAME", outputValue, id);
                        }

                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACCIDENT_VIOLATION_EVENT_DATE", $scope.SelectedEventDate[index], id);
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "ACCIDENT_VIOLATION_POSTING_PAYOUT_DATE", $scope.SelectedPostDate[index], id);

                        HomeService.createSecondaryXMLValue("DRIVER_DET", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("DRIVER_DET", "DRVR_RECS", Indicator, id);
                        id++;
                    }
                }
                
            }
            else {
                var id = shareData.shareOutputXML.getElementsByTagName("ACC_VIOL").length;
                var Indicator = "N";

                for (index = 0; index < $scope.TotalCount.length; index++) {
                    if ($scope.CtrlEnabledCheckbox[index] == true) {
                        Indicator = "Y";

                        HomeService.createSecondaryTableXML("ACC_VIOL");

                        HomeService.createSecondaryXMLValue("ACC_VIOL", "ACTVTY_DESC", $scope.ActivityDescText[index], id);
                        if ($scope.showAdverseData) {
                            HomeService.createSecondaryXMLValue("ACC_VIOL", "ADVERSE_DATA_SRC", $scope.SelectedADSValue[index], id);
                        }
                        var selectedData = $scope.SelectedDriver[index];
                        if (selectedData || $scope.DriverText[index]) {
                            var outputValue = "";
                            if (selectedData) {

                                if (selectedData.Person.PersonName.FirstGivenNm) {
                                    outputValue = selectedData.Person.PersonName.FirstGivenNm + ' ';
                                }
                                if (selectedData.Person.PersonName.SecendGivenNmInitial) {
                                    outputValue += selectedData.Person.PersonName.SecendGivenNmInitial + ' ';
                                }
                                if (selectedData.Person.PersonName.FamilyNm) {
                                    outputValue += selectedData.Person.PersonName.FamilyNm + ' ';
                                }
                                if (selectedData.Person.PersonName.FamilyNameGenerationCd) {
                                    outputValue += selectedData.Person.PersonName.FamilyNameGenerationCd;
                                }

                            } else {
                                outputValue = $scope.DriverText[index];
                            }
                            HomeService.createSecondaryXMLValue("ACC_VIOL", "AV_DRVR_NAME", outputValue, id);
                        }

                        HomeService.createSecondaryXMLValue("ACC_VIOL", "AV_EVENT_DT", $scope.SelectedEventDate[index], id);
                        HomeService.createSecondaryXMLValue("ACC_VIOL", "AV_POST_PAY_DT", $scope.SelectedPostDate[index], id);

                        HomeService.createSecondaryXMLValue("ACC_VIOL", "POL_FK", "1", id);
                        id++;
                    }
                }
                HomeService.createPrimaryXML("AV_IND", Indicator);
            }

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});