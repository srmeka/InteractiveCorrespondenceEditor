app.controller('StartupController', function ($scope, $http, shareData, $window, $filter, HomeService) {
    $(document).ready(function () {
        $('input[name="Date"]').datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true,
            autoclose: true,
            orientation: "top auto"
        });
        $scope.State = "NJ";
        getLOB();
        getENV();
        $scope.SelectedXML = "";
        $scope.PolicyNumber = "";
        $('#AsOfDateId')[0].value = "";
    })
   
    function getLOB() {
        HomeService.GetLob().then(function (response) {
            $scope.LOBDropdown = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    function getENV() {
        HomeService.GetESBEnv().then(function (response) {
            $scope.EnvDropdown = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }
 

    $scope.CreateDocument = function () {
        var param1 = $scope.LOB.lobName;
        var param2;
        var param3 = $scope.State;
        var param4;
        var URLParam;
        
        var asOfDate = $filter('date')($('#AsOfDateId')[0].value, 'yyyy-MM-dd');
        if ($scope.PolicyNumber)
        {
            if (param1.match('PC')) {
                if (asOfDate == "") {
                    $scope.errorDetail = "Please enter as of date";
                    return;
                }
                else {
                    param2 = $scope.PolicyNumber;
                    URLParam = "PolicyNumber";

                    param4 = asOfDate;
                   
                }
            }
            else {
                param2 = $scope.PolicyNumber;
                URLParam = "PolicyNumber";
            }
        }
        else if ($scope.ProducerCode)
        {
            param2 = $scope.ProducerCode;
            URLParam = "ProducerCode";
        }

        else if ($scope.ClaimNumber)
        {
            param2 = $scope.ClaimNumber
            URLParam = "ClaimNumber";
        }
        else if ($scope.QuoteNumber) {
            if (param1.match('PC')) {
                if (asOfDate == "") {
                    $scope.errorDetail = "Please enter as of date";
                    return;
                }
                else {
                    param2 = $scope.QuoteNumber
                    URLParam = "QuoteNumber";

                    param4 = asOfDate;

                }
                param2 = $scope.QuoteNumber
                URLParam = "QuoteNumber";
            }
        }
        else {
            
            param2 = $scope.SelectedXML;
            URLParam = "DataFile";
        }

        if ($scope.SelectedEnv && $scope.State) {
            $window.location.href = 'Home?LOB=' + param1 + '&' + URLParam + '=' + param2 + '&AsOfDate=' + param4 + '&State=' + $scope.State + '&Env=' + $scope.SelectedEnv;
        }
        else {
            $scope.errorDetail = "Please select State and ESB Environment";
            return;
        }
    }

});