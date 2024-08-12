using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Mvc;
using System.Xml;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class ServiceController : ApiController
    {


        public async Task<string> ProcessRequest(ServiceRequest request)
        {
            HttpResponseMessage response = await PostXmlRequest(request.Url, request.Request, request.Action);
            string content = await response.Content.ReadAsStringAsync();

            return content;
        }


        //public async Task<string> ProcessRequest(object param)            
        //{


        //    var _serviceUrl = "";
        //    var _action = "";
        //    var _soapRequest = "";


        //    if (((Newtonsoft.Json.Linq.JToken)param).Root["url"] != null)
        //    {

        //        _serviceUrl = "" + ((Newtonsoft.Json.Linq.JToken)param).Root["url"];
        //    }

        //    if (((Newtonsoft.Json.Linq.JToken)param).Root["action"] != null)
        //    {

        //        _action = "" + ((Newtonsoft.Json.Linq.JToken)param).Root["action"];
        //    }

        //    if (((Newtonsoft.Json.Linq.JToken)param).Root["soapRequest"] != null)
        //    {

        //        _soapRequest = "" + ((Newtonsoft.Json.Linq.JToken)param).Root["soapRequest"];
        //    }
            


        //    HttpResponseMessage response = await PostXmlRequest(_serviceUrl, _soapRequest, _action);
        //    string content = await response.Content.ReadAsStringAsync();

        //    return content;
        //}

        private static async Task<HttpResponseMessage> PostXmlRequest(string baseUrl, string xmlString, string action)
        {
            using (var httpClient = new HttpClient())
            {
                var httpContent = new StringContent(xmlString, Encoding.UTF8, "text/xml");
                httpContent.Headers.Add("SOAPAction", action);

                return await httpClient.PostAsync(baseUrl, httpContent);
            }
        }

        public partial class ServiceRequest
        {
            public string Url { get; set; }
            public string Action { get; set; }
            public string Request { get; set; }
        }


        //Added this method to resolve URL length method
        // POST: api/LOBAPI/POSTLOBWithParam
        [ResponseType(typeof(string))]
        [System.Web.Http.Route("api/Service/PostServiceProxy")]
        [System.Web.Http.HttpPost]
        public  async Task<IHttpActionResult> PostServiceProxy(HttpRequestMessage request)
        {
            string data = request.Content.ReadAsStringAsync().Result;
                        
            var requestData = JsonConvert.DeserializeObject<JObject>(data);

            string baseUrl = requestData["url"].ToString();
            string action = requestData["action"].ToString();
            string xmlString = requestData["request"].ToString();
                        
            HttpResponseMessage response = await PostXmlRequest2(baseUrl, xmlString, action);

            string content = await response.Content.ReadAsStringAsync();

            return Ok(content);
           
        }


        ////miti
        //[ResponseType(typeof(string))]
        //[System.Web.Http.Route("api/Service/POSTGetClaim")]
        //[System.Web.Http.HttpPost]
        //public async Task<IHttpActionResult> POSTGetClaim(HttpRequestMessage request)
        //{
        //    string data = request.Content.ReadAsStringAsync().Result;

        //    var requestData = JsonConvert.DeserializeObject<JObject>(data);

        //    string baseUrl = requestData["url"].ToString();
        //    string action = requestData["action"].ToString();
        //    string xmlString = requestData["request"].ToString();

        //    HttpResponseMessage response = await PostXmlRequest2(baseUrl, xmlString, action);

        //    string content = await response.Content.ReadAsStringAsync();

        //    return Ok(content);

        //}

        private  async Task<HttpResponseMessage> PostXmlRequest2(string baseUrl, string xmlString, string action)
        {
            using (var httpClient = new HttpClient())
            {
                var httpContent = new StringContent(xmlString, Encoding.UTF8, "text/xml");
                httpContent.Headers.Add("SOAPAction", action);

                return await httpClient.PostAsync(baseUrl, httpContent);
            }
        }


    }

}
