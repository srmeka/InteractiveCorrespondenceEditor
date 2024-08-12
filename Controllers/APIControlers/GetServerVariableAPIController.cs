using System.Collections.Specialized;
using System.Web;
using System.Web.Http;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;

using System.Web.Mvc;
using System;

namespace InteractiveCorrespondenceEditor.Controllers.APIControlers
{
    public class GetServerVariableAPIController : ApiController
    {
        // GET api/GetServerVariableAPI
        public string Get(int id, string param)
        {
           
            List<string> results = new List<string>();
            var ServerVariable = HttpContext.Current.Request.ServerVariables[param];
            if (param == "HTTP_XPRGROUPS")
            {
                if (ServerVariable == null && param == "HTTP_XPRGROUPS")
                {
                   ServerVariable = "CN=Inspire_Developers,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_HUD_Admin,OU=Groups,DC=njmgroup,DC=com^CN=Xpression_Design,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_WCU_PAS,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_WCU_PolCtr_Mgr,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_WCU_PolCtr,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_WCU_PolCtr_ScanSheets,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_Personal_Lines,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=xPression_PL_HUD_Admin,OU=XPression,OU=Groups,DC=njmgroup,DC=com";
                   //ServerVariable = "CN=Inspire_UMB_Submission,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_MailerSheet,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_Auto_Scansheet,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_Auto_RenewalUW,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_Auto_PolicyAudit,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_Auto_General,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_Auto_OffCallProc,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_Personal_Lines,OU=XPression,OU=Groups,DC=njmgroup,DC=com^CN=Inspire_PL_UM_SUP_UW_CSR,OU=XPression,OU=Groups,DC=njmgroup,DC=com,DC=com^CN=Inspire_PL_HD_SUP_UW_RCT,OU=XPression,OU=Groups,DC=njmgroup,DC=com,DC=com^CN=Inspire_Accounts_Receivable,OU=XPression,OU=Groups,DC=njmgroup,DC=com";
                }

                Regex regexObj = new Regex("CN=Inspire.+?,");
                Match matchResults = regexObj.Match(ServerVariable);
                while (matchResults.Success)
                {
                    string modifyMatchResult = matchResults.ToString();
                    modifyMatchResult = modifyMatchResult.Replace("CN=", "");
                    modifyMatchResult = modifyMatchResult.Replace(",", "");
                    results.Add(modifyMatchResult);
                    matchResults = matchResults.NextMatch();
                }
                results.ToArray();
                string adGroups = string.Join(",", results);
                return adGroups;
            }  
            else if (param == "SM_USERNAME")
                {

                    string userName = "";
                    string _tempUserName = "";
                    string[] userNameArray = null;

                if (HttpContext.Current.Request.Url.Host == "localhost")
                {
                    _tempUserName = "CN=TEST\\, USER,OU=West Trenton,OU=Insurance Associates,DC=njmgroup,DC=com";
                }
                else
                {
                    //expected format for regular accounts - CN=Dikay\, Shashank,OU=West Trenton,OU=Insurance Associates,DC=njmgroup,DC=com
                    //excepted format for C accounts -  CN=Patricia Sines,OU=West Trenton,OU=Insurance Associates,DC=njmgroup,DC=com
                    _tempUserName = HttpContext.Current.Request.ServerVariables["HTTP_SM_USERDN"].ToString();
                }

                if (_tempUserName != "")
                {
                    //enhancement for C account users Release 2.3 - sp#888 

                    string strLastChar = "";
                    string sm_username = "";

                    if (HttpContext.Current.Request.Url.Host == "localhost")
                    {
                        sm_username = HttpContext.Current.User.Identity.Name;
                        if (sm_username != "")
                        {
                            strLastChar = sm_username.Substring(sm_username.Length - 1, 1);
                        }
                        else
                        {
                            strLastChar = "TEST USER";
                        }
                    }
                    else
                    {
                        sm_username = HttpContext.Current.Request.ServerVariables["HTTP_SM_USER"].ToString();
                        //Get last charachters from user name 
                        strLastChar = sm_username.Substring(sm_username.Length - 1, 1);
                    }

                    // C Account SM USER Value          = NJMGROUP\PS3040C
                    // REGULAR ACCOUNT SM USER VALUE    = NJMGROUP\SD7934

                    switch (strLastChar.ToUpper())
                    {

                        case "C":  //FOR C account users
                            userNameArray = _tempUserName.Split(',');
                            userName = userNameArray[0];
                            userName = userName.Replace("CN=", "");
                            break;

                        case "A": //FOR A account users

                            break;

                        default:  // for regular account users
                            userNameArray = _tempUserName.Split(',');
                            //only get first and second value from array 
                            userName = userNameArray[1] + " " + userNameArray[0].Replace("\\", "");
                            userName = userName.Replace("CN=", "");
                            break;
                    }
                }
                else
                {
                    userName = "";
                }
                    return userName;
            }
            else if (param == "USER_INITIAL")
            {
                string UserName = "";
                string[] UserNameArray = null;
                string firstCharOfFirstName = String.Empty;
                string firstCharOfLastName = String.Empty;
                if (HttpContext.Current.Request.Url.Host == "localhost")
                {
                    UserName = "CN=TEST\\, USER,OU=West Trenton,OU=Insurance Associates,DC=njmgroup,DC=com";
                }
                else
                {
                    UserName = HttpContext.Current.Request.ServerVariables["HTTP_SM_USERDN"].ToString();
                }
                UserNameArray = UserName.Split(',');
                //only get first and second value from array 
                if (UserNameArray != null)
                {
                    if (!String.IsNullOrEmpty(UserNameArray[1]))
                    {
                        firstCharOfFirstName = UserNameArray[1].Trim().Substring(0, 1);
                    }
                    if (!String.IsNullOrEmpty(UserNameArray[0]))
                    {
                        firstCharOfLastName = UserNameArray[0].Replace("\\", "").Replace("CN=", "").Trim().Substring(0, 1);
                    }
                }
                return firstCharOfFirstName + firstCharOfLastName;
            }

            else if (param == "HTTP_MAIL")
            {
                string userEmail = "";

                if (HttpContext.Current.Request.Url.Host == "localhost")
                {
                    userEmail = "DoNotReply_AutoInsurance@njm.com";
                }
                else
                {
                    userEmail = HttpContext.Current.Request.ServerVariables["HTTP_MAIL"].ToString();
                }
                return userEmail;
            }
            else
            {
                if (ServerVariable == null && param == "HTTP_SM_USER")
                {
                    //ServerVariable = "NJMGROUP\\MB1412";
                    ServerVariable = string.Concat("NJMGROUP\\", Environment.UserName);
                }
                return ServerVariable.Replace("NJMGROUP\\","");
            }

           
        }

        }

    }