using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace InteractiveCorrespondenceEditor.Controllers.Admin
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Category()
        {
            return PartialView("Category");
        }

        public ActionResult Document()
        {
            return PartialView("Document");
        }

        public ActionResult Control()
        {
            return PartialView("Control");
        }
        public ActionResult Webservices()
        {
            return PartialView("Webservices");
        }
    }
}
