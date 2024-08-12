USE [ICE]
GO

SET NUMERIC_ROUNDABORT OFF
GO
SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON
GO
SET DATEFORMAT YMD
GO
SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE
GO
BEGIN TRANSACTION

	UPDATE [dbo].[Category]
	   SET [CategoryGroups] = 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit,Inspire_PL_HUD_Admin,Inspire_PL_HD_SUP_UW_CSR'
		WHERE LOBID in (6,7)

	UPDATE [dbo].[Category]
	   SET [CategoryGroups] = 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_UM_SS,Inspire_UMB_Submission,Inspire_PL_MailerSheet,Inspire_PL_HUD_Admin'
		WHERE LOBID in (8)

-- Delete Printer
	DELETE FROM [dbo].[LookupItem]  WHERE LookupItemID = 49


COMMIT TRANSACTION
GO