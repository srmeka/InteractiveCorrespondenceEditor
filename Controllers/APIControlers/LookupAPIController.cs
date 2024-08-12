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

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class LookupAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/LookupAPI
        public IQueryable<LookupType> GetLookupType()
        {
            return db.LookupType;
        }

        // GET: api/LookupAPI/5
        [ResponseType(typeof(LookupType))]
        public IHttpActionResult GetLookupType(int id)
        {
            LookupType lookupType = db.LookupType.Find(id);
            if (lookupType == null)
            {
                return NotFound();
            }

            return Ok(lookupType);
        }

        // GET: api/LookupAPI/0/lookuptype
        [ResponseType(typeof(LookupType))]
        public IHttpActionResult GetLookupTypeWithParam(int id, string param)
        {

            var lookuptype = db.GetLookupItem(param).ToList();
            if (lookuptype == null)
            {
                return NotFound();
            }
            return Ok(lookuptype);
        }

        // PUT: api/LookupAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLookupType(int id, LookupType lookupType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != lookupType.LookupTypeID)
            {
                return BadRequest();
            }

            db.Entry(lookupType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LookupTypeExists(id))
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

        // POST: api/LookupAPI
        [ResponseType(typeof(LookupType))]
        public IHttpActionResult PostLookupType(LookupType lookupType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.LookupType.Add(lookupType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = lookupType.LookupTypeID }, lookupType);
        }

        // DELETE: api/LookupAPI/5
        [ResponseType(typeof(LookupType))]
        public IHttpActionResult DeleteLookupType(int id)
        {
            LookupType lookupType = db.LookupType.Find(id);
            if (lookupType == null)
            {
                return NotFound();
            }

            db.LookupType.Remove(lookupType);
            db.SaveChanges();

            return Ok(lookupType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LookupTypeExists(int id)
        {
            return db.LookupType.Count(e => e.LookupTypeID == id) > 0;
        }
    }
}