app.controller('WcuScanSheetDropdownController', function ($scope, shareData, $http, HomeService) {
    try {

        var currentDate = new Date(JSPath.apply('.Policy.PolicyPeriod.StartDt', shareData.shareJSONClaim.CorrespondenceDataResponse));
        var years = [];
        var currentYear = currentDate.getFullYear();

        years.push(currentYear - 5);
        years.push(currentYear - 4);
        years.push(currentYear - 3);
        years.push(currentYear - 2);
        years.push(currentYear - 1);
        years.push(currentYear);
        years.push(currentYear + 1);
   
        $scope.PopulateYearDropdown = years.sort();
        $scope.SelectedYearDropdownValue = currentYear;

        switch ($scope.SelectedDocument.documentFriendlyName) {
            case 'WCU Correspondence':

                if ($scope.Category.categoryFriendlyName == "ZScansheet Engineering") {

                    $scope.LabelName1 = "Doc Source";
                    $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue1 = "Incoming";

                    break;
                }

                if ($scope.Category.categoryFriendlyName == "ZScansheet Premium Audit") {

                    $scope.LabelName1 = "WCU Doc Source";
                    $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue1 = "Incoming";

                    $scope.LabelName2 = "Correspondence Type";
                    $scope.PopulateDropdown2 = ['Payroll Info', 'Premium Audit', 'Rating Bureau'];

                    break;
                }

                if ($scope.Category.categoryFriendlyName == "ZScansheet WCU") {

                    $scope.LabelName1 = "Doc Source";
                    $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                    $scope.SelectedDropdownValue1 = "Incoming";

                    $scope.LabelName2 = "Correspondence Type";
                    $scope.PopulateDropdown2 = ['Cancel-reinstate', 'Engineering', 'Finance Agreement', 'Loss pick retro', 'Ownership', 'Payroll Info', 'Rating Bureau', 'Retro'];

                    break;
                }

            case 'WCU Audit':

                $scope.LabelName1 = "Doc Source";
                $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                $scope.SelectedDropdownValue1 = "Incoming";

                $scope.LabelName2 = "Audit Support Doc";
                $scope.PopulateDropdown2 = ['Audit documentation', 'Audit worksheet', 'Final Audit', 'Mail Audit', 'Payroll Report form', 'Payroll Report Summary', 'Retro Adjustment', 'Retro Promulgation'];
                break;

            case 'WCU Coverage Selection Form':

                $scope.LabelName1 = "WCU CSF Type";
                $scope.PopulateDropdown1 = ['Mid-term', 'New Bus', 'Renewal'];
                break;

            case 'WCU Quotation':

                $scope.LabelName1 = "Quote Type";
                $scope.PopulateDropdown1 = ['New Bus', 'Renewal'];
                break;

            case 'WCU Retro':

                $scope.LabelName1 = "Doc Source";
                $scope.PopulateDropdown1 = ['Incoming', 'Internal', 'Outgoing'];
                $scope.SelectedDropdownValue1 = "Incoming";
                break;
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuScanSheetDropdown', function (event) {
        try {

            var sYear = "";
            if ($scope.SelectedYearDropdownValue) {
                sYear = $scope.SelectedYearDropdownValue;
            }

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'WCU Correspondence':

                    if ($scope.Category.categoryFriendlyName == "ZScansheet Engineering") {
                        HomeService.createPrimaryXML("TAG7", "Year:");
                        HomeService.createPrimaryXML("TAG7_NUM", "006:");
                        HomeService.createPrimaryXML("VALUE7", sYear);

                        HomeService.createPrimaryXML("TAG8", "Doc Source:");
                        HomeService.createPrimaryXML("TAG8_NUM", "079:");
                        HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);

                        break;
                    }

                    if ($scope.Category.categoryFriendlyName == "ZScansheet Premium Audit") {
                        HomeService.createPrimaryXML("TAG6", "Year:");
                        HomeService.createPrimaryXML("TAG6_NUM", "006:");
                        HomeService.createPrimaryXML("VALUE6", sYear);

                        HomeService.createPrimaryXML("TAG7", "WC Doc Source:");
                        HomeService.createPrimaryXML("TAG7_NUM", "079:");
                        HomeService.createPrimaryXML("VALUE7", $scope.SelectedDropdownValue1);

                        HomeService.createPrimaryXML("TAG8", "Correspondence Type:");
                        HomeService.createPrimaryXML("TAG8_NUM", "078:");
                        HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue2);

                        break;
                    }

                    if ($scope.Category.categoryFriendlyName == "ZScansheet WCU") {
                        HomeService.createPrimaryXML("TAG7", "Year:");
                        HomeService.createPrimaryXML("TAG7_NUM", "006:");
                        HomeService.createPrimaryXML("VALUE7", sYear);

                        HomeService.createPrimaryXML("TAG8", "WC Doc Source:");
                        HomeService.createPrimaryXML("TAG8_NUM", "079:");
                        HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);

                        HomeService.createPrimaryXML("TAG10", "Correspondence Type:");
                        HomeService.createPrimaryXML("TAG10_NUM", "078:");
                        HomeService.createPrimaryXML("VALUE10", $scope.SelectedDropdownValue2);

                        break;
                    }

                case 'WCU Audit':

                    HomeService.createPrimaryXML("TAG6", "Year:");
                    HomeService.createPrimaryXML("TAG6_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE6", sYear);

                    HomeService.createPrimaryXML("TAG7", "WC Doc Source:");
                    HomeService.createPrimaryXML("TAG7_NUM", "079:");
                    HomeService.createPrimaryXML("VALUE7", $scope.SelectedDropdownValue1);

                    HomeService.createPrimaryXML("TAG8", "Audit Support Docs:");
                    HomeService.createPrimaryXML("TAG8_NUM", "032:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue2);
                    break;

                case 'WCU Binder':
                case 'WCU Certificates of Insurance':
                case 'WCU Experience Rating':
                case 'WCU Renewal Questionnaire':
                case 'WCU Returned Mail':
                case 'WCU Underwriting':

                    HomeService.createPrimaryXML("TAG6", "Year:");
                    HomeService.createPrimaryXML("TAG6_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE6", sYear);
                    break;

                case 'WCU Application':

                    HomeService.createPrimaryXML("TAG7", "Year:");
                    HomeService.createPrimaryXML("TAG7_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE7", sYear);
                    break;

                case 'WCU Coverage Selection Form':

                    HomeService.createPrimaryXML("TAG7", "Year:");
                    HomeService.createPrimaryXML("TAG7_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE7", sYear);

                    HomeService.createPrimaryXML("TAG8", "WCU CSF Type:");
                    HomeService.createPrimaryXML("TAG8_NUM", "081:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);
                    break;

                case 'WCU Quotation':

                    HomeService.createPrimaryXML("TAG7", "Year:");
                    HomeService.createPrimaryXML("TAG7_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE7", sYear);

                    HomeService.createPrimaryXML("TAG8", "Quote Type:");
                    HomeService.createPrimaryXML("TAG8_NUM", "067:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);

                    break;

                case 'WCU Retro':

                    HomeService.createPrimaryXML("TAG7", "Year:");
                    HomeService.createPrimaryXML("TAG7_NUM", "006:");
                    HomeService.createPrimaryXML("VALUE7", sYear);

                    HomeService.createPrimaryXML("TAG8", "Doc Source:");
                    HomeService.createPrimaryXML("TAG8_NUM", "079:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDropdownValue1);

                    break;

            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});