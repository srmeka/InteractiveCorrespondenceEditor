﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace InteractiveCorrespondenceEditor.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class ICEEntities : DbContext
    {
        public ICEEntities()
            : base("name=ICEEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<DocumentLog> DocumentLog { get; set; }
        public virtual DbSet<LOB> LOB { get; set; }
        public virtual DbSet<LookupItem> LookupItem { get; set; }
        public virtual DbSet<LookupType> LookupType { get; set; }
        public virtual DbSet<Control> Control { get; set; }
        public virtual DbSet<Document> Document { get; set; }
        public virtual DbSet<DocumentControl> DocumentControl { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<WebServices> WebServices { get; set; }
        public virtual DbSet<Region> Region { get; set; }
        public virtual DbSet<ErrorLog> ErrorLog { get; set; }
    
        public virtual ObjectResult<GetDocumentControl_Result> GetDocumentControl(Nullable<int> docid)
        {
            var docidParameter = docid.HasValue ?
                new ObjectParameter("docid", docid) :
                new ObjectParameter("docid", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetDocumentControl_Result>("GetDocumentControl", docidParameter);
        }
    
        public virtual ObjectResult<GetLOB_Result> GetLOB()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLOB_Result>("GetLOB");
        }
    
        public virtual ObjectResult<GetLookupItem_Result> GetLookupItem(string lookupTypeValue)
        {
            var lookupTypeValueParameter = lookupTypeValue != null ?
                new ObjectParameter("LookupTypeValue", lookupTypeValue) :
                new ObjectParameter("LookupTypeValue", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetLookupItem_Result>("GetLookupItem", lookupTypeValueParameter);
        }
    
        public virtual ObjectResult<GetDocuments_Result> GetDocuments(Nullable<int> categoryId, string state)
        {
            var categoryIdParameter = categoryId.HasValue ?
                new ObjectParameter("CategoryId", categoryId) :
                new ObjectParameter("CategoryId", typeof(int));
    
            var stateParameter = state != null ?
                new ObjectParameter("State", state) :
                new ObjectParameter("State", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetDocuments_Result>("GetDocuments", categoryIdParameter, stateParameter);
        }
    
        public virtual ObjectResult<GetCategories_Result> GetCategories(Nullable<int> id, string lOB, string aDGroups)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            var lOBParameter = lOB != null ?
                new ObjectParameter("LOB", lOB) :
                new ObjectParameter("LOB", typeof(string));
    
            var aDGroupsParameter = aDGroups != null ?
                new ObjectParameter("ADGroups", aDGroups) :
                new ObjectParameter("ADGroups", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetCategories_Result>("GetCategories", idParameter, lOBParameter, aDGroupsParameter);
        }
    
        public virtual ObjectResult<GetControl_Result> GetControl()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetControl_Result>("GetControl");
        }
    
        public virtual ObjectResult<string> GetESBEnv()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("GetESBEnv");
        }
    
        public virtual ObjectResult<GetDefaultEnv_Result> GetDefaultEnv(string env)
        {
            var envParameter = env != null ?
                new ObjectParameter("Env", env) :
                new ObjectParameter("Env", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetDefaultEnv_Result>("GetDefaultEnv", envParameter);
        }
    
        public virtual ObjectResult<string> GetDistinctWebserviceValues(Nullable<int> id)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("GetDistinctWebserviceValues", idParameter);
        }
    
        public virtual ObjectResult<GetWebService_Result> GetWebService(Nullable<int> id, string param, string env, string lob)
        {
            var idParameter = id.HasValue ?
                new ObjectParameter("id", id) :
                new ObjectParameter("id", typeof(int));
    
            var paramParameter = param != null ?
                new ObjectParameter("param", param) :
                new ObjectParameter("param", typeof(string));
    
            var envParameter = env != null ?
                new ObjectParameter("env", env) :
                new ObjectParameter("env", typeof(string));
    
            var lobParameter = lob != null ?
                new ObjectParameter("lob", lob) :
                new ObjectParameter("lob", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetWebService_Result>("GetWebService", idParameter, paramParameter, envParameter, lobParameter);
        }
    
        public virtual int UpdateCategory(Nullable<bool> categoryActive, string categoryFriendlyName, string categoryGroups, Nullable<int> categoryId, string categoryName, string createdBy, Nullable<System.DateTime> createdDateTime, Nullable<int> lOBId, string updatedBy, Nullable<System.DateTime> updatedDateTime)
        {
            var categoryActiveParameter = categoryActive.HasValue ?
                new ObjectParameter("CategoryActive", categoryActive) :
                new ObjectParameter("CategoryActive", typeof(bool));
    
            var categoryFriendlyNameParameter = categoryFriendlyName != null ?
                new ObjectParameter("CategoryFriendlyName", categoryFriendlyName) :
                new ObjectParameter("CategoryFriendlyName", typeof(string));
    
            var categoryGroupsParameter = categoryGroups != null ?
                new ObjectParameter("CategoryGroups", categoryGroups) :
                new ObjectParameter("CategoryGroups", typeof(string));
    
            var categoryIdParameter = categoryId.HasValue ?
                new ObjectParameter("CategoryId", categoryId) :
                new ObjectParameter("CategoryId", typeof(int));
    
            var categoryNameParameter = categoryName != null ?
                new ObjectParameter("CategoryName", categoryName) :
                new ObjectParameter("CategoryName", typeof(string));
    
            var createdByParameter = createdBy != null ?
                new ObjectParameter("CreatedBy", createdBy) :
                new ObjectParameter("CreatedBy", typeof(string));
    
            var createdDateTimeParameter = createdDateTime.HasValue ?
                new ObjectParameter("CreatedDateTime", createdDateTime) :
                new ObjectParameter("CreatedDateTime", typeof(System.DateTime));
    
            var lOBIdParameter = lOBId.HasValue ?
                new ObjectParameter("LOBId", lOBId) :
                new ObjectParameter("LOBId", typeof(int));
    
            var updatedByParameter = updatedBy != null ?
                new ObjectParameter("UpdatedBy", updatedBy) :
                new ObjectParameter("UpdatedBy", typeof(string));
    
            var updatedDateTimeParameter = updatedDateTime.HasValue ?
                new ObjectParameter("UpdatedDateTime", updatedDateTime) :
                new ObjectParameter("UpdatedDateTime", typeof(System.DateTime));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("UpdateCategory", categoryActiveParameter, categoryFriendlyNameParameter, categoryGroupsParameter, categoryIdParameter, categoryNameParameter, createdByParameter, createdDateTimeParameter, lOBIdParameter, updatedByParameter, updatedDateTimeParameter);
        }
    }
}
