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
    public class ControlsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/ControlsAPI
        public IHttpActionResult GetControl()
        {
            var control = db.GetControl().ToList();
            if (control == null)
            {
                return NotFound();
            }

            return Ok(control);
        }

        // GET: api/ControlsAPI/5
        [ResponseType(typeof(Control))]
        public IHttpActionResult GetControl(int id)
        {
            Control control = db.Control.Find(id);
            if (control == null)
            {
                return NotFound();
            }

            return Ok(control);
        }

        // PUT: api/ControlsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutControl(int id, Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != control.ControlId)
            {
                return BadRequest();
            }

            db.Entry(control).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlExists(id))
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

        // POST: api/ControlsAPI
        [ResponseType(typeof(Control))]
        public IHttpActionResult PostControl(Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Control.Add(control);
                db.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var error = ex.EntityValidationErrors.First().ValidationErrors.First();
                ModelState.AddModelError("DefaultApi", error.ErrorMessage);
                return BadRequest(error.ErrorMessage);
            }

            return CreatedAtRoute("DefaultApi", new { id = control.ControlId }, control);
        }

        // DELETE: api/ControlsAPI/5
        [ResponseType(typeof(Control))]
        public IHttpActionResult DeleteControl(int id)
        {
            Control control = db.Control.Find(id);
            if (control == null)
            {
                return NotFound();
            }

            db.Control.Remove(control);
            db.SaveChanges();

            return Ok(control);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ControlExists(int id)
        {
            return db.Control.Count(e => e.ControlId == id) > 0;
        }
    }
}