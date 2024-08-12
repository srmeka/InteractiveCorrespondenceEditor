using System.Web.Http;

using Newtonsoft.Json.Serialization;

namespace InteractiveCorrespondenceEditor
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            //config.SuppressDefaultHostAuthentication();
            //config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}/{param}/{data}",
                defaults: new { id = RouteParameter.Optional, param = RouteParameter.Optional, data = RouteParameter.Optional}
            );
        }
    }
}
