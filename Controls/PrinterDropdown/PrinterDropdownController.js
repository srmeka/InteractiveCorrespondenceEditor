app.controller('PrinterDropdownController', function ($scope, shareData, $http, HomeService) {
    try{
        var LOBName = HomeService.getUrlParameter('LOB');
        if (LOBName == "BC-PA") {
            HomeService.LookupValue("BCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CA" || LOBName == "PC-BOP" || LOBName == "PC-CUMB") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CGL") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "BC-WCU") {
            HomeService.LookupValue("BCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-WCU") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-PA") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-HO") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-DW") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-UMB") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "GC") {
            HomeService.LookupValue("GCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "WCC") {
            HomeService.LookupValue("WCCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-WCU") {
            HomeService.LookupValue("PCPrinters").then(function (response) {
                $scope.PrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    
    $scope.$on('PrinterDropdown', function (event) {
        try{
            if (HomeService.getUrlParameter('LOB') == "BC-PA") {
                if ($scope.SelectedPrinter) {
                    if ($scope.SelectedPrinter.lookupItemValue == "Archive Only") {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("PRINT_IND", "N");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "PC-CA" || HomeService.getUrlParameter('LOB') == "PC-BOP") {
                if ($scope.SelectedPrinter) {
                    if ($scope.SelectedPrinter.lookupItemValue == "Archive Only") {
                        HomeService.createPrimaryXML("ArchiveInd", "Y");
                    }
                    else {
                        HomeService.createPrimaryXML("ArchiveInd", "Y");
                        HomeService.createPrimaryXML("PrintInd", "DEPT");
                        HomeService.createPrimaryXML("PrinterName", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("PrintInd", "N");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "PC-CGL" || HomeService.getUrlParameter('LOB') == "PC-CUMB") {
                if ($scope.SelectedPrinter) {
                    if ($scope.SelectedPrinter.lookupItemValue == "Archive Only") {
                        HomeService.createPrimaryXML("ArchiveInd", "Y");
                    }
                    else {
                        HomeService.createPrimaryXML("ArchiveInd", "Y");
                        HomeService.createPrimaryXML("PrintInd", "DEPT");
                        HomeService.createPrimaryXML("PrinterName", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("PrintInd", "N");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "BC-WCU") {
                if ($scope.SelectedPrinter) {
                        HomeService.createPrimaryXML("PRINT_IND", $scope.SelectedPrinter.lookupItemValue);
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                }
                else {
                    HomeService.createPrimaryXML("PRINT_IND");
                    HomeService.createPrimaryXML("PRINTER_NAME");
                }
           }
            else if (HomeService.getUrlParameter('LOB') == "PC-PA")  {
                if ($scope.SelectedPrinter) {
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        var PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = "BOTH";
                            HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                            HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        }
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                    HomeService.createPrimaryXML("PRINT_IND");
                    HomeService.createPrimaryXML("PRINTER_NAME");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "PC-HO")  {
                if ($scope.SelectedPrinter) {
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        var PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = "BOTH";
                            HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                            HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        }
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                    HomeService.createPrimaryXML("PRINT_IND");
                    HomeService.createPrimaryXML("PRINTER_NAME");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "PC-DW")  {
                if ($scope.SelectedPrinter) {
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        var PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = "BOTH";
                            HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                            HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        }
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
                else {
                    HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                    HomeService.createPrimaryXML("PRINT_IND");
                    HomeService.createPrimaryXML("PRINTER_NAME");
                }
            }
            else if (HomeService.getUrlParameter('LOB') == "PC-UMB") {
                if ($scope.SelectedPrinter) {
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        var PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = "BOTH";
                            HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                            HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        }
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
            }
                //Added for PC WCU
            else if (HomeService.getUrlParameter('LOB') == "PC-WCU") {
                if ($scope.SelectedPrinter) {
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        var PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = "BOTH";
                            HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                            HomeService.createPrimaryXML("ARCHIVE_IND", "Y");
                        }
                    }
                    else {
                        HomeService.createPrimaryXML("ARCHIVE_IND", "Y")
                        HomeService.createPrimaryXML("PRINT_IND", "DEPT");
                        HomeService.createPrimaryXML("PRINTER_NAME", $scope.SelectedPrinter.lookupItemValue);
                    }
                }
            }

            else if (HomeService.getUrlParameter('LOB') == "GC") {
                var PrintIndValue = "";
                var PrinterName = "";

                if ($scope.SelectedPrinter) {
                    //if a <PRINT_IND> tag already exists as "BATCH", set it to "BOTH", otherwise set it to "DEPT".
                    if (shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0]) {

                        PrintIndValue = shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue;
                        if (PrintIndValue == "BATCH") {
                            PrintIndValue = "BOTH"
                        }
                        else {
                            PrintIndValue = "DEPT";
                        }
                        shareData.shareOutputXML.getElementsByTagName("PRINT_IND")[0].firstChild.nodeValue = PrintIndValue;
                    }
                    else {
                        PrintIndValue = "DEPT";
                        HomeService.createPrimaryXML("PRINT_IND", PrintIndValue);
                    }

                    //if a <PRINTER_NAME> tag already exists, replace it with the selected value
                    PrinterName = $scope.SelectedPrinter.lookupItemValue;
                    if (shareData.shareOutputXML.getElementsByTagName("PRINTER_NAME")[0]) {
                        shareData.shareOutputXML.getElementsByTagName("PRINTER_NAME")[0].firstChild.nodeValue = PrinterName;
                    }
                    else {
                        HomeService.createPrimaryXML("PRINTER_NAME", PrinterName);
                    }

                }
                //else {
                //    PrintIndValue = "N";
                //    HomeService.createPrimaryXML("PRINT_IND", PrintIndValue);
                //}
            }

            else if (HomeService.getUrlParameter('LOB') == "WCC") {
                var PrintIndValue = "";
                var PrinterName = "";

                if ($scope.SelectedPrinter) {
                    PrintIndValue = "Y";
                    HomeService.createPrimaryXML("PRINT_IND", PrintIndValue);

                    PrinterName = $scope.SelectedPrinter.lookupItemValue;
                    HomeService.createPrimaryXML("PRINTER_NAME", PrinterName);
                }
                else {
                    PrintIndValue = "N";
                    HomeService.createPrimaryXML("PRINT_IND", PrintIndValue);
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