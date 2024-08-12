using System;
using System.Configuration;

namespace InteractiveCorrespondenceEditor.Common
{
    /// <summary>
    /// SMTP mail custom configuration section
    /// </summary>
    public class ErrorCode : ConfigurationSection
    {
        //CA1810 : Microsoft.Performance : Initialize all static fields in Njm.Enterprise.Correspondence.Editor.Common.MailConfig when those fields are declared and remove the explicit static constructor.
        static ErrorCode section = ConfigurationManager.GetSection("CustomAppSettings/ErrorCodes") as ErrorCode;


        public static string Default
        {
            get { return section.def; }
        }

        /// <summary>
        /// Selects datasource name from the config file
        /// </summary>
        /// <param name="category">client application</param>
        /// <returns>datasource</returns>
        public static string GetErrorDescription(string code)
        {
            foreach (ErrorCodeConfigElement item in section.codes)
            {
                if (item.errorcode == code)
                {
                    return item.description;
                }
            }
            //PV4409: CA2201: ...use a different exception type (AK4316 9/14/11)
            throw new ArgumentException(string.Format("Error code not found", code));
        }

        [ConfigurationProperty("codes")]
        ErrorCodeCollection codes
        {
            get { return this["codes"] as ErrorCodeCollection; }
        }

        [ConfigurationProperty("errorcode")]
        string errorcode
        {
            get { return (string)this["errorcode"]; }
        }

        [ConfigurationProperty("description")]
        string description
        {
            get { return (string)this["description"]; }
        }

        [ConfigurationProperty("default")]
        string def
        {
            get { return "Not available"; }
        }




        #region MailCollection ------------------------------------------------

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1010:CollectionsShouldImplementGenericInterface", Justification = "By Design; Collection provides sufficient functionality")]
        public class ErrorCodeCollection : ConfigurationElementCollection
        {
            public ErrorCodeConfigElement this[int index]
            {
                get { return (ErrorCodeConfigElement)BaseGet(index); }
            }

            protected override ConfigurationElement CreateNewElement()
            {
                return new ErrorCodeConfigElement();
            }

            protected override object GetElementKey(ConfigurationElement element)
            {
                return ((ErrorCodeConfigElement)element).Name;
            }
        }

        #endregion


        #region MailConfigElement --------------------------------------------

        public class ErrorCodeConfigElement : ConfigurationElement
        {
            [ConfigurationProperty("name", IsKey = true)]
            public string Name
            {
                get { return (string)this["name"]; }
            }

            [ConfigurationProperty("errorcode")]
            public string errorcode
            {
                get { return (string)this["errorcode"]; }
            }

            [ConfigurationProperty("description")]
            public string description
            {
                get { return (string)this["description"]; }
            }
        }

        #endregion

    }
}