/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLU14WT1\SQL16UAT2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 3/13/2020 8:38:52 AM

*/
		
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

PRINT(N'Drop constraints from [dbo].[Document]')
ALTER TABLE [dbo].[Document] NOCHECK CONSTRAINT [FK_Document_Category]

PRINT(N'Add rows to [dbo].[Document]')
SET IDENTITY_INSERT [dbo].[Document] ON
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1296, 5, 'Manual Invoice', 'Manual Invoice', 1, NULL, 'companyRoot:S:Production://Templates/BillingCenter/Manual Invoice.jld', 'POLDOC  Correspondence', '601680', '2020-02-03 10:35:00.000', '601680', '2020-02-03 10:35:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1297, 10, 'Manual Invoice', 'Manual Invoice', 1, NULL, 'companyRoot:S:Production://Templates/BillingCenterWCU/Manual Invoice.jld', 'WCU  Correspondence', '601680', '2020-02-03 10:41:00.000', '601680', '2020-02-03 10:41:00.000')

SET IDENTITY_INSERT [dbo].[Document] OFF
PRINT(N'Operation applied to 3 rows out of 3')

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]
COMMIT TRANSACTION
GO
