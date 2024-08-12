using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using InteractiveCorrespondenceEditor.Models;
using System.Web;
using System.Collections.Specialized;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class WebServicesAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/WebservicesAPI
        public IHttpActionResult GetWebServices()
        {
            //Get distinct ESB environment
            var webservices = db.GetESBEnv().ToList();
            if (webservices == null)
            {
                return NotFound();
            }
            return Ok(webservices);
        }

        // GET: api/WebServicesAPI/5
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult GetWebServices(int id)
        {

            var webservices = db.GetDistinctWebserviceValues(id).ToList();
            if (webservices == null)
            {
                return NotFound();
            }          

            return Ok(webservices);
        }

        // PUT: api/WebServicesAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutWebServices(int id, WebServices webServices)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != webServices.WebServicesId)
            {
                return BadRequest();
            }

            db.Entry(webServices).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WebServicesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/WebServicesAPI
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult PostWebServices(WebServices webServices)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.WebServices.Add(webServices);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = webServices.WebServicesId }, webServices);
        }

        // DELETE: api/WebServicesAPI/5
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult DeleteWebServices(int id)
        {
            WebServices webServices = db.WebServices.Find(id);
            if (webServices == null)
            {
                return NotFound();
            }

            db.WebServices.Remove(webServices);
            db.SaveChanges();

            return Ok(webServices);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WebServicesExists(int id)
        {
            return db.WebServices.Count(e => e.WebServicesId == id) > 0;
        }


        // GET: api/WebservicesAPI/id/ESBENV
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult GetWebServicesWithParam(int id, string param)
        {
            if (param.Contains(","))
            {
                string[] parameters = param.Split(',');

                var webservices = db.GetWebService(id, parameters[0], parameters[1], parameters[2]).ToList();


                if (webservices == null)
                {
                    return NotFound();
                }
                return Ok(webservices);
            }
            else
            {
                //id = 0 - Get ESB URL
                //id = 1 - Get Onbase URL
                //id = 2 - Get URL based on URL type
                var lob = "";
                if (HttpContext.Current.Request.UrlReferrer != null)
                {
                    NameValueCollection collection = GetQueryStringCollection(HttpContext.Current.Request.UrlReferrer.Query);
                    lob = HttpContext.Current.Server.UrlDecode(collection["LOB"]);
                }
                //var uri = new Uri(HttpContext.Current.Request.Url.OriginalString.ToString());
                ////var uri = new Uri("http://devproxy.njmgroup.com/ICE/api/WebservicesAPI/1/''");
                //var region = uri.Host;

                var env = "";
                var region = HttpContext.Current.Request.Url.Host;


                //if (region.Contains("localhost"))
                //{
                //    env = "Dev";
                //}
                //else if (region == "dotnetdev3.njmgroup.com")
                //{
                //    env = "Dev";
                //}
                //else if (region == "qaproxy.njmgroup.com")
                //{
                //    env = "QA";
                //}
                //else if (region == "ntguat.njmgroup.com")
                //{
                //    env = "UAT";
                //}
                //else if (region == "smproxy.njmgroup.com")
                //{
                //    env = "Prod";
                //}


                if (region.Contains("localhost"))
                {
                    env = "Dev";
                }
                else if (region.Contains("dev"))
                {
                    env = "Dev";
                }
                else if (region.Contains("qa"))
                {
                    env = "QA";
                }
                else if (region.Contains("uat"))
                {
                    env = "UAT";
                }
                else if (region.Contains("prod"))
                {
                    env = "Prod";
                }
                var webservices = db.GetWebService(id, param, env, lob).ToList();


                if (webservices == null)
                {
                    return NotFound();
                }
                return Ok(webservices);
            }
        }

        // GET: api/WebservicesAPI/id/ESBENV
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult GetWebServicesFromThreeParams(int id, string param, string env, string lob)
        {
           var webservices = db.GetWebService(id, param, env, lob).ToList();

            if (webservices == null)
            {
                return NotFound();
            }
            return Ok(webservices);
        }

        public static NameValueCollection GetQueryStringCollection(string url)
        {
            string keyValue = string.Empty;
            NameValueCollection collection = new NameValueCollection();
            if (url.Contains("?&"))
            {
                url = url.Replace("?&", "?");
            }
            string[] querystrings = url.Split('&');
            if (querystrings != null && querystrings.Count() > 0)
            {
                for (int i = 0; i < querystrings.Count(); i++)
                {
                    string[] pair = querystrings[i].Split('=');
                    collection.Add(pair[0].Trim('?'), pair[1]);
                }
            }
            return collection;
        }
    }
}