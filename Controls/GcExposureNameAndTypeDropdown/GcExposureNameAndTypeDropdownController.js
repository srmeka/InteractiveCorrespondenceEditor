app.controller('GcExposureNameAndTypeDropdownController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ExposureJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role === 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.HideCashValue = true;
        $scope.HideOldDamageAmt = true;
        $scope.HideSalvageSubTot = true;
        $scope.HideTaxAmount = true
        $scope.HideSalvagePDDed = true;
        $scope.HideSalvageOther = true;
        $scope.HideSalvageNetSet = true;
        $scope.HideSalvageValue = true;
        $scope.HideSalvageVehMake = true;
        $scope.HideSalvageVehModel = true;
        $scope.HideSalvageVehYear = true;
        $scope.HideTotalLossEst = true;
        $scope.HideSalvageTypeLoss = true;
        $scope.RequireRep = false;
        $scope.ReceivedYear = false;
        $scope.ReceivedMake = false;
        $scope.ReceivedModel = false;
        $scope.ReceivedSalvageType = false;

        $scope.ExposureData = []
        function getData(sourceData) {
            var displayData = [];
            for (i = 0; i < sourceData.length;i++) {

                if (sourceData[i].Type === 'Person') {
                    sourceData[i].displayName = sourceData[i].FirstName + ' ' + sourceData[i].MiddleName + ' ' + sourceData[i].LastName + ' ' + sourceData[i].Suffix;
                    sourceData[i].displayName = sourceData[i].displayName.replace(/undefined/g, '')
                }
                if (sourceData[i].Type == 'Company') {
                    sourceData[i].displayName = sourceData[i].Name;
                }
                displayData.push(sourceData[i]);
            };
            if ($scope.SelectedDocument.documentFriendlyName == "Denial-General" || $scope.SelectedDocument.documentFriendlyName == "Denial-Lapse in Coverage" || $scope.SelectedDocument.documentFriendlyName == "Denial-Pol Not in Force" || $scope.SelectedDocument.documentFriendlyName == "Denial-Veh Removed Prior to Loss" || $scope.SelectedDocument.documentFriendlyName == "No Coverage - Personal-Comm-Rental" || $scope.SelectedDocument.documentFriendlyName == "Blank Letter Template-Underwriting" || $scope.SelectedDocument.documentFriendlyName == "Denial-Veh Not Described on Policy" || $scope.SelectedDocument.documentFriendlyName == "Under Ded Comp") {
                sourceData.push({ displayName: "No Coverage" });
                displayData.push(sourceData[i]);
            }
            return displayData;
        }

        function inintPage() {
            $scope.ExposureData = getData($scope.ExposureJsonData);
        };

        inintPage();

        $scope.slectName = function () {
            var exposureType = [];
            $scope.typeData = [];
            if ($scope.selectedName.Exposures) {
                if ($scope.selectedName.Exposures.Exposure.length) {
                    for (i = 0; i < $scope.selectedName.Exposures.Exposure.length; i++) {
                        exposureType.push($scope.selectedName.Exposures.Exposure[i]);
                        $scope.typeData = exposureType;
                    }
                }
                else {
                    exposureType.push($scope.selectedName.Exposures.Exposure);
                    $scope.typeData = exposureType;
                    $scope.selectedType = exposureType[0];
                    $scope.getValues($scope.selectedType)
                }
            }
            if ($scope.SelectedDocument.documentFriendlyName === 'Limited Power of Attorney') {
                $scope.getSalvRep();
            }
        }

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9.]/g, '');
            }
            return inputValue;
        }
        $scope.validateOnlyNumbers = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        }

        $scope.getSalvRep = function () {

            $scope.GcSalvRepValue = undefined;
            $scope.LabelName1 = undefined;
            $scope.GcSalvRepReadOnly = true;

            if ($scope.SelectedDocument.documentFriendlyName === 'Limited Power of Attorney') {

                if ($scope.selectedType.ExposureType) {
                    if ($scope.selectedType.ExposureType === 'Vehicle') {

                        $scope.RequireRep = true;
                        $scope.LabelName1 = "Salvage Representative:";

                        if ($scope.selectedType.SalvageRepresentative) {
                            $scope.GcSalvRepReadOnly = true;
                            $scope.GcSalvRepValue = $scope.selectedType.SalvageRepresentative

                        } else {
                            $scope.GcSalvRepReadOnly = false;
                        }

                    } else {
                        $scope.GcSalvRepValue = undefined;
                        $scope.LabelName1 = undefined;
                        $scope.RequireRep = false;

                    }
                }
            };

        }; //getSalvRep

        $scope.getValues = function () {
            $scope.ReadOnly = false;

            if ($scope.SelectedDocument.documentFriendlyName === 'Settlement Total Loss Owner Keeps'
                || $scope.SelectedDocument.documentFriendlyName === 'Settlement TL Owner Keeps PA'
                || $scope.SelectedDocument.documentFriendlyName === 'Setlmt Total Loss - NJM Take Veh'
                || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse Owner Keeps'
                || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse NJM Takes'
                || $scope.SelectedDocument.documentFriendlyName === 'Stlmnt TL Stolen Not Recovered'
                || $scope.SelectedDocument.documentFriendlyName === 'Title Transfer Request Ltr'
                || $scope.SelectedDocument.documentFriendlyName === 'NY Owner Keeps') {

                $scope.GcCashValue = undefined;
                $scope.GcOldDamageAmt = undefined;
                $scope.GcSalvageSubTot = undefined;
                $scope.GcTaxAmount = undefined;
                $scope.GcSalvageValue = undefined;
                $scope.GcSalvagePDDed = undefined;
                $scope.GcSalvageOther = undefined;
                $scope.GcSalvageNetSet = undefined;
                $scope.GcSalvageVehYear = undefined;
                $scope.GcSalvageVehMake = undefined;
                $scope.GcSalvageVehModel = undefined;
                $scope.GcTotalLossEst = undefined;
                $scope.GcSalvageTypeLoss = undefined;

                if ($scope.selectedType.ExposureType) {

                    if ($scope.selectedType.ExposureType === 'Vehicle' && $scope.selectedType.SalvageActualCashValue) {
                        $scope.ReadOnly = true;
                    } else {
                        $scope.ReadOnly = false;
                    }

                    $scope.HideCashValue = false;
                    $scope.GcCashValue = correctCurrency($scope.selectedType.SalvageActualCashValue);

                    if ($scope.SelectedDocument.documentFriendlyName != 'Title Transfer Request Ltr'
                        && $scope.SelectedDocument.documentFriendlyName != 'NY Owner Keeps') {

                        $scope.HideOldDamageAmt = false;
                        $scope.HideSalvageSubTot = false;
                        $scope.HideTaxAmount = false
                        $scope.HideSalvagePDDed = false;
                        $scope.HideSalvageOther = false;
                        $scope.HideSalvageNetSet = false;

                        $scope.GcOldDamageAmt = correctCurrency($scope.selectedType.SalvageOldDamageAmount);
                        $scope.GcSalvageSubTot = correctCurrency($scope.selectedType.SalvageSubTotal);
                        $scope.GcTaxAmount = correctCurrency($scope.selectedType.SalvageTaxAmount);
                        $scope.GcSalvagePDDed = correctCurrency($scope.selectedType.SalvageDeductible);
                        $scope.GcSalvageOther = $scope.selectedType.SalvageOtherAdjustments;
                        $scope.GcSalvageNetSet = correctCurrency($scope.selectedType.SalvageNetSettlement);
                    }

                    if ($scope.SelectedDocument.documentFriendlyName === 'Settlement Total Loss Owner Keeps'
                        || $scope.SelectedDocument.documentFriendlyName === 'Settlement TL Owner Keeps PA'
                        || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse Owner Keeps') {

                        $scope.HideSalvageValue = false;

                        $scope.GcSalvageValue = correctCurrency($scope.selectedType.SalvageValue);
                    }

                    if ($scope.SelectedDocument.documentFriendlyName === 'Title Transfer Request Ltr') {

                        $scope.HideSalvageVehMake = false;
                        $scope.HideSalvageVehModel = false;
                        $scope.HideSalvageVehYear = false;
                        $scope.HideTotalLossEst = false;
                        $scope.HideSalvageTypeLoss = false;
                       
                        $scope.GcSalvageVehYear = $scope.selectedType.SalvageVehicleYear;
                        $scope.GcSalvageVehMake = $scope.selectedType.SalvageVehicleMake;
                        $scope.GcSalvageVehMod = $scope.selectedType.SalvageVehicleModel;
                        $scope.GcTotalLossEst = correctCurrency($scope.selectedType.SalvageTotalLossEstimate);
                        $scope.GcSalvageTypeLoss = $scope.selectedType.SalvageTypeOfLoss;

                        if ($scope.GcSalvageVehYear) {
                            $scope.ReceivedYear = true;
                        } else {
                            $scope.ReceivedYear = false;
                        }
                        if ($scope.GcSalvageVehMake) {
                            $scope.ReceivedMake = true;
                        } else {
                            $scope.ReceivedMake = false;
                        }
                        if ($scope.GcSalvageVehMod) {
                            $scope.ReceivedModel = true;
                        } else {
                            $scope.ReceivedModel = false;
                        }
                        if ($scope.GcSalvageTypeLoss) {
                            $scope.ReceivedSalvageType = true;
                        } else {
                            $scope.ReceivedSalvageType = false;
                        }
                    }
                }
            }  //Recource Letters
        }  //getValues

        function correctCurrency(dollarAmount) {
            if (dollarAmount) {
                var int = dollarAmount.indexOf(".");

                if (int == -1 && dollarAmount != '') {
                    dollarAmount = dollarAmount + '.00';
                } else {
                    dollarAmount = dollarAmount;
                }
            }

            return dollarAmount;
        } //Correct Currency
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcExposureNameAndTypeDropdown', function (event) {
        try {
            var outputName = '';
            var clmt_id = '';
            var typeValue = '', numValue = '0';
            var deductValue = '';

            if ($scope.selectedName) {
                outputName = $scope.selectedName.displayName;

                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }

                if ($scope.selectedName._id) {
                    clmt_id = $scope.selectedName._id;
                } else {
                    clmt_id = 0;
                }

                if ($scope.selectedType) {
                    typeValue = $scope.selectedType.ExposureType;
                    numValue = $scope.selectedType.ExposureNumber;
                    deductValue = $scope.selectedType.Deductible;

                    if (numValue && numValue.length < 4) {
                        numValue = ("0000" + numValue).slice(-4);
                    }
                }
            }
            HomeService.createPrimaryXML("EXPOSURE_NAME", outputName.trim());
            HomeService.createPrimaryXML("CLMT_ID", clmt_id);
            HomeService.createPrimaryXML("EXPOSURE_TYPE", typeValue);
            HomeService.createPrimaryXML("EXPOSURE_NUM", numValue);

            if ($scope.SelectedDocument.documentFriendlyName == "Under Ded Ltr"
                 || $scope.SelectedDocument.documentFriendlyName == "Ltr to Atty-RTS-Counter-CrossClaim") {
                HomeService.createPrimaryXML("POL_DED_AUTO", deductValue);
            };

            ////Check if exposure type is vehicle.  If so, find Salvage Rep
            if (typeValue === 'Vehicle') {
                if ($scope.GcSalvRepValue != '') {
                    HomeService.createPrimaryXML("SALVAGE_REP_NAME", $scope.GcSalvRepValue);
                } else {
                    HomeService.createPrimaryXML("SALVAGE_REP_NAME", "");
                }
            } else {
                HomeService.createPrimaryXML("SALVAGE_REP_NAME", "");
            }

            //Vehicle Values
            if ($scope.SelectedDocument.documentFriendlyName === 'Settlement Total Loss Owner Keeps'
                || $scope.SelectedDocument.documentFriendlyName === 'Settlement TL Owner Keeps PA'
                || $scope.SelectedDocument.documentFriendlyName === 'Setlmt Total Loss - NJM Take Veh'
                || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse Owner Keeps'
                || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse NJM Takes'
                || $scope.SelectedDocument.documentFriendlyName === 'Stlmnt TL Stolen Not Recovered'
                || $scope.SelectedDocument.documentFriendlyName === 'Title Transfer Request Ltr'
                || $scope.SelectedDocument.documentFriendlyName === 'NY Owner Keeps') {

                HomeService.createPrimaryXML("VEH_ACTUAL_CASH_VAL", ($scope.GcCashValue ? $scope.GcCashValue : 0));

                if ($scope.SelectedDocument.documentFriendlyName != 'Title Transfer Request Ltr'
                    && $scope.SelectedDocument.documentFriendlyName != 'NY Owner Keeps') {

                    HomeService.createPrimaryXML("VEH_OLD_DAMAGE_AMT", ($scope.GcOldDamageAmt ? $scope.GcOldDamageAmt : 0));
                    HomeService.createPrimaryXML("TAX_AMT", ($scope.GcTaxAmount ? $scope.GcTaxAmount : 0));
                    HomeService.createPrimaryXML("SALV_SUB_TOTL", ($scope.GcSalvageSubTot ? $scope.GcSalvageSubTot : 0));
                    HomeService.createPrimaryXML("SALV_PD_DED", ($scope.GcSalvagePDDed ? $scope.GcSalvagePDDed : 0));
                    HomeService.createPrimaryXML("SALV_OTHER", ($scope.GcSalvageOther ? $scope.GcSalvageOther : 0));
                    HomeService.createPrimaryXML("SALV_NET_SETTL", ($scope.GcSalvageNetSet ? $scope.GcSalvageNetSet : 0));
                }

                if ($scope.SelectedDocument.documentFriendlyName === 'Settlement Total Loss Owner Keeps'
                 || $scope.SelectedDocument.documentFriendlyName === 'Settlement TL Owner Keeps PA'
                 || $scope.SelectedDocument.documentFriendlyName === 'Right of Recourse Owner Keeps') {

                    HomeService.createPrimaryXML("SALV_VALUE", ($scope.GcSalvageValue ? $scope.GcSalvageValue : 0));
                }

                if ($scope.SelectedDocument.documentFriendlyName === 'Title Transfer Request Ltr') {
                    HomeService.createPrimaryXML("SALV_VEH_YEAR", ($scope.GcSalvageVehYear ? $scope.GcSalvageVehYear : 0));
                    HomeService.createPrimaryXML("SALV_VEH_MAKE", ($scope.GcSalvageVehMake ? $scope.GcSalvageVehMake : 0));
                    HomeService.createPrimaryXML("SALV_VEH_MODEL", ($scope.GcSalvageVehMod ? $scope.GcSalvageVehMod : 0));
                    HomeService.createPrimaryXML("TOTL_LOSS_EST_AMT", ($scope.GcTotalLossEst ? $scope.GcTotalLossEst : 0));
                    HomeService.createPrimaryXML("SALV_TYPE_LOSS", ($scope.GcSalvageTypeLoss ? $scope.GcSalvageTypeLoss : 0));
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

