/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/29/2019 10:36:12 AM

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

PRINT(N'Drop constraint FK_DocumentControl_Document from [dbo].[DocumentControl]')
ALTER TABLE [dbo].[DocumentControl] NOCHECK CONSTRAINT [FK_DocumentControl_Document]

PRINT(N'Update rows in [dbo].[Document]')
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 16:58:00.000' WHERE [DocumentId] = 107
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 16:58:00.000' WHERE [DocumentId] = 108
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 16:56:00.000' WHERE [DocumentId] = 137
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 16:59:00.000' WHERE [DocumentId] = 174
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:00:00.000' WHERE [DocumentId] = 216
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:00:00.000' WHERE [DocumentId] = 244
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:01:00.000' WHERE [DocumentId] = 309
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:01:00.000' WHERE [DocumentId] = 312
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:02:00.000' WHERE [DocumentId] = 350
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:02:00.000' WHERE [DocumentId] = 351
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:02:00.000' WHERE [DocumentId] = 358
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:02:00.000' WHERE [DocumentId] = 359
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:02:00.000' WHERE [DocumentId] = 360
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 461
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 462
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 463
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 464
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 469
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 470
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 471
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 472
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 473
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 474
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 475
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 476
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 477
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 478
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 479
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 480
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 481
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 482
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedDateTime]='2019-10-15 17:06:00.000' WHERE [DocumentId] = 483
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 802
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 805
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 806
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 814
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 815
UPDATE [dbo].[Document] SET [BaseState]='PA', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:07:00.000' WHERE [DocumentId] = 816
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:09:00.000' WHERE [DocumentId] = 901
UPDATE [dbo].[Document] SET [BaseState]='NJ', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:09:00.000' WHERE [DocumentId] = 902
UPDATE [dbo].[Document] SET [BaseState]='DE', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:10:00.000' WHERE [DocumentId] = 910
UPDATE [dbo].[Document] SET [BaseState]='DE', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:10:00.000' WHERE [DocumentId] = 911
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:10:00.000' WHERE [DocumentId] = 913
UPDATE [dbo].[Document] SET [BaseState]='NY', [UpdatedBy]='601680', [UpdatedDateTime]='2019-10-15 17:10:00.000' WHERE [DocumentId] = 914
UPDATE [dbo].[Document] SET [BaseState]='CT', [UpdatedDateTime]='2019-10-15 16:55:00.000' WHERE [DocumentId] = 1005
UPDATE [dbo].[Document] SET [BaseState]='CT', [UpdatedDateTime]='2019-10-15 16:59:00.000' WHERE [DocumentId] = 1006
UPDATE [dbo].[Document] SET [BaseState]='CT', [UpdatedDateTime]='2019-10-15 16:59:00.000' WHERE [DocumentId] = 1007
UPDATE [dbo].[Document] SET [BaseState]='CT', [UpdatedDateTime]='2019-10-15 17:01:00.000' WHERE [DocumentId] = 1008
UPDATE [dbo].[Document] SET [BaseState]='CT', [UpdatedDateTime]='2019-10-15 16:56:00.000' WHERE [DocumentId] = 1010
PRINT(N'Operation applied to 49 rows out of 49')

PRINT(N'Add rows to [dbo].[Document]')
SET IDENTITY_INSERT [dbo].[Document] ON
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1027, 61, 'CT HIPAA Request', 'CT HIPAA Request', 1, 'CT', 'companyRoot:S:Production://Templates/WorkersCompClaims/CT HIPAA Request.jld', 'WCOT  Out of State', 'JJ3999', '2019-10-14 13:49:00.000', '601680', '2019-10-15 17:10:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1028, 51, 'PIP Reimbursement Release', 'PIP Reimbursement Release', 1, NULL, 'companyRoot:S:Production://Templates/GeneralClaims/PIP Reimbursement Release.jld', 'GCOM  Correspondence Out', 'JJ3999', '2019-10-15 13:13:00.000', 'JJ3999', '2019-10-15 13:13:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1029, 18, 'NJM NJ Temporary ID Card', 'NJM NJ Temporary ID Card', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/NJM NJ Temporary ID Card.jld', 'POLDOC  Correspondence', '601680', '2019-10-18 09:51:00.000', '601680', '2019-10-18 09:51:00.000')
SET IDENTITY_INSERT [dbo].[Document] OFF
PRINT(N'Operation applied to 3 rows out of 3')

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]
ALTER TABLE [dbo].[DocumentControl] WITH CHECK CHECK CONSTRAINT [FK_DocumentControl_Document]
COMMIT TRANSACTION
GO
