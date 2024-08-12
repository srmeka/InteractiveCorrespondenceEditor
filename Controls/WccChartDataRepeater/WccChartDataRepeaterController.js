app.controller('WccChartDataRepeaterController', function ($scope, $http, shareData, HomeService) {
    try {

        $scope.UCR = ($scope.SelectedDocument.documentFriendlyName == 'UCR Appeal Letter');

        if ($scope.UCR) {
            $scope.Labels = ["NJM UCR", "MEDICARE", "NJ PIP F/S", "PA WC F/S", "NY WC F/S", "FEDERAL WC F/S"];
        }
        else {
            $scope.Labels = ["NJM UCR", "MEDICARE", "PIP F/S", "NY WC F/S"];
        }

        $scope.CtrlEnabledCheckbox = [];
        $scope.chartTitle = [];
        $scope.chartLabel1 = [];
        $scope.chartLabel1Val = [];
        $scope.chartLabel2 = [];
        $scope.chartLabel2Val = [];
        $scope.chartLabel3 = [];
        $scope.chartLabel3Val = [];
        $scope.chartLabel4 = [];
        $scope.chartLabel4Val = [];
        $scope.chartLabel5 = [];
        $scope.chartLabel5Val = [];
        $scope.chartLabel5Text = [];
        $scope.chartLabel6 = [];
        $scope.chartLabel6Val = [];
        $scope.chartLabel6Text = [];

        $scope.showAddBtn = true;
        $scope.showRemoveBtn = false;

         $scope.MaxCtls = 16;
         $scope.TotalCount = [1];

    //     $scope.clearAllData = function (clearId) {
    //         $scope.selectedValue[clearId] = undefined;
    //         $scope.freeTextGroup[clearId] = undefined;
    //     }
         $scope.validateNumber = function (inputValue) {
             if (inputValue) {
                 inputValue = inputValue.replace(/[^0-9.]/g, '');
             }
             return inputValue;
         }

        $scope.addCtlRow = function () {
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                var newItemNo = $scope.TotalCount.length + 1;
                $scope.TotalCount.push(newItemNo);
            }
        };

        $scope.removeCtlRow = function () {
            var newItemNo = $scope.TotalCount.length - 1;
            if (newItemNo !== 0) {
                $scope.TotalCount.pop();
                $scope.CtrlEnabledCheckbox[newItemNo] = false;
                $scope.chartTitle[newItemNo] = undefined;
                $scope.chartLabel1Val[newItemNo] = undefined;
                $scope.chartLabel2Val[newItemNo] = undefined;
                $scope.chartLabel3Val[newItemNo] = undefined;
                $scope.chartLabel4Val[newItemNo] = undefined;
                $scope.chartLabel5Val[newItemNo] = undefined;
                $scope.chartLabel6Val[newItemNo] = undefined;
                //$scope.clearAllData(newItemNo);
            }
        }
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WccChartDataRepeater', function (event) {
        try {
            var ChartNum = 0;

            for (var index in $scope.TotalCount) {
                if ($scope.CtrlEnabledCheckbox[index]) {
                    ChartNum++;

                    var id = shareData.shareOutputXML.getElementsByTagName("NJM_CHART_DATA").length;
                    HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                    HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                    HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_TITLE", $scope.chartTitle[index], id);
                    HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel1[index], id);
                    HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel1Val[index], id);
                    HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);

                    if ($scope.chartLabel2[index] && $scope.chartLabel2Val[index]) {
                        id++;
                        HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel2[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel2Val[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);
                    }

                    if ($scope.chartLabel3[index] && $scope.chartLabel3Val[index]) {
                        id++;
                        HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel3[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel3Val[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);
                    }

                    if ($scope.chartLabel4[index] && $scope.chartLabel4Val[index]) {
                        id++;
                        HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel4[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel4Val[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);
                    }

                    if (($scope.chartLabel5[index] || $scope.chartLabel5Text[index]) && $scope.chartLabel5Val[index]) {
                        id++;
                        HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                        if ($scope.UCR){
                            HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel5[index], id);
                        }
                        else {
                            HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel5Text[index], id);
                        }
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel5Val[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);
                    }

                    if (($scope.chartLabel6[index] || $scope.chartLabel6Text[index]) && $scope.chartLabel6Val[index]) {
                        id++;
                        HomeService.createSecondaryTableXML("NJM_CHART_DATA");
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_NO", ChartNum, id);
                        if ($scope.UCR) {
                            HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel6[index], id);
                        }
                        else {
                            HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_LABEL", $scope.chartLabel6Text[index], id);
                        }
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CHART_VALUE", $scope.chartLabel6Val[index], id);
                        HomeService.createSecondaryXMLValue("NJM_CHART_DATA", "CLM_FK", "1", id);
                    }
                }
            }
            HomeService.createPrimaryXML('NO_CHARTS', ChartNum);

        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});