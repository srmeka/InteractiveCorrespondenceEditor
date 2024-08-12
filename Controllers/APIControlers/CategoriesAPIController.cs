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
    public class CategoriesAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/CategoriesAPI
        public IQueryable<Category> GetCategory()
        {
            return db.Category;
        }

        // GET: api/CategoriesAPI/5
        [ResponseType(typeof(Category))]
        public IHttpActionResult GetCategory(int id)
        {
            Category category = db.Category.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/CategoriesAPI/5
        [ResponseType(typeof(void))]
        public HttpResponseMessage PutCategory(int id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Updated");
            }

            if (id != category.CategoryId)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Updated");
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                db.UpdateCategory(category.CategoryActive, category.CategoryFriendlyName, category.CategoryGroups, category.CategoryId, category.CategoryName, category.CreatedBy, category.CreatedDateTime, category.LOBId, category.UpdatedBy, category.UpdatedDateTime);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Updated");
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
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Updated");
            }
            return Request.CreateErrorResponse(HttpStatusCode.OK, "Updated");
        }

        // POST: api/CategoriesAPI
        [ResponseType(typeof(Category))]
        public IHttpActionResult PostCategory(Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Category.Add(category);
                db.SaveChanges();

                return CreatedAtRoute("DefaultApi", new { id = category.CategoryId }, category);
            }
            catch (DbEntityValidationException ex)
            {
                var error = ex.EntityValidationErrors.First().ValidationErrors.First();
                ModelState.AddModelError("DefaultApi", error.ErrorMessage);
                return BadRequest(error.ErrorMessage);
            }
        }

        // DELETE: api/CategoriesAPI/5
        [ResponseType(typeof(Category))]
        public HttpResponseMessage DeleteCategory(int id)
        {
            Category category = db.Category.Find(id);
            if (category == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.OK, "Deleted");
            }

            db.Category.Remove(category);
            db.SaveChanges();

            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Emplyee not found");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Category.Count(e => e.CategoryId == id) > 0;
        }
    }
}