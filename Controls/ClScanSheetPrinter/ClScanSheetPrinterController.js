app.controller('ClScanSheetPrinterController', function ($scope, shareData, $http, HomeService) {
    try {
        var LOBName = HomeService.getUrlParameter('LOB');
        if (LOBName == "BC-PA") {
            HomeService.LookupValue("BCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CA") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CGL") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        //ADDED section for BOP AND CUMB
        if (LOBName == "PC-BOP") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CUMB") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "BC-WCU") {
            HomeService.LookupValue("BCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-PA") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-HO") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-DW") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-UMB") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "GC") {
            HomeService.LookupValue("GCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "WCC") {
            HomeService.LookupValue("WCCPrinters").then(function (response) {
                $scope.ClScanSheetPrinter = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }

        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        var years = [];
        var currentYear = currentDate.getFullYear();
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('ClScanSheetPrinter', function (event) {
        try {
            if ($scope.SelectedClScanSheetPrinter) {
                //Format creator id
                var creatorId = shareData.shareUsername;
                var creatorId = creatorId.replace(/\D/g, '');

                HomeService.createPrimaryXML("Heading", "Commercial Multilines_SS");

                HomeService.createPrimaryXML("Tag1", "Kofax Batch Class:");
                HomeService.createPrimaryXML("Tag1Num", "SID:");
                HomeService.createPrimaryXML("Value1", "Commercial Multilines_SS");

                HomeService.createPrimaryXML("Tag2", "Document Type:");
                HomeService.createPrimaryXML("Tag2Num", "DTY:");
                HomeService.createPrimaryXML("Value2", shareData.shareOnbaseDoctypeId);

                HomeService.createPrimaryXML("Tag3", "Scan Sheet Creator ID:");
                HomeService.createPrimaryXML("Value3", creatorId);
                HomeService.createPrimaryXML("Tag3Num", "059:");

                HomeService.createPrimaryXML("PrintInd", "DEPT");
                HomeService.createPrimaryXML("PrinterName", $scope.SelectedClScanSheetPrinter.lookupItemValue);

                if ($scope.SelectedDocument.documentFriendlyName == 'CL Certificates of Insurance') {
                    HomeService.createPrimaryXML("Tag7", "Certificate Type:");
                    HomeService.createPrimaryXML("Tag7Num", "008:");
                    HomeService.createPrimaryXML("Value7", "Individual");
                }
            };
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});