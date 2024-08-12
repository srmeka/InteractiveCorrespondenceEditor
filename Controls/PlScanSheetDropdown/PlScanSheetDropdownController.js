app.controller('PlScanSheetDropdownController', function ($scope, shareData, $http, HomeService) {
    try {
        var lob = HomeService.getUrlParameter('LOB');

        switch (lob) {
            case 'PC-HO':
                $scope.LabelName1 = "Line Of Business:";
                $scope.PopulateDropdown1 = ['HOFloater', 'Home', 'HORCT'];
                $scope.SelectedDropdownValue1 = "Home";

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Certificates of Insurance") {
                    $scope.LabelName2 = "Certificate Type:";
                    $scope.PopulateDropdown2 = ['Individual', 'Renewal List'];
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Correspondence") {
                    $scope.LabelName2 = "Source:";
                    $scope.PopulateDropdown2 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue2 = "Outgoing";

                    $scope.LabelName3 = "Workflow:";
                    $scope.PopulateDropdown3 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue3 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Renewal Questionnaire") {
                    $scope.LabelName2 = "Workflow:";
                    $scope.PopulateDropdown2 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue2 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Underwriting") {
                    $scope.LabelName2 = "Underwriting Support Docs:";
                    $scope.PopulateDropdown2 = ['Claim', 'Clue', 'Credit Report', 'MVR'];
                };

                break;

            case 'PC-UMB':
            case 'PC-DW':
                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Certificates of Insurance") {
                    $scope.LabelName1 = "Certificate Type:";
                    $scope.PopulateDropdown1 = ['Individual', 'Renewal List'];
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Correspondence") {
                    $scope.LabelName1 = "Source:";
                    $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue1 = "Outgoing";

                    $scope.LabelName2 = "Workflow:";
                    $scope.PopulateDropdown2 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue2 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Renewal Questionnaire") {
                    $scope.LabelName1 = "Workflow:";
                    $scope.PopulateDropdown1 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue1 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Underwriting") {
                    $scope.LabelName1 = "Underwriting Support Docs:";
                    $scope.PopulateDropdown1 = ['Claim', 'Clue', 'Credit Report', 'MVR'];
                };

                break;

            case 'PC-PA':

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Certificates of Insurance") {
                    $scope.LabelName1 = "Certificate Type:";
                    $scope.PopulateDropdown1 = ['Individual', 'Renewal List'];
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Correspondence") {
                    $scope.LabelName1 = "Source:";
                    $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue1 = "Outgoing";

                    $scope.LabelName2 = "Workflow:";
                    $scope.PopulateDropdown2 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue2 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  CSF") {
                    $scope.LabelName1 = "CSF Type:";
                    $scope.PopulateDropdown1 = ['Mid-Term', 'New Business', 'Renewal'];
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Discount Documents") {
                    $scope.LabelName1 = "Discount Type:";
                    $scope.PopulateDropdown1 = ['Driver', 'Vehicle'];
                    $scope.SelectedDropdownValue1 = "Driver";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Renewal Questionnaire") {
                    $scope.LabelName1 = "Workflow:";
                    $scope.PopulateDropdown1 = ['No', 'Yes'];
                    $scope.SelectedDropdownValue1 = "No";
                };

                if ($scope.SelectedDocument.documentFriendlyName == "POLDOC  Underwriting") {
                    $scope.LabelName1 = "Underwriting Support Docs:";
                    $scope.PopulateDropdown1 = ['Claim', 'Clue', 'Credit Report', 'MVR', 'Tier Sheets'];
                    $scope.SelectedDropdownValue1 = "Claim";
                };
                break;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PlScanSheetDropdown', function (event) {
        try {

            switch (lob) {
                case 'PC-PA':
                    switch ($scope.SelectedDocument.documentFriendlyName) {
                        case 'POLDOC  Certificates of Insurance':
                            HomeService.createPrimaryXML("TAG8", "Certificate Type:");
                            HomeService.createPrimaryXML("TAG8_NUM", "008:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                            
                            break;

                        case 'POLDOC  Correspondence':
                            HomeService.createPrimaryXML("TAG8", "Source:");
                            HomeService.createPrimaryXML("TAG8_NUM", "010:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                           
                            HomeService.createPrimaryXML("TAG9", "Workflow:");
                            HomeService.createPrimaryXML("TAG9_NUM", "039:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            } 
                            
                            break;

                        case 'POLDOC  CSF':
                            HomeService.createPrimaryXML("TAG8", "CSF Type:");
                            HomeService.createPrimaryXML("TAG8_NUM", "013:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                            
                            break;

                        case 'POLDOC  Discount Documents':
                            HomeService.createPrimaryXML("TAG8", "Discount Type:");
                            HomeService.createPrimaryXML("TAG8_NUM", "011:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                            
                            break;

                        case 'POLDOC  Renewal Questionnaire':
                            HomeService.createPrimaryXML("TAG8", "Workflow:");
                            HomeService.createPrimaryXML("TAG8_NUM", "039:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                            
                            break;

                        case 'POLDOC  Underwriting':
                            HomeService.createPrimaryXML("TAG8", "Underwriting Support Docs:");
                            HomeService.createPrimaryXML("TAG8_NUM", "012:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE8", "");
                            }
                            
                            break;
                    };
                    break;

                case 'PC-HO':
                    HomeService.createPrimaryXML("TAG8", "LOB:");
                    HomeService.createPrimaryXML("TAG8_NUM", "002:");
                    if ($scope.SelectedDropdownValue1) {
                        HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                    } else {
                        HomeService.createPrimaryXML("VALUE8", "");
                    }
   
                    switch ($scope.SelectedDocument.documentFriendlyName) {
                        case 'POLDOC  Certificates of Insurance':
                            HomeService.createPrimaryXML("TAG9", "Certificate Type:");
                            HomeService.createPrimaryXML("TAG9_NUM", "008:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;

                        case 'POLDOC  Correspondence':
                            HomeService.createPrimaryXML("TAG9", "Source:");
                            HomeService.createPrimaryXML("TAG9_NUM", "010:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
  
                            HomeService.createPrimaryXML("TAG10", "Workflow:");
                            HomeService.createPrimaryXML("TAG10_NUM", "039:");
                            if ($scope.SelectedDropdownValue3) {
                                HomeService.createPrimaryXML("VALUE10", $scope.SelectedDropdownValue3);
                            } else {
                                HomeService.createPrimaryXML("VALUE10", "");
                            }
                            
                            break;

                        case 'POLDOC  Renewal Questionnaire':
                            HomeService.createPrimaryXML("TAG9", "Workflow:");
                            HomeService.createPrimaryXML("TAG9_NUM", "039:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;

                        case 'POLDOC  Underwriting':
                            HomeService.createPrimaryXML("TAG9", "Underwriting Support Docs:");
                            HomeService.createPrimaryXML("TAG9_NUM", "012:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;
                    };
                    break;
                case 'PC-UMB':
                case 'PC-DW':
                    switch ($scope.SelectedDocument.documentFriendlyName) {
                        case 'POLDOC  Certificates of Insurance':
                            HomeService.createPrimaryXML("TAG9", "Certificate Type:");
                            HomeService.createPrimaryXML("TAG9_NUM", "008:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;

                        case 'POLDOC  Underwriting':
                            HomeService.createPrimaryXML("TAG9", "Underwriting Support Docs:");
                            HomeService.createPrimaryXML("TAG9_NUM", "012:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;

                        case 'POLDOC  Correspondence':
                            HomeService.createPrimaryXML("TAG9", "Source:");
                            HomeService.createPrimaryXML("TAG9_NUM", "010:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
          
                            HomeService.createPrimaryXML("TAG10", "Workflow:");
                            HomeService.createPrimaryXML("TAG10_NUM", "039:");
                            if ($scope.SelectedDropdownValue2) {
                                HomeService.createPrimaryXML("VALUE10", $scope.SelectedDropdownValue2);
                            } else {
                                HomeService.createPrimaryXML("VALUE10", "");
                            }
                            
                            break;

                        case 'POLDOC  Renewal Questionnaire':
                            HomeService.createPrimaryXML("TAG9", "Workflow:");
                            HomeService.createPrimaryXML("TAG9_NUM", "039:");
                            if ($scope.SelectedDropdownValue1) {
                                HomeService.createPrimaryXML("VALUE9", $scope.SelectedDropdownValue1);
                            } else {
                                HomeService.createPrimaryXML("VALUE9", "");
                            }
                            
                            break;
                    }
                    break;

            }; //switch (lob)

        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occured. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});