app.controller('GcExposureNmAndTypewPrecertIdController', function ($scope, $http, shareData, $filter, HomeService) {
    try {
        var chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
        $scope.ExposureJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role === 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.ExposureData = []
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ').trim();
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }

                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ExposureData = getData($scope.ExposureJsonData);

        };

        inintPage();

        $scope.typeData = [];
        $scope.precertData = [];
        $scope.selectName = function () {
            if ($scope.selectedName) {
                var types = $scope.selectedName.Exposures.Exposure;
                if (types) {
                    $scope.typeData = [];
                    if (typeof (types.ExposureType) === 'string') {
                        $scope.typeData.push(types);
                        $scope.selectedType = types.ExposureType;
                        $scope.selectType(types);
                    } else {

                        $scope.typeData = types

                    }
                } else {
                    $scope.typeData = 'Information not provided from ClaimCenter';
                    $scope.precertData = 'Information not provided from ClaimCenter';
                }

            } else {
                $scope.typeData = [];
                $scope.selectedType = undefined;
                $scope.precertData = [];
            }

        }

        $scope.selectType = function (type) {

            $scope.precertData = [];
            $scope.selectedType = undefined;
            $scope.selectedPrecertId = undefined;
            $scope.determinationData = undefined;
            $scope.ProcedureInfo_custom = [];
            //$scope.CodeData = undefined;
            //$scope.StartCode = undefined;
            //$scope.EndCode = undefined;

            if (type) {
                $scope.selectedType = type;
                if ($scope.selectedType.Precertifications) {
                    var precert = $scope.selectedType.Precertifications.Precertification;
                    if (precert) {
                        $scope.precertData = [];
                        if (Array.isArray(precert)) {
                            
                            $scope.precertData = precert;
                            $scope.selectedPrecertId = $scope.precertData[0];
                        } else {
                            $scope.selectedPrecertId = precert;
                            $scope.precertData.push(precert);
                        }
                        $scope.selectId($scope.selectedPrecertId);
                    }
                }
                //else {
                //    $scope.precertData = 'Information not provided from ClaimCenter';
                //}

                for (l = 0; l < $scope.precertData.length; l++) {
                    if ($scope.precertData[l]) {
                        if ($scope.selectedPrecertId.PrecertificationId < $scope.precertData[l].PrecertificationId) {
                            $scope.selectedPrecertId = $scope.precertData[l]
                        }
                    } else {
                        $scope.selectedPrecertId = $scope.precertData[l];
                    };
                }
                $scope.selectId($scope.selectedPrecertId);

            }
        }

        $scope.selectId = function (precertData) {
            $scope.selectedPrecertId = precertData;
            $scope.determinationData = undefined;
            $scope.DeterminationDataList = undefined;

            if (precertData) {
                if (precertData.Determinations.Determination.length) {
                    $scope.determinationData = precertData.Determinations;
                    $scope.DeterminationDataList = $scope.determinationData.Determination;
                } else {
                    $scope.determinationData = precertData.Determinations.Determination;
                    $scope.DeterminationDataList = Array($scope.determinationData);
                }

                $scope.ProcedureDataList = [];
                for (i = 0; i < $scope.DeterminationDataList.length; i++) {
                    if ($scope.DeterminationDataList[i].Procedures) {

                        if ($scope.DeterminationDataList[i].Procedures.Procedure.length) {
                            $scope.ProcedureDataList[i] = $scope.DeterminationDataList[i].Procedures.Procedure;
                        }
                        else {
                            $scope.ProcedureDataList[i] = Array($scope.DeterminationDataList[i].Procedures.Procedure);
                        }

                        //determine if this Procedure will have custom Start/End codes
                        var procs = $scope.ProcedureDataList[i];
                        for (j = 0; j < procs.length; j++) {
                            $scope.ProcedureDataList[i][j].custom = (!procs[j].StartCode && !procs[j].EndCode);
                        }
                    }

                }
                //if there are no Proc codes, add one that is customizable
                if ($scope.ProcedureDataList.length == 0) {
                    var proc = {};
                    proc.custom = true;
                    proc.StartCode = '';
                    proc.EndCode = '';
                    $scope.ProcedureDataList[0] = Array(proc);
                }
            }

        }

    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcExposureNmAndTypewPrecertId', function (event) {
        try {
            
            var outputName = '';
            var clmt_id = '';
            var typeValue = '', numValue = '';
            var provider_sys = '';
            var provider_phn = '';
            var service_date = '';
            var treatmntStatus = '';

            if ($scope.selectedName) {
                outputName = $scope.selectedName.displayName;

                if (outputName) {
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }
                clmt_id = $scope.selectedName._id;
                if ($scope.selectedType) {
                    typeValue = $scope.selectedType.ExposureType;
                    numValue = $scope.selectedType.ExposureNumber;
                    if (numValue.length < 4) {
                        numValue = ("0000" + numValue).slice(-4);
                    }
                    if ($scope.selectedPrecertId) {
                        if ($scope.selectedPrecertId.EndDate) {
                            service_date = $filter('date')($scope.selectedPrecertId.EndDate, 'MM/dd/yyyy');
                            end_date = $filter('date')($scope.selectedPrecertId.EndDate, 'yyyy-MM-dd');
                        }
                        if ($scope.selectedPrecertId.StartDate) {
                            start_date = $filter('date')($scope.selectedPrecertId.StartDate, 'yyyy-MM-dd');
                        }
                        //Provider
                        if ($scope.selectedPrecertId.Provider) {
                            if (chromeAgent) {
                                var providers = JSPath.apply(".Claim.InvolvedParties.Party{._id == " + $scope.selectedPrecertId.Provider.refId + "}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                            }
                            else {
                                var providers = JSPath.apply(".Claim.InvolvedParties.Party{._id == " + $scope.selectedPrecertId.Provider._refId + "}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                            }
                            var providerSys = providers[0];
                            if (providerSys) {
                                var output_name = '';
                                if (providerSys.FirstName) {
                                    output_name += providerSys.FirstName + ' ';
                                }
                                if (providerSys.LastName) {
                                    output_name += providerSys.LastName + ' ';
                                }
                                if (providerSys.Name) {
                                    output_name += providerSys.Name;
                                }

                                output_name = output_name.replace(/undefined/g, '');
                                if (output_name) {
                                    provider_sys = output_name;
                                }

                                if (providerSys.PhoneNumbers.PhoneNumber) {
                                    var phoneData = providerSys.PhoneNumbers.PhoneNumber;

                                    for (var i = 0; i < phoneData.length; i++) {
                                        if (phoneData[i].Category == 'Business' && phoneData[i].Type == 'Number') {
                                            provider_phn = '(' + phoneData[i].AreaCode + ')' + phoneData[i].Exchange + '-' + phoneData[i].Number;
                                        }

                                    }
                                }

                            }

                        }

                        if ($scope.DeterminationDataList && $scope.DeterminationDataList.length > 1) {
                            treatmntStatus = 'Multiple';
                        }
                        else if ($scope.DeterminationDataList && $scope.DeterminationDataList.length == 1) {
                            if (Array.isArray($scope.DeterminationDataList[0].TreatmentStatus)) {
                                if ($scope.DeterminationDataList[0].TreatmentStatus.length > 1) {
                                    treatmntStatus = 'Multiple';
                                } else {
                                    treatmntStatus = $scope.DeterminationDataList[0].TreatmentStatus[0];
                                }
                            }
                            else {
                                treatmntStatus = $scope.DeterminationDataList[0].TreatmentStatus;
                            }
                        }
                    }

                }

            }

            HomeService.createPrimaryXML("EXPOSURE_NAME", outputName.trim());
            HomeService.createPrimaryXML("CLMT_ID", clmt_id);
            HomeService.createPrimaryXML("EXPOSURE_TYPE", typeValue);
            HomeService.createPrimaryXML("EXPOSURE_NUM", numValue);
            HomeService.createPrimaryXML("PROVIDER_SYS", provider_sys);
            HomeService.createPrimaryXML("PROVIDER_PHONE", provider_phn);
            HomeService.createPrimaryXML("DETMNTN_OB_KW", treatmntStatus);
            if ($scope.selectedPrecertId && $scope.selectedPrecertId.PrecertificationId) {
                HomeService.createPrimaryXML("PRECERT_ID_OB_KW", $scope.selectedPrecertId.PrecertificationId);
            } else {
                HomeService.createPrimaryXML("PRECERT_ID_OB_KW", '');
            }

            HomeService.createPrimaryXML("SERVICE_DT_CAL", service_date);

            if ($scope.selectedPrecertId) {
                var precert_table_id = shareData.shareOutputXML.getElementsByTagName("PRECERT_CODE_REC").length;
                HomeService.createSecondaryTableXML("PRECERT_CODE_REC");
                HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "CLM_FK", "1", precert_table_id);
                HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "PRECERT_ID", $scope.selectedPrecertId.PrecertificationId, precert_table_id);
                HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "PRECERT_START_DATE", start_date, precert_table_id);
                HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "PRECERT_END_DATE", end_date, precert_table_id);

                if ($scope.DeterminationDataList) {

                    for (i = 0; i < $scope.DeterminationDataList.length; i++) {
                        var determint_table_id = shareData.shareOutputXML.getElementsByTagName("DETERMNT_ID_REC").length;
                        var deter = $scope.DeterminationDataList[i];

                        var treatmntStatus = '';
                        if (deter.TreatmentStatus) {
                            if (Array.isArray(deter.TreatmentStatus)) {
                                if (deter.TreatmentStatus.length > 1) {
                                    treatmntStatus = 'Multiple';
                                } else {
                                    treatmntStatus = deter.TreatmentStatus[0];
                                }
                            } else {
                                treatmntStatus = deter.TreatmentStatus
                            }
                        }

                        HomeService.createSecondaryTableXML("DETERMNT_ID_REC");
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "CLM_FK", "1", determint_table_id);
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "TOTAL_TREAT_APPR", deter.TotalTreatmentsApproved, determint_table_id);
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "TRMNT_REASON", deter.TreatmentReason, determint_table_id);
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "TRMNT_STATUS", treatmntStatus, determint_table_id);
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "APPEAL_STATUS", deter.IsAppealPresent, determint_table_id);
                        HomeService.createSecondaryXMLValue("DETERMNT_ID_REC", "DETERMNT_CODE", deter.DeterminationId, determint_table_id);

                        if ($scope.ProcedureDataList[i]) {
                            for (j = 0; j < $scope.ProcedureDataList[i].length; j++) {
                                var default_code_id = shareData.shareOutputXML.getElementsByTagName("PROCEDURE_CODE_REC").length;
                                var procCode = $scope.ProcedureDataList[i][j];

                                HomeService.createSecondaryTableXML("PROCEDURE_CODE_REC");

                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "PRECERT_START_CODE", procCode.StartCode, default_code_id);
                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "PRECERT_END_CODE", procCode.EndCode, default_code_id);
                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "CLM_FK", "1", default_code_id);
                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "DETERMNT_CODE_PROC", deter.DeterminationId, default_code_id);
                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "PRECERT_ID_PROC", $scope.selectedPrecertId.PrecertificationId, default_code_id);
                                HomeService.createSecondaryXMLValue("PROCEDURE_CODE_REC", "PRECERT_USER_DEF_GROUP", procCode.UserDefinedGroup, default_code_id);

                            }
                        }
                    }
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

