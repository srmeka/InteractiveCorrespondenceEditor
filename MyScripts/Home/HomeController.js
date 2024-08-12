app.controller('HomeController', function ($scope, $rootScope, HomeService, $http, $compile, shareData, $window, SoapService, $filter, OutputXML) {
    try {
        
        //$scope.true = true;
        $scope.ExecuteQuery = true;
        $scope.CategoryDisabled = true;
        $scope.DocumentDisabled = true;

        $scope.IsContinueDisabled = true;
        $scope.IsSampleDisabled = true;
        $scope.IsPreviewDisabled = true;
        $scope.IsOPXMLDisabled = true;
        $scope.IsIPXMLDisabled = true;
        var hostName = document.location.hostname;
        var chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
        getXML();
        $(document).ready(function () {
            $('input[name="Date"]').datepicker({
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                autoclose: true,
                orientation: "top auto"
            });
        })
        //// START -  Logic for ICE Instance Redirection 
        //if (!hostName.match("smproxy")) {
        //    if (HomeService.getUrlParameter('redirectdefault')) {


        // START -  Logic for ICE Instance Redirection 
        if (!hostName.match("smproxy")) {
            if (HomeService.getUrlParameter('redirectdefault')) {

            }
            else {
                RedirectToDefaultURL();
            }
        }

        $scope.regions = ['Underwriting', 'Claims', 'Default'];

        // function to populate region dropdown 
        getRegion();

        function getRegion() {
            if (location.href.match('ICEClaims')) {
                $scope.selectedregion = "Claims";
            }
            else if (location.href.match('ICEUnderwriting')) {
                $scope.selectedregion = "Underwriting";
            }
            else {
                $scope.selectedregion = "Default";
            }
        }

        function RedirectToDefaultURL() {
            var baseUrl = location.href.split("Home?");
            if (baseUrl[0].match("ICE/")) {
                var URL0 = baseUrl[0].replace("ICE/", "ICE");
            }
            if (baseUrl[0].match("ICEClaims/")) {
                var URL0 = baseUrl[0].replace("ICEClaims/", "ICE");
            }
            if (baseUrl[0].match("ICEUnderwriting/")) {
                var URL0 = baseUrl[0].replace("ICEUnderwriting/", "ICE");
            }
            if ((HomeService.getUrlParameter('LOB') == "GC") || (HomeService.getUrlParameter('LOB') == "WCC")) {
                if (hostName != "localhost") {
                    location.href = URL0 + "Claims/Home?" + baseUrl[1] + "&redirectdefault=false";
                }
            }
            else {
                if (hostName != "localhost") {
                    location.href = URL0 + "Underwriting/Home?" + baseUrl[1] + "&redirectdefault=false";
                }
            }
        }

        // END -- Logic for ICE Instance Redirection 

        //Get catagories
        function GetCategory() {

            try {

                HomeService.GetAdGroups().then(function (response) {
                    var groups = response.data;

                    var LOBName = HomeService.getUrlParameter('LOB');

                    HomeService.GetLOBandCategoryWithParam(0, LOBName, groups).then(function (response) {
                        //var LOBId =  response.data[0].lobId;
                        //GetCategory(LOBId);
                        $scope.CategoryDropdown = response.data;
                        $scope.CategoryDisabled = false;
                        $scope.DocumentDisabled = true;
                    },
                   function (error) {
                       $scope.error = "We’re sorry, an error has occurred while retrieving categories. Notification has been sent to IT Enterprise Support team";
                       if (error.data.message) {
                           HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving categories -- " + error.data.message, "");
                       }

                       else if (error.data) {
                           HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving categories -- " + error.data, "");
                       }
                       else {
                           HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving categories.", "");
                       }
                   });
                },
                function (error) {
                    $scope.error = "We’re sorry, an error has occurred while retrieving categories. Notification has been sent to IT Enterprise Support team";
                    if (error.data.message) {
                        HomeService.sendErrorMailandUpdateLog("Error occurred retrieving AD groups -- " + error.data.message, "");
                    }

                    else if (error.data) {
                        HomeService.sendErrorMailandUpdateLog("Error occurred retrieving AD groups -- " + error.data, "");
                    }
                    else {
                        HomeService.sendErrorMailandUpdateLog("Error occurred retrieving AD groups.", "");
                    }
                });
                var userData = [];

            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, "");
                throw (ex);
            }
        }

        //get querystring parameters
        //function getUrlParameter(name) {
        //    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        //    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        //    var results = regex.exec(location.search);
        //    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        //};

        //Removes existing controls of the previosly selected letter
        function removeExisitingContorls() {
            try {
                $scope.error = undefined;
                if ($("#LoadControls").html().length > 73) {
                    for (var i = 0; i < shareData.shareControllers.length ; i++) {
                        var ControlDescription = shareData.shareControllers[i].controlDescription;
                        var ControlName = ControlDescription.substring(ControlDescription.lastIndexOf("</") + 2, ControlDescription.lastIndexOf(">"));
                        ChildScope.$destroy();
                        $(ControlName).empty();
                    }
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                throw (ex)
            }
        }

        //Get documents based on selcted category and state.
        $scope.GetDocumentsForCategory = function () {
            try {

                $scope.DocumentForCategory = undefined;
                //$scope.ErrorMessage = true;
                //$scope.SelectedDocument = 0;
                $scope.DeleteDocument = "";
                removeExisitingContorls();

                //For BC-WCU producer code, risk state defaulted to first producer's address state in xslt
                var policyState = HomeService.getUrlParameter('State');
                shareData.shareState = policyState;
                if (policyState == "" || policyState == "default") {
                    if (shareData.shareInputXML.length) {
                        if (shareData.shareInputXML.match("<BaseStateCd>")) {
                            var start = shareData.shareInputXML.indexOf("<BaseStateCd>");
                            var end = shareData.shareInputXML.indexOf("</BaseStateCd>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<BaseStateCd>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<VehicleState>")) {
                            var start = shareData.shareInputXML.indexOf("<VehicleState>");
                            var end = shareData.shareInputXML.indexOf("</VehicleState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<VehicleState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<PolicyState>")) {
                            var start = shareData.shareInputXML.indexOf("<PolicyState>");
                            var end = shareData.shareInputXML.indexOf("</PolicyState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<PolicyState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<RiskState>")) {
                            var start = shareData.shareInputXML.indexOf("<RiskState>");
                            var end = shareData.shareInputXML.indexOf("</RiskState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<RiskState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<ClaimJurisdictionState>")) {
                            var start = shareData.shareInputXML.indexOf("<ClaimJurisdictionState>");
                            var end = shareData.shareInputXML.indexOf("</ClaimJurisdictionState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<ClaimJurisdictionState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<LossLocationState>")) {
                            var start = shareData.shareInputXML.indexOf("<LossLocationState>");
                            var end = shareData.shareInputXML.indexOf("</LossLocationState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<LossLocationState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.match("<BaseState>")) {
                            var start = shareData.shareInputXML.indexOf("<BaseState>");
                            var end = shareData.shareInputXML.indexOf("</BaseState>");
                            policyState = shareData.shareInputXML.substring(start, end);
                            policyState = policyState.replace("<BaseState>", "");
                            shareData.shareState = policyState;
                        }
                        else {
                            $scope.error = "We’re sorry, an error has occurred while retrieving  documents. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  documents -- State not present in input XML");
                            return;
                        }

                    }
                    else {
                        if (shareData.shareInputXML.xml.match("<BaseStateCd>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<BaseStateCd>");
                            var end = shareData.shareInputXML.xml.indexOf("</BaseStateCd>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<BaseStateCd>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.xml.match("<VehicleState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<VehicleState>");
                            var end = shareData.shareInputXML.xml.indexOf("</VehicleState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<VehicleState>", "");
                            if (policyState.length == 2) {
                                shareData.shareState = policyState;
                            }
                        else if (shareData.shareInputXML.xml.match("<PolicyState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<PolicyState>");
                            var end = shareData.shareInputXML.xml.indexOf("</PolicyState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<PolicyState>", "");
                            shareData.shareState = policyState;
                        }
                        }
                        else if (shareData.shareInputXML.xml.match("<PolicyState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<PolicyState>");
                            var end = shareData.shareInputXML.xml.indexOf("</PolicyState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<PolicyState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.xml.match("<RiskState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<RiskState>");
                            var end = shareData.shareInputXML.xml.indexOf("</RiskState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<RiskState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.xml.match("<ClaimJurisdictionState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<ClaimJurisdictionState>");
                            var end = shareData.shareInputXML.xml.indexOf("</ClaimJurisdictionState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<ClaimJurisdictionState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.xml.match("<LossLocationState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<LossLocationState>");
                            var end = shareData.shareInputXML.xml.indexOf("</LossLocationState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<LossLocationState>", "");
                            shareData.shareState = policyState;
                        }
                        else if (shareData.shareInputXML.xml.match("<BaseState>")) {
                            var start = shareData.shareInputXML.xml.indexOf("<BaseState>");
                            var end = shareData.shareInputXML.xml.indexOf("</BaseState>");
                            policyState = shareData.shareInputXML.xml.substring(start, end);
                            policyState = policyState.replace("<BaseState>", "");
                            shareData.shareState = policyState;
                        }
                        else {
                            $scope.error = "We’re sorry, an error has occurred while retrieving  documents. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  documents -- State not present in input XML");
                            return;
                        }
                    }
                }
                $scope.DocumentDisabled = true;
                if ($scope.Category) {
                    shareData.shareSelectedCategory = $scope.Category.categoryName;
                    HomeService.GetDocumentWithParam($scope.Category.categoryId, policyState).then(function (response) {
                        $scope.Document = null;
                        // $scope.NumberOfDocument = response.length;
                        $scope.DocumentForCategory = response.data;
                        $scope.DocumentDisabled = false;
                    },
                      function (error) {
                          $scope.error = "We’re sorry, an error has occurred while retrieving  documents. Notification has been sent to IT Enterprise Support team";
                          if (error.data.message) {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  documents -- " + error.data.message, "");
                          }
                          else if (error.data) {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  documents -- " + error.data, "");
                          }
                          else {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  documents.", "");
                          }
                      });
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, "");
            }
        }


        //Get onbase doctype id and merge it to claim XML
        function getDocTypeID() {
            try {
                
                var lob = HomeService.getUrlParameter('LOB');
                //added LOB check for WCC - WCC is not using onbase Doc Id
                if (lob != 'WCC') {
                    HomeService.GetOnbaseURL().then(function (response) {
                        if (response.data.length > 0) {
                            var onbaseUrl = response.data[0].url.trim();
                            SoapService.getOnbaseDoctypeId(onbaseUrl, $scope.SelectedDocument.docType).then(function success(response) {
                                var x2js = new X2JS();
                                var docIdResponse;
                                docIdResponse = x2js.xml_str2json(response.data);

                                if (docIdResponse.Envelope.Body.getDocumentTypeIdByNameResponse.response.Header.ErrorInformation.Code.__text != "OK") {
                                    //$scope.ErrorMessage = false;
                                    $scope.error = "Onbase Service failed " + docIdResponse.Envelope.Body.getDocumentTypeIdByNameResponse.response.Header.ErrorInformation.Message.__text;
                                    HomeService.sendErrorMailandUpdateLog("Onbase Service failed " + docIdResponse.Envelope.Body.getDocumentTypeIdByNameResponse.response.Header.ErrorInformation.Message.__text, $scope.SelectedDocument.documentFriendlyName)
                                }
                                if (docIdResponse.Envelope.Body.getDocumentTypeIdByNameResponse.response.Response.DocId == null) {
                                    return "0000"; //if OnBase doc id is not found send default value
                                }
                                else {
                                    var onbaseDocId = docIdResponse.Envelope.Body.getDocumentTypeIdByNameResponse.response.Response.DocId;
                                    shareData.shareOnbaseDoctypeId = onbaseDocId;
                                    removeExisitingContorls();
                                    //ADDED Condition for Manual Invoice document
                                    if ($scope.SelectedDocument.documentFriendlyName != 'Policyholder Accounting Statement' && $scope.SelectedDocument.documentFriendlyName != 'Broker Accounting Statement' && $scope.SelectedDocument.documentFriendlyName != 'Manual Invoice') {
                                        fetchControls();
                                    }
                                }
                            },
                            function error(response) {
                                $scope.error = "We’re sorry, an error has occurred while retrieving Onbase doctype. Notification has been sent to IT Enterprise Support team";
                                if (response.data.message) {
                                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                                }
                                else if (response.data) {
                                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                                }
                                else {
                                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype.", $scope.SelectedDocument.documentFriendlyName);
                                }

                            });
                        }
                        else {
                            $scope.error = "We’re sorry, an error has occurred while retrieving Onbase doctype. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype -- Onbase URL not found for LOB: " + lob, $scope.SelectedDocument.documentFriendlyName);
                        }
                    },
                    function error(response) {
                        $scope.error = "We’re sorry, an error has occurred while retrieving Onbase doctype. Notification has been sent to IT Enterprise Support team";
                        if (response.data.message) {
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                        }
                        else if (response.data) {
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                        }
                        else {
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving Onbase doctype.");
                        }
                    });
                }
                else {
                    //added LOB check for WCC - WCC is not using onbase Doc Id
                    //added condition for Manual Invoice
                    removeExisitingContorls();
                    if ($scope.SelectedDocument.documentFriendlyName != 'Policyholder Accounting Statement' && $scope.SelectedDocument.documentFriendlyName != 'Broker Accounting Statement' && $scope.SelectedDocument.documentFriendlyName != 'Manual Invoice') {
                        fetchControls();
                    }
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                throw (ex);
            }
        }

        function fetchControls() {
            try {
                HomeService.GetControls($scope.SelectedDocument.documentId).then(function (response) {
                    shareData.shareControllers = response.data;
                    var documentControls = response.data;
                    //shareData.shareControllers = documentControls;
                    //newScope = $scope.$new();
                    ChildScope = $scope.$new();
                    for (var i = 0; i < documentControls.length ; i++) {
                        try {
                            var compiledHTML = $compile(documentControls[i].controlDescription)(ChildScope);
                            $("#LoadControls").append(compiledHTML);
                            //Enabling document dropdown after controls are loaded
                             $scope.DocumentDisabled = false;
                        }
                        catch (ex) {
                            $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                            throw (ex);
                        }
                    }

                    $scope.IsSampleDisabled = false;
                    $scope.IsPreviewDisabled = false;
                    $scope.IsContinueDisabled = false;
                    $scope.IsOPXMLDisabled = false;
                    $scope.IsIPXMLDisabled = false;
                },
                function error(response) {
                    $scope.error = "We’re sorry, an error has occurred while retrieving  Controls. Notification has been sent to IT Enterprise Support team";

                    if (response.data.messageDetail) {
                        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.messageDetail, $scope.SelectedDocument.documentFriendlyName);
                    }
                    else if (response.data.message) {
                        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                    }
                    else if (response.data) {
                        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                    }
                    else {
                        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls.", $scope.SelectedDocument.documentFriendlyName);
                    }
                });
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                throw (ex);
            }
           // $scope.DocumentDisabled = false;
        }
        //Get letter's controls based on the selected document
        $scope.GetControls = function () {
            try {
                if ($scope.SelectedDocument) {
                    if ($scope.SelectedDocument.documentFriendlyName != 'Policyholder Accounting Statement' && $scope.SelectedDocument.documentFriendlyName != 'Broker Accounting Statement') {
                        $scope.DocumentDisabled = true;
                    }
                }
                
                // $scope.ErrorMessage = true;
                $scope.IsContinueDisabled = true;
                $scope.IsSampleDisabled = true;
                $scope.IsPreviewDisabled = true;
                $scope.IsOPXMLDisabled = true;
                $scope.IsIPXMLDisabled = true;
                if ($scope.SelectedDocument != null) {
                    if ($scope.SelectedDocument.documentFriendlyName == 'Manual Invoice') {
                        //Call BDS again with new method for Invoice data and update input xml
                        //Reload Input XML
                        shareData.shareInputXML = "";
                        GetInvoiceTrans();
                        GetInsCompanyTag("NJMCompany");
                        getDocTypeID();
                        GetInsCompanyAbbrTag("InsCompany");
                    }
                    else {
                        GetInsCompanyTag("NJMCompany");
                        getDocTypeID();
                        GetInsCompanyAbbrTag("InsCompany");
                    }
                   
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        //Display Claim XML in new tab
        $scope.GetInputXML = function () {
            try {
                var params = 'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';
                var OutputXMLWindow = window.open('/', 'Source Data', params);
                OutputXMLWindow.document.open("text/html");
                if (chromeAgent) {
                    var formatedInputXML = $filter('prettyXml')(shareData.shareInputXML.documentElement.innerHTML, 1);
                } else {
                if (shareData.shareInputXML.length) {
                        var formatedInputXML = $filter('prettyXml')(shareData.shareInputXML, 1);
                }
                else {
                        var formatedInputXML = $filter('prettyXml')(shareData.shareInputXML.xml, 1);
                }
                }
                OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:100%;width:100%\" readonly>" + formatedInputXML + "</textarea></body></html>");
                OutputXMLWindow.document.close();
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        //Display User Manual
        $scope.GetUserManual = function () {
            try {
                var params = 'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';
                var OutputXMLWindow = window.open('UserManual/Quick Reference Guide-Adhoc Correspondence.pdf', 'Quick Reference Guide', params);
                //OutputXMLWindow.document.open("text/html");      
            }
            catch (ex) {
                //$scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                //HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        //Launch Interactive Dashboard
        $scope.LaunchInteractive = function () {
            try {
                HomeService.GetURL('InteractiveURL').then(function (response) {
                    var InteractiveUrl = response.data[0].url.trim();
                    var wdth = screen.width - 50;
                    var hght = screen.height - 150;
                    var params = 'scrollbars=yes,resizable=yes,status=yes,location=no,toolbar=yes,menubar=yes,width=' + wdth + ',height=' + hght + ',left=25,top=50';
                    var OutputXMLWindow = window.open(InteractiveUrl, 'Interactive', params);
                })
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        //inserts default XML tags for intractive XML
        function insertDefaultTags() {
            try {

                var creatorId = shareData.shareUsername;
                var creatorId = creatorId.replace(/\D/g, '');
                var creatorName = shareData.shareUserFullName.trim();
                var creatorInitial = shareData.shareUserInitial.trim();

                if (HomeService.getUrlParameter('LOB') == "BC-PA") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("BILLING_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);


                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);

                    var transaction = JSPath.apply(".AccountInvoices.InvoiceLineItemsFrom360.Entry{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (transaction) {
                        for (i = 0; i < transaction.length; i++) {
                            HomeService.createSecondaryTableXML("TRANS_DATE_REC");
                            if (transaction[i].TransactionDate) {
                                var transactionDate = transaction[i].TransactionDate;
                                transactionDate = transactionDate.substring(0, 10);
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "TRANS_DATE", transactionDate, i);
                            }
                            if (transaction[i].Description) {
                                var desc = OutputXML.transformDescription(transaction[i].Description);
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "TRANS", desc, i);
                            }
                            if (transaction[i].DueAmount) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "CHARGE_AMT", transaction[i].DueAmount, i);
                            }
                            if (transaction[i].PaidAmount) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "CREDIT_AMT", transaction[i].PaidAmount, i);
                            }
                            if (transaction[i].InvoiceItemAmtDue) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BAL_AMT", transaction[i].InvoiceItemAmtDue, i);
                            }
                            if (transaction[i].PolicyYear) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "POL_YR", transaction[i].PolicyYear, i);
                            }
                            if (transaction[i].PolicyYear) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BR_NJM_POL_NO", transaction[i].PolicyYear, i);
                            }
                            if (transaction[i].PrimaryInsured) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BR_NJM_POLHOLD_NAME_1", transaction[i].PrimaryInsured, i);
                            }
                        }
                    }

                    //Format creator id
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    //HomeService.createPrimaryXML("OUTBND_DOCTYPE", "POLDOC  Correspondence");
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "BILL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-CA") {
                    if (shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0];
                        root.removeChild(elementToRemove);
                    }
                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CurrentDate", date);
                    HomeService.createPrimaryXML("PackageName", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("InboundDocType", shareData.shareOnbaseDoctypeId);
                    HomeService.createPrimaryXML("OutboundDocType", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CreatorID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("TableOfContents");
                    HomeService.createSecondaryXMLValue("TableOfContents", "Document", "", 0);
                    HomeService.createSecondaryXMLValue("Document", "DocumentName", $scope.SelectedDocument.documentName, 0);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-CGL") {
                    if (shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0];
                        root.removeChild(elementToRemove);
                    }

                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CurrentDate", date);
                    HomeService.createPrimaryXML("PackageName", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("InboundDocType", shareData.shareOnbaseDoctypeId);
                    HomeService.createPrimaryXML("OutboundDocType", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CreatorID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("TableOfContents");
                    HomeService.createSecondaryXMLValue("TableOfContents", "Document", "", 0);
                    HomeService.createSecondaryXMLValue("Document", "DocumentName", $scope.SelectedDocument.documentName, 0);
                }

                if (HomeService.getUrlParameter('LOB') == "BC-WCU") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("BILLING_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id


                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);

                    var transaction = JSPath.apply(".AccountInvoices.InvoiceLineItemsFrom360.Entry{.*}", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (transaction) {
                        for (i = 0; i < transaction.length; i++) {
                            HomeService.createSecondaryTableXML("TRANS_DATE_REC");
                            if (transaction[i].TransactionDate) {
                                var transactionDate = transaction[i].TransactionDate;
                                transactionDate = transactionDate.substring(0, 10);
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "TRANS_DATE", transactionDate, i);
                            }
                            if (transaction[i].Description) {
                                var desc = OutputXML.transformDescription(transaction[i].Description);
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "TRANS", desc, i);
                            }
                            if (transaction[i].DueAmount) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "CHARGE_AMT", transaction[i].DueAmount, i);
                            }
                            if (transaction[i].PaidAmount) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "CREDIT_AMT", transaction[i].PaidAmount, i);
                            }
                            if (transaction[i].InvoiceItemAmtDue) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BAL_AMT", transaction[i].InvoiceItemAmtDue, i);
                            }
                            if (transaction[i].PolicyYear) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "POL_YR", transaction[i].PolicyYear, i);
                            }
                            if (transaction[i].PolicyYear) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BR_NJM_POL_NO", transaction[i].PolicyYear, i);
                            }
                            if (transaction[i].PrimaryInsured) {
                                HomeService.createSecondaryXMLValue("TRANS_DATE_REC", "BR_NJM_POLHOLD_NAME_1", transaction[i].PrimaryInsured, i);
                            }
                        }
                    }


                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    //HomeService.createPrimaryXML("OUTBND_DOCTYPE", "POLDOC  Correspondence");
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);
                    // HomeService.createPrimaryXML("INS_CO_ABBREV", shareData.shareInsCoAbbr);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "BILL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }


                //ADDED FOR PersoNAL Auto Letters
                if (HomeService.getUrlParameter('LOB') == "PC-PA") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id

                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);

                    var EffectiveDate = JSPath.apply(".Policy.PolicyPeriod.StartDt", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (EffectiveDate) {
                        EffectiveDate = EffectiveDate[0].substring(0, 10);
                        EffectiveDate = OutputXML.getIDCardDate(EffectiveDate);
                        HomeService.createPrimaryXML("POL_EFF_DT_ID_CARD", EffectiveDate);
                    }

                    var ExpDate = JSPath.apply(".Policy.PolicyPeriod.EndDt", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (ExpDate) {
                        ExpDate = ExpDate[0].substring(0, 10);
                        ExpDate = OutputXML.getIDCardDate(ExpDate);
                        HomeService.createPrimaryXML("POL_EXP_DT_ID_CARD", ExpDate);
                    }

                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "POL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR HO Letters
                if (HomeService.getUrlParameter('LOB') == "PC-HO") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("HOMEOWNERS_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "POL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR DW Letters
                if (HomeService.getUrlParameter('LOB') == "PC-DW") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("DWELLING_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "POL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR UMB Letters
                if (HomeService.getUrlParameter('LOB') == "PC-UMB") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("UMBRELLA_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }

                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "POL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR GC Letters
                if (HomeService.getUrlParameter('LOB') == "GC") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("NJM_CLAIM_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    //Logic for parsing doctype id for GC documents 09/13/2019
                    var baseUrl = location.href.split("Home?");
                    var InBoundXml = baseUrl[0] + "XSLT Tranformer/GC/INBoundDocType.xml";
                    var GcInboundDocId = HomeService.getGCDocidByDocName($scope.SelectedDocument.documentName, InBoundXml);
                    if (GcInboundDocId) {
                        HomeService.createPrimaryXML("INBND_DOCTYPE", GcInboundDocId);
                    }
                    //Format creator id
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    if ($scope.Category.categoryName.indexOf("SCANSHEET") > -1) {
                        HomeService.createPrimaryXML("LTR_NAME", "GC Scan Sheet");
                    } else {
                        HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    }
                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);
                    
                    var DateOfLoss = JSPath.apply(".Claim.DateOfLoss", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (DateOfLoss) {
                        DateOfLoss = DateOfLoss[0].substring(0, 24);
                        var ClaimLossDate = OutputXML.getClaimLossDate(DateOfLoss);
                        HomeService.createPrimaryXML("CLM_LOSS_DT", ClaimLossDate);
                    }

                    var AccidentDate = JSPath.apply(".Claim.AccidentReportDate", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (AccidentDate) {
                        AccidentDate = AccidentDate[0].substring(0, 24);
                        var AccidentReportDate = OutputXML.getClaimLossDate(AccidentDate);
                        HomeService.createPrimaryXML("CLM_RPT_DT_AUTO", AccidentReportDate);
                    }

                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);
                    HomeService.createPrimaryXML("INS_CO_ABBREV", shareData.shareInsCoAbbr);
                    //HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    //HomeService.createSecondaryXMLValue("LTR_NAME_REC", "CLM_FK", "1", 0);
                    //HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR WCC Letters
                if (HomeService.getUrlParameter('LOB') == "WCC") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("WCC_CLAIM_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }

                    //Get data from outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);

                    var authDate = OutputXML.getAuthExpDate(7);
                    HomeService.createPrimaryXML("AUTH_EXPIRATION_DT", authDate);

                    letterDate = OutputXML.getLetterDate();
                    HomeService.createPrimaryXML("LTR_CREATE_DT", letterDate);

                    var DateOfLoss = JSPath.apply(".Claim.DateOfLoss", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (DateOfLoss) {
                        DateOfLoss = DateOfLoss[0].substring(0, 24);
                        var ClaimLossDate = OutputXML.getWCCClaimLossDate(DateOfLoss);
                        HomeService.createPrimaryXML("CLM_LOSS_DT", ClaimLossDate);
                    }

                    var HireDate = JSPath.apply(".Claim.InvolvedParties.Party.EmploymentRelationships.EmploymentRelationship.HireDate", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (HireDate.length) {
                        var getHireDate = JSPath.apply(".Claim.InvolvedParties.Party.EmploymentRelationships.EmploymentRelationship.HireDate", shareData.shareJSONClaim.CorrespondenceDataResponse);
                        getHireDate = getHireDate[0].substring(1, 24);
                        getHireDate = OutputXML.getWCCClaimLossDate(getHireDate);
                        HomeService.createPrimaryXML("CLMT_DATE_HIRED", getHireDate);
                    }

                    var MaximumMedicalImprovementDt = JSPath.apply(".Claim.InvolvedParties.Party.EmploymentRelationships.EmploymentRelationship.MaximumMedicalImprovementDt", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (MaximumMedicalImprovementDt.length) {
                        var getMaximumMedicalImprovementDt = JSPath.apply(".Claim.InvolvedParties.Party.EmploymentRelationships.EmploymentRelationship.MaximumMedicalImprovementDt", shareData.shareJSONClaim.CorrespondenceDataResponse);
                        getMedicalImprovementDate = getMaximumMedicalImprovementDt[0].substring(1, 24);
                        getMedicalImprovementDate = OutputXML.getWCCClaimLossDate(getMedicalImprovementDate);
                        HomeService.createPrimaryXML("MMI_DT", getMedicalImprovementDate);
                    }

                    var CPReceivedDate = JSPath.apply(".Claim.EarliestCPReceivedDate", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    if (CPReceivedDate.length) {
                        var getEarliestCPReceivedDate = JSPath.apply(".Claim.EarliestCPReceivedDate", shareData.shareJSONClaim.CorrespondenceDataResponse);
                        getEarliestCPReceivedDate = getEarliestCPReceivedDate[0].substring(1, 24);
                        getEarliestCPReceivedDate = OutputXML.getWCCClaimLossDate(getEarliestCPReceivedDate);
                        HomeService.createPrimaryXML("CLM_PET_DT", getEarliestCPReceivedDate);
                    }


                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);
                    //HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    //HomeService.createSecondaryXMLValue("LTR_NAME_REC", "CLM_FK", "1", 0);
                    //HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR BOP
                if (HomeService.getUrlParameter('LOB') == "PC-BOP") {
                    if (shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("PackageName", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("InboundDocType", shareData.shareOnbaseDoctypeId);
                    HomeService.createPrimaryXML("OutboundDocType", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CreatorID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);
                    //Get current date
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CurrentDate", date);
                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("TableOfContents");
                    HomeService.createSecondaryXMLValue("TableOfContents", "Document", "", 0);
                    HomeService.createSecondaryXMLValue("Document", "DocumentName", $scope.SelectedDocument.documentName, 0);
                }

                //ADDED FOR CUMB
                if (HomeService.getUrlParameter('LOB') == "PC-CUMB") {
                    if (shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("InboundDocType")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("PackageName", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("InboundDocType", shareData.shareOnbaseDoctypeId);
                    HomeService.createPrimaryXML("OutboundDocType", $scope.SelectedDocument.docType);
                    HomeService.createPrimaryXML("CreatorID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CurrentDate", date);
                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("TableOfContents");
                    HomeService.createSecondaryXMLValue("TableOfContents", "Document", "", 0);
                    HomeService.createSecondaryXMLValue("Document", "DocumentName", $scope.SelectedDocument.documentName, 0);
                }

                //Added for PC-WCU
                if (HomeService.getUrlParameter('LOB') == "PC-WCU") {
                    if (shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0]) {
                        root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
                        var elementToRemove = shareData.shareOutputXML.getElementsByTagName("INBND_DOCTYPE")[0];
                        root.removeChild(elementToRemove);
                    }
                    HomeService.createPrimaryXML("INBND_DOCTYPE", shareData.shareOnbaseDoctypeId);
                    //Format creator id

                    //Get current date frome outputXML.js
                    var date = OutputXML.getCurrentDate();
                    HomeService.createPrimaryXML("CURR_DT", date);
                    HomeService.createPrimaryXML("LTR_CTGY", $scope.Category.categoryName);
                    HomeService.createPrimaryXML("LTR_NAME", $scope.SelectedDocument.documentName);
                    HomeService.createPrimaryXML("OUTBND_DOCTYPE", $scope.SelectedDocument.docType);

                                       
                    //CNC_DT 
                    //var CancellationDate = JSPath.apply(".Policy.PolicyPeriod.CancellationDt", shareData.shareJSONClaim.CorrespondenceDataResponse);

                    var CancellationDate = shareData.shareJSONClaim.CorrespondenceDataResponse.Policy.PolicyPeriod.CancellationDt;
                    if (CancellationDate) {
                        CancellationDate = CancellationDate.substring(0, 24);
                        var cncDate = OutputXML.getClaimLossDate(CancellationDate);
                        HomeService.createPrimaryXML("CNC_DT", cncDate);
                    }

                    //PEND_CNC_DT                   

                    var PendingCancellationDt = shareData.shareJSONClaim.CorrespondenceDataResponse.Policy.PolicyPeriod.PendingCancellationDt;
                    if (PendingCancellationDt) {
                        PendingCancellationDt = PendingCancellationDt.substring(0, 24);
                        var pendingCNCDate = OutputXML.getClaimLossDate(PendingCancellationDt);
                        HomeService.createPrimaryXML("PEND_CNC_DT", pendingCNCDate);
                    }


                    HomeService.createPrimaryXML("CREATOR_UID", creatorId);
                    HomeService.createPrimaryXML("CREATOR_NAME", creatorName);
                    HomeService.createPrimaryXML("CREATOR_INT", creatorInitial);

                    HomeService.createPrimaryXML("INS_CO_NM", shareData.shareInsCo);

                    HomeService.createSecondaryTableXML("LTR_NAME_REC");
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "POL_FK", "1", 0);
                    HomeService.createSecondaryXMLValue("LTR_NAME_REC", "LTR_NAME_BATCH", $scope.SelectedDocument.documentName, 0);
                }
            }
            catch (ex) {

                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                throw (ex);
            }
        }

        function GetInsCompanyTag(CompanyName) {
            HomeService.LookupValue(CompanyName).then(function (response) {
                if (HomeService.getUrlParameter('LOB') == "GC") {
                    var insuranceCompany = JSPath.apply(".Claim.ClaimPolicy.NjmInsuranceCompanyName", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "WCC") {
                    var insuranceCompany = JSPath.apply(".Claim.ClaimPolicy.NjmInsuranceCompanyName", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "BC-PA") {
                    var insuranceCompany = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "BC-WCU") {
                   // Check if datafile selected
                    if (HomeService.getUrlParameter('DataFile')){
                        if (JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse)) {
                            var insuranceCompany = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse);
                        }
                        else {
                            var insuranceCompany = JSPath.apply(".ProducerStatments.ProducerActivity.Entry.RelatedPolicyPeriod.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse);
                            if (insuranceCompany == '') {
                                insuranceCompany[0] = "NJC";
                            }
                        }
                    }else{

                    //Company name fixed for producer code
                    var producerCode = HomeService.getUrlParameter('ProducerCode');
                    var policyNumber = HomeService.getUrlParameter('PolicyNumber');

                    if (policyNumber.length > 0) {
                        var insuranceCompany = JSPath.apply(".AccountInvoices.PolicyPeriodForThisInvoice.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse);
                    }

                    if (producerCode.length > 0) {
                        var insuranceCompany = JSPath.apply(".ProducerStatments.ProducerActivity.Entry.RelatedPolicyPeriod.UWCompany.Code", shareData.shareJSONClaim.CorrespondenceDataResponse);
                        if (insuranceCompany == '') {
                            insuranceCompany[0] = "NJC";
                        }
                    }
                }
                }
                if (HomeService.getUrlParameter('LOB') == "PC-PA") {
                    var insuranceCompany = JSPath.apply(".Policy.PolicyPeriod.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-DW") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-HO") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-UMB") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-CA") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-CGL") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-BOP") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-CUMB") {
                    var insuranceCompany = JSPath.apply(".Policy.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "PC-WCU") {
                    var insuranceCompany = JSPath.apply(".Policy.PolicyPeriod.UnderwritingCompany.OrganizationNameCd", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                var insCompanyValues = response.data;
            
                for (var i = 0 ; i < insCompanyValues.length; i++) {
                    if (insuranceCompany.length) {
                        if (insCompanyValues[i].lookupItemCode == insuranceCompany[0]) {
                            shareData.shareInsCo = insCompanyValues[i].lookupItemValue;
                        }
                    }
                    else {
                        if (insCompanyValues[i].lookupItemCode == insuranceCompany) {
                            shareData.shareInsCo = insCompanyValues[i].lookupItemValue;
                        }
                    }
                }
            },
            function (error) {
                $scope.error = error;
            });
        }

        function GetInsCompanyAbbrTag(CompanyName) {
            HomeService.LookupValue(CompanyName).then(function (response) {
                if (HomeService.getUrlParameter('LOB') == "GC") {
                    var insuranceCompany = JSPath.apply(".Claim.ClaimPolicy.NjmInsuranceCompanyName", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                if (HomeService.getUrlParameter('LOB') == "WCC") {
                    var insuranceCompany = JSPath.apply(".Claim.ClaimPolicy.NjmInsuranceCompanyName", shareData.shareJSONClaim.CorrespondenceDataResponse);
                }
                var insCompanyValues = response.data;
                for (var i = 0 ; i < insCompanyValues.length; i++) {
                    if (insuranceCompany) {
                    if (insuranceCompany.length) {
                        if (insCompanyValues[i].lookupItemCode == insuranceCompany[0]) {
                            shareData.shareInsCoAbbr = insCompanyValues[i].lookupItemValue;
                        }
                    }
                    else {
                        if (insCompanyValues[i].lookupItemCode == insuranceCompany) {
                            shareData.shareInsCoAbbr = insCompanyValues[i].lookupItemValue;
                        }
                    }
                }
                }
            },
            function (error) {
                $scope.error = error;
            });
        }

        //Create XML for intractive
        function createOutputXML() {
            try {
                var LOBName = HomeService.getUrlParameter('LOB');

                if (LOBName == "BC-PA") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("PLBC/BDSOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("PLBC/BDSOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("PLBC/BDSOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                else if (LOBName == "PC-CA") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("CA/CAOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("CA/CAOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("CA/CAOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                else if (LOBName == "PC-CGL") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("CGL/CGLOutput.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("CGL/CGLOutput.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("CGL/CGLOutput.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                else if (LOBName == "BC-WCU") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCUBC/WCUBCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("WCUBC/WCUBCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("WCUBC/WCUBCOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For Personal Line Auto
                else if (LOBName == "PC-PA") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("AUTO/PAOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("AUTO/PAOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("AUTO/PAOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For Personal Line Homeowners
                else if (LOBName == "PC-HO") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("HOME/HOOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("HOME/HOOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("HOME/HOOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For Personal Line Dwelling
                else if (LOBName == "PC-DW") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("DWELLING/DWOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("DWELLING/DWOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("DWELLING/DWOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For Personal Line UBRELLA
                else if (LOBName == "PC-UMB") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("UMBRELLA/UMBOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("UMBRELLA/UMBOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("UMBRELLA/UMBOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For GC 
                else if (LOBName == "GC") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("GC/GCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("GC/GCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("GC/GCOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    // For WCC

                else if (LOBName == "WCC") {
                    
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCC/WCCOutputXML.xslt", shareData.shareInputXML);
                       
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("WCC/WCCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("WCC/WCCOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For BOP
                else if (LOBName == "PC-BOP") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("BOP/BOPOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("BOP/BOPOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("BOP/BOPOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For CUMB
                else if (LOBName == "PC-CUMB") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("CUMB/CUMBOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("CUMB/CUMBOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("CUMB/CUMBOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                    //For PC-WCU
                else if (LOBName == "PC-WCU") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCUPC/WCUPCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    if (shareData.shareInputXML.length) {
                        var xmldoc = transformXML("WCUPC/WCUPCOutputXML.xslt", shareData.shareInputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                        var xmldoc = transformXML("WCUPC/WCUPCOutputXML.xslt", shareData.shareInputXML.xml);
                        shareData.shareOutputXML = xmldoc;
                    }
                }
                }
                else {
                    $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                    HomeService.sendErrorMailandUpdateLog("XSLT not present for " + LOBName, $scope.SelectedDocument.documentFriendlyName);
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                throw (ex);
            }
        }
        //function removeEmptyTags(str) {
        //    
        //    str = str.toString();
        //    return str.replace(/<[^>]*>/g, '');
        //}

        //function CleanChildren(elem) {
        //    var children = elem.childNodes;
        //    var len = elem.childNodes.length;

        //    for (var i = 0; i < len; i++) {
        //        var child = children[i];

        //        if (child.hasChildNodes())
        //            CleanChildren(child);
        //        else
        //            elem.removeChild(child);

        //    }
        //}

        function removeEmptyTags(strxml) {
            strxml = strxml.toString();
              return  strxml = strxml.replace(/(<([^>]+\/)>)/ig, '');
        }

        function transformXML(xsltfile, xml) {

            //checking for browser agent 
            if (chromeAgent) {
                var parser = new DOMParser();
                if (xml.childNodes) {
                    var xmlDoc = xml;
                }
                else {
                    var xmlDoc = parser.parseFromString(xml, "text/xml");
                }
                var baseUrl = location.href.split("Home?");
                var LOBName = HomeService.getUrlParameter('LOB');

                var requestXsl = new XMLHttpRequest();
                requestXsl.open('GET', baseUrl[0] + "XSLT Tranformer/" + xsltfile, false);
                requestXsl.send(null);
                var xsl = requestXsl.responseXML;

                xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xsl);
                //Remove empty tags from output XML
                if (xsltfile.match("OutputXML")) {
                    var ClaimXML = xsltProcessor.transformToDocument(xmlDoc);
                    var xmlChildren = ClaimXML.childNodes;
                    var strxml = xmlChildren[0].outerHTML;
                    var cleanXml = removeEmptyTags(strxml);
                    var parser = new DOMParser();
                    return parser.parseFromString(cleanXml, "text/xml");
                }
                else {
                    var ClaimXML = xsltProcessor.transformToDocument(xmlDoc);
                    return ClaimXML;
                }
            }
            else {

                var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
                xmldoc.async = "false";
                xmldoc.loadXML(xml);

                var xsl = new ActiveXObject("Microsoft.XMLDOM");
                xsl.async = false;
                var baseUrl = location.href.split("Home?");

                var LOBName = HomeService.getUrlParameter('LOB');
                xsl.load(baseUrl[0] + "XSLT Tranformer/" + xsltfile);
                //Remove empty tags from output XML
                if (xsltfile.match("OutputXML")) {
                    var ClaimXML = xmldoc.transformNode(xsl);
                    ClaimXML = ClaimXML.replace("<?xml version=\"1.0\" encoding=\"UTF-16\"?>", "");
                    var cleanXML = removeEmptyTags(ClaimXML);
                    xmldoc.loadXML(cleanXML);
                    return xmldoc;
                }
                else {
                    var ClaimXML = xmldoc.transformNode(xsl);
                    ClaimXML = ClaimXML.replace("<?xml version=\"1.0\" encoding=\"UTF-16\"?>", "");
                    xmldoc.loadXML(ClaimXML);
                    return xmldoc;
                }
            }

        }




        function insertOnbaseKeyWords() {
            try {
                var LOBName = HomeService.getUrlParameter('LOB');

                if (LOBName == "BC-PA") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("PLBC/BCKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("PLBC/BCKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "BC-WCU") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCUBC/WCUBCKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("WCUBC/WCUBCKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "PC-PA") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("AUTO/PAKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("AUTO/PAKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "PC-HO") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("HOME/HOKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("HOME/HOKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "PC-DW") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("DWELLING/DWKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("DWELLING/DWKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "PC-UMB") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("UMBRELLA/UMBKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("UMBRELLA/UMBKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "GC") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("GC/GCKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("GC/GCKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "WCC") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCC/WCCKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("WCC/WCCKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }
                }
                else if (LOBName == "PC-WCU") {
                    if (chromeAgent) {
                        var xmldoc = transformXML("WCUPC/WCUPCKeywords.xslt", shareData.shareOutputXML);
                        shareData.shareOutputXML = xmldoc;
                    }
                    else {
                    var xmldoc = transformXML("WCUPC/WCUPCKeywords.xslt", shareData.shareOutputXML.xml);
                    shareData.shareOutputXML = xmldoc;
                }

            }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                throw (ex);
            }
        }

        //Display output XML in new tab
        $scope.GetOutputXML = function () {
            try {
                
                createOutputXML();
                insertDefaultTags();
                insertOnbaseKeyWords();
                for (var i = 0; i < shareData.shareControllers.length ; i++) {
                    $scope.$broadcast(shareData.shareControllers[i].controlName);
                }

                if (chromeAgent) {
                    var serializer = new XMLSerializer();
                    shareData.shareOutputXML.documentElement.innerHTML = shareData.shareOutputXML.documentElement.innerHTML.replace(/undefined/g, "");
                    var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                    var formatedOutputXML = $filter('prettyXml')(serializeXML, 1);

                } else {
                var formatedOutputXML = $filter('prettyXml')(shareData.shareOutputXML.xml, 1);
                }
                var params = 'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';
                var OutputXMLWindow = window.open('/', 'Source Data', params);
                OutputXMLWindow.document.write("<html><head><title>ICE to Interactive Data</title></head><body><textarea style=\"border:none;height:100%;width:100%;\" readonly>" + "<?xml version=\"1.0\" encoding=\"utf-8\" ?>" + formatedOutputXML + "</textarea></body></html>");
                OutputXMLWindow.document.close();
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        // Changes XML to JSON
        function xmlToJson(xml) {
            var obj = {};
            if (xml.nodeType == 1) {
                // element 
                // do attributes 
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        if (attribute.nodeName == "id") {
                            obj["_id"] = attribute.nodeValue;
                        }
                        else {
                            obj[attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                }
            } else if (xml.nodeType == 3) {
                // text 
                obj = xml.nodeValue;
            }
            // do children 
            // If all text nodes inside, get concatenated text from them. 
            var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
                return node.nodeType === 3;
            });
            if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
                obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
                    return text + node.nodeValue;
                }, "");
            } else if (xml.hasChildNodes()) {
                for (var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof obj[nodeName] == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof obj[nodeName].push == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        };

        //Call webservice to get XML from PC/BC..
        function getXML() {

            try {
                var XMLSelected = false;
                if (HomeService.getUrlParameter('DataFile')) {
                    XMLSelected = true;
                }
                var x2js = new X2JS();
                if (XMLSelected) {
                    var env = HomeService.getUrlParameter('Env');
                    var region = "";
                    if (hostName == "localhost") {
                        region = "Dev";
                        $scope.environment = "Dev";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    if (hostName == "devproxy.njmgroup.com") {
                        region = "Dev";
                        $scope.environment = "Dev";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    else if (hostName == "qaproxy.njmgroup.com") {
                        region = "QA";
                        $scope.environment = "QA";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    else if (hostName == "ntguat.njmgroup.com") {
                        region = "UAT";
                        $scope.environment = "UAT";
                        $scope.ShowInputXMLButton = false;
                        $scope.ShowOutputXMLButton = false;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true
                    }
                    else if (hostName == "smproxy.njmgroup.com") {
                        region = "Prod";
                        $scope.environment = "Prod";
                        $scope.ShowInputXMLButton = false;
                        $scope.ShowOutputXMLButton = false;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = false;
                    }
                    shareData.shareEnv = env;
                    shareData.shareState = HomeService.getUrlParameter('State');
                    var XMLPath = HomeService.getUrlParameter('DataFile');
                    $http.get(XMLPath, {})
                    .then(function (responseData) {
                        var responseData = responseData.data;
                        responseData = responseData.replace(new RegExp("NJ", "g"), shareData.shareState);
                        responseData = responseData.replace(new RegExp(shareData.shareState + "M", "g"), "NJM");
                        shareData.shareInputXML = responseData;

                        if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                            $scope.ShowPreviewButton = false;                           

                            var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            
                                    shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }

                        else if (HomeService.getUrlParameter("LOB") == "PC-PA") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("AUTO/PAInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;

                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }

                        else if (HomeService.getUrlParameter("LOB") == "PC-CA") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("CA/CAInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;

                                    shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-DW") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("DWELLING/DWInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-UMB") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("UMBRELLA/UMBInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                            //FOR GC 
                        else if (HomeService.getUrlParameter("LOB") == "GC") {
                            $scope.ShowPreviewButton = true;
                            var xmldoc = transformXML("GC/GCInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "WCC") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("WCC/WCCInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-BOP") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("BOP/BOPInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CUMB") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("CUMB/CUMBInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                        }
                        }

                            //For WCU PC
                        else if (HomeService.getUrlParameter("LOB") == "PC-WCU") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("WCUPC/WCUPCInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                                if (shareData.shareInputXML.length) {
                                    ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                    shareData.shareJSONClaim = ClaimJSON;
                                }
                                else {
                                    ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                    shareData.shareJSONClaim = ClaimJSON;
                                }
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                            $scope.ShowPreviewButton = false;
                            var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            else {
                                ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = ClaimJSON;
                            }
                            }

                        }

                            GetCategory();
                    });
                }
                else {
                    var env = HomeService.getUrlParameter('Env');
                    var region = "";
                   // var hostName = document.location.hostname;
                    if (hostName == "localhost") {
                        region = "Dev";
                        $scope.environment = "Dev";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    if (hostName == "devproxy.njmgroup.com") {
                        region = "Dev";
                        $scope.environment = "Dev";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    else if (hostName == "qaproxy.njmgroup.com") {
                        region = "QA";
                        $scope.environment = "QA";
                        $scope.ShowInputXMLButton = true;
                        $scope.ShowOutputXMLButton = true;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    else if (hostName == "ntguat.njmgroup.com") {
                        region = "UAT";
                        $scope.environment = "UAT";
                        $scope.ShowInputXMLButton = false;
                        $scope.ShowOutputXMLButton = false;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = true;
                    }
                    else if (hostName == "smproxy.njmgroup.com") {
                        region = "Prod";
                        $scope.environment = "Prod";
                        $scope.ShowInputXMLButton = false;
                        $scope.ShowOutputXMLButton = false;
                        $scope.ShowEnv = true;
                        $scope.ShowRegionDropdown = false;
                    }
                    shareData.shareEnv = env;
                    shareData.shareState = HomeService.getUrlParameter('State');
                    if (env == "default" || env == "") {
                        HomeService.GetDefaultEnv(region).then(function (response) {
                            env = response.data[0].region;
                            shareData.shareEnv = env;
                            getXMLForEnv(env);

                        },
                                       function error(response) {
                                           $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                                           if (response.data.message) {
                                               HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving default ESB environment -- " + response.data.message, "");
                                           }
                                           else if (response.data) {
                                               HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving default ESB environment -- " + response.data, "");
                                           }
                                           else {
                                               HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving default ESB environment.", "");
                                           }
                                       });
                    }
                    else {
                        getXMLForEnv(env);
                    }
                };
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                //HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                throw (ex);
            }
        }

        function getXMLForEnv(env) {
            var x2js = new X2JS();
            HomeService.GetESBURL(env).then(function (response) {
                var policyNumber = HomeService.getUrlParameter('PolicyNumber');
                //var startDate = "2017-03-10T05:00:00Z";
                //var startDate = new Date();
                //var pastYear = startDate.getFullYear() - 1;
                //startDate.setFullYear(pastYear);
                //startDate = startDate.toISOString();
                ////var startDate = DateTime.Now.AddYears(-1);
                //var endDate = new Date();
                //endDate = endDate.toISOString();
                var lob = HomeService.getUrlParameter('LOB');
                var producerCode = HomeService.getUrlParameter('ProducerCode');
                var asOfDate = $filter('date')(HomeService.getUrlParameter('AsOfDate'), 'yyyy-MM-dd');
                var quoteNumber = HomeService.getUrlParameter('QuoteNumber');
                var claimNumber = HomeService.getUrlParameter('ClaimNumber');
                if (response.data.length > 0) {
                    var url = response.data[0].url;
                    //"jb6639"
                    SoapService.getClaim(url, policyNumber, producerCode, asOfDate, quoteNumber, claimNumber, lob, shareData.shareUsername).then(function success(response) {
                        var errCd = "Not available";
                        var responseData = response.data;

                        var hasErrorInfo = responseData.match("<ErrorInformation");
                        var hasFaultCode = responseData.match("<faultcode>");
                        var hasErrorInd = responseData.match("<typ1:ErrorMessage>");
                        var hasTypErrorInfo = responseData.match("<typ:ErrorInformation>");
                        if (hasTypErrorInfo) {
                            var typecode = responseData.match("<typ:Code>");
                            if (typecode) {
                                var start = responseData.indexOf("<typ:Code>");
                                var end = responseData.indexOf("</typ:Code>");
                                var strTypecode = responseData.substring(start, end);
                                if (strTypecode == "<typ:Code>OK") {
                                    hasTypErrorInfo = null;
                                }
                            }
                        }
                        if (hasErrorInfo != null || hasFaultCode != null || hasErrorInd != null || hasTypErrorInfo != null) {
                            if (responseData.match("<MessageTx>")) {
                                var start = responseData.indexOf("<MessageTx>");
                                var end = responseData.indexOf("</MessageTx>");
                                var strErr = responseData.substring(start, end);
                                strErr = strErr.replace("<MessageTx>", "");
                                //var lob = HomeService.getUrlParameter('LOB');

                                if (responseData.match("<CodeTx>")) {
                                    var ErrCdStart = responseData.indexOf("<CodeTx>");
                                    var ErrCdEnd = responseData.indexOf("</CodeTx>");
                                    var errCd = responseData.substring(ErrCdStart, ErrCdEnd);
                                    errCd = errCd.replace("<CodeTx>", "");
                                }
                            }
                            else if (responseData.match("<faultcode>")) {
                                var start = responseData.indexOf("<faultstring>");
                                var end = responseData.indexOf("</faultstring>");
                                var strErr = responseData.substring(start, end);
                                strErr = strErr.replace("<faultstring>", "");
                            }
                            else if (responseData.match("<typ1:ErrorMessage>")) {
                                var start = responseData.indexOf("<typ1:ErrorMessage>");
                                var end = responseData.indexOf("</typ1:ErrorMessage>");
                                var strErr = responseData.substring(start, end);
                                strErr = strErr.replace("<typ1:ErrorMessage>", "");

                                if (responseData.match("<typ1:ErrorCd>")) {
                                    var ErrCdStart = responseData.indexOf("<typ1:ErrorCd>");
                                    var ErrCdEnd = responseData.indexOf("</typ1:ErrorCd>");
                                    var errCd = responseData.substring(ErrCdStart, ErrCdEnd);
                                    errCd = errCd.replace("<typ1:ErrorCd>", "");

                                }
                            }
                            else if (responseData.match("<typ:ErrorInformation>")) {
                                var start = responseData.indexOf("<typ:ErrorInformation>");
                                var end = responseData.indexOf("</typ:ErrorInformation>");
                                var strErr = responseData.substring(start, end);
                                strErr = strErr.replace("<typ:ErrorInformation>", "");

                            }
                            $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                            $scope.InnerException = strErr;
                            $scope.ErrorCode = errCd;
                            $scope.PolicyNum = policyNumber;
                            $scope.QuoteNum = "";
                            $scope.User = shareData.shareUsername;
                            $scope.Env = env;
                            $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                            HomeService.updateErrorLogTable(strErr, "");
                        }
                        else {
                            shareData.shareInputXML = responseData;
                            if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }

                            }
                            else if (HomeService.getUrlParameter("LOB") == "PC-CA") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("CA/CAInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                            else if (HomeService.getUrlParameter("LOB") == "PC-CGL") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("CGL/CGLInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                            else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }

                            }
                                //For Personal Line Auto call
                            else if (HomeService.getUrlParameter("LOB") == "PC-PA") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("AUTO/PAInputXML.xslt", shareData.shareInputXML, "input");
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For Personal Line home call
                            else if (HomeService.getUrlParameter("LOB") == "PC-HO") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("HOME/HOInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For Personal Line dwelling call
                            else if (HomeService.getUrlParameter("LOB") == "PC-DW") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("DWELLING/DWInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For Personal Line Umbrella call
                            else if (HomeService.getUrlParameter("LOB") == "PC-UMB") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("UMBRELLA/UMBInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For GC call
                            else if (HomeService.getUrlParameter("LOB") == "GC") {
                                $scope.ShowPreviewButton = true;
                                var xmldoc = transformXML("GC/GCInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For WCC call
                            else if (HomeService.getUrlParameter("LOB") == "WCC") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("WCC/WCCInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For BOP call 
                            else if (HomeService.getUrlParameter("LOB") == "PC-BOP") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("BOP/BOPInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }
                                //For WCC call
                            else if (HomeService.getUrlParameter("LOB") == "PC-CUMB") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("CUMB/CUMBInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }

                                //For WCU PC call
                            else if (HomeService.getUrlParameter("LOB") == "PC-WCU") {
                                $scope.ShowPreviewButton = false;
                                var xmldoc = transformXML("WCUPC/WCUPCInputXML.xslt", shareData.shareInputXML);
                                shareData.shareInputXML = xmldoc;
                                if (chromeAgent) {
                                    var jsonText = xmlToJson(xmldoc);
                                    shareData.shareJSONClaim = jsonText;
                                }
                                else {
                                    if (shareData.shareInputXML.length) {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                    else {
                                        ClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                        shareData.shareJSONClaim = ClaimJSON;
                                    }
                                }
                            }

                            GetCategory();
                        }
                    },
                      function error(response) {
                          $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                          if (response.data.message) {
                              $scope.InnerException = response.data.message;
                              HomeService.updateErrorLogTable(response.data.message, "");
                          }
                          else {
                              $scope.InnerException = response.data;
                              HomeService.updateErrorLogTable(response.data, "");
                          }
                          $scope.PolicyNum = policyNumber;
                          $scope.QuoteNum = "";
                          $scope.User = shareData.shareUsername;
                          $scope.Env = env;
                          $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                      });
                }
                else {
                    $scope.error = "We’re sorry, " + env + " region is not configured for " + HomeService.getUrlParameter('LOB');
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database, Env: " + env, "");
                }
            },
function error(response) {
    $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
    if (response.data.message) {
        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data.message, "");
    }
    else if (response.data) {
        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data, "");
    }
    else {
        HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database.", "");
    }
});
        }

        //Send the updated XML to Inspire
        $scope.SendData = function () {
            try {
                //$scope.ErrorMessage = true;
                createOutputXML();
                insertDefaultTags();
                insertOnbaseKeyWords();
                for (var i = 0; i < shareData.shareControllers.length ; i++) {
                    $scope.$broadcast(shareData.shareControllers[i].controlName);
                }
                //Remove "Undefined"
                if (chromeAgent) {
                    shareData.shareOutputXML.documentElement.innerHTML = shareData.shareOutputXML.documentElement.innerHTML.replace(/undefined/g, "");
                }
                var jldFile = $scope.SelectedDocument.jldFilePath.trim();
                var userName = shareData.shareUsername;
                //$scope.ErrorMessage = true;
                $scope.error = undefined;

                //Added code to verify at least one output profile section is selected by user
                var isOPSelected = false;
                if ($scope.Home.USMailCheckbox) {
                    if ($scope.Home.USMailCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.PrinterCheckbox) {
                    if ($scope.Home.PrinterCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.PrinterDropdown) {
                    if ($scope.Home.PrinterDropdown.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.Emailcheckbox) {
                    if ($scope.Home.Emailcheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.FaxCheckbox) {
                    if ($scope.Home.FaxCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.WCCEmailCheckbox) {
                    if ($scope.Home.WCCEmailCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.ClaimsFaxwCheckbox) {
                    if ($scope.Home.ClaimsFaxwCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.GCEmailCheckbox) {
                    if ($scope.Home.GCEmailCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.GCBatchCheckbox) {
                    if ($scope.Home.GCBatchCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.GCBatchwCtrlsCheckbox) {
                    if ($scope.Home.GCBatchwCtrlsCheckbox.$viewValue) {
                        isOPSelected = true;
                    }
                }
                if ($scope.Home.USMailCheckbox || $scope.Home.PrinterCheckbox || $scope.Home.Emailcheckbox || $scope.Home.FaxCheckbox || $scope.Home.WCCEmailCheckbox || $scope.Home.ClaimsFaxwCheckbox || $scope.Home.GCEmailCheckbox || $scope.Home.GCBatchCheckbox || $scope.Home.GCBatchwCtrlsCheckbox) {
                    if (!isOPSelected) {
                        $scope.error = "Please select at least one output profile section";
                        window.scrollTo(0, 0);
                        return;
                    }
                }
                if ($scope.Home.$invalid) {
                    // $scope.ErrorMessage = false;
                    $scope.error = "Please enter all the mandatory(*) fields";
                    window.scrollTo(0, 0);
                    return;
                }
                else {
                    HomeService.GetURL('InteractiveURL').then(function (response) {
                        if (response.data.length > 0) {
                            var ticketIdURL = response.data[0].url.trim() + "ticket-ws/";
                            var InteractiveUrl = response.data[0].url.trim();
                            var lob = HomeService.getUrlParameter('LOB');
                            //Create ticket in interactive and open interactive
                            SoapService.getTicketId(jldFile, userName, ticketIdURL, lob).then(function success(response) {
                                var Responsedata = response.data;
                                if (Responsedata.match("<ns2:Guid>(.*)</ns2:Guid>")) {
                                    var TicketId = Responsedata.match("<ns2:Guid>(.*)</ns2:Guid>");
                                    var CreateTicketURL = InteractiveUrl + "?id=" + TicketId[1] + "#viewMode=edit";


                                    // Update Document log table
                                    if ($scope.SelectedDocument) {
                                        var docName = $scope.SelectedDocument.documentFriendlyName;
                                    }
                                    else {
                                        var docName = "";
                                    }
                                    if (chromeAgent) {
                                        var serializer = new XMLSerializer();
                                        shareData.shareOutputXML.documentElement.innerHTML = shareData.shareOutputXML.documentElement.innerHTML.replace(/undefined/g, "");
                                        var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                                        var documentLogData = {
                                            userID: shareData.shareUsername,
                                            createDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                                            lOB: HomeService.getUrlParameter('LOB'),
                                            letterName: docName,
                                            policyNumber: HomeService.getUrlParameter('PolicyNumber'),
                                            quoteNumber: HomeService.getUrlParameter('QuoteNumber'),
                                            claimNumber: HomeService.getUrlParameter('ClaimNumber'),
                                            producerCode: HomeService.getUrlParameter('ProducerCode'),
                                            payload: serializeXML,
                                            environment: HomeService.getUrlParameter('Env'),
                                            baseState: HomeService.getUrlParameter('State')
                                        };
                                    }
                                    else {
                                        var documentLogData = {
                                            userID: shareData.shareUsername,
                                            createDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                                            lOB: HomeService.getUrlParameter('LOB'),
                                            letterName: docName,
                                            policyNumber: HomeService.getUrlParameter('PolicyNumber'),
                                            quoteNumber: HomeService.getUrlParameter('QuoteNumber'),
                                            claimNumber: HomeService.getUrlParameter('ClaimNumber'),
                                            producerCode: HomeService.getUrlParameter('ProducerCode'),
                                            payload: shareData.shareOutputXML.xml,
                                            environment: HomeService.getUrlParameter('Env'),
                                            baseState: HomeService.getUrlParameter('State')
                                        };
                                    }
                                    HomeService.UpdateDocumentLog(documentLogData);
                                    if (lob == "GC" || "WCC") {
                                        //jump current window to top
                                        window.scrollTo(0, 0);

                                        //open a new window for Interactive
                                        var wdth = screen.width - 50;
                                        var hght = screen.height - 150;
                                        var params = 'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=' + wdth + ',height=' + hght + ',left=25,top=50';
                                        window.open(CreateTicketURL, 'Source Data', params);
                                    }
                                    else {
                                        window.open(CreateTicketURL, "_self");
                                    }
                                }
                                else {
                                    $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                    HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id -- Error Message: " + response.data, $scope.SelectedDocument.documentFriendlyName);
                                }

                            },

                            function error(response) {
                                if (response.data != null) {
                                    if (response.data.errorMessage) {
                                        $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                        HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id -- ErrorCode: " + response.data.errorCode + " Error Message: " + response.data.errorMessage, $scope.SelectedDocument.documentFriendlyName);
                                    }
                                    else if (response.data) {
                                        $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                        HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id -- Error Message: " + response.data, $scope.SelectedDocument.documentFriendlyName);
                                    }
                                    else {
                                        var hasErrorInfo = response.data.match("<ns2:ErrorMessage>")
                                        if (hasErrorInfo != null) {
                                            var start = response.data.indexOf("<ns2:ErrorMessage>");
                                            var end = response.data.indexOf("</ns2:ErrorMessage>");
                                            var strErr = response.data.substring(start, end);
                                            strErr = strErr.replace("<ns2:ErrorMessage>", "");
                                            $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                            HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id -- " + strErr, $scope.SelectedDocument.documentFriendlyName);
                                        }
                                    }
                                }
                                else {
                                    $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                    HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id" + "", $scope.SelectedDocument.documentFriendlyName);
                                }
                            });
                        }
                        else {
                            $scope.error = "We’re sorry, an error occurred while retrieving interactive URL. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Could not retrieve interactive URL" + "", $scope.SelectedDocument.documentFriendlyName);
                        }
                    },
                     function error(response) {
                         // $scope.ErrorMessage = false;
                         if (response.data != null) {
                             var hasErrorInfo = response.data.match("<ns2:ErrorMessage>")
                             if (hasErrorInfo != null) {
                                 var start = response.data.indexOf("<ns2:ErrorMessage>");
                                 var end = response.data.indexOf("</ns2:ErrorMessage>");
                                 var strErr = response.data.substring(start, end);
                                 strErr = strErr.replace("<ns2:ErrorMessage>", "");
                                 $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                                 HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id -- " + strErr, $scope.SelectedDocument.documentFriendlyName);
                             }
                         }
                         else {
                             $scope.error = "We’re sorry, an error occurred while getting ticket id. Notification has been sent to IT Enterprise Support team";
                             HomeService.sendErrorMailandUpdateLog("Error occurred while getting ticket id", $scope.SelectedDocument.documentFriendlyName);
                         }
                     });

                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }
        //Open sample
        $scope.OpenSample = function () {
            try {
                //var _url = 'http://inspiredwt1:30600/rest/api/submit-job/PreviewBCDocument';
                HomeService.GetURL("SampleURL").then(function (response) {
                    var previewURL = response.data[0].url.trim();
                    var clientId = "admin";
                    var clientSecret = "pass";
                    createOutputXML();
                    insertDefaultTags();
                    insertOnbaseKeyWords();
                    for (var i = 0; i < shareData.shareControllers.length ; i++) {
                        $scope.$broadcast(shareData.shareControllers[i].controlName);
                    }
                    //Remove duplicate Archive indicator
                    if (shareData.shareOutputXML.getElementsByTagName("ARCHIVE_IND").length > 1) {
                        for (i = 0; i < shareData.shareOutputXML.getElementsByTagName("ARCHIVE_IND").length - 1; i++) {
                            var y = shareData.shareOutputXML.getElementsByTagName("ARCHIVE_IND")[i];
                            y.parentNode.removeChild(y);
                        }
                    }
                    // var soapRequest = '<CUSTOMER_DATA><RECORD_DELIM> <BILLING_REC><BILL_PK>1</BILL_PK><SRC_SYS>ADHOC</SRC_SYS><INS_CO_NM>Manufacturers Insurance</INS_CO_NM> <CURR_DT>November 21, 2018</CURR_DT><LTR_CTGY>BC_UW_CASH_MANAGEMENT_REMIT_CTGY</LTR_CTGY><LTR_NAME>PL Direct Debit Letter</LTR_NAME><OUTBND_DOCTYPE>POLDOC  Correspondence</OUTBND_DOCTYPE><INBND_DOCTYPE>001034</INBND_DOCTYPE><CREATOR_UID>1412</CREATOR_UID><CANCEL_MAIL_DT>2028-06-20</CANCEL_MAIL_DT><POL_NO>F40347014-9</POL_NO><POL_EFF_DT>2028-05-06</POL_EFF_DT><POL_EXP_DT>2029-05-06</POL_EXP_DT><INS_POL_HLD_NAME_1>PL test</INS_POL_HLD_NAME_1><INS_POL_HLD_NAME_2 /><POL_YR>28</POL_YR><OB_KEYWORD1>F40347014</OB_KEYWORD1><OB_KEYWORD2>2028</OB_KEYWORD2><OB_KEYWORD3>OUTGOING</OB_KEYWORD3><OB_KEYWORD4>AUTO</OB_KEYWORD4><OB_KEYWORD5>CASH MANAGEMENT</OB_KEYWORD5><OB_KEYWORD6 /><OB_KEYWORD7 /><OB_KEYWORD8 /><OB_KEYWORD9 /><OB_KEYWORD10 /><OB_KEYWORD11 /><OB_KEYWORD12 /><OB_KEYWORD13 /><BARCODE_IND>N</BARCODE_IND><CERT_IND>N</CERT_IND><GUNTHER_IND /><LTR_GUID>ef97fee597f64c0c80e648898157a993</LTR_GUID><ADDRESSEE_NAME_1>PL test</ADDRESSEE_NAME_1><ADDRESSEE_ADDR_1>301 sullivan way</ADDRESSEE_ADDR_1><ADDRESSEE_ADDR_2 /><ADDRESSEE_ADDR_3 /><ADDRESSEE_CTY>trenton</ADDRESSEE_CTY><ADDRESSEE_ST>NJ</ADDRESSEE_ST><ADDRESSEE_ZIP>08628</ADDRESSEE_ZIP><ADDRESSEE_NAME_2 /><PRINT_IND>N</PRINT_IND><PRINTER_NAME>XP4250</PRINTER_NAME></BILLING_REC><LTR_NAME_REC><BILL_FK>1</BILL_FK><LTR_NAME_BATCH>PL Direct Debit Letter</LTR_NAME_BATCH></LTR_NAME_REC></RECORD_DELIM></CUSTOMER_DATA>';
                    if (chromeAgent) {
                        var serializer = new XMLSerializer();
                        //Remove "Undefined"
                        shareData.shareOutputXML.documentElement.innerHTML = shareData.shareOutputXML.documentElement.innerHTML.replace(/undefined/g, "");
                        var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                        var soapRequest = serializeXML;
                    }
                    else {
                    var soapRequest = shareData.shareOutputXML.xml;
                    }
                    // var authorizationBasic = $.base64.btoa(clientId + ':' + clientSecret);
                    var authorizationBasic = window.btoa(clientId + ':' + clientSecret);

                    var request = new XMLHttpRequest();
                    request.open('POST', previewURL, true);
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    request.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
                    request.setRequestHeader('Accept', 'application/json');
                    request.send(soapRequest);
                    request.responseType = "blob";
                    request.onreadystatechange = function () {
                        if (request.readyState === 4) {
                            var file = new Blob([request.response], { type: 'application/pdf' });
                            var fileURL = (window.URL ? URL : webkitURL).createObjectURL(file);;

                            if (file.size > 26) {
                                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                    window.navigator.msSaveOrOpenBlob(file);
                                }
                                else {
                                    var objectUrl = (window.URL ? URL : webkitURL).createObjectURL(file);
                                    window.open(objectUrl);
                                }
                            }
                            else {
                                $scope.error = "We’re sorry, an error occurred while getting the sample of the letter. Notification has been sent to IT Enterprise Support team";
                                HomeService.sendErrorMailandUpdateLog("Error occurred while getting the sample of the letter. File Size is less than 26 bytes", $scope.SelectedDocument.documentFriendlyName);
                            }
                        }
                    };
                },
                      function error(response) {
                          $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                          if (response.data.message) {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                          }
                          else if (response.data) {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                          }
                          else {
                              HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database.", $scope.SelectedDocument.documentFriendlyName);
                          }
                      });
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        $scope.OpenPreview = function () {
            try {
                var wdth = screen.width - 50;
                var hght = screen.height - 150;
                var params = 'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=' + wdth + ',height=' + hght + ',left=25,top=50';
                if (HomeService.getUrlParameter("LOB") == "GC") {
                    //build the URL of the Interactive Content Management "Preview" environment, based on the current environment
                    var previewURL = "";
                    var hostName = document.location.hostname;
                    if (hostName == "localhost" || hostName == "devproxy.njmgroup.com") {
                        previewURL = "http://inspiredwt1:30701";
        }
                    else if (hostName == "qaproxy.njmgroup.com") {
                        previewURL = "https://inspireqaint.njmgroup.com";
                        }
                        else if (hostName == "ntguat.njmgroup.com") {
                        previewURL = "https://inspireuatint.njmgroup.com";
                    } else {
                        //previewURL = "http://insprapppva1a01:30701";  //single-server
                        previewURL = "https://inspireprodint.njmgroup.com"; //load balancer
                        }
                    previewURL += "/interactive/?view=interactiveTemplate:GeneralClaims:" + $scope.SelectedDocument.documentName + ".jld&namespace=templates#viewMode=preview";
                    
                    window.open(previewURL, 'Source Data', params);
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            }
        }

        $scope.GetTransaction = function () {
            try {
                var XMLSelected = false;
                if (HomeService.getUrlParameter('DataFile')) {
                    XMLSelected = true;
                }
                var x2js = new X2JS();
                if (XMLSelected) {
                    var AccountingStmntClaimJSON;
                    var XMLPath = HomeService.getUrlParameter('DataFile');
                    $http.get(XMLPath, {})
                    .then(function (responseData) {
                        var responseData = responseData.data;
                        shareData.shareInputXML = responseData;
                        if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                            var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CA") {
                            var xmldoc = transformXML("CA/CAInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CGL") {
                            var xmldoc = transformXML("CGL/CGLInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }

                        else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                            var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }

                            //For Personal Line Auto call
                        else if (HomeService.getUrlParameter("LOB") == "PC-PA") {
                            var xmldoc = transformXML("AUTO/PAInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                            //For Personal Line HOME call
                        else if (HomeService.getUrlParameter("LOB") == "PC-HO") {
                            var xmldoc = transformXML("HOME/HOInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                            //For Personal Line DWELLING call
                        else if (HomeService.getUrlParameter("LOB") == "PC-DW") {
                            var xmldoc = transformXML("DWELLING/DWInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                            //For Personal Line UMBRELLA call
                        else if (HomeService.getUrlParameter("LOB") == "PC-UMB") {
                            var xmldoc = transformXML("UMBRELLA/UMBInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-BOP") {
                            var xmldoc = transformXML("BOP/BOPInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CUMB") {
                            var xmldoc = transformXML("CUMB/CUMBInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-WCU") {
                            var xmldoc = transformXML("WCUPC/WCUPCInputXML.xslt", shareData.shareInputXML, 'input');
                            shareData.shareInputXML = xmldoc;
                            if (shareData.shareInputXML.length) {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = AccountingStmntClaimJSON;
                            }
                        }
                            createOutputXML();
                            removeExisitingContorls();
                        fetchControls();
                    });
                }
                else {
                    $scope.TransactionStatus = undefined;
                    var x2js = new X2JS();

                    var startDate = $filter('date')($('#StartDate')[0].value, 'yyyy-MM-ddTh:mm:ss');
                    var endDate = $filter('date')($('#EndDate')[0].value, 'yyyy-MM-ddTh:mm:ss');
                    //var env = HomeService.getUrlParameter('Env');

                    HomeService.GetESBURL(shareData.shareEnv).then(function (response) {
                        var policyNumber = undefined;
                        var producerCode = undefined;
                        if (HomeService.getUrlParameter('PolicyNumber')) {
                            var policyNumber = HomeService.getUrlParameter('PolicyNumber');
                        }
                        if (HomeService.getUrlParameter('ProducerCode')) {
                            var producerCode = HomeService.getUrlParameter('ProducerCode');
                        }
                        var lob = HomeService.getUrlParameter("LOB");
                        if (response.data.length > 0) {
                            var url = response.data[0].url;
                            SoapService.getClaimWithStartAndEndDate(url, policyNumber, producerCode, startDate, endDate, lob).then(function success(response) {
                                var errCd = "Not available";
                                var responseData = response.data;

                                var hasErrorInfo = responseData.match("<ErrorInformation>")
                                if (hasErrorInfo != null) {
                                    var start = responseData.indexOf("<MessageTx>");
                                    var end = responseData.indexOf("</MessageTx>");
                                    var strErr = responseData.substring(start, end);
                                    strErr = strErr.replace("<MessageTx>", "");
                                    //var lob = HomeService.getUrlParameter('LOB');

                                    if (responseData.match("<CodeTx>")) {
                                        var ErrCdStart = responseData.indexOf("<CodeTx>");
                                        var ErrCdEnd = responseData.indexOf("</CodeTx>");
                                        errCd = responseData.substring(ErrCdStart, ErrCdEnd - ErrCdStart);
                                        //errCd = errCd.remove(0, 8);

                                        $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                                        $scope.InnerException = strErr;
                                        $scope.PolicyNum = policyNumber;
                                        $scope.QuoteNum = "";
                                        $scope.User = shareData.shareUsername;
                                        $scope.Env = shareData.shareEnv;
                                        $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                                        HomeService.updateErrorLogTable(strErr, $scope.SelectedDocument.documentFriendlyName);
                                    }
                                    $scope.TransactionStatus = strErr;


                                }
                                else {

                                    shareData.shareInputXML = responseData;
                                    var AccountingStmntClaimJSON;
                                    if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                                        var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                                        shareData.shareInputXML = xmldoc;
                                        if (chromeAgent) {
                                            var jsonText = xmlToJson(xmldoc);
                                            shareData.shareJSONClaim = jsonText;
                                        }
                                        else {
                                        if (shareData.shareInputXML.length) {
                                            AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                            shareData.shareJSONClaim = AccountingStmntClaimJSON;
                                        }
                                        else {
                                            AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                            shareData.shareJSONClaim = AccountingStmntClaimJSON;
                                        }
                                    }
                                    }
                                    else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                                        var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML);
                                        shareData.shareInputXML = xmldoc;
                                        if (chromeAgent) {
                                            var jsonText = xmlToJson(xmldoc);
                                            shareData.shareJSONClaim = jsonText;
                                        }
                                        else {
                                        if (shareData.shareInputXML.length) {
                                            AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                            shareData.shareJSONClaim = AccountingStmntClaimJSON;
                                        }
                                        else {
                                            AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                            shareData.shareJSONClaim = AccountingStmntClaimJSON;
                                        }
                                    }
                                    }
                                    createOutputXML();
                                    removeExisitingContorls();
                                    fetchControls();
                                }
                            },
                              function error(response) {
                                  $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                                  if (response.data.message) {
                                      $scope.InnerException = response.data.message;
                                      HomeService.updateErrorLogTable(response.data.message, $scope.SelectedDocument.documentFriendlyName);
                                  }
                                  else {
                                      $scope.InnerException = response.data;
                                      HomeService.updateErrorLogTable(response.data, $scope.SelectedDocument.documentFriendlyName);
                                  }
                                  $scope.PolicyNum = policyNumber;
                                  $scope.QuoteNum = "";
                                  $scope.User = shareData.shareUsername;
                                  $scope.Env = shareData.shareEnv;
                                  $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                              });
                        }
                        else {
                            $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database, Env: " + env, $scope.SelectedDocument.documentFriendlyName);
                        }
                    },
        function error(response) {
            $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            if (response.data.message) {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
            }
            else if (response.data) {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
            }
            else {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database.");
            }
        });
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                //HomeService.sendErrorMailandUpdateLog(ex.message);
                throw (ex);
            }
        }

        //Added for MANUAL INVOICE DOCUMENT 
        //Call BDS new method
        GetInvoiceTrans = function () {
            try {
                var XMLSelected = false;
                if (HomeService.getUrlParameter('DataFile')) {
                    XMLSelected = true;
                }
                var x2js = new X2JS();
                if (XMLSelected) {
                    var InvoiceStmntClaimJSON;
                    var XMLPath = HomeService.getUrlParameter('DataFile');
                    $http.get(XMLPath, {})
                    .then(function (responseData) {
                        var responseData = responseData.data;
                        shareData.shareInputXML = responseData;
                        if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                            var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CA") {
                            var xmldoc = transformXML("CA/CAInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                AccountingStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CGL") {
                            var xmldoc = transformXML("CGL/CGLInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }

                        else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                            var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }

                            //For Personal Line Auto call
                        else if (HomeService.getUrlParameter("LOB") == "PC-PA") {
                            var xmldoc = transformXML("AUTO/PAInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                            //For Personal Line HOME call
                        else if (HomeService.getUrlParameter("LOB") == "PC-HO") {
                            var xmldoc = transformXML("HOME/HOInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                            //For Personal Line DWELLING call
                        else if (HomeService.getUrlParameter("LOB") == "PC-DW") {
                            var xmldoc = transformXML("DWELLING/DWInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                            //For Personal Line UMBRELLA call
                        else if (HomeService.getUrlParameter("LOB") == "PC-UMB") {
                            var xmldoc = transformXML("UMBRELLA/UMBInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-BOP") {
                            var xmldoc = transformXML("BOP/BOPInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                        else if (HomeService.getUrlParameter("LOB") == "PC-CUMB") {
                            var xmldoc = transformXML("CUMB/CUMBInputXML.xslt", shareData.shareInputXML);
                            shareData.shareInputXML = xmldoc;
                            if (chromeAgent) {
                                var jsonText = xmlToJson(xmldoc);
                                shareData.shareJSONClaim = jsonText;
                            }
                            else {
                            if (shareData.shareInputXML.length) {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                            else {
                                InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                            }
                        }
                        }
                        createOutputXML();
                        removeExisitingContorls();
                        fetchControls();
                    });
                }
                else {
                    $scope.TransactionStatus = undefined;
                    var x2js = new X2JS();

                    var startDate = $filter('date')($('#StartDate')[0].value, 'yyyy-MM-ddTh:mm:ss');
                    var endDate = $filter('date')($('#EndDate')[0].value, 'yyyy-MM-ddTh:mm:ss');
                    //var env = HomeService.getUrlParameter('Env');

                    HomeService.GetESBURL(shareData.shareEnv).then(function (response) {
                        var policyNumber = undefined;
                        var producerCode = undefined;
                        if (HomeService.getUrlParameter('PolicyNumber')) {
                            var policyNumber = HomeService.getUrlParameter('PolicyNumber');
                        }
                        if (HomeService.getUrlParameter('ProducerCode')) {
                            var producerCode = HomeService.getUrlParameter('ProducerCode');
                        }
                        var lob = HomeService.getUrlParameter("LOB");
                        if (response.data.length > 0) {
                            var url = response.data[0].url;
                            //call BDS new method tyo get Invoice Transactions
                            SoapService.retrieveInvoiceTransactions(url, policyNumber, producerCode, startDate, endDate, lob).then(function success(response) {
                                var errCd = "Not available";
                                var responseData = response.data;

                                var hasErrorInfo = responseData.match("<ErrorInformation>")
                                if (hasErrorInfo != null) {
                                    var start = responseData.indexOf("<MessageTx>");
                                    var end = responseData.indexOf("</MessageTx>");
                                    var strErr = responseData.substring(start, end);
                                    strErr = strErr.replace("<MessageTx>", "");
                                    //var lob = HomeService.getUrlParameter('LOB');

                                    if (responseData.match("<CodeTx>")) {
                                        var ErrCdStart = responseData.indexOf("<CodeTx>");
                                        var ErrCdEnd = responseData.indexOf("</CodeTx>");
                                        errCd = responseData.substring(ErrCdStart, ErrCdEnd - ErrCdStart);
                                        //errCd = errCd.remove(0, 8);

                                        $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                                        $scope.InnerException = strErr;
                                        $scope.PolicyNum = policyNumber;
                                        $scope.QuoteNum = "";
                                        $scope.User = shareData.shareUsername;
                                        $scope.Env = shareData.shareEnv;
                                        $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                                        HomeService.updateErrorLogTable(strErr, $scope.SelectedDocument.documentFriendlyName);
                                    }
                                    $scope.TransactionStatus = strErr;


                                }
                                else {

                                    shareData.shareInputXML = responseData;
                                    var InvoiceStmntClaimJSON;
                                    if (HomeService.getUrlParameter("LOB") == "BC-PA") {
                                        var xmldoc = transformXML("PLBC/BDSInputXML.xslt", shareData.shareInputXML);
                                        shareData.shareInputXML = xmldoc;
                                        if (chromeAgent) {
                                            var jsonText = xmlToJson(xmldoc);
                                            shareData.shareJSONClaim = jsonText;
                                        }
                                        else {
                                        if (shareData.shareInputXML.length) {
                                            InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                            shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                                        }
                                        else {
                                            InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                            shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                                        }
                                    }
                                    }
                                    else if (HomeService.getUrlParameter("LOB") == "BC-WCU") {
                                        var xmldoc = transformXML("WCUBC/BDSInputXML.xslt", shareData.shareInputXML);
                                        shareData.shareInputXML = xmldoc;
                                        if (chromeAgent) {
                                            var jsonText = xmlToJson(xmldoc);
                                            shareData.shareJSONClaim = jsonText;
                                        }
                                        else {
                                        if (shareData.shareInputXML.length) {
                                            InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML);
                                            shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                                        }
                                        else {
                                            InvoiceStmntClaimJSON = x2js.xml_str2json(shareData.shareInputXML.xml);
                                            shareData.shareJSONClaim = InvoiceStmntClaimJSON;
                                        }
                                    }
                                    }
                                    createOutputXML();
                                    removeExisitingContorls();
                                    fetchControls();
                                }
                            },
                              function error(response) {
                                  $scope.error = "We’re sorry, an error has occurred while retrieving policy or claim data. Please open a service desk ticket if error persists and report this message:";
                                  if (response.data.message) {
                                      $scope.InnerException = response.data.message;
                                      HomeService.updateErrorLogTable(response.data.message, $scope.SelectedDocument.documentFriendlyName);
                                  }
                                  else {
                                      $scope.InnerException = response.data;
                                      HomeService.updateErrorLogTable(response.data, $scope.SelectedDocument.documentFriendlyName);
                                  }
                                  $scope.PolicyNum = policyNumber;
                                  $scope.QuoteNum = "";
                                  $scope.User = shareData.shareUsername;
                                  $scope.Env = shareData.shareEnv;
                                  $scope.LineOfBusines = HomeService.getUrlParameter('LOB');
                              });
                        }
                        else {
                            $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                            HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database, Env: " + env, $scope.SelectedDocument.documentFriendlyName);
                        }
                    },
        function error(response) {
            $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            if (response.data.message) {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
            }
            else if (response.data) {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
            }
            else {
                HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving ESB URL from database.");
            }
        });
                }
            }
            catch (ex) {
                $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                //HomeService.sendErrorMailandUpdateLog(ex.message);
                throw (ex);
            }
        }

        //Redirection function
        $scope.redirecttoURL = function (selectedRegion) {
            var region = selectedRegion;
            var baseUrl = location.href.split("Home?");
            if (baseUrl[0].match("ICE/")) {
                var URL0 = baseUrl[0].replace("ICE/", "ICE");
            }
            if (baseUrl[0].match("ICEClaims/")) {
                var URL0 = baseUrl[0].replace("ICEClaims/", "ICE");
            }
            if (baseUrl[0].match("ICEUnderwriting/")) {
                var URL0 = baseUrl[0].replace("ICEUnderwriting/", "ICE");
            }
            if (region == "Default") {
                region = ""
            }
            if (hostName != "localhost") {
                location.href = URL0 + region + "/Home?" + baseUrl[1] + "&redirectdefault=false"
            }
        }
    }
    catch (ex) {
        $scope.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        if ($scope.SelectedDocument) {
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        }
        else {
            HomeService.sendErrorMailandUpdateLog(ex.message, "");
        }
    }


});
