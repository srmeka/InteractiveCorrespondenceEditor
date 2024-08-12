app.controller('OutputProfileSectionController', function ($scope, $http, shareData, HomeService) {
    try{
        var LOBName = HomeService.getUrlParameter('LOB');
        if (LOBName == "PC-CA") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-CGL") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-PA") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-HO") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-DW") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
            },
                  function (error) {
                      $scope.error = error;
                  });
        }
        if (LOBName == "PC-UMB") {
            HomeService.LookupValue("PCPAPrinters").then(function (response) {
                $scope.OpPrinterDropdown = response.data;
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
    $scope.$on('OutputProfileSection', function (event) {
        try{
            var root = shareData.shareOutputXML.getElementsByTagName("CorrespondenceDataResponse")[0];
            var XMLNode = document.getElementById('USMailId').getAttribute("xml");

            var AddresseeNameElement = shareData.shareOutputXML.createElement(XMLNode);
            var USMailValue = $scope.USMail.toString();
        
            AddresseeNameElement.appendChild(shareData.shareOutputXML.createTextNode(USMailValue));
            root.appendChild(AddresseeNameElement);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
});

});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            