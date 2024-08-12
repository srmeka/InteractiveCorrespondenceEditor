app.controller('WccPrecertIdAndApprovalStatController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.PrecertIdData = JSPath.apply(".Claim.Precertifications.Precertification{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        $scope.selectedIDItem = function (IdItem) {
            $scope.selectedId = IdItem;

            $scope.selectedProcs = [];
            if (Array.isArray(IdItem.Procedures.Procedure)) {
                $scope.selectedProcs = IdItem.Procedures.Procedure;
            } else {
                $scope.selectedProcs.push(IdItem.Procedures.Procedure);
            }
        }
        
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccPrecertIdAndApprovalStat', function (event) {
        try {
            var adm_status = '', provide_tax = '', surgery_dt = '', surgery_status = '', provider_name = '', facil_name = '';

            if ($scope.selectedId) {
                if ($scope.selectedId.AdmissionStatus) {
                    adm_status = $scope.selectedId.AdmissionStatus;
                }
                if ($scope.selectedId.ProvidertaxNumber) {
                    provide_tax = $scope.selectedId.ProvidertaxNumber;
                }
                if ($scope.selectedId.PreSurgeryDate) {
                    surgery_dt = $scope.selectedId.PreSurgeryDate;
                }
                if ($scope.selectedId.PreAuthorizedStatus) {
                    surgery_status = $scope.selectedId.PreAuthorizedStatus;
                }
                if ($scope.selectedId.ProviderName) {
                    provider_name = $scope.selectedId.ProviderName;
                }
                if ($scope.selectedId.FacilityName) {
                    facil_name = $scope.selectedId.FacilityName;
                }
            }

            HomeService.createPrimaryXML("ADMISS_STATUS", adm_status);
            HomeService.createPrimaryXML("PROVIDE_TAX_ID_AUTO", provide_tax);
            HomeService.createPrimaryXML("SURGERY_DT", surgery_dt);
            HomeService.createPrimaryXML("SURGERY_STATUS", surgery_status);
            HomeService.createPrimaryXML("PROVIDER_NAME", provider_name);
            HomeService.createPrimaryXML("FACIL_NAME", facil_name);

            if ($scope.selectedProcs) {
                if ($scope.selectedProcs) {
                    var procedureData = $scope.selectedProcs;
                    for (var i = 0; i < procedureData.length; i++) {
                        if (procedureData[i].ctrlChecked) {
                            var select_assist_type = '', select_cosurg_status = '', select_proced_codes = '', select_assist_status = '';
                            if (procedureData[i].AssistantType) {
                                select_assist_type = procedureData[i].AssistantType;
                            }
                            if (procedureData[i].CoSurgeonStatus) {
                                select_cosurg_status = procedureData[i].CoSurgeonStatus;
                            }
                            if (procedureData[i].ProcedureCode) {
                                select_proced_codes = procedureData[i].ProcedureCode;
                            }
                            if (procedureData[i].AssistantStatus) {
                                select_assist_status = procedureData[i].AssistantStatus;
                            }

                            var table_id = shareData.shareOutputXML.getElementsByTagName("PROCEDURE").length;
                            HomeService.createSecondaryTableXML("PROCEDURE");
                            HomeService.createSecondaryXMLValue("PROCEDURE", "CLM_FK", "1", table_id);
                            HomeService.createSecondaryXMLValue("PROCEDURE", "TABLE_TYPE", 'Assist_CoSurg', table_id);
                            HomeService.createSecondaryXMLValue("PROCEDURE", "ASSIST_TYPE", select_assist_type, table_id);
                            HomeService.createSecondaryXMLValue("PROCEDURE", "COSURG_STATUS", select_cosurg_status, table_id);
                            HomeService.createSecondaryXMLValue("PROCEDURE", "PROCED_CODES", select_proced_codes, table_id);
                            HomeService.createSecondaryXMLValue("PROCEDURE", "ASSIST_STATUS", select_assist_status, table_id);
                        }
                    }
                    for (var i = 0; i < procedureData.length; i++) {
                        var proced_codes = '', provide_status = '';

                        if (procedureData[i].ProcedureCode) {
                            proced_codes = procedureData[i].ProcedureCode;
                        }
                        if (procedureData[i].ProviderStatus) {
                            provide_status = procedureData[i].ProviderStatus;
                        }

                        var table_id = shareData.shareOutputXML.getElementsByTagName("PROCEDURE").length;
                        HomeService.createSecondaryTableXML("PROCEDURE");
                        HomeService.createSecondaryXMLValue("PROCEDURE", "CLM_FK", "1", table_id);
                        HomeService.createSecondaryXMLValue("PROCEDURE", "TABLE_TYPE", 'Provider', table_id);
                        HomeService.createSecondaryXMLValue("PROCEDURE", "PROCED_CODES", proced_codes, table_id);
                        HomeService.createSecondaryXMLValue("PROCEDURE", "PROVIDE_STATUS", provide_status, table_id);
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

