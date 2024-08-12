using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace InteractiveCorrespondenceEditor.Controllers.Common
{
    public class MailConfig : ConfigurationSection
    {
        //CA1810 : Microsoft.Performance : Initialize all static fields in Njm.Enterprise.Correspondence.Editor.Common.MailConfig when those fields are declared and remove the explicit static constructor.
        static MailConfig section = ConfigurationManager.GetSection("CustomAppSettings/SmtpMail") as MailConfig;

        public static string Host
        {
            get { return section.host; }
        }

        public static string From
        {
            get { return section.from; }
        }

        public static string Subject
        {
            get { return section.subject; }
        }

        public static string Default
        {
            get { return section.def; }
        }

        /// <summary>
        /// Selects datasource name from the config file
        /// </summary>
        /// <param name="category">client application</param>
        /// <returns>datasource</returns>
        public static string GetAddress(string client)
        {
            foreach (MailConfigElement item in section.clients)
            {
                if (item.Name == client)
                {
                    return item.Addressee;
                }
            }
            //PV4409: CA2201: ...use a different exception type (AK4316 9/14/11)
            throw new ArgumentException(string.Format("Addressee for:{0} was not found", client));
        }

        public static string GetClientSubject(string client)
        {
            foreach (MailConfigElement item in section.clients)
            {
                if (item.Name == client)
                {
                    return item.Subject;
                }
            }
            //PV4409: CA2201: ...use a different exception type (AK4316 9/14/11)
            throw new ArgumentException(string.Format("Addressee for:{0} was not found", client));

        }



        [ConfigurationProperty("host")]
        string host
        {
            get { return (string)this["host"]; }
        }

        [ConfigurationProperty("from")]
        string from
        {
            get { return (string)this["from"]; }
        }

        [ConfigurationProperty("subject")]
        string subject
        {
            get { return (string)this["subject"]; }
        }

        [ConfigurationProperty("clients")]
        MailCollection clients
        {
            get { return this["clients"] as MailCollection; }
        }

        [ConfigurationProperty("default")]
        string def
        {
            get { return (string)this["default"]; }
        }
    }


    #region MailCollection ------------------------------------------------

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1010:CollectionsShouldImplementGenericInterface", Justification = "By Design; Collection provides sufficient functionality")]
    public class MailCollection : ConfigurationElementCollection
    {
        public MailConfigElement this[int index]
        {
            get { return (MailConfigElement)BaseGet(index); }
        }

        protected override ConfigurationElement CreateNewElement()
        {
            return new MailConfigElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((MailConfigElement)element).Name;
        }
    }

    #endregion


    #region MailConfigElement --------------------------------------------

    public class MailConfigElement : ConfigurationElement
    {
        [ConfigurationProperty("name", IsKey = true)]
        public string Name
        {
            get { return (string)this["name"]; }
        }

        [ConfigurationProperty("addressee")]
        public string Addressee
        {
            get { return (string)this["addressee"]; }
        }

        [ConfigurationProperty("subject")]
        public string Subject
        {
            get { return (string)this["subject"]; }
        }
    }

    #endregion

}