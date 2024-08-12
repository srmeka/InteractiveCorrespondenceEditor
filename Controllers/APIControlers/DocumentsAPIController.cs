using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using InteractiveCorrespondenceEditor.Models;
using System.Web;
using System.Collections.Generic;
using System.Data.Entity.Validation;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{

    public class DocumentsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/DocumentsAPI
        public IEnumerable<Document> GetDocument()
        {
            return db.Document;
        }


        // GET: api/DocumentsAPI/5
        [ResponseType(typeof(Document))]
        public IHttpActionResult GetDocument(int id)
        {
            var documents = db.Document.Find(id);
            if (documents == null)
            {
                return NotFound();
            }
            return Ok(documents);

        }
        // GET: api/DocumentsAPI/5/state
        [ResponseType(typeof(Document))]
        public IHttpActionResult GetDocumentWithParam(int id, string param)
        {
            // var documents = db.Document.SqlQuery("Select * from Document where CategoryId=" + id + "and DocumentActive='1' and (BaseState IS NULL or BaseState ='"+ param +"')").ToList();
            //var documents = db.Document.SqlQuery("SELECT [DocumentId],[CategoryId],[DocumentName],[DocumentFriendlyName],[DocumentActive],[BaseState],[JldFilePath],[DocType],[PreviewPath]  FROM[ICE].[dbo].[Document] where(CategoryID = "+id+" AND DocumentActive = 1) AND(BaseState LIKE '%"+param+"%' OR (BaseState IS NULL AND DocumentName NOT IN(SELECT DocumentName FROM[ICE].[dbo].[Document] WHERE CategoryID ="+id+" AND DocumentActive = 1 AND BaseState LIKE '%"+param+"%')))").ToList();
            //if (documents == null)
            //{
            //    return NotFound();
            //}

            //return Ok(documents);

            var documents = db.GetDocuments(id,param).ToList();
            if (documents == null)
            {
                return NotFound();
            }

            return Ok(documents);
        }

        // PUT: api/DocumentsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDocument(int id, Document document)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != document.DocumentId)
            {
                return BadRequest();
            }

            db.Entry(document).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentExists(id))
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

        // POST: api/DocumentsAPI
        [ResponseType(typeof(Document))]
        public IHttpActionResult PostDocument(Document document)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Document.Add(document);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = document.DocumentId }, document);
        }

        // DELETE: api/DocumentsAPI/5
        [ResponseType(typeof(Document))]
        public IHttpActionResult DeleteDocument(int id)
        {
            Document document = db.Document.Find(id);
            if (document == null)
            {
                return NotFound();
            }

            db.Document.Remove(document);
            db.SaveChanges();

            return Ok(document);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DocumentExists(int id)
        {
            return db.Document.Count(e => e.DocumentId == id) > 0;
        }
    }
}