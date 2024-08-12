app.service('HomeService', HomeService);
var chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
var IExplorerAgent = navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:") > -1;
function HomeService($http, shareData, $filter) {
    var baseUrl = location.href.split("ICE");

    this.GetDocumentWithParam = function (id, state) {
        return $http.get(baseUrl[0] + "ICE/api/DocumentsAPI/" + id + "/" + state);
    }
    //this.GetCategory = function (id) {
    //    return $http.get("api/CategoriesAPI/" + id);
    //}

    //this.GetDocumentWithParam = function (id) {
    //    return $http.get("api/DocumentsAPI/"+id);
    //}

    this.GetControls = function (id) {
        return $http.get(baseUrl[0] + "ICE/api/DocumentControlsAPI/" + id);
    }

    this.GetLOBandCategoryWithParam = function (id, lob, group) {
        //Get all categories
        if (id == 1) {
            return $http.get(baseUrl[0] + "ICE/api/LOBAPI/1/" + lob + "/" + group);
        }
            //Get active categories
        else if (id == 0) {

            //GET method call Commented to resolve HTTP URL length issue 
            //return $http.get(baseUrl[0] + "ICE/api/LOBAPI/0/" + lob + "/" + group);

            //added POST method call
            var userData = "<RequestData><lob>" + lob + "</lob><group>" + group + "</group></RequestData>";
            var url = baseUrl[0] + "ICE/api/LOBAPI/POSTLOBWithParam";
            var headers = {
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, userData, {
                "headers": headers
            });
        }
        else if (id == 2) {
            return $http.get(baseUrl[0] + "ICE/api/LOBAPI/2/" + lob + "/" + group);
        }
    }

    this.GetLob = function () {

        return $http.get(baseUrl[0] + "ICE/api/LOBAPI");
    }

    this.GetRegion = function () {
        return $http.get(baseUrl[0] + "ICE/api/RegionsAPI");
    }

    this.GetEnvironment = function () {
        return $http.get(baseUrl[0] + "ICE/api/WebServicesAPI/0");
    }

    this.GetURLType = function () {
        return $http.get(baseUrl[0] + "ICE/api/WebServicesAPI/1");
    }

    this.GetURLInfo = function () {
        return $http.get(baseUrl[0] + "ICE/api/WebServicesAPI/2");
    }


    this.GetESBEnv = function () {
        return $http.get(baseUrl[0] + "ICE/api/WebservicesAPI");
    }

    //id = 0 - Get ESB URL
    //id = 1 - Get Onbase URL
    //id = 2 - Get URL based on URL type
    //id = 3 - Get Webservices for admin UI
    this.GetESBURL = function (env) {
        return $http.get(baseUrl[0] + "ICE/api/WebservicesAPI/0/" + env);
    }

    this.GetOnbaseURL = function () {
        //return $http.get("api/WebservicesAPI/1/''");
        return $http.get(baseUrl[0] + "ICE/api/WebservicesAPI/1/''");
    }

    this.GetURL = function (urltype) {
        return $http.get(baseUrl[0] + "ICE/api/WebservicesAPI/2/" + urltype);
    }

    this.GetWebServices = function (urltype, env, lob) {
        return $http.get(baseUrl[0] + "ICE/api/WebservicesAPI/3/" + urltype + "," + env + "," + lob);
    }

    this.Sendmail = function (userData) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/SendMailApi",
            data: userData
        });
        return request;
    }

    this.GetAdGroups = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetServerVariableAPI/0/HTTP_XPRGROUPS");
    }

    this.GetUserName = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetServerVariableAPI/0/HTTP_SM_USER");
    }

    //new function to get user full name for creator name field
    this.GetUserFullName = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetServerVariableAPI/0/SM_USERNAME");
    }

    //new function to get HTTP_MAIL address used for FAX - FROM field
    this.GetUserEmail = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetServerVariableAPI/0/HTTP_MAIL");
    }
    this.GetUserInitial = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetServerVariableAPI/0/USER_INITIAL");
    }

    this.GetAllServerVariable = function () {
        return $http.get(baseUrl[0] + "ICE/api/GetAllServerVariableAPI");
    }
    this.UpdateErrorLog = function (errorData) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/ErrorLogsAPI",
            data: errorData
        });
        return request;
    }

    this.UpdateDocumentLog = function (documentData) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/DocumentLogsAPI",
            data: documentData
        });
        return request;
    }

    this.LookupValue = function (env) {
        return $http.get("api/LookupAPI/0/" + env);
    }

    this.GetDefaultEnv = function (env) {
        return $http.get("api/RegionsAPI/0/" + env);
    }

    this.createPrimaryXML = function (xmlElement, xmlValue) {
        if (this.getUrlParameter('LOB') == "BC-PA") {
            var root = shareData.shareOutputXML.getElementsByTagName("BILLING_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-CA") {
            var root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-CGL") {
            var root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "BC-WCU") {
            var root = shareData.shareOutputXML.getElementsByTagName("BILLING_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-PA") {
            var root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-HO") {
            var root = shareData.shareOutputXML.getElementsByTagName("HOMEOWNERS_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-DW") {
            var root = shareData.shareOutputXML.getElementsByTagName("DWELLING_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-UMB") {
            var root = shareData.shareOutputXML.getElementsByTagName("UMBRELLA_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "GC") {
            var root = shareData.shareOutputXML.getElementsByTagName("NJM_CLAIM_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "WCC") {
            var root = shareData.shareOutputXML.getElementsByTagName("WCC_CLAIM_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-BOP") {
            var root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-CUMB") {
            var root = shareData.shareOutputXML.getElementsByTagName("AccountRecord")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-WCU") {
            var root = shareData.shareOutputXML.getElementsByTagName("POLICY_REC")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
            root.appendChild(tagCreated);
        }
    }

    this.createSecondaryTableXML = function (xmlElement) {
        if (this.getUrlParameter('LOB') == "BC-PA") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }

        if (this.getUrlParameter('LOB') == "PC-CA") {
            var root = shareData.shareOutputXML.getElementsByTagName("RecordDelim")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-CGL") {
            var root = shareData.shareOutputXML.getElementsByTagName("RecordDelim")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "BC-WCU") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-PA") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-HO") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-DW") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-UMB") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "GC") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "WCC") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-BOP") {
            var root = shareData.shareOutputXML.getElementsByTagName("RecordDelim")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-CUMB") {
            var root = shareData.shareOutputXML.getElementsByTagName("RecordDelim")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
        if (this.getUrlParameter('LOB') == "PC-WCU") {
            var root = shareData.shareOutputXML.getElementsByTagName("RECORD_DELIM")[0];
            var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
            root.appendChild(tagCreated);
        }
    }

    this.createSecondaryXMLValue = function (SecondaryTable, xmlElement, xmlValue, id) {
        var root = shareData.shareOutputXML.getElementsByTagName(SecondaryTable)[id];
        var tagCreated = shareData.shareOutputXML.createElement(xmlElement);
        tagCreated.appendChild(shareData.shareOutputXML.createTextNode(xmlValue));
        root.appendChild(tagCreated);
    }

    this.sendErrorMailandUpdateLog = function (errorData, documentName) {
        var inputXML;
        if (documentName) {
            var docName = documentName;
        }
        else {
            var docName = "";
        }
        if (chromeAgent) {
            
            var serializer = new XMLSerializer();
            var serializeInputXML = serializer.serializeToString(shareData.shareInputXML);
            if (shareData.shareOutputXML) {
                var serializeOutputXML = serializer.serializeToString(shareData.shareOutputXML);
            }
        }
        else {
            if (shareData.shareInputXML.length) {
                inputXML = shareData.shareInputXML;
            }
            else {
                inputXML = shareData.shareInputXML.xml;
            }
        }
       

        if (chromeAgent) {
            var userData = {
                userName: shareData.shareUsername,
                policyNumber: this.getUrlParameter('PolicyNumber'),
                quoteNumber: this.getUrlParameter('QuoteNumber'),
                claimNumber: this.getUrlParameter('ClaimNumber'),
                producerCode: this.getUrlParameter('ProducerCode'),
                lob: this.getUrlParameter('LOB'),
                environment: shareData.shareEnv,
                state: shareData.shareState,
                errorMessage: errorData,
                errorCode: "",
                inputXML: serializeInputXML,
                outputXML: serializeOutputXML,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                letterName: docName,
                category: shareData.shareSelectedCategory
            };
        }
        else {
            var userData = {
                userName: shareData.shareUsername,
                policyNumber: this.getUrlParameter('PolicyNumber'),
                quoteNumber: this.getUrlParameter('QuoteNumber'),
                claimNumber: this.getUrlParameter('ClaimNumber'),
                producerCode: this.getUrlParameter('ProducerCode'),
                lob: this.getUrlParameter('LOB'),
                environment: shareData.shareEnv,
                state: shareData.shareState,
                errorMessage: errorData,
                errorCode: "",
                inputXML: inputXML,
                outputXML: shareData.shareOutputXML.xml,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                letterName: docName,
                category: shareData.shareSelectedCategory
            };
        }


        this.Sendmail(userData);
        this.UpdateErrorLog(userData);
        return;
    }

    this.updateErrorLogTable = function (errorData, documentName) {
        var inputXML;
        if (documentName) {
            var docName = documentName;
        }
        else {
            var docName = "";
        }

        if (chromeAgent) {
            inputXML = shareData.shareInputXML;
        }
        else {
            if (shareData.shareInputXML.length) {
                inputXML = shareData.shareInputXML;
            }
            else {
                inputXML = shareData.shareInputXML.xml;
            }
        }
        if (chromeAgent) {
            var userData = {
                userName: shareData.shareUsername,
                policyNumber: this.getUrlParameter('PolicyNumber'),
                quoteNumber: this.getUrlParameter('QuoteNumber'),
                claimNumber: this.getUrlParameter('ClaimNumber'),
                producerCode: this.getUrlParameter('ProducerCode'),
                lob: this.getUrlParameter('LOB'),
                environment: shareData.shareEnv,
                state: shareData.shareState,
                errorMessage: errorData,
                errorCode: "",
                inputXML: inputXML,
                outputXML: shareData.shareOutputXML,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                letterName: docName
            }
        }
        else {
            var userData = {
                userName: shareData.shareUsername,
                policyNumber: this.getUrlParameter('PolicyNumber'),
                quoteNumber: this.getUrlParameter('QuoteNumber'),
                claimNumber: this.getUrlParameter('ClaimNumber'),
                producerCode: this.getUrlParameter('ProducerCode'),
                lob: this.getUrlParameter('LOB'),
                environment: shareData.shareEnv,
                state: shareData.shareState,
                errorMessage: errorData,
                errorCode: "",
                inputXML: inputXML,
                outputXML: shareData.shareOutputXML.xml,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                letterName: docName
            };
        }
        this.UpdateErrorLog(userData);
        return;
    }

    //get querystring parameters
    this.getUrlParameter = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    //Insert category
    this.addCategory = function (data) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/CategoriesAPI",
            data: data
        });
        return request;
    }

    //Insert webservice
    this.addWebservice = function (data) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/WebServicesAPI",
            data: data
        });
        return request;
    }

    //update webservice
    this.updateWebservice = function (id, UpdateDetails) {
        var request = $http({
            method: "put",
            url: baseUrl[0] + "ICE/api/WebServicesAPI/" + id,
            data: UpdateDetails
        });
        return request;
    }

    //update category
    this.updateCategory = function (id, UpdateDetails) {
        var request = $http({
            method: "put",
            url: baseUrl[0] + "ICE/api/CategoriesAPI/" + id,
            data: UpdateDetails
        });
        return request;
    }

    //Insert document
    this.addDocument = function (data) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/DocumentsAPI",
            data: data
        });
        return request;
    }

    //update document
    this.updateDocument = function (id, UpdateDetails) {
        var request = $http({
            method: "put",
            url: baseUrl[0] + "ICE/api/DocumentsAPI/" + id,
            data: UpdateDetails
        });
        return request;
    }

    //update control
    this.updateControl = function (id, UpdateDetails) {
        var request = $http({
            method: "put",
            url: baseUrl[0] + "ICE/api/ControlsAPI/" + id,
            data: UpdateDetails
        });
        return request;
    }

    //Insert control
    this.addControl = function (data) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/ControlsAPI",
            data: data
        });
        return request;
    }

    this.GetAllControls = function () {
        return $http.get(baseUrl[0] + "ICE/api/ControlsAPI");
    }

    this.DeleteDocumentControl = function (id) {
        var request = $http({
            method: "delete",
            url: baseUrl[0] + "ICE/api/DocumentControlsAPI/" + id
        });
        return request;
        // return $http.post(baseUrl[0] + "ICE/api/DocumentControlsAPI/" + id + "/" + data);
    };

    //insert document control
    this.addDocumentControl = function (data) {
        var request = $http({
            method: "post",
            url: baseUrl[0] + "ICE/api/DocumentControlsAPI",
            data: data
        });
        return request;
    }

    //Get Inbound doc id for some GC Documents - chrome script added
    this.getGCDocidByDocName = function(docName, xml) {
        //checking for browser agent 
        //var chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
        //var IExplorerAgent = navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:") > -1;

        if (chromeAgent) {
            var GcdocidNode = "";
            var xhr = new XMLHttpRequest();
            xhr.open("GET", xml, false);
            xhr.send(null);
            xmldoc = xhr.responseXML;
            if (xmldoc.evaluate) {
                var path = "//Root/DocumentRoot[DocumentName ='" + docName + "']/InboundDocType";
                var nodes = xmldoc.evaluate(path, xmldoc, null, XPathResult.ANY_TYPE, null);
                var result = nodes.iterateNext();
                
                while (result) {
                    if (GcdocidNode)
                    {
                        GcdocidNode += "<br>"+result.childNodes[0].nodeValue;
                    }
                    else {
                        GcdocidNode += result.childNodes[0].nodeValue
                    }
                   
                    result = nodes.iterateNext();
                }
            }
            return GcdocidNode;
        }
        else {
            var xmldoc = new ActiveXObject("Microsoft.XMLDOM");
            xmldoc.async = "false";
            xmldoc.load(xml);
            var xpath = "//Root/DocumentRoot[DocumentName ='" + docName + "']/InboundDocType";
            var GcdocidNode = xmldoc.documentElement.selectSingleNode(xpath);
            var Gcdocid = null;
        }


        if (GcdocidNode != null) {
            Gcdocid = GcdocidNode.text;
        }
        return Gcdocid;
    }

    this.getBaseURL = function(){
        var baseurl = location.href.split("Home?");
        return baseurl;
    }

}