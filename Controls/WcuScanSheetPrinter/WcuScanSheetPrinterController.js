app.controller('WcuScanSheetPrinterController', function ($scope, shareData, $http, HomeService) {
    try {

        HomeService.LookupValue("PCPrinters").then(function (response) {
            $scope.ScanSheetPrinter = response.data;
        },
            function (error) {
                $scope.error = error;
            });

        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        var years = [];
        var currentYear = currentDate.getFullYear();

        var policyNo = JSPath.apply('.Policy.PolicyNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
        var quoteNo = JSPath.apply('.Policy.PolicyPeriod.QuoteNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WcuScanSheetPrinter', function (event) {
        try {
            if ($scope.SelectedScanSheetPrinter) {
                //Format creator id
                var creatorId = shareData.shareUsername;
                var creatorId = creatorId.replace(/\D/g, '');

                HomeService.createPrimaryXML("HEADING", "WCU Barcode_SS");
                HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedScanSheetPrinter.lookupItemValue);

                HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                HomeService.createPrimaryXML("VALUE1", "WCU Barcode_SS");

                HomeService.createPrimaryXML("TAG2", "Document Type:");
                HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                HomeService.createPrimaryXML("VALUE2", shareData.shareOnbaseDoctypeId);

                HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                HomeService.createPrimaryXML("TAG3_NUM", "059:");
                HomeService.createPrimaryXML("VALUE3", creatorId);
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});