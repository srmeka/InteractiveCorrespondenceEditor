app.controller('WccDmeCheckboxLstwStatusController', function ($scope, shareData, HomeService) {
    try {
        $scope.DMEData = JSPath.apply(".Claim.DMEDetails.DMEDetail{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.DMEData.map(function (item) {
            item.selectedStatus = 'Authorized';
        })
       
        $scope.statusData = ['Authorized', 'Denied', 'Modified']
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccDmeCheckboxLstwStatus', function (event) {
        try {
            
            for (var i = 0; i < $scope.DMEData.length; i++) {
                var DMEItem = $scope.DMEData[i];
                if (DMEItem.ctrlSelected) {
                    var item_notes = '', item_details = '', item_status = '';
                    if (DMEItem.Notes) {
                        item_notes = DMEItem.Notes;
                    }
                    if (DMEItem.EquipmentDetails) {
                        item_details = DMEItem.EquipmentDetails;
                    }
                    if (DMEItem.selectedStatus) {
                        item_status = DMEItem.selectedStatus
                    }
                    var table_id = shareData.shareOutputXML.getElementsByTagName("DME").length;
                    HomeService.createSecondaryTableXML("DME");
                    HomeService.createSecondaryXMLValue("DME", "CLM_FK", "1", table_id);
                    HomeService.createSecondaryXMLValue("DME", "DME_NOTES", item_notes, table_id);
                    HomeService.createSecondaryXMLValue("DME", "EQUIP_DETAILS", item_details, table_id);
                    HomeService.createSecondaryXMLValue("DME", "EQUIP_STATUS", item_status, table_id);
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

