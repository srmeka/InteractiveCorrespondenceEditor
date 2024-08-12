app.controller('GcScanSheetPrinterController', function ($scope, shareData, $http, HomeService) {
    try {

        HomeService.LookupValue("GCPrinters").then(function (response) {
            $scope.GcScanSheetPrinter = response.data;
        },
              function (error) {
                  $scope.error = error;
              });

        var claimNo = JSPath.apply('.Claim.ClaimNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
        //var exposureNo = JSPath.apply('.Claim.InvolvedParties', shareData.shareJSONClaim.CorrespondenceDataResponse);
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcScanSheetPrinter', function (event) {
        try {
            
            if ($scope.SelectedGcScanSheetPrinter) {
                //Format creator id
                var creatorId = shareData.shareUsername;
                var creatorId = creatorId.replace(/\D/g, '');

                HomeService.createPrimaryXML("HEADING", "GC/PIP Barcode & SS");
                HomeService.createPrimaryXML("OUTPUT_PROF", $scope.SelectedGcScanSheetPrinter.lookupItemValue);
                HomeService.createPrimaryXML("PRINT_IND", "DEPT");

                HomeService.createPrimaryXML("TAG1", "Kofax Batch Class:");
                HomeService.createPrimaryXML("TAG1_NUM", "SID:");
                HomeService.createPrimaryXML("VALUE1", "GC/PIP Barcode & SS");


                //Logic for parsing doctype id for GC SS documents 12/31/2019
                //var baseUrl = location.href.split("Home?");
                //var InBoundXml = baseUrl[0] + "XSLT Tranformer/GC/INBoundDocType.xml";

                //var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
                //    xmldoc.async = "false";
                //    xmldoc.load(InBoundXml);
                //var xpath = "//Root/DocumentRoot[DocumentName ='" + $scope.SelectedDocument.docType + "']/InboundDocType";
                //var GcdocidNode = xmldoc.documentElement.selectSingleNode(xpath);
                //var Gcdocid = null;

                //    if (GcdocidNode != null) {
                //        Gcdocid = GcdocidNode.text;
                //    }
                
                var baseUrl = location.href.split("Home?");
                var InBoundXml = baseUrl[0] + "XSLT Tranformer/GC/INBoundDocType.xml";
                Gcdocid = HomeService.getGCDocidByDocName($scope.SelectedDocument.docType, InBoundXml);
                HomeService.createPrimaryXML("TAG2", "Document Type ID:");
                HomeService.createPrimaryXML("TAG2_NUM", "DTY:");
                HomeService.createPrimaryXML("VALUE2", Gcdocid);

                HomeService.createPrimaryXML("TAG3", "Scan Sheet Creator ID:");
                HomeService.createPrimaryXML("TAG3_NUM", "059:");
                HomeService.createPrimaryXML("VALUE3", creatorId);

                //Tag 5, if applicable
                if ($scope.SelectedDocument.documentFriendlyName != 'Bulk Billing Sheet'
                    && $scope.SelectedDocument.documentFriendlyName != 'Salvage Bulk Report'
                    && $scope.SelectedDocument.documentFriendlyName != 'Bulk Bill') {

                    HomeService.createPrimaryXML("TAG5", "Claim Number:");
                    HomeService.createPrimaryXML("TAG5_NUM", "040:");
                    HomeService.createPrimaryXML("VALUE5", claimNo);
                };

                switch ($scope.Category.categoryFriendlyName) {
                    case 'zScan Sheet Appraisal':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Appraisal");
                        break;
                    case 'zScan Sheet Arbitration':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Arbitration");
                        break;
                    case 'zScan Sheet Communications':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Communications");
                        break;
                    case 'zScan Sheet Environmental':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Environmental");
                        break;
                    case 'zScan Sheet Explanation of Benefits':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Explanation of Benefits");
                        break;
                    case 'zScan Sheet Financial':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Financial");
                        break;
                    case 'zScan Sheet General':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "General");
                        break;
                    case 'zScan Sheet General Claims Reports':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "General Claims Reports");
                        break;
                    case 'zScan Sheet Investigation':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Investigation");
                        break;
                    case 'zScan Sheet Legal':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Legal");
                        break;
                    case 'zScan Sheet Medical':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Medical");
                        break;
                    case 'zScan Sheet Medical Bills':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Medical Bills");
                        break;
                    case 'zScan Sheet MSA PIP General':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "MSA PIP General");
                        break;
                    case 'zScan Sheet Non Medical Bills':
                        HomeService.createPrimaryXML("DOC_TYPE_GROUP", "Non Medical Bills");
                        break;
                };
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});