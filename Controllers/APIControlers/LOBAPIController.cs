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
using System.Xml;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class LOBAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/LOBAPI
        public IHttpActionResult GetLOB()
        {
            var lob = db.GetLOB().ToList();
            if (lob == null)
            {
                return NotFound();
            }

            return Ok(lob);
        }

        // GET: api/LOBAPI/5
        [ResponseType(typeof(LOB))]
        public IHttpActionResult GetLOB(int id)
        {
            LOB lOB = db.LOB.Find(id);
            if (lOB == null)
            {
                return NotFound();
            }

            return Ok(lOB);
        }

        // GET: api/LOBAPI/id/LOB
        [ResponseType(typeof(LOB))]
        public IHttpActionResult GetLOBWithParam(int id,string param,string data)
        {
            //var lob = db.LOB.SqlQuery("SELECT * from LOB where LOBName='"+param+"'").ToList();
            //if (lob == null)
            //{
            //    return NotFound();
            //}
            //return Ok(lob);
           
            var lob = db.GetCategories(id,param, data).ToList();
            if (lob == null)
            {
                return NotFound();
            }

            return Ok(lob);
        }

        //Added this method to resolve URL length method
        // POST: api/LOBAPI/POSTLOBWithParam
        [ResponseType(typeof(LOB))]
        [Route("api/LOBAPI/POSTLOBWithParam")]
        [HttpPost]
        public IHttpActionResult POSTLOBWithParam(HttpRequestMessage request)
        {
            string data = request.Content.ReadAsStringAsync().Result;
            int id = 0;
            string param = string.Empty;
            string inputData = string.Empty;

            if (data != "")
            {
                string rawHtml = System.Net.WebUtility.HtmlDecode(data);
                System.Xml.XmlDocument doc = new System.Xml.XmlDocument();
                doc.LoadXml(rawHtml);

                //parsing  request xml
                XmlElement root = doc.DocumentElement;
                param = root.SelectSingleNode("lob").InnerText;
                inputData = root.SelectSingleNode("group").InnerText;
            }

                var lob = db.GetCategories(id, param, inputData).ToList();
                if (lob == null)
                {
                    return NotFound();
                }
            return Ok(lob);
        }

        // PUT: api/LOBAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLOB(int id, LOB lOB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lOB.LOBId)
            {
                return BadRequest();
            }

            db.Entry(lOB).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LOBExists(id))
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

        // POST: api/LOBAPI
        [ResponseType(typeof(LOB))]
        [Route("api/LOBAPI/POSTLOB")]
        public IHttpActionResult PostLOB(LOB lOB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LOB.Add(lOB);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lOB.LOBId }, lOB);
        }

        // DELETE: api/LOBAPI/5
        [ResponseType(typeof(LOB))]
        public IHttpActionResult DeleteLOB(int id)
        {
            LOB lOB = db.LOB.Find(id);
            if (lOB == null)
            {
                return NotFound();
            }

            db.LOB.Remove(lOB);
            db.SaveChanges();

            return Ok(lOB);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LOBExists(int id)
        {
            return db.LOB.Count(e => e.LOBId == id) > 0;
        }
    }
}