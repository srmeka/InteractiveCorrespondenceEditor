app.controller('GcScanSheetDatePickerController', function ($scope, shareData, $http, HomeService, $filter) {
    try {

        //initialize date ranges for both date pickers
        $scope.dateFrom1 = new Date();
        $scope.dateTo1 = new Date();
        $scope.dateFrom2 = new Date();
        $scope.dateTo2 = new Date();

        $(document).ready(function () {
            $('input[name="Date1"]').datepicker({
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
                orientation: "top auto"
            });
        })

        $(document).ready(function () {
            $('input[name="Date2"]').datepicker({
                format: 'mm/dd/yyyy',
                todayHighlight: true,
                autoclose: true,
                orientation: "top auto"
            });
        })

        // set the default values, then overwrite any exceptions below as needed per doc
        $scope.dateFrom1 = createDate(-30, 0, 0);
        $scope.dateTo1.setDate($scope.dateTo1.getDate());
        $scope.DateOutputFormat1 = "mm/dd/yyyy";
        $scope.LabelName1 = "* Date Received:";
        $scope.Required1 = true;

        switch ($scope.SelectedDocument.documentFriendlyName) {
            case 'Arbitration Decision':
            case 'Arbitration Demand':
            case 'Extended Benefits':
            case 'Wage and Salary':
            case 'Closing Document':
            case 'PIP Application':
            case 'Attorney Bill':
            case 'Glass Bill':
            case 'Homeowners Invoice':
            case 'Miscellaneous Bill':
            case 'Records Fee Bill':
            case 'Rental Bill':
            case 'Salvage Invoice':
            case 'Tow Bill':
            case 'Vendor Bill':

                $scope.Hint1 = "Range: (Current Date - 30 days) to (Current Date)";
                $scope.dateFrom1 = createDate(-30, 0, 0);
                $scope.dateTo1.setDate($scope.dateTo1.getDate());
                break;

            case 'Medical EOB':
            case 'Void Stop':

                $scope.LabelName1 = "* Date of Service:";
                $scope.Hint1 = "Range: (Current Date - 25 years) to (Current Date + 4 years)";
                $scope.dateFrom1 = createDate(0, 0, -25);
                $scope.dateTo1 = createDate(0, 0, 4);

                $scope.DateOutputFormat2 = "mm/dd/yyyy";
                $scope.LabelName2 = "Payment Date:";
                $scope.Required2 = false;
                $scope.Hint2 = "Range: (Current Date - 5 years) to (Current Date + 4 years)";
                $scope.dateFrom2 = createDate(0, 0, -5);
                $scope.dateTo2 = createDate(0, 0, 4);
                break;

            case 'Bulk Billing Sheet':
            case 'Salvage Bulk Report':

                $scope.LabelName1 = "* Date on Document:";
                $scope.Hint1 = "Range: (Current Date - 5 years) to (Current Date)";
                $scope.dateFrom1 = createDate(0, 0, -5);
                break;

            case 'Subpoena':

                $scope.LabelName1 = "* Due Date:";
                $scope.Hint1 = "Range: (Current Date - 5 years) to (Current Date + 5 years)";
                $scope.dateFrom1 = createDate(0, 0, -5);
                $scope.dateTo1 = createDate(0, 0, 5);
                break;

            case 'Commencement of Treatment':
            case 'Diagnostic Report':
            case 'Medical Attachment':
            case 'Operative Report':
            case 'Peer Review Report':

                $scope.LabelName1 = "* Date of Service:";
                $scope.Hint1 = "Range: (Current Date - 25 years) to (Current Date + 4 years)";
                $scope.dateFrom1 = createDate(0, 0, -25);
                $scope.dateTo1 = createDate(0, 0, 4);
                break;

            case 'Independent Medical Exam':
            case 'Medical Records':

                $scope.LabelName1 = "Date of Service:";
                $scope.Required1 = false;
                $scope.Hint1 = "Range: (Current Date - 25 years) to (Current Date + 4 years)";
                $scope.dateFrom1 = createDate(0, 0, -25);
                $scope.dateTo1 = createDate(0, 0, 4);
                break;

            case 'Precert':
            case 'Audit Invoice':
            case 'IME Bill':
            case 'Medical Bills':
            case 'Payment Appeal':
            case 'Peer Review Bill':
            case 'Surgical Bill':
            case 'Uniform Bill':

                $scope.Hint1 = "Range: (Current Date - 30 days) to (Current Date)";
                $scope.dateFrom1 = createDate(-30, 0, 0);

                $scope.DateOutputFormat2 = "mm/dd/yyyy";
                $scope.LabelName2 = "* Date of Service:";
                $scope.Required2 = true
                $scope.Hint2 = "Range: (Current Date - 25 years) to (Current Date + 4 years)";
                $scope.dateFrom2 = createDate(0, 0, -25);
                $scope.dateTo2 = createDate(0, 0, 4);
                break;

            case 'Bulk Bill':

                $scope.LabelName1 = "* Date on Document:";
                $scope.Hint1 = "Range: (Current Date - 5 years) to (Current Date)";
                $scope.dateFrom1 = createDate(0, 0, -5);

                $scope.DateOutputFormat2 = "mm/dd/yyyy";
                $scope.LabelName2 = "* Date Received:";
                $scope.Required2 = true
                $scope.Hint2 = "Range: (Current Date - 30 days) to (Current Date)";
                $scope.dateFrom2 = createDate(-30, 0, 0);
                break;
        };

        $scope.checkDateRange = function (dt, dtFrom, dtTo) {

            var inRange = false;
            dtFrom = (dtFrom.getMonth() + 1) + "/" + dtFrom.getDate() + "/" + dtFrom.getFullYear();
            dtTo = (dtTo.getMonth() + 1) + "/" + dtTo.getDate() + "/" + dtTo.getFullYear();

            if (!dtFrom && !dtTo) {
                // if no dates provided, than its always in range.
                inRange = true;
            } else if (!dtFrom) {
                // if no From date is provided, then just check that the date <= To Date
                inRange = (new Date(dt) <= new Date(dtTo))
            } else if (!dtTo) {
                // if no To date is provided, then just check that the date >= From Date
                inRange = (new Date(dt) >= new Date(dtFrom))
            } else {
                // otherwise, we have both dates, check we're within range.
                inRange = (new Date(dt) >= new Date(dtFrom) && new Date(dt) <= new Date(dtTo))
            }
            return inRange;
        }

        function createDate(days, months, years) {
            var date = new Date();
            date.setDate(date.getDate() + days);
            date.setMonth(date.getMonth() + months);
            date.setFullYear(date.getFullYear() + years);
            return date;
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcScanSheetDatePicker', function (event) {
        try {

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'Arbitration Decision':
                case 'Closing Document':
                    HomeService.createPrimaryXML("TAG10", "Date Received:");
                    HomeService.createPrimaryXML("TAG10_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate1);
                    break;

                case 'Arbitration Demand':
                    HomeService.createPrimaryXML("TAG11", "Date Received:");
                    HomeService.createPrimaryXML("TAG11_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE11", $scope.SelectedDate1);
                    break;

                case 'Medical EOB':
                case 'Void Stop':
                    HomeService.createPrimaryXML("TAG10", "Date of Service:");
                    HomeService.createPrimaryXML("TAG10_NUM", "056:");
                    HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate1);
                    if ($scope.SelectedDate2) {
                        HomeService.createPrimaryXML("TAG11", "Payment Date:");
                        HomeService.createPrimaryXML("TAG11_NUM", "061:");
                        HomeService.createPrimaryXML("VALUE11", $scope.SelectedDate2);
                    } else {
                        HomeService.createPrimaryXML("TAG11", "");
                        HomeService.createPrimaryXML("TAG11_NUM", "");
                        HomeService.createPrimaryXML("VALUE11", "");
                    };
                    break;

                case 'Extended Benefits':
                case 'Wage and Salary':
                    HomeService.createPrimaryXML("TAG8", "Date Received:");
                    HomeService.createPrimaryXML("TAG8_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDate1);
                    break;

                case 'Bulk Billing Sheet':
                    HomeService.createPrimaryXML("TAG7", "Date on Document:");
                    HomeService.createPrimaryXML("TAG7_NUM", "054:");
                    HomeService.createPrimaryXML("VALUE7", $scope.SelectedDate1);
                    break;

                case 'Salvage Bulk Report':
                    HomeService.createPrimaryXML("TAG6", "Date on Document:");
                    HomeService.createPrimaryXML("TAG6_NUM", "054:");
                    HomeService.createPrimaryXML("VALUE6", $scope.SelectedDate1);
                    break;

                case 'Subpoena':
                    HomeService.createPrimaryXML("TAG9", "Due Date:");
                    HomeService.createPrimaryXML("TAG9_NUM", "065:");
                    HomeService.createPrimaryXML("VALUE9", $scope.SelectedDate1)
                    break;

                case 'Commencement of Treatment':
                case 'Medical Attachment':
                case 'Peer Review Report':
                    HomeService.createPrimaryXML("TAG10", "Date of Service:");
                    HomeService.createPrimaryXML("TAG10_NUM", "056:");
                    HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate1);
                    break;

                case 'Diagnostic Report':
                case 'Independent Medical Exam':
                case 'Medical Records':
                case 'Operative Report':
                    HomeService.createPrimaryXML("TAG9", "Date of Service:");
                    HomeService.createPrimaryXML("TAG9_NUM", "056:");
                    HomeService.createPrimaryXML("VALUE9", $scope.SelectedDate1);
                    break;

                case 'Precert':
                case 'Audit Invoice':
                case 'IME Bill':
                case 'Medical Bills':
                case 'Payment Appeal':
                case 'Surgical Bill':
                    HomeService.createPrimaryXML("TAG10", "Date Received:");
                    HomeService.createPrimaryXML("TAG10_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate1);

                    HomeService.createPrimaryXML("TAG11", "Date of Service:");
                    HomeService.createPrimaryXML("TAG11_NUM", "056:");
                    HomeService.createPrimaryXML("VALUE11", $scope.SelectedDate2);
                    break;

                case 'Peer Review Bill':
                case 'Uniform Bill':
                    HomeService.createPrimaryXML("TAG9", "Date Received:");
                    HomeService.createPrimaryXML("TAG9_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE9", $scope.SelectedDate1);

                    HomeService.createPrimaryXML("TAG10", "Date of Service:");
                    HomeService.createPrimaryXML("TAG10_NUM", "056:");
                    HomeService.createPrimaryXML("VALUE10", $scope.SelectedDate2);
                    break;

                case 'PIP Application':
                case 'Glass Bill':
                case 'Homeowners Invoice':
                case 'Tow Bill':
                case 'Rental Bill':
                    HomeService.createPrimaryXML("TAG7", "Date Received:");
                    HomeService.createPrimaryXML("TAG7_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE7", $scope.SelectedDate1);
                    break;
                  
                case 'Attorney Bill':
                case 'Miscellaneous Bill':
                case 'Records Fee Bill':
                case 'Salvage Invoice':
                case 'Vendor Bill':
                    HomeService.createPrimaryXML("TAG9", "Date Received:");
                    HomeService.createPrimaryXML("TAG9_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE9", $scope.SelectedDate1);
                    break;

                case 'Bulk Bill':
                    HomeService.createPrimaryXML("TAG7", "Date on Document:");
                    HomeService.createPrimaryXML("TAG7_NUM", "054:");
                    HomeService.createPrimaryXML("VALUE7", $scope.SelectedDate1);

                    HomeService.createPrimaryXML("TAG8", "Date Received:");
                    HomeService.createPrimaryXML("TAG8_NUM", "055:");
                    HomeService.createPrimaryXML("VALUE8", $scope.SelectedDate1);
                    break;
   
            }; //switch

        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});