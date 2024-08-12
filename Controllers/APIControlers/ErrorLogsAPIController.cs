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
    public class ErrorLogsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/ErrorLogsAPI
        public IQueryable<ErrorLog> GetErrorLog()
        {
            return db.ErrorLog;
        }

        // GET: api/ErrorLogsAPI/5
        [ResponseType(typeof(ErrorLog))]
        public IHttpActionResult GetErrorLog(int id)
        {
            ErrorLog errorLog = db.ErrorLog.Find(id);
            if (errorLog == null)
            {
                return NotFound();
            }

            return Ok(errorLog);
        }

        // PUT: api/ErrorLogsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutErrorLog(int id, ErrorLog errorLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != errorLog.ErrorLogId)
            {
                return BadRequest();
            }

            db.Entry(errorLog).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrorLogExists(id))
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

        // POST: api/ErrorLogsAPI
        [ResponseType(typeof(ErrorLog))]
        public IHttpActionResult PostErrorLog(ErrorLog errorLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ErrorLog.Add(errorLog);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = errorLog.ErrorLogId }, errorLog);
        }

        // DELETE: api/ErrorLogsAPI/5
        [ResponseType(typeof(ErrorLog))]
        public IHttpActionResult DeleteErrorLog(int id)
        {
            ErrorLog errorLog = db.ErrorLog.Find(id);
            if (errorLog == null)
            {
                return NotFound();
            }

            db.ErrorLog.Remove(errorLog);
            db.SaveChanges();

            return Ok(errorLog);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ErrorLogExists(int id)
        {
            return db.ErrorLog.Count(e => e.ErrorLogId == id) > 0;
        }
    }
}