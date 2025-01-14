/*
Run this script on:

SQLQ14WT1\SQL16QA2.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 11/20/2019 1:45:35 PM

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

PRINT(N'Update rows in [dbo].[Document]')
UPDATE [dbo].[Document] SET [DocumentName]='Claim Review Repairs Required-HO', [UpdatedBy]='601498', [UpdatedDateTime]='2019-11-15 09:02:00.000' WHERE [DocumentId] = 159
UPDATE [dbo].[Document] SET [DocumentName]='Claim Review Repairs Required-DW', [UpdatedBy]='601498', [UpdatedDateTime]='2019-11-15 09:02:00.000' WHERE [DocumentId] = 211
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/GeneralClaims\Covered proof and Denial.jld', [UpdatedDateTime]='2019-11-05 13:49:00.000' WHERE [DocumentId] = 262
UPDATE [dbo].[Document] SET [DocumentName]='Subro-Addl Payments Made w Pct Neg', [JldFilePath]='companyRoot:S:Production://Templates/GeneralClaims/Subro-Addl Payments Made w Pct Neg.jld' WHERE [DocumentId] = 651
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Add rows to [dbo].[Document]')
SET IDENTITY_INSERT [dbo].[Document] ON
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1030, 43, 'HIPAA Signed Rxst Records', 'HIPAA Signed Rxst Records', 1, NULL, 'companyRoot:S:Production://Templates/WorkersComp/HIPAA Signed Rxst Records.jld', 'WCOT  Legal', 'JJ3999', '2019-10-30 13:39:00.000', '601680', '2019-11-08 15:29:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1031, 66, 'Blank Letter Template - Group', 'Blank Letter Template - Group', 1, NULL, 'companyRoot:S:Production://Templates/WorkersComp/Blank Letter Template - Group.jld', 'WCOT  Custom Letter', 'JJ3999', '2019-10-30 13:56:00.000', 'JJ3999', '2019-10-30 13:56:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1033, 66, 'Blank Letter Template - Specific', 'Blank Letter Template - Specific', 1, NULL, 'companyRoot:S:Production://Templates/WorkersComp/Blank Letter Template - Specific.jld', 'WCOT  Custom Letter', 'JJ3999', '2019-10-30 13:57:00.000', 'JJ3999', '2019-10-30 13:57:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1034, 42, 'CT Death Letter', 'CT Death Letter', 1, 'CT', 'companyRoot:S:Production://Templates/GeneralClaims/CT Death Letter.jld', 'GCOM  Correspondence Out', '601680', '2019-11-05 14:39:00.000', '601680', '2019-11-05 14:39:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1035, 42, 'CT Explain Letter', 'CT Explain Letter', 1, 'CT', 'companyRoot:S:Production://Templates/GeneralClaims/CT Explain Letter.jld', 'GCOM  Correspondence Out', '601680', '2019-11-05 14:42:00.000', '601680', '2019-11-05 14:42:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1036, 42, 'CT SOL', 'CT SOL', 1, 'CT', 'companyRoot:S:Production://Templates/GeneralClaims/CT SOL.jld', 'GCOM  Correspondence Out', '601680', '2019-11-05 14:45:00.000', '601680', '2019-11-05 14:45:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1037, 42, 'CT Wage and Salary Verification', 'CT Wage and Salary Verification', 1, 'CT', 'companyRoot:S:Production://Templates/GeneralClaims/CT Wage and Salary Verification.jld', 'GCOM  Correspondence Out', '601680', '2019-11-05 14:48:00.000', '601680', '2019-11-05 14:48:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1038, 42, 'CT WC Denial Letter', 'CT WC Denial Letter', 1, 'CT', 'companyRoot:S:Production://Templates/GeneralClaims/CT WC Denial Letter.jld', 'GCOM  Correspondence Out', '601680', '2019-11-05 14:49:00.000', '601680', '2019-11-05 14:49:00.000')
SET IDENTITY_INSERT [dbo].[Document] OFF
PRINT(N'Operation applied to 8 rows out of 8')

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]
COMMIT TRANSACTION
GO
