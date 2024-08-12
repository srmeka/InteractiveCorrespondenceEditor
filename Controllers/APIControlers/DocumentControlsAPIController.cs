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
using System.Data.Entity.Validation;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class DocumentControlsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/DocumentControlsAPI
        public IQueryable<DocumentControl> GetDocumentControl()
        {
            return db.DocumentControl;
        }

        // GET: api/DocumentControlsAPI/5
        [ResponseType(typeof(DocumentControl))]
        public IHttpActionResult GetDocumentControl(int id)
        {
            //var documentControl = db.DocumentControl.SqlQuery("Select c.*, dc.* from DocumentControl dc, Control c where c.ControlId = dc.ControlId and dc.DocumentId =" + id+ "order by dc.ControlOrder").ToList();
            //if (documentControl == null)
            //{
            //    return NotFound();
            //}

            //return Ok(documentControl);

            var documentControls = db.GetDocumentControl(id).ToList();
            if (documentControls == null)
            {
                return NotFound();
            }

            return Ok(documentControls);
        }

        // PUT: api/DocumentControlsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDocumentControl(int id, DocumentControl documentControl)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != documentControl.DocumentControlId)
            {
                return BadRequest();
            }

            db.Entry(documentControl).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentControlExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (DbEntityValidationException ex)
            {
                var error = ex.EntityValidationErrors.First().ValidationErrors.First();
                ModelState.AddModelError("DefaultApi", error.ErrorMessage);
                return BadRequest(error.ErrorMessage);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/DocumentControlsAPI
        [ResponseType(typeof(DocumentControl))]
        public IHttpActionResult PostDocumentControl(DocumentControl documentControl)
        {
           
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DocumentControl.Add(documentControl);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = documentControl.DocumentControlId }, documentControl);
        }

        // DELETE: api/DocumentControlsAPI/5
        [ResponseType(typeof(DocumentControl))]
        public IHttpActionResult DeleteDocumentControl(int id)
        {

            DocumentControl documentControl = db.DocumentControl.Find(id);
            if (documentControl == null)
            {
                return NotFound();
            }
            db.DocumentControl.Remove(documentControl);
            //var documentControls = db.DeleteControl(id, data);
            db.SaveChanges();         
   

            return Ok(documentControl);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DocumentControlExists(int id)
        {
            return db.DocumentControl.Count(e => e.DocumentControlId == id) > 0;
        }
    }
}