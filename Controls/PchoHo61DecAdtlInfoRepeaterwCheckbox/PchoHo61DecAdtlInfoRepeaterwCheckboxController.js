app.controller('PchoHo61DecAdtlInfoRepeaterwCheckboxController', function ($scope, $http, $filter, shareData, HomeService) {
    try {

        $scope.driverInfo = JSPath.apply(".Policy.PolicyPeriod.ListedParties.Party{.PartyRoles === 'Policy Driver'}", shareData.shareJSONClaim.CorrespondenceDataResponse)
        $scope.descriptionData = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.HomeownersLine.ListedDwellings.ScheduledItems", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.certificatesData = ["GIA (Gemological Institute of America)", "EGL (European Gemological Laboratory)", "AGS (American Gem Society)"];

        $scope.colorOrClarityData = ['color', 'clarity', 'color and clarity'];


        $scope.SelectedH061 = [];
        $scope.selectDESC = [];
        $scope.freeTextDesc = [];
        $scope.floatForm = [];
        $scope.descAppraisal = [];
        $scope.numberOf = [];
        $scope.colorOrClarity = [];
        $scope.colorOrClarityText = [];
        $scope.caratWeight = [];
        $scope.Watch = [];
        $scope.weightOf = [];
        $scope.separate = [];
        $scope.furs = [];
        $scope.lengthOrSweep = [];
        $scope.receipt = [];
        $scope.certificate = [];
        $scope.certificateText = [];
        $scope.certificateNumber = [];
        $scope.freeForm1 = [];
        $scope.freeForm2 = [];

        $scope.showAddBtn = true;
      
        $scope.clearAllData = function (clearId) {
            $scope.selectDESC[clearId] = undefined;
            $scope.freeTextDesc[clearId] = undefined;
            $scope.floatForm[clearId] = undefined;
            $scope.descAppraisal[clearId] = undefined;
            $scope.numberOf[clearId] = undefined;
            $scope.colorOrClarity[clearId] = undefined;
            $scope.colorOrClarityText[clearId] = undefined;
            $scope.caratWeight[clearId] = undefined;
            $scope.Watch[clearId] = undefined;
            $scope.weightOf[clearId] = undefined;
            $scope.separate[clearId] = undefined;
            $scope.furs[clearId] = undefined;
            $scope.lengthOrSweep[clearId] = undefined;
            $scope.receipt[clearId] = undefined;
            $scope.certificate[clearId] = undefined;
            $scope.certificateText[clearId] = undefined;
            $scope.certificateNumber[clearId] = undefined;
            $scope.freeForm1[clearId] = undefined;
            $scope.freeForm2[clearId] = undefined;

        }

        $scope.$watch('selectDESC', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if (newValue[index]) {
                    $scope.freeTextDesc[index] = undefined;
                }
            }

        }, true);

        //$scope.$watch('colorOrClarity', function (newValue, oldValue) {
        //    if (newValue == oldValue) return;
        //    for (var index in newValue) {
        //        if (newValue[index]) {
        //            $scope.colorOrClarityText[index] = undefined;
        //        }
        //    }

        //}, true);

        $scope.$watch('certificate', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            for (var index in newValue) {
                if (newValue[index]) {
                    $scope.certificateText[index] = undefined;
                }
            }

        }, true);

        $scope.MaxCtls = 16;
        $scope.TotalCount = [1];

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.SelectedH061[newItemNo] = undefined;
                $scope.TotalCount.pop();
                $scope.clearAllData(newItemNo);
            }
        }


    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PchoHo61DecAdtlInfoRepeaterwCheckbox', function (event) {
        try {
            var isCreateTable;
            if ($scope.SelectedH061.length > 0) {

                isCreateTable = $scope.SelectedH061.some(function (item) {
                    if (item) {
                        return true;
                    }

                });



                var id;
                for (var i = 0; i < $scope.TotalCount.length; i++) {

                    if ($scope.SelectedH061[i]) {

                        id = shareData.shareOutputXML.getElementsByTagName("HO61_ADTL_INFO").length;
                        HomeService.createSecondaryTableXML("HO61_ADTL_INFO");

                        if ($scope.selectDESC[i] || $scope.freeTextDesc[i]) {
                            var desc;
                            if ($scope.selectDESC[i]) {
                                desc = $scope.selectDESC[i].ScheduledItemDescriptionTx
                            } else {
                                desc = $scope.freeTextDesc[i];
                            }

                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_DESC", desc, id);
                        }

                        if ($scope.floatForm[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "SCHED_PRSNL_PROP_APP", "Y", id);
                        }

                        if ($scope.descAppraisal[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "DESC_APPR", "Y", id);
                        }

                        if ($scope.numberOf[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "NUM_OF", $scope.numberOf[i], id);
                        }

                        if ($scope.colorOrClarity[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "CLRTY", $scope.colorOrClarity[i], id);
                        }

                        if ($scope.colorOrClarityText[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "CLRTY_MAN_ENTRY", $scope.colorOrClarityText[i], id);
                        }
                        if ($scope.caratWeight[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "CARAT_WGHT", "Y", id);
                        }

                        if ($scope.Watch[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "WATCH", "Y", id);
                        }

                        if ($scope.weightOf[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "WGHT_OF", $scope.weightOf[i], id);
                        }

                        if ($scope.separate[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "SEP_VALUE", $scope.separate[i], id);
                        }

                        if ($scope.furs[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "FURS", "Y", id);
                        }

                        if ($scope.lengthOrSweep[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "LNGTH_SWEEP", "Y", id);
                        }

                        if ($scope.receipt[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "RECEIPT", "Y", id);
                        }

                        if ($scope.certificate[i] || $scope.certificateText[i]) {
                            var cert;
                            if ($scope.certificate[i]) {
                                cert = $scope.certificate[i];
                            } else {
                                cert = $scope.certificateText[i];
                            }
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "CERT", cert, id);
                        }

                        if ($scope.certificateNumber[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "CERT_NUM", $scope.certificateNumber[i], id);
                        }

                        if ($scope.freeForm1[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_FREE_FORM1", $scope.freeForm1[i], id);
                        }

                        if ($scope.freeForm2[i]) {
                            HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_FREE_FORM2", $scope.freeForm2[i], id);
                        }


                        HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("HO61_ADTL_INFO", "HO_61_ADDL_TYPE", "Declined-AI", id);


                    }
                }

            }
            if (isCreateTable) {
                HomeService.createPrimaryXML("HO_61_DCLN_ADDL_INFO", "Y");
            } else {
                HomeService.createPrimaryXML("HO_61_DCLN_ADDL_INFO", "N");
            }


        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});
