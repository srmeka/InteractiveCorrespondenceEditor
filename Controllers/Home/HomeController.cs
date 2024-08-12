using System.Web.Mvc;
using System.Xml;
using System.Xml.Xsl;
using System.IO;
using InteractiveCorrespondenceEditor.Controllers.APIControlers;
using System.Collections.Specialized;

namespace InteractiveCorrespondenceEditor.Controllers.Home
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {

            return View();
        }

    }
}