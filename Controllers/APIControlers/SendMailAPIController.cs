using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using InteractiveCorrespondenceEditor.Controllers.Common;
using System.Web;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class SendMailAPIController : ApiController
    {
        // GET api/<controller>
       
        public void Send(object param)
        {
            string client = ((Newtonsoft.Json.Linq.JToken)param).Root["lob"].ToString();
            HttpRequest req = System.Web.HttpContext.Current.Request;
            string browserName = req.Browser.Browser;
            try
            {
                using (SmtpClient mail = new SmtpClient(MailConfig.Host))
                {
                    // mail.Send(MailConfig.From, MailConfig.GetAddress(client), MailConfig.GetClientSubject(client), text);

                    MailMessage mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress(MailConfig.From);

                    string addressee = String.Empty;
                    try
                    {
                        addressee = MailConfig.GetAddress(client);
                    }
                    catch (ArgumentException)
                    {
                        addressee = MailConfig.Default;
                    }
                    var message = "";
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["userName"] != null)
                    {
                         message = message + "User:" + ((Newtonsoft.Json.Linq.JToken)param).Root["userName"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["policyNumber"] != null)
                    {
                        message = message + "Policy:" + ((Newtonsoft.Json.Linq.JToken)param).Root["policyNumber"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["quoteNumber"] != null)
                    {
                        message = message + "Quote:" + ((Newtonsoft.Json.Linq.JToken)param).Root["quoteNumber"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["claimNumber"] != null)
                    {
                        message = message + "Claim:" + ((Newtonsoft.Json.Linq.JToken)param).Root["claimNumber"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["producerCode"] != null)
                    {
                        message = message + "Producer:" + ((Newtonsoft.Json.Linq.JToken)param).Root["producerCode"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["lob"] != null)
                    {
                        message = message + "LOB:" + ((Newtonsoft.Json.Linq.JToken)param).Root["lob"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["environment"] != null)
                    {
                        message = message + "Env:" + ((Newtonsoft.Json.Linq.JToken)param).Root["environment"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["state"] != null)
                    {
                        message = message + "State:" + ((Newtonsoft.Json.Linq.JToken)param).Root["state"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["category"] != null)
                    {
                        message = message + "Category:" + ((Newtonsoft.Json.Linq.JToken)param).Root["category"] + " ";
                    }
                    if (((Newtonsoft.Json.Linq.JToken)param).Root["letterName"] != null)
                    {
                        message = message + "Letter:" + ((Newtonsoft.Json.Linq.JToken)param).Root["letterName"] + " ";
                    }
                    message = message + "Browser:" + browserName;
                    //var message = "User:" + ((Newtonsoft.Json.Linq.JToken)param).Root["name"]+ " Policy:" + ((Newtonsoft.Json.Linq.JToken)param).Root["polNum"]; 
                    getAddressee(addressee, mailMessage);

                    //mailMessage.To.Add(addressee);
                    mailMessage.Subject = MailConfig.GetClientSubject(client);
                    mailMessage.Body = "<html><table style= 'width: 100%' id='Mail' runat='server'>" +
                                          "<tr><td style='height: 25px; font-weight:bold; background-color: #003399; color: #FFFFE6;' colspan='2'>" +
                                         message +
                                                  "  </td>" +
                                          "  </tr>" +
                                           " <tr>" +
                                             "   <td style='width: 30%; height: 25px; background-color: #FFFFE6; font-weight: bold;vertical-align:top;'>" +
                                                   " Error Date</td> " +
                                               " <td style='width: 70%; height: 25px;background-color: #FFFFE6; vertical-align:top;'> " +
                                                  DateTime.Now.ToShortDateString() + "</td> " +
                                           " </tr> " +
                                           "  <tr>" +
                                                "<td style='width: 30%; height: 25px; background-color: #FFFFE6; font-weight: bold;vertical-align:top;'>" +
                                                   "Error Message </td>" +
                                               " <td style='width: 70%; height: 25px;background-color: #FFFFE6; vertical-align:top;'>" +
                                                   ((Newtonsoft.Json.Linq.JToken)param).Root["errorMessage"] + "</td>" +
                                           " </tr>" + "</html>";

                    mailMessage.IsBodyHtml = true;
                    mail.Send(mailMessage);

                }
               
            }
            catch (SmtpException ex)
            {
                //Logger.Log(ex.ToString());
                throw ex;

            }
        }

        //Get multiple email address amd send email notification to all the addresses
        public static void getAddressee(string address, MailMessage mailmessage)
        {
            if (address.Contains(";"))
            {
                string[] addresseeArray = null;
                addresseeArray = address.Split(';');
                if (addresseeArray != null)
                {
                    for (int i = 0; i < addresseeArray.Length; i++)
                    {
                        mailmessage.To.Add(addresseeArray[i]);
                    }
                }
            }
            else
            {
                mailmessage.To.Add(address);
            }
        }

    }
}