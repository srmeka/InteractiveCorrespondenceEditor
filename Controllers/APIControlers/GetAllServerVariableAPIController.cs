using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class GetAllServerVariableAPIController : ApiController
    {
        // GET: api/GetAllServerVariableAPI
        public IHttpActionResult Get()
        {
            int loop1, loop2;
            NameValueCollection coll;
            List<string> results = new List<string>();
            // Load ServerVariable collection into NameValueCollection object.
            coll = HttpContext.Current.Request.ServerVariables;

            string[] arr1 = coll.AllKeys;
            for (loop1 = 0; loop1 < arr1.Length; loop1++)
            {

                string[] arr2 = coll.GetValues(arr1[loop1]);
                for (loop2 = 0; loop2 < arr2.Length; loop2++)
                {
                    results.Add(arr1[loop1] + ":  " + arr2[loop2]);
                }
            }
           
            return Ok(results);
        }

    }
}
