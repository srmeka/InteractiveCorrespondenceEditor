app.controller('WebservicesController', function ($scope, $http, shareData, $window, $filter, HomeService) {
    $('input[type=radio]').on('change', function () {
        if (!this.checked) return
        $('.collapse').not($('div.' + $(this).attr('class'))).slideUp();
        $('.collapse.' + $(this).attr('class')).slideDown();
    });
    $scope.SelectedCategoryActive = "True";
    getLOB();
    getRegion();
    getEnvironment();
    getURLType();
    getURLInfo();

    function getLOB() {
        HomeService.GetLob().then(function (response) {
            var test = response.data;
            $scope.LOBDropdown = response.data;
            var l = $scope.LOBDropdown.length;
            $scope.LOBDropdown[l] = {"lobName":null}
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    function getRegion() {
        HomeService.GetRegion().then(function (response) {
            $scope.RegionDropdown = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    function getEnvironment() {
        HomeService.GetEnvironment().then(function (response) {
            $scope.Environment = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    function getURLType() {
        HomeService.GetURLType().then(function (response) {
            $scope.URLType = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    function getURLInfo() {
        HomeService.GetURLInfo().then(function (response) {
            $scope.URLInfo = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }

    $scope.InsertWebServices = function () {
        try {

            var webServices = {
                regionId: $scope.SelectedDevRegion.regionId,
                lob: $scope.SelectedDevLOB.lobName,
                environment: $scope.SelectedDevEnvironment,
                urlType: $scope.SelectedDevURLType,
                urlInfo: $scope.SelectedDevURLInfo,
                url: $scope.URL
            };
            var PromisePost = HomeService.addWebservice(webServices);
            PromisePost.then(function (response) {
                alert("Webservice insert successful -" + response.data.webservicesId)
            },
                  function (errorPl) {
                      $scope.errorDetail = errorPl.data.message;
                  });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred inserting webservice  -- " + ex.message;
        }
    }

    $scope.GetWebservices = function () {

        HomeService.GetWebServices($scope.SelectedDevURLType, $scope.SelectedDevEnvironment, $scope.SelectedDevLOB.lobName).then(function (response) {
            $scope.SelectedUpdateDevWebservice = response.data;
        },
function (error) {
    $scope.errorDetail = error;
});
    }

    $scope.UpdateInDev = function () {
        try {

            for (i = 0; i < $scope.SelectedUpdateDevWebservice.length; i++) {

                //script = script + " &#13;&#10;UPDATE [dbo].[Category] set categoryName='" + $scope.Category[i].categoryName + "',categoryFriendlyName = '" + $scope.Category[i].categoryFriendlyName + "',categoryActive = '" + $scope.Category[i].categoryActive + "', lobId = '" + $scope.Category[i].lobId + "' where categoryId = '" + $scope.Category[i].categoryId + "'&#13;&#10;";
                var updatedWebservice = {
                    webServicesId: $scope.SelectedUpdateDevWebservice[i].webServicesId,
                    regionId: $scope.SelectedUpdateDevWebservice[i].regionId,
                    lob: $scope.SelectedUpdateDevWebservice[i].lob,
                    environment: $scope.SelectedUpdateDevWebservice[i].environment,
                    urlType: $scope.SelectedUpdateDevWebservice[i].urlType,
                    urlInfo: $scope.SelectedUpdateDevWebservice[i].urlInfo,
                    url: $scope.SelectedUpdateDevWebservice[i].url
                };
                var PromisePut = HomeService.updateWebservice($scope.SelectedUpdateDevWebservice[i].webServicesId, updatedWebservice);
                PromisePut.then(function (response) {
                    alert("Webservice updated - Webservice Id: " + response.config.data.webServicesId);
                },
                function (errorPl) {
                    $scope.errorDetail = errorPl.data.message;
                });
            }

        }
        catch (ex) {
            $scope.errorDetail = "Error updating category -- " + ex.message;
        }
    }

});