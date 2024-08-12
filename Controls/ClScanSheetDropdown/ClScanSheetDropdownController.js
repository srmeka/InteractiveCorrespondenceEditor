app.controller('ClScanSheetDropdownController', function ($scope, shareData, $http, HomeService) {
    try{
        if ($scope.SelectedDocument.documentFriendlyName == "CL Correspondence") {
            $scope.LabelName1 = "CL Doc Source";
            $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing', 'Web'];
            $scope.SelectedDropdownValue1 = "Incoming";

            $scope.LabelName2 = "Correspondence Type";
            $scope.PopulateDropdown2 = ['Cancel-reinstate', 'Engineering', 'Ownership', 'SIU', 'Underwriting'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Coverage Selection Form") {
            $scope.LabelName1 = "CL CSF Type";
            $scope.PopulateDropdown1 = ['Mid-term', 'New Bus', 'Renewal'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Quotation") {
            $scope.LabelName1 = "Quote Type";
            $scope.PopulateDropdown1 = ['New Bus', 'Renewal'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Audits") {
            $scope.LabelName1 = "CL Doc Source";
            $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
            $scope.SelectedDropdownValue1 = "Incoming";

            $scope.LabelName2 = "Audit Support Docs";
            $scope.PopulateDropdown2 = ['Audit documentation', 'Audit worksheet', 'Final Audit', 'Mail Audit'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Experience Rating") {
            $scope.LabelName1 = "Experience Rating Type";
            $scope.PopulateDropdown1 = ['Computer Generated', 'Manual'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Renewal Questionnaire") {
            $scope.LabelName1 = "Questionnaire Type";
            $scope.PopulateDropdown1 = ['Incoming','Outgoing','Outgoing Veh-List'];
        }

        if ($scope.SelectedDocument.documentFriendlyName == "CL Underwriting") {
            $scope.LabelName1 = "Underwriting Support Docs";
            $scope.PopulateDropdown1 = ['Claim', 'Clue', 'Credit Report', 'ICC Filings', 'MVR'];
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('ClScanSheetDropdown', function (event) {
        try{
            if ($scope.SelectedDocument.documentFriendlyName == "CL Correspondence") {
                HomeService.createPrimaryXML("Tag7", "CL Doc Source:");
                HomeService.createPrimaryXML("Tag7Num", "010:");
                HomeService.createPrimaryXML("Value7", ($scope.SelectedDropdownValue1));

                HomeService.createPrimaryXML("Tag10", "Correspondence Type:");
                HomeService.createPrimaryXML("Tag10Num", "078:");
                HomeService.createPrimaryXML("Value10", ($scope.SelectedDropdownValue2));

                var quoteNumber = JSPath.apply('.Policy.QuoteNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
                HomeService.createPrimaryXML("Tag5", "Quote Number:");
                HomeService.createPrimaryXML("Tag5Num", "005:");
                HomeService.createPrimaryXML("Value5", quoteNumber);

            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Coverage Selection Form") {
                HomeService.createPrimaryXML("Tag8", "CL CSF Type:");
                HomeService.createPrimaryXML("Tag8Num", "013:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue1));

                var quoteNumber = JSPath.apply('.Policy.QuoteNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
                HomeService.createPrimaryXML("Tag5", "Quote Number:");
                HomeService.createPrimaryXML("Tag5Num", "005:");
                HomeService.createPrimaryXML("Value5", quoteNumber);
            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Quotation") {
                HomeService.createPrimaryXML("Tag8", "Quote Type:");
                HomeService.createPrimaryXML("Tag8Num", "067:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue1));

                var quoteNumber = JSPath.apply('.Policy.QuoteNumber', shareData.shareJSONClaim.CorrespondenceDataResponse);
                HomeService.createPrimaryXML("Tag5", "Quote Number:");
                HomeService.createPrimaryXML("Tag5Num", "005:");
                HomeService.createPrimaryXML("Value5", quoteNumber);
            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Audits") {
                HomeService.createPrimaryXML("Tag7", "CL Doc Source:");
                HomeService.createPrimaryXML("Tag7Num", "010:");
                HomeService.createPrimaryXML("Value7", ($scope.SelectedDropdownValue1));

                HomeService.createPrimaryXML("Tag8", "Audit Support Docs:");
                HomeService.createPrimaryXML("Tag8Num", "032:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue2));
            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Experience Rating") {
                HomeService.createPrimaryXML("Tag8", "Quote Type:");
                HomeService.createPrimaryXML("Tag8Num", "067:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue1));
            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Renewal Questionnaire") {
                HomeService.createPrimaryXML("Tag8", "Experience Rating Type:");
                HomeService.createPrimaryXML("Tag8Num", "097:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue1));
            }

            if ($scope.SelectedDocument.documentFriendlyName == "CL Underwriting") {
                HomeService.createPrimaryXML("Tag8", "Underwriting Support Docs:");
                HomeService.createPrimaryXML("Tag8Num", "012:");
                HomeService.createPrimaryXML("Value8", ($scope.SelectedDropdownValue1));
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    });
});