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
    public class RegionsAPIController : ApiController
    {
        private ICEEntities db = new ICEEntities();

        // GET: api/RegionsAPI
        public IQueryable<Region> GetRegion()
        {
            return db.Region;
        }

        // GET: api/RegionsAPI/5
        [ResponseType(typeof(Region))]
        public IHttpActionResult GetRegion(int id)
        {
            Region region = db.Region.Find(id);
            if (region == null)
            {
                return NotFound();
            }

            return Ok(region);
        }

        // GET: api/RegionsAPI/id/ESBENV
        [ResponseType(typeof(WebServices))]
        public IHttpActionResult GetDefaultRegion(int id, string param)
        {

            var region = db.GetDefaultEnv(param).ToList();
            if (region == null)
            {
                return NotFound();
            }
            return Ok(region);
        }

        // PUT: api/RegionsAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRegion(int id, Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != region.RegionId)
            {
                return BadRequest();
            }

            db.Entry(region).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegionExists(id))
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

        // POST: api/RegionsAPI
        [ResponseType(typeof(Region))]
        public IHttpActionResult PostRegion(Region region)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Region.Add(region);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = region.RegionId }, region);
        }

        // DELETE: api/RegionsAPI/5
        [ResponseType(typeof(Region))]
        public IHttpActionResult DeleteRegion(int id)
        {
            Region region = db.Region.Find(id);
            if (region == null)
            {
                return NotFound();
            }

            db.Region.Remove(region);
            db.SaveChanges();

            return Ok(region);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RegionExists(int id)
        {
            return db.Region.Count(e => e.RegionId == id) > 0;
        }
    }
}