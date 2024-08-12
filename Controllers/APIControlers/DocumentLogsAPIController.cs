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
    public class DocumentLogsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/DocumentLogsAPI
        public IQueryable<DocumentLog> GetDocumentLog()
        {
            return db.DocumentLog;
        }

        // GET: api/DocumentLogsAPI/5
        [ResponseType(typeof(DocumentLog))]
        public IHttpActionResult GetDocumentLog(int id)
        {
            DocumentLog documentLog = db.DocumentLog.Find(id);
            if (documentLog == null)
            {
                return NotFound();
            }

            return Ok(documentLog);
        }

        // PUT: api/DocumentLogsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDocumentLog(int id, DocumentLog documentLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != documentLog.TransactionID)
            {
                return BadRequest();
            }

            db.Entry(documentLog).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentLogExists(id))
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

        // POST: api/DocumentLogsAPI
        [ResponseType(typeof(DocumentLog))]
        public IHttpActionResult PostDocumentLog(DocumentLog documentLog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DocumentLog.Add(documentLog);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = documentLog.TransactionID }, documentLog);
        }

        // DELETE: api/DocumentLogsAPI/5
        [ResponseType(typeof(DocumentLog))]
        public IHttpActionResult DeleteDocumentLog(int id)
        {
            DocumentLog documentLog = db.DocumentLog.Find(id);
            if (documentLog == null)
            {
                return NotFound();
            }

            db.DocumentLog.Remove(documentLog);
            db.SaveChanges();

            return Ok(documentLog);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DocumentLogExists(int id)
        {
            return db.DocumentLog.Count(e => e.TransactionID == id) > 0;
        }
    }
}