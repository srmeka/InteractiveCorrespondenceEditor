app.service('SoapService', function ($http, shareData) {

    var chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;
    var IExplorerAgent = navigator.userAgent.indexOf("MSIE") > -1 || navigator.userAgent.indexOf("rv:") > -1;

    this.getTicketId = function (jldFile, userName, url, lob) {
        if (lob == "BC-WCU") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCU-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCU-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            //var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>companyRoot:S:Production://Templates/Auto/Test_Auto2.jld</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData> <CUSTOMER_DATA><RECORD_DELIM><POLICY_REC><POL_PK>1</POL_PK> <INS_CO_NM>NJM Insurance Group</INS_CO_NM> <CURR_DT>08/15/2018</CURR_DT><ADDRESSEE_NAME>Shashnak Dikay</ADDRESSEE_NAME><ADDRESSEE_ADDR_1>UNION ST</ADDRESSEE_ADDR_1><ADDRESSEE_ADDR_2></ADDRESSEE_ADDR_2><ADDRESSEE_ADDR_3></ADDRESSEE_ADDR_3><ADDRESSEE_CTY>Robbinsville</ADDRESSEE_CTY><ADDRESSEE_ST>NJ</ADDRESSEE_ST><ADDRESSEE_ZIP>08691</ADDRESSEE_ZIP><LTR_CTGY>Test</LTR_CTGY><LTR_NAME>Test</LTR_NAME> <POL_NO>F1234567890</POL_NO></POLICY_REC></RECORD_DELIM></CUSTOMER_DATA></int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>Vital</int:Company><int:State>S_simple_scenario_writer_assigned</int:State><int:Holder>    <int:UserName>writer</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "PC-PA") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';            
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "PC-HO") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "PC-DW") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "PC-UMB") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">PL-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "GC") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">GC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers
                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
           var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">GC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
           var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "WCC") {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }

        if (lob == "PC-WCU") {

            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCUPC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
            else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">WCUPC-Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
                });
            }
        }
        else {
            if (chromeAgent) {
                var serializer = new XMLSerializer();
                var serializeXML = serializer.serializeToString(shareData.shareOutputXML);
                var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + serializeXML + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'CreateTicket2Request';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers

            });
        }
        else {
                //var url = 'http://inspiredwt1.njmgroup.com:30701/interactive/ticket-ws';
            //This is used by CA/CGL/BOP AND CUMB
            var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>' + jldFile + '</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData>' + shareData.shareOutputXML.xml + '</int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>NJM</int:Company><int:State>S_CreateNewTicket</int:State><int:BusinessProcessRelativePath resolveDepartment="true">Ticket.json</int:BusinessProcessRelativePath><int:Holder><int:UserName>' + userName + '</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            //var soapRequest = '<!-- Created with Liquid XML 2016 Designer Edition 14.1.5.6733 (https://www.liquid-technologies.com) --><soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:int=\"http://www.gmc.net/Phoenix/Integration\"> <soapenv:Header> <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"> <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"> <wsse:Username>System</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">pass</wsse:Password></wsse:UsernameToken> </wsse:Security></soapenv:Header><soapenv:Body> <int:CreateTicket2Request><int:Ticket><!--One or more repetitions for single or multiple documents in one ticket. --><int:Document><!--Enter the Inspire Content Manager path to the JLD file from which the ticket will be created. The path can contain further specification, e.g. state:label.If you only specify the file name, e.g. companyRoot://Templates/Vital_CS_GenericLetter.jld, it points to the head version of the file in Inspire Content Manager.--> <int:Template>companyRoot:S:Production://Templates/Auto/Test_Auto2.jld</int:Template> <int:DataDefinition><int:ModuleName>XMLDataInput1ExternalWorkflow1</int:ModuleName><int:Source> <int:XmlData> <CUSTOMER_DATA><RECORD_DELIM><POLICY_REC><POL_PK>1</POL_PK> <INS_CO_NM>NJM Insurance Group</INS_CO_NM> <CURR_DT>08/15/2018</CURR_DT><ADDRESSEE_NAME>Shashnak Dikay</ADDRESSEE_NAME><ADDRESSEE_ADDR_1>UNION ST</ADDRESSEE_ADDR_1><ADDRESSEE_ADDR_2></ADDRESSEE_ADDR_2><ADDRESSEE_ADDR_3></ADDRESSEE_ADDR_3><ADDRESSEE_CTY>Robbinsville</ADDRESSEE_CTY><ADDRESSEE_ST>NJ</ADDRESSEE_ST><ADDRESSEE_ZIP>08691</ADDRESSEE_ZIP><LTR_CTGY>Test</LTR_CTGY><LTR_NAME>Test</LTR_NAME> <POL_NO>F1234567890</POL_NO></POLICY_REC></RECORD_DELIM></CUSTOMER_DATA></int:XmlData></int:Source></int:DataDefinition></int:Document><int:Company>Vital</int:Company><int:State>S_simple_scenario_writer_assigned</int:State><int:Holder>    <int:UserName>writer</int:UserName></int:Holder></int:Ticket></int:CreateTicket2Request></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'CreateTicket2Request';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
    }
    }

    this.getClaimWithStartAndEndDate = function (url, polnum, producercode, startDate, endDate, lob) {
        if (lob == "BC-PA") {
            if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrievePolicyInvoiceDetails';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
            else {

            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
            var soapAction = 'retrievePolicyInvoiceDetails';
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            return $http.post(url, soapRequest, {
                "headers": headers

            });
        }
        }
        if (lob == "BC-WCU") {

            if (producercode) {
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producercode + '</ProducerCode><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrieveProducerStatementDetails';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producercode + '</ProducerCode><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                    var soapAction = 'retrieveProducerStatementDetails';
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                return $http.post(url, soapRequest, {
                    "headers": headers

                });
            }
            }

            if (polnum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                    var soapAction = 'retrievePolicyInvoiceDetails';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber><StartDate>' + startDate + '</StartDate><EndDate>' + endDate + '</EndDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrievePolicyInvoiceDetails';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                return $http.post(url, soapRequest, {
                    "headers": headers

                });
            }
        }
    }
    }

    this.retrieveInvoiceTransactions = function (url, polnum, producercode, startDate, endDate, lob) {
        if (lob == "BC-PA") {
            if (chromeAgent) {
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"> <soapenv:Header/><soapenv:Body><wcub:retrieveInvoiceTransactions><retrieveInvoiceTransactionsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header><!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber></retrieveInvoiceTransactionsIn></wcub:retrieveInvoiceTransactions></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'retrieveInvoiceTransactions';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
            else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"> <soapenv:Header/><soapenv:Body><wcub:retrieveInvoiceTransactions><retrieveInvoiceTransactionsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header><!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber></retrieveInvoiceTransactionsIn></wcub:retrieveInvoiceTransactions></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrieveInvoiceTransactions';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
            return $http.post(url, soapRequest, {
                "headers": headers
            });
        }
        }
        if (lob == "BC-WCU") {
            if (producercode) {
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producercode + '</ProducerCode></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrieveInvoiceTransactions';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producercode + '</ProducerCode></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                    var soapAction = 'retrieveInvoiceTransactions';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                return $http.post(url, soapRequest, {
                    "headers": headers

                });
            }
            }

            if (polnum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"> <soapenv:Header/><soapenv:Body><wcub:retrieveInvoiceTransactions><retrieveInvoiceTransactionsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header><!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber></retrieveInvoiceTransactionsIn></wcub:retrieveInvoiceTransactions></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrieveInvoiceTransactions';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
               var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"> <soapenv:Header/><soapenv:Body><wcub:retrieveInvoiceTransactions><retrieveInvoiceTransactionsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header><!--Optional:--><PolicyNumber>' + polnum + '</PolicyNumber></retrieveInvoiceTransactionsIn></wcub:retrieveInvoiceTransactions></soapenv:Body></soapenv:Envelope>';
               var soapAction = 'retrieveInvoiceTransactions';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                return $http.post(url, soapRequest, {
                    "headers": headers

                });
            }
        }
    }
    }

    this.getClaim = function (url, polNum, producerCode, asOfDate, quoteNumber, claimNumber, lob, userid) {
        var _url = url;
       // if (lob == 'BC-PA') {
            //var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>2019-01-22T12:01:39.41-04:00</AsOfDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';

        if (lob == 'BC-PA') {
            if (chromeAgent) {
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
            var soapAction = 'retrievePolicyInvoiceDetails';
                var baseUrl = location.href.split("Home?");
                var data = {
                    url: url,
                    action: soapAction,
                    request: soapRequest
                }
                var url = baseUrl[0] + "api/Service/PostServiceProxy";
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
                var ServiceRequest = JSON.stringify(data);
                return $http.post(url, ServiceRequest, {
                "headers": headers

            });
        }
            else {
                //var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>2019-01-22T12:01:39.41-04:00</AsOfDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrievePolicyInvoiceDetails';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }

        if (lob == 'PC-CA') {

            if (asOfDate.indexOf("T") >= 0) {
                strDate = asOfDate + ".00-00:00";
            }
            else {
                strDate = asOfDate + "T12:00:00.00-00:00";
            }
            if (polNum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cap="http://njm.com/esb/pds/ca/1.0/interfaces/CAPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/ca/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cap:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>20110125-0948-3300-0000-000000000000</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cap:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cap="http://njm.com/esb/pds/ca/1.0/interfaces/CAPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/ca/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cap:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>20110125-0948-3300-0000-000000000000</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cap:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cap="http://njm.com/esb/pds/ca/1.0/interfaces/CAPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/ca/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cap:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342342</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>System</typ1:SystemIdentity><typ1:UserIdentity>PDS</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cap:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cap="http://njm.com/esb/pds/ca/1.0/interfaces/CAPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/ca/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cap:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342342</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>System</typ1:SystemIdentity><typ1:UserIdentity>PDS</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cap:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    return $http.post(url, soapRequest, {
                        "headers": headers
                    });
        }
            }
        }

        if (lob == 'PC-CGL') {

            if (asOfDate.indexOf("T") >= 0) {
                strDate = asOfDate + ".00-00:00";
            }
            else {
                strDate = asOfDate + "T12:00:00.00-00:00";
            }
            if (polNum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cgl="http://njm.com/esb/pds/cgl/1.0/interfaces/CGLPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cgl/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cgl:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342343</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cgl:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cgl="http://njm.com/esb/pds/cgl/1.0/interfaces/CGLPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cgl/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cgl:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342343</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cgl:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cgl="http://njm.com/esb/pds/cgl/1.0/interfaces/CGLPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cgl/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cgl:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342343</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cgl:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cgl="http://njm.com/esb/pds/cgl/1.0/interfaces/CGLPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cgl/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cgl:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>342342343</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cgl:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        //Personal Line web service call
        if (lob == 'PC-PA') {
            if (polNum) {
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://njm.com/esb/pds/pa/1.0/interfaces/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>565755</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><Filters><FilterKey>AsOfDate</FilterKey><FilterValue>' + asOfDate + '</FilterValue></Filters></retrievePolicyByPolicyNumberReqMsg></pol:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://njm.com/esb/pds/pa/1.0/interfaces/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>565755</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><Filters><FilterKey>AsOfDate</FilterKey><FilterValue>' + asOfDate + '</FilterValue></Filters></retrievePolicyByPolicyNumberReqMsg></pol:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    return $http.post(url, soapRequest, {
                        "headers": headers
                    });
                }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://njm.com/esb/pds/pa/1.0/interfaces/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>7867867</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber><Filters><FilterKey></FilterKey><FilterValue></FilterValue></Filters></retrievePolicyByQuoteNumberReqMsg></pol:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://njm.com/esb/pds/pa/1.0/interfaces/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>7867867</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber><Filters><FilterKey></FilterKey><FilterValue></FilterValue></Filters></retrievePolicyByQuoteNumberReqMsg></pol:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    return $http.post(url, soapRequest, {
                        "headers": headers
                    });
        }
            }
        }

        if (lob == 'PC-HO') {
            if (polNum) {

                var strDate = null;

                if (asOfDate.indexOf("T") >= 0) {
                    strDate = asOfDate + ".00-00:00";
                }
                else {
                    strDate = asOfDate + "T12:00:00.00-00:00";
                }
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></hop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></hop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {

                //var strDate = null;

                //if (asOfDate.indexOf("T") >= 0) {
                //    strDate = asOfDate + ".00-00:00";
                //}
                //else {
                //    strDate = asOfDate + "T12:00:00.00-00:00";
                //}
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></hop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></hop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        if (lob == 'PC-DW') {
            if (polNum) {

                var strDate = null;

                if (asOfDate.indexOf("T") >= 0) {
                    strDate = asOfDate + ".00-00:00";
                }
                else {
                    strDate = asOfDate + "T12:00:00.00-00:00";
                }
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></hop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></hop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {

                //var strDate = null;

                //if (asOfDate.indexOf("T") >= 0) {
                //    strDate = asOfDate + ".00-00:00";
                //}
                //else {
                //    strDate = asOfDate + "T12:00:00.00-00:00";
                //}
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></hop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:hop="http://njm.com/esb/pds/ho/correditor/1.0/interfaces/HOPolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><hop:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></hop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        if (lob == 'PC-UMB') {
            if (polNum) {

                var strDate = null;

                if (asOfDate.indexOf("T") >= 0) {
                    strDate = asOfDate + ".00-00:00";
                }
                else {
                    strDate = asOfDate + "T12:00:00.00-00:00";
                }
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:umc="http://njm.com/esb/pds/um/correditor/1.0/interfaces/UMCorrespondenceData"><soapenv:Header/><soapenv:Body><umc:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></umc:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:umc="http://njm.com/esb/pds/um/correditor/1.0/interfaces/UMCorrespondenceData"><soapenv:Header/><soapenv:Body><umc:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>' + strDate + '</AsOfDate></retrievePolicyByPolicyNumberReqMsg></umc:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {

                //var strDate = null;

                //if (asOfDate.indexOf("T") >= 0) {
                //    strDate = asOfDate + ".00-00:00";
                //}
                //else {
                //    strDate = asOfDate + "T12:00:00.00-00:00";
                //}
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:umc="http://njm.com/esb/pds/um/correditor/1.0/interfaces/UMCorrespondenceData"><soapenv:Header/><soapenv:Body><umc:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></umc:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:umc="http://njm.com/esb/pds/um/correditor/1.0/interfaces/UMCorrespondenceData"><soapenv:Header/><soapenv:Body><umc:retrievePolicyByQuoteNumber><retrievePolicyByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>46464646</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber></retrievePolicyByQuoteNumberReqMsg></umc:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        //WCU - PC CALL
        if (lob == 'PC-WCU') {

            if (asOfDate.indexOf("T") >= 0) {
                strDate = asOfDate + ".00-00:00";
            }
            else {
                strDate = asOfDate + "T12:00:00.00-00:00";
            }
            if (polNum) {
                var chkDigit = 'true';
                if (chromeAgent) {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://PolicyInformationRetrievalLib/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>4</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><Filters><FilterKey>CheckDigitIn</FilterKey><FilterValue>true</FilterValue></Filters></retrievePolicyByPolicyNumberReqMsg></pol:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                    "headers": headers

                });
            }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://PolicyInformationRetrievalLib/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicyByPolicyNumber><retrievePolicyByPolicyNumberReqMsg><Header><CorrelationContext><CorrelationId>4</CorrelationId></CorrelationContext></Header><PolicyNumber>' + polNum + '</PolicyNumber><Filters><FilterKey>CheckDigitIn</FilterKey><FilterValue>true</FilterValue></Filters></retrievePolicyByPolicyNumberReqMsg></pol:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    return $http.post(url, soapRequest, {
                        "headers": headers
                    });
                }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://PolicyInformationRetrievalLib/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicySummaryByQuoteNumber><retrievePolicySummaryByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>2</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber><Filters><FilterKey>CheckDigitIn</FilterKey><FilterValue>true</FilterValue></Filters></retrievePolicySummaryByQuoteNumberReqMsg></pol:retrievePolicySummaryByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicySummaryByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers

                    });
                }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pol="http://PolicyInformationRetrievalLib/PolicyInfomationRetriever"><soapenv:Header/><soapenv:Body><pol:retrievePolicySummaryByQuoteNumber><retrievePolicySummaryByQuoteNumberReqMsg><Header><CorrelationContext><CorrelationId>2</CorrelationId></CorrelationContext></Header><QuoteNumber>' + quoteNumber + '</QuoteNumber><Filters><FilterKey>CheckDigitIn</FilterKey><FilterValue>true</FilterValue></Filters></retrievePolicySummaryByQuoteNumberReqMsg></pol:retrievePolicySummaryByQuoteNumber></soapenv:Body></soapenv:Envelope>';

                var soapAction = 'retrievePolicySummaryByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        //WCU - BC Call
        if (lob == 'BC-WCU') {
            if (polNum) {
                //var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber><AsOfDate>2019-01-22T12:01:39.41-04:00</AsOfDate></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                    var soapAction = 'retrievePolicyInvoiceDetails';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrievePolicyInvoiceDetails';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }
            if (producerCode) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producerCode + '</ProducerCode></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                    var soapAction = 'retrieveProducerStatementDetails';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrieveProducerStatementDetails><retrieveProducerStatementDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><ProducerCode>' + producerCode + '</ProducerCode></retrieveProducerStatementDetailsIn></wcub:retrieveProducerStatementDetails></soapenv:Body> </soapenv:Envelope>';
                var soapAction = 'retrieveProducerStatementDetails';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        //GC - CDS CALL
        if (lob == 'GC') {
            if (claimNumber) {                              
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/ccutil/1.0.0/types"><soapenv:Header/><soapenv:Body><int:RetrieveDocumentData><Request><typ:BusinessApplication>GC</typ:BusinessApplication><typ:DataID>' + claimNumber + '</typ:DataID></Request></int:RetrieveDocumentData></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'RetrieveDocumentData';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/ccutil/1.0.0/types"><soapenv:Header/><soapenv:Body><int:RetrieveDocumentData><Request><typ:BusinessApplication>GC</typ:BusinessApplication><typ:DataID>' + claimNumber + '</typ:DataID></Request></int:RetrieveDocumentData></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'RetrieveDocumentData';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers

                });
            }            
        }
        }

        //WCC - CDS CALL
        if (lob == 'WCC') {
            if (claimNumber) {                
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/esb/common/1.0.0/types" xmlns:typ1="http://njm.com/ccutil/1.0.0/types"><soapenv:Header/><soapenv:Body><int:GetCorrespondenceData><Request><typ1:Request><typ1:BusinessApplicationID>WCC</typ1:BusinessApplicationID><typ1:DataID>' + claimNumber + '</typ1:DataID></typ1:Request></Request></int:GetCorrespondenceData></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'GetCorrespondenceData';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                //var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:wcub="http://njm.com/esb/wcu/bc/1.0/WCUBillingDataService"><soapenv:Header/><soapenv:Body><wcub:retrievePolicyInvoiceDetails><retrievePolicyInvoiceDetailsIn><!--Optional:--><Header><!--Optional:--><CorrelationContext><!--Optional:--><CorrelationId>?</CorrelationId></CorrelationContext></Header> <!--Optional:--><PolicyNumber>' + polNum + '</PolicyNumber></retrievePolicyInvoiceDetailsIn></wcub:retrievePolicyInvoiceDetails></soapenv:Body> </soapenv:Envelope>';
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/esb/common/1.0.0/types" xmlns:typ1="http://njm.com/ccutil/1.0.0/types"><soapenv:Header/><soapenv:Body><int:GetCorrespondenceData><Request><typ1:Request><typ1:BusinessApplicationID>WCC</typ1:BusinessApplicationID><typ1:DataID>' + claimNumber + '</typ1:DataID><typ1:CurrentUserID>' + userid + '</typ1:CurrentUserID></typ1:Request></Request></int:GetCorrespondenceData></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'GetCorrespondenceData';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }            
        }
        }

        //BOP
        if (lob == 'PC-BOP') {

            var rndNum = Math.floor((Math.random() * 100000) + 1);

            if (asOfDate.indexOf("T") >= 0) {
                strDate = asOfDate + ".00-00:00";
            }
            else {
                strDate = asOfDate + "T12:00:00.00-00:00";
            }
            if (polNum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bop="http://njm.com/esb/pds/bop/1.0/interfaces/BOPPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/bop/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><bop:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>ICE</typ1:SystemIdentity><typ1:UserIdentity>user</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></bop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bop="http://njm.com/esb/pds/bop/1.0/interfaces/BOPPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/bop/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><bop:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>ICE</typ1:SystemIdentity><typ1:UserIdentity>user</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></bop:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bop="http://njm.com/esb/pds/bop/1.0/interfaces/BOPPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/bop/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><bop:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></bop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bop="http://njm.com/esb/pds/bop/1.0/interfaces/BOPPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/bop/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><bop:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></bop:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

        //CUMB
        if (lob == 'PC-CUMB') {

            var rndNum = Math.floor((Math.random() * 100000) + 1);

            if (asOfDate.indexOf("T") >= 0) {
                strDate = asOfDate + ".00-00:00";
            }
            else {
                strDate = asOfDate + "T12:00:00.00-00:00";
            }
            if (polNum) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cum="http://njm.com/esb/pds/cumb/1.0/interfaces/CUMBPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cumb/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cum:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>ICE</typ1:SystemIdentity><typ1:UserIdentity>user</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cum:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByPolicyNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cum="http://njm.com/esb/pds/cumb/1.0/interfaces/CUMBPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cumb/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cum:retrievePolicyByPolicyNumber><typ:RetrievePolicyByPolicyNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>ICE</typ1:SystemIdentity><typ1:UserIdentity>user</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:PolicyNumber>' + polNum + '</typ:PolicyNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByPolicyNumberRequestMessage></cum:retrievePolicyByPolicyNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByPolicyNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
            }

            if (quoteNumber) {
                if (chromeAgent) {
                    var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cum="http://njm.com/esb/pds/cumb/1.0/interfaces/CUMBPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cumb/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cum:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cum:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                    var soapAction = 'retrievePolicyByQuoteNumber';
                    var baseUrl = location.href.split("Home?");
                    var data = {
                        url: url,
                        action: soapAction,
                        request: soapRequest
                    }
                    var url = baseUrl[0] + "api/Service/PostServiceProxy";
                    var headers = {
                        'SOAPAction': soapAction,
                        'Content-Type': 'text/xml; charset=utf-8'
                    };
                    var ServiceRequest = JSON.stringify(data);
                    return $http.post(url, ServiceRequest, {
                        "headers": headers
                    });
                }
                else {
                var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cum="http://njm.com/esb/pds/cumb/1.0/interfaces/CUMBPolicyInfomationRetriever" xmlns:typ="http://njm.com/esb/pds/cumb/1.0/types" xmlns:typ1="http://njm.com/esb/common/types"><soapenv:Header/><soapenv:Body><cum:retrievePolicyByQuoteNumber><typ:RetrievePolicyByQuoteNumberRequestMessage><typ1:Header><typ1:Version>1.0</typ1:Version><typ1:CorrelationContext><typ1:CorrelationId>' + rndNum + '</typ1:CorrelationId></typ1:CorrelationContext><typ1:Requestor><typ1:SystemIdentity>Master.PolicyRetrieval</typ1:SystemIdentity><typ1:UserIdentity>System</typ1:UserIdentity></typ1:Requestor></typ1:Header><typ:QuoteNumber>' + quoteNumber + '</typ:QuoteNumber><typ:AsOfDate>' + strDate + '</typ:AsOfDate></typ:RetrievePolicyByQuoteNumberRequestMessage></cum:retrievePolicyByQuoteNumber></soapenv:Body></soapenv:Envelope>';
                var soapAction = 'retrievePolicyByQuoteNumber';
                var headers = {
                    'SOAPAction': soapAction,
                    'Content-Type': 'text/xml; charset=utf-8'
                };
                    return $http.post(url, soapRequest, {
                    "headers": headers
                });
            }
        }
        }

    }
    
    this.getOnbaseDoctypeId = function (url, DocName) {
        //var url = '/DocumentDataESBWeb/sca/DocumentData';
        if (chromeAgent) {
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/esb/common/1.0.0/types"> <soapenv:Header/> <soapenv:Body><int:getDocumentTypeIdByName><request><!--Optional:--><typ:Header><!--Optional:--><typ:CorrelationContext><!--Optional:--><typ:CorrelationId>?</typ:CorrelationId></typ:CorrelationContext></typ:Header><!--Optional:--><Request><!--Optional:--><DocName>' + DocName + '</DocName></Request></request></int:getDocumentTypeIdByName></soapenv:Body></soapenv:Envelope>';
        var soapAction = 'getDocumentTypeIdByName';
            var baseUrl = location.href.split("Home?");
            var data = {
                url: url,
                action: soapAction,
                request: soapRequest
            }
            var url = baseUrl[0] + "api/Service/PostServiceProxy";
            var headers = {
                'SOAPAction': soapAction,
                'Content-Type': 'text/xml; charset=utf-8'
            };
            var ServiceRequest = JSON.stringify(data);
        
            return $http.post(url, ServiceRequest, {
                "headers": headers
            });
        }
        else {
            var soapRequest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://njm.com/ccutil/1.0.0/interfaces" xmlns:typ="http://njm.com/esb/common/1.0.0/types"> <soapenv:Header/> <soapenv:Body><int:getDocumentTypeIdByName><request><!--Optional:--><typ:Header><!--Optional:--><typ:CorrelationContext><!--Optional:--><typ:CorrelationId>?</typ:CorrelationId></typ:CorrelationContext></typ:Header><!--Optional:--><Request><!--Optional:--><DocName>' + DocName + '</DocName></Request></request></int:getDocumentTypeIdByName></soapenv:Body></soapenv:Envelope>';
            var soapAction = 'getDocumentTypeIdByName';
        var headers = {
            'SOAPAction': soapAction,
            'Content-Type': 'text/xml; charset=utf-8'            
        };
            return $http.post(url, soapRequest, {
            "headers": headers
            });
        }
        //return $http.post(onbaseUrl, soapRequest, {
        //    "headers": headers

        //});
    }

   
});