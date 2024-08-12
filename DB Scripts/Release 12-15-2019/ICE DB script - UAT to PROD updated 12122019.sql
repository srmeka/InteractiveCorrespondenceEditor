/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLU14WT1\SQL16UAT2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 12/12/2019 9:24:17 AM

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

PRINT(N'Drop constraints from [dbo].[DocumentControl]')
ALTER TABLE [dbo].[DocumentControl] NOCHECK CONSTRAINT [FK_DocumentControl_Controls]
ALTER TABLE [dbo].[DocumentControl] NOCHECK CONSTRAINT [FK_DocumentControl_Document]

PRINT(N'Drop constraints from [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] NOCHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]

PRINT(N'Drop constraints from [dbo].[Document]')
ALTER TABLE [dbo].[Document] NOCHECK CONSTRAINT [FK_Document_Category]

PRINT(N'Drop constraints from [dbo].[Category]')
ALTER TABLE [dbo].[Category] NOCHECK CONSTRAINT [FK_Category_LOB]

PRINT(N'Delete rows from [dbo].[DocumentControl]')
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 222
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 408
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 1469
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 1470
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 1475
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2798
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2799
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2801
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2803
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2805
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5112
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6076
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6078
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6079
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6081
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6084
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6146
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6325
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8358
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8445
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8584
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8586
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8590
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8592
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8598
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8599
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8600
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8601
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8705
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8707
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8713
PRINT(N'Operation applied to 31 rows out of 31')

PRINT(N'Update rows in [dbo].[DocumentControl]')
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8359
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=6 WHERE [DocumentControlId] = 8436
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8437
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=5 WHERE [DocumentControlId] = 8439
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=4 WHERE [DocumentControlId] = 8441
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=7 WHERE [DocumentControlId] = 8443
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8595
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=9 WHERE [DocumentControlId] = 8712
PRINT(N'Operation applied to 8 rows out of 8')

PRINT(N'Update rows in [dbo].[LookupItem]')
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Insurance Company', [LookupItemValue]='NJM', [LookupTypeID]=17, [LookupItemOrder]=1 WHERE [LookupItemID] = 157
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Re-Insurance Company', [LookupItemValue]='NJRe', [LookupTypeID]=17, [LookupItemOrder]=2 WHERE [LookupItemID] = 158
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Indemnity Insurance Company', [LookupItemValue]='NJ Indemnity', [LookupTypeID]=17, [LookupItemOrder]=3 WHERE [LookupItemID] = 159
PRINT(N'Operation applied to 3 rows out of 3')

PRINT(N'Update rows in [dbo].[Document]')
UPDATE [dbo].[Document] SET [DocumentName]='Additional Info-Policy Audit-UMB', [UpdatedBy]='601498', [UpdatedDateTime]='2019-11-21 14:55:00.000' WHERE [DocumentId] = 233
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:53:00.000' WHERE [DocumentId] = 351
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:53:00.000' WHERE [DocumentId] = 360
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 461
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 462
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 463
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 464
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 469
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 470
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 471
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 472
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 473
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 474
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 475
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 476
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 477
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 478
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 479
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 480
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 481
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 482
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 483
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 802
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 805
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 806
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 814
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 815
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:41:00.000' WHERE [DocumentId] = 816
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/WorkersCompClaims/HIPAA Signed Rxst Records.jld' WHERE [DocumentId] = 1030
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/WorkersCompClaims/Blank Letter Template - Group.jld' WHERE [DocumentId] = 1031
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/WorkersCompClaims/Blank Letter Template - Specific.jld' WHERE [DocumentId] = 1033
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1034
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1035
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1036
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1037
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1038
PRINT(N'Operation applied to 36 rows out of 36')

PRINT(N'Update row in [dbo].[Control]')
UPDATE [dbo].[Control] SET [ControlDescription]='<pcpa-veh-info-checkboxw-checkboxlst></pcpa-veh-info-checkboxw-checkboxlst>', [ControlName]='PcpaVehInfoCheckboxwCheckboxlst', [CreatedDateTime]='2019-11-20 14:09:00.000', [UpdatedDateTime]='2019-11-20 14:09:00.000' WHERE [ControlId] = 218

PRINT(N'Update rows in [dbo].[Category]')
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 19
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 21
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 22
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 23
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 24
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 25
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 26
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 27
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 28
UPDATE [dbo].[Category] SET [CategoryGroups]='Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_CSR,Inspire_PL_HD_SS,Inspire_CNSLT_PL_HUD_Admin,Inspire_PL_MailerSheet,Inspire_PL_HD_SUP_UW_RCT,Inspire_PL_HD_Audit' WHERE [CategoryId] = 29
PRINT(N'Operation applied to 10 rows out of 10')

PRINT(N'Add rows to [dbo].[Category]')
SET IDENTITY_INSERT [dbo].[Category] ON
INSERT INTO [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime], [CategoryGroups]) VALUES (68, 'PL_SCANSHEET_AUTO', 'zScansheet Personal Lines Auto', 1, 5, '601680', '2019-11-26 14:54:00.000', '601680', '2019-12-03 12:30:00.000', 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_SS,Inspire_PL_MailerSheet')
INSERT INTO [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime], [CategoryGroups]) VALUES (69, 'PL_SCANSHEET_HO', 'zScansheet Personal Lines HO', 1, 6, '601680', '2019-11-26 15:11:00.000', '601680', '2019-12-03 12:22:00.000', 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_SS,Inspire_PL_MailerSheet')
INSERT INTO [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime], [CategoryGroups]) VALUES (70, 'PL_SCANSHEET_DW', 'zScansheet Personal Lines DW', 1, 7, '601680', '2019-11-26 15:11:00.000', '601680', '2019-12-03 12:22:00.000', 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_SS,Inspire_PL_MailerSheet')
INSERT INTO [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime], [CategoryGroups]) VALUES (71, 'PL_SCANSHEET_UMB', 'zScansheet Personal Lines UMB', 1, 8, '601680', '2019-11-26 15:11:00.000', '601680', '2019-12-03 12:30:00.000', 'Inspire_Dev_Users,Inspire_Developers,Inspire_CNSLT_PersLines,Inspire_Personal_Lines,Inspire_PL_HD_SS,Inspire_PL_MailerSheet')
SET IDENTITY_INSERT [dbo].[Category] OFF
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Add rows to [dbo].[Control]')
SET IDENTITY_INSERT [dbo].[Control] ON
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (223, '<pl-scan-sheet-dropdown></pl-scan-sheet-dropdown>', 'PlScanSheetDropdown', '601680', '2019-12-04 15:53:00.000', '601680', '2019-12-04 15:53:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (224, '<pl-scan-sheet-printer></pl-scan-sheet-printer>', 'PlScanSheetPrinter', '601680', '2019-12-04 15:53:00.000', '601680', '2019-12-04 15:53:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (225, '<pl-scan-sheet-year-dropdown></pl-scan-sheet-year-dropdown>', 'PlScanSheetYearDropdown', '601680', '2019-12-04 15:58:00.000', '601680', '2019-12-04 15:58:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (226, '<pcpa-added-pip-checkbox-list></pcpa-added-pip-checkbox-list>', 'PcpaAddedPipCheckboxList', '601680', '2019-12-05 12:22:00.000', '601680', '2019-12-05 12:22:00.000')
SET IDENTITY_INSERT [dbo].[Control] OFF
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Add row to [dbo].[LookupType]')
SET IDENTITY_INSERT [dbo].[LookupType] ON
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (17, 'InsCompany')
SET IDENTITY_INSERT [dbo].[LookupType] OFF

PRINT(N'Add rows to [dbo].[Document]')
SET IDENTITY_INSERT [dbo].[Document] ON
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1039, 69, 'PL_HO Scan Sheet', 'POLDOC  Application', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Application', '601680', '2019-11-27 09:12:00.000', '601680', '2019-11-27 09:12:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1040, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Application', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Application', '601680', '2019-11-27 09:13:00.000', '601680', '2019-11-27 09:13:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1041, 71, 'PL_UMB Scan Sheet', 'POLDOC  Application', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Application', '601680', '2019-11-27 09:15:00.000', '601680', '2019-11-27 09:15:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1042, 70, 'PL_DW Scan Sheet', 'POLDOC  Application', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Application', '601680', '2019-11-27 09:16:00.000', '601680', '2019-11-27 09:16:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1043, 70, 'PL_DW Scan Sheet', 'POLDOC  Appraisals', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Appraisals', '601680', '2019-11-27 09:16:00.000', '601680', '2019-11-27 09:16:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1044, 70, 'PL_DW Scan Sheet', 'POLDOC  Certificates of Insurance', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Certificates of Insurance', '601680', '2019-11-27 09:17:00.000', '601680', '2019-11-27 09:17:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1045, 70, 'PL_DW Scan Sheet', 'POLDOC  Correspondence', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Correspondence', '601680', '2019-11-27 09:17:00.000', '601680', '2019-11-27 09:17:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1046, 70, 'PL_DW Scan Sheet', 'POLDOC  Dec Page and Policy Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Dec Page and Policy Documents', '601680', '2019-11-27 09:18:00.000', '601680', '2019-11-27 09:18:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1047, 70, 'PL_DW Scan Sheet', 'POLDOC  Discount Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Discount Documents', '601680', '2019-11-27 09:18:00.000', '601680', '2019-11-27 09:18:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1048, 70, 'PL_DW Scan Sheet', 'POLDOC  Photos', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Photos', '601680', '2019-11-27 09:19:00.000', '601680', '2019-11-27 09:19:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1049, 70, 'PL_DW Scan Sheet', 'POLDOC  Quotation', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Quotation', '601680', '2019-11-27 09:19:00.000', '601680', '2019-11-27 09:19:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1050, 70, 'PL_DW Scan Sheet', 'POLDOC  Renewal Questionnaire', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Renewal Questionnaire', '601680', '2019-11-27 09:19:00.000', '601680', '2019-11-27 09:19:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1051, 70, 'PL_DW Scan Sheet', 'POLDOC  Underwriting', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterDwelling/PL_DW Scan Sheet.jld', 'POLDOC  Underwriting', '601680', '2019-11-27 09:20:00.000', '601680', '2019-11-27 09:20:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1052, 69, 'PL_HO Scan Sheet', 'POLDOC  Appraisals', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Appraisals', '601680', '2019-11-27 09:21:00.000', '601680', '2019-11-27 09:21:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1053, 69, 'PL_HO Scan Sheet', 'POLDOC  Certificates of Insurance', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Certificates of Insurance', '601680', '2019-11-27 09:22:00.000', '601680', '2019-11-27 09:22:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1054, 69, 'PL_HO Scan Sheet', 'POLDOC  Correspondence', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Correspondence', '601680', '2019-11-27 09:22:00.000', '601680', '2019-11-27 09:22:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1055, 69, 'PL_HO Scan Sheet', 'POLDOC  Dec Page and Policy Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Dec Page and Policy Documents', '601680', '2019-11-27 09:23:00.000', '601680', '2019-11-27 09:23:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1056, 69, 'PL_HO Scan Sheet', 'POLDOC  Discount Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Discount Documents', '601680', '2019-11-27 09:23:00.000', '601680', '2019-11-27 09:23:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1057, 69, 'PL_HO Scan Sheet', 'POLDOC  Photos', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Photos', '601680', '2019-11-27 09:24:00.000', '601680', '2019-11-27 09:24:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1058, 69, 'PL_HO Scan Sheet', 'POLDOC  Quotation', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Quotation', '601680', '2019-11-27 09:24:00.000', '601680', '2019-11-27 09:24:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1059, 69, 'PL_HO Scan Sheet', 'POLDOC  Renewal Questionnaire', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Renewal Questionnaire', '601680', '2019-11-27 09:24:00.000', '601680', '2019-11-27 09:24:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1060, 69, 'PL_HO Scan Sheet', 'POLDOC  Underwriting', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterHomeowners/PL_HO Scan Sheet.jld', 'POLDOC  Underwriting', '601680', '2019-11-27 09:25:00.000', '601680', '2019-11-27 09:25:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1061, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Underwriting', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Underwriting', '601680', '2019-11-27 09:26:00.000', '601680', '2019-11-27 09:26:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1062, 68, 'PL_AUTO Scan Sheet', 'POLDOC  CSF', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  CSF', '601680', '2019-11-27 09:26:00.000', '601680', '2019-11-27 11:00:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1063, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Certificates of Insurance', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Certificates of Insurance', '601680', '2019-11-27 09:26:00.000', '601680', '2019-11-27 09:28:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1064, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Correspondence', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Correspondence', '601680', '2019-11-27 09:29:00.000', '601680', '2019-11-27 09:29:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1065, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Dec Page and Policy Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Dec Page and Policy Documents', '601680', '2019-11-27 09:36:00.000', '601680', '2019-11-27 09:36:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1066, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Discount Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Discount Documents', '601680', '2019-11-27 09:36:00.000', '601680', '2019-11-27 09:36:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1067, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Photos', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Photos', '601680', '2019-11-27 09:37:00.000', '601680', '2019-11-27 09:37:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1068, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Quotation', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Quotation', '601680', '2019-11-27 09:37:00.000', '601680', '2019-11-27 09:37:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1069, 68, 'PL_AUTO Scan Sheet', 'POLDOC  Renewal Questionnaire', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterAuto/PL_AUTO Scan Sheet.jld', 'POLDOC  Renewal Questionnaire', '601680', '2019-11-27 09:37:00.000', '601680', '2019-11-27 09:37:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1070, 71, 'PL_UMB Scan Sheet', 'POLDOC  Renewal Questionnaire', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Renewal Questionnaire', '601680', '2019-11-27 09:48:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1071, 71, 'PL_UMB Scan Sheet', 'POLDOC  Appraisals', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Appraisals', '601680', '2019-11-27 09:49:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1072, 71, 'PL_UMB Scan Sheet', 'POLDOC  Certificates of Insurance', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Certificates of Insurance', '601680', '2019-11-27 09:49:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1073, 71, 'PL_UMB Scan Sheet', 'POLDOC  Correspondence', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Correspondence', '601680', '2019-11-27 09:49:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1074, 71, 'PL_UMB Scan Sheet', 'POLDOC  Dec Page and Policy Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Dec Page and Policy Documents', '601680', '2019-11-27 09:50:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1075, 71, 'PL_UMB Scan Sheet', 'POLDOC  Discount Documents', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Discount Documents', '601680', '2019-11-27 09:50:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1076, 71, 'PL_UMB Scan Sheet', 'POLDOC  Photos', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Photos', '601680', '2019-11-27 09:50:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1077, 71, 'PL_UMB Scan Sheet', 'POLDOC  Quotation', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Quotation', '601680', '2019-11-27 09:51:00.000', '601498', '2019-12-11 09:41:00.000')
INSERT INTO [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (1078, 71, 'PL_UMB Scan Sheet', 'POLDOC  Underwriting', 1, NULL, 'companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', 'POLDOC  Underwriting', '601680', '2019-11-27 09:51:00.000', '601498', '2019-12-11 09:41:00.000')
SET IDENTITY_INSERT [dbo].[Document] OFF
PRINT(N'Operation applied to 40 rows out of 40')

PRINT(N'Add rows to [dbo].[LookupItem]')
SET IDENTITY_INSERT [dbo].[LookupItem] ON
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (160, 'NJM Casualty Insurance Company', 'NJ Casualty', 17, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (184, 'NJM Insurance Company', 'NJM', 17, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (185, 'NJM Re-Insurance Company', 'NJMRe', 17, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (186, 'NJM Indemnity Insurance Company', 'NJ Indemnity', 17, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (168, 'NJM', 'Manufacturers Insurance', 13, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (169, 'NJC', 'Casualty Insurance', 13, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (170, 'NJI', 'Indemnity Insurance', 13, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (171, 'NJRE', 'Re-Insurance', 13, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (179, 'njm_ext', 'Manufacturers Insurance', 13, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (180, 'njc_ext', 'Casualty Insurance', 13, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (181, 'njre_ext', 'Re-Insurance', 13, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (182, 'nji_ext', 'Indemnity Insurance', 13, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (183, 'NJM Claims Management Services LLC', 'NJM Claims Management Services LLC', 13, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (184, 'MFP5', 'MFP5', 4, 25)
SET IDENTITY_INSERT [dbo].[LookupItem] OFF
PRINT(N'Operation applied to 18 rows out of 18')

PRINT(N'Add rows to [dbo].[DocumentControl]')
SET IDENTITY_INSERT [dbo].[DocumentControl] ON
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8714, 1024, 218, 8, '601680', '2019-11-20 14:08:00.000', '601680', '2019-11-20 14:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8718, 1022, 39, 3, '601680', '2019-11-20 16:25:00.000', '601680', '2019-11-20 16:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8719, 1022, 26, 4, '601680', '2019-11-20 16:25:00.000', '601680', '2019-11-20 16:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8720, 1023, 41, 2, '601680', '2019-11-21 09:17:00.000', '601680', '2019-11-21 09:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8721, 86, 30, 1, '601680', '2019-11-21 11:42:00.000', '601680', '2019-11-21 11:42:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8723, 285, 116, 8, '601680', '2019-11-22 13:58:00.000', '601680', '2019-11-22 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8724, 285, 117, 9, '601680', '2019-11-22 13:58:00.000', '601680', '2019-11-22 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8725, 285, 110, 1, '601680', '2019-11-22 13:58:00.000', '601680', '2019-11-22 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8726, 1021, 41, 3, '601680', '2019-11-22 15:13:00.000', '601680', '2019-11-22 15:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8727, 1023, 39, 3, '601680', '2019-11-26 13:07:00.000', '601680', '2019-11-26 13:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8728, 1023, 26, 4, '601680', '2019-11-26 13:07:00.000', '601680', '2019-11-26 13:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8730, 791, 159, 2, '602614', '2019-11-27 10:15:00.000', '602614', '2019-11-27 10:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8819, 812, 26, 8, '602614', '2019-12-02 14:30:00.000', '602614', '2019-12-02 14:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8820, 784, 127, 5, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8821, 784, 118, 10, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8822, 784, 115, 6, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8823, 784, 116, 8, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8824, 784, 117, 9, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8825, 784, 26, 7, '601680', '2019-12-03 17:03:00.000', '601680', '2019-12-03 17:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8827, 1042, 224, 1, '601680', '2019-12-04 16:00:00.000', '601680', '2019-12-04 16:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8828, 1042, 225, 2, '601680', '2019-12-04 16:00:00.000', '601680', '2019-12-04 16:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8829, 1043, 225, 2, '601680', '2019-12-04 16:03:00.000', '601680', '2019-12-04 16:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8830, 1043, 224, 1, '601680', '2019-12-04 16:03:00.000', '601680', '2019-12-04 16:03:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8831, 1044, 223, 3, '601680', '2019-12-04 16:11:00.000', '601680', '2019-12-04 16:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8832, 1044, 225, 2, '601680', '2019-12-04 16:11:00.000', '601680', '2019-12-04 16:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8833, 1044, 224, 1, '601680', '2019-12-04 16:11:00.000', '601680', '2019-12-04 16:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8834, 1045, 224, 1, '601680', '2019-12-04 16:12:00.000', '601680', '2019-12-04 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8835, 1045, 223, 3, '601680', '2019-12-04 16:12:00.000', '601680', '2019-12-04 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8836, 1045, 225, 2, '601680', '2019-12-04 16:12:00.000', '601680', '2019-12-04 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8837, 1046, 225, 2, '601680', '2019-12-04 16:12:00.000', '601680', '2019-12-04 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8838, 1046, 224, 1, '601680', '2019-12-04 16:12:00.000', '601680', '2019-12-04 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8839, 1047, 224, 1, '601680', '2019-12-04 16:25:00.000', '601680', '2019-12-04 16:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8840, 1047, 225, 2, '601680', '2019-12-04 16:25:00.000', '601680', '2019-12-04 16:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8841, 1048, 224, 1, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8842, 1048, 225, 2, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8843, 1049, 225, 2, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8844, 1049, 224, 1, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8845, 1050, 224, 1, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8846, 1050, 223, 3, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8847, 1050, 225, 2, '601680', '2019-12-04 16:54:00.000', '601680', '2019-12-04 16:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8848, 1051, 224, 1, '601680', '2019-12-04 16:55:00.000', '601680', '2019-12-04 16:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8849, 1051, 225, 2, '601680', '2019-12-04 16:55:00.000', '601680', '2019-12-04 16:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8850, 1051, 223, 3, '601680', '2019-12-04 16:55:00.000', '601680', '2019-12-04 16:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8851, 1039, 224, 1, '601680', '2019-12-05 09:44:00.000', '601680', '2019-12-05 09:44:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8852, 1039, 225, 2, '601680', '2019-12-05 09:44:00.000', '601680', '2019-12-05 09:44:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8853, 1052, 224, 1, '601680', '2019-12-05 09:44:00.000', '601680', '2019-12-05 09:44:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8854, 1052, 225, 2, '601680', '2019-12-05 09:44:00.000', '601680', '2019-12-05 09:44:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8855, 1053, 225, 2, '601680', '2019-12-05 09:50:00.000', '601680', '2019-12-05 09:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8856, 1053, 224, 1, '601680', '2019-12-05 09:50:00.000', '601680', '2019-12-05 09:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8857, 1053, 223, 4, '601680', '2019-12-05 09:51:00.000', '601680', '2019-12-05 09:51:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8858, 1053, 13, 5, '601680', '2019-12-05 09:51:00.000', '601680', '2019-12-05 09:51:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8859, 1054, 223, 4, '601680', '2019-12-05 09:54:00.000', '601680', '2019-12-05 09:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8860, 1054, 224, 1, '601680', '2019-12-05 09:54:00.000', '601680', '2019-12-05 09:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8861, 1054, 225, 2, '601680', '2019-12-05 09:54:00.000', '601680', '2019-12-05 09:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8862, 1044, 13, 4, '601680', '2019-12-05 09:55:00.000', '601680', '2019-12-05 09:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8863, 1055, 224, 1, '601680', '2019-12-05 10:38:00.000', '601680', '2019-12-05 10:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8864, 1055, 225, 2, '601680', '2019-12-05 10:38:00.000', '601680', '2019-12-05 10:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8865, 1056, 224, 1, '601680', '2019-12-05 10:38:00.000', '601680', '2019-12-05 10:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8866, 1056, 225, 2, '601680', '2019-12-05 10:38:00.000', '601680', '2019-12-05 10:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8867, 1057, 224, 1, '601680', '2019-12-05 10:43:00.000', '601680', '2019-12-05 10:43:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8868, 1057, 225, 2, '601680', '2019-12-05 10:43:00.000', '601680', '2019-12-05 10:43:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8869, 1058, 225, 2, '601680', '2019-12-05 10:43:00.000', '601680', '2019-12-05 10:43:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8870, 1058, 224, 1, '601680', '2019-12-05 10:43:00.000', '601680', '2019-12-05 10:43:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8871, 1059, 223, 4, '601680', '2019-12-05 10:50:00.000', '601680', '2019-12-05 10:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8872, 1059, 225, 2, '601680', '2019-12-05 10:50:00.000', '601680', '2019-12-05 10:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8873, 1059, 224, 1, '601680', '2019-12-05 10:50:00.000', '601680', '2019-12-05 10:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8874, 1060, 223, 4, '601680', '2019-12-05 11:07:00.000', '601680', '2019-12-05 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8875, 1060, 224, 1, '601680', '2019-12-05 11:07:00.000', '601680', '2019-12-05 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8876, 1060, 225, 2, '601680', '2019-12-05 11:07:00.000', '601680', '2019-12-05 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8877, 1040, 224, 1, '601680', '2019-12-05 11:11:00.000', '601680', '2019-12-05 11:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8878, 1040, 225, 2, '601680', '2019-12-05 11:11:00.000', '601680', '2019-12-05 11:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8879, 1063, 223, 3, '601680', '2019-12-05 11:14:00.000', '601680', '2019-12-05 11:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8880, 1063, 224, 1, '601680', '2019-12-05 11:14:00.000', '601680', '2019-12-05 11:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8881, 1063, 225, 2, '601680', '2019-12-05 11:14:00.000', '601680', '2019-12-05 11:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8882, 1064, 225, 2, '601680', '2019-12-05 11:16:00.000', '601680', '2019-12-05 11:16:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8883, 1064, 224, 1, '601680', '2019-12-05 11:16:00.000', '601680', '2019-12-05 11:16:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8884, 1062, 225, 2, '601680', '2019-12-05 11:17:00.000', '601680', '2019-12-05 11:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8885, 1062, 224, 1, '601680', '2019-12-05 11:17:00.000', '601680', '2019-12-05 11:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8886, 1065, 224, 1, '601680', '2019-12-05 11:17:00.000', '601680', '2019-12-05 11:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8887, 1065, 225, 2, '601680', '2019-12-05 11:17:00.000', '601680', '2019-12-05 11:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8888, 1066, 223, 3, '601680', '2019-12-05 11:18:00.000', '601680', '2019-12-05 11:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8889, 1066, 224, 1, '601680', '2019-12-05 11:18:00.000', '601680', '2019-12-05 11:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8890, 1066, 225, 2, '601680', '2019-12-05 11:18:00.000', '601680', '2019-12-05 11:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8891, 1067, 225, 2, '601680', '2019-12-05 11:19:00.000', '601680', '2019-12-05 11:19:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8892, 1067, 224, 1, '601680', '2019-12-05 11:19:00.000', '601680', '2019-12-05 11:19:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8893, 1068, 224, 1, '601680', '2019-12-05 11:22:00.000', '601680', '2019-12-05 11:22:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8894, 1068, 225, 2, '601680', '2019-12-05 11:22:00.000', '601680', '2019-12-05 11:22:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8895, 1069, 224, 1, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8896, 1069, 223, 3, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8897, 1069, 225, 2, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8898, 1061, 223, 3, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8899, 1061, 225, 2, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8900, 1061, 224, 1, '601680', '2019-12-05 11:24:00.000', '601680', '2019-12-05 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8901, 1041, 225, 2, '601680', '2019-12-05 11:25:00.000', '601680', '2019-12-05 11:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8902, 1041, 224, 1, '601680', '2019-12-05 11:25:00.000', '601680', '2019-12-05 11:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8903, 1071, 225, 2, '601680', '2019-12-05 11:28:00.000', '601680', '2019-12-05 11:28:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8904, 1071, 224, 1, '601680', '2019-12-05 11:28:00.000', '601680', '2019-12-05 11:28:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8905, 1072, 224, 1, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8906, 1072, 13, 4, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8907, 1072, 223, 3, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8908, 1072, 225, 2, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8909, 1073, 225, 2, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8910, 1073, 224, 1, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8911, 1073, 223, 3, '601680', '2019-12-05 11:29:00.000', '601680', '2019-12-05 11:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8912, 1074, 224, 1, '601680', '2019-12-05 11:31:00.000', '601680', '2019-12-05 11:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8913, 1074, 225, 2, '601680', '2019-12-05 11:31:00.000', '601680', '2019-12-05 11:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8914, 1039, 223, 3, '601680', '2019-12-05 11:35:00.000', '601680', '2019-12-05 11:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8915, 1052, 223, 3, '601680', '2019-12-05 11:35:00.000', '601680', '2019-12-05 11:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8916, 1055, 223, 3, '601680', '2019-12-05 11:35:00.000', '601680', '2019-12-05 11:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8917, 1056, 223, 3, '601680', '2019-12-05 11:35:00.000', '601680', '2019-12-05 11:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8918, 1057, 223, 3, '601680', '2019-12-05 11:35:00.000', '601680', '2019-12-05 11:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8919, 1058, 223, 3, '601680', '2019-12-05 11:37:00.000', '601680', '2019-12-05 11:37:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8920, 1075, 224, 1, '601680', '2019-12-05 11:40:00.000', '601680', '2019-12-05 11:40:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8921, 1075, 225, 2, '601680', '2019-12-05 11:40:00.000', '601680', '2019-12-05 11:40:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8922, 1076, 225, 2, '601680', '2019-12-05 11:41:00.000', '601680', '2019-12-05 11:41:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8923, 1076, 224, 1, '601680', '2019-12-05 11:41:00.000', '601680', '2019-12-05 11:41:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8924, 1077, 224, 1, '601680', '2019-12-05 11:42:00.000', '601680', '2019-12-05 11:42:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8925, 1077, 225, 2, '601680', '2019-12-05 11:42:00.000', '601680', '2019-12-05 11:42:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8926, 1070, 223, 3, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8927, 1070, 224, 1, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8928, 1070, 225, 2, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8929, 1078, 223, 3, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8930, 1078, 225, 2, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8931, 1078, 224, 1, '601680', '2019-12-05 11:46:00.000', '601680', '2019-12-05 11:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8932, 1062, 223, 3, '601680', '2019-12-05 11:47:00.000', '601680', '2019-12-05 11:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8933, 60, 25, 4, '601680', '2019-12-05 12:24:00.000', '601680', '2019-12-05 12:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8934, 60, 226, 3, '601680', '2019-12-05 12:24:00.000', '601680', '2019-12-05 12:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8935, 1063, 13, 4, '602614', '2019-12-05 13:35:00.000', '602614', '2019-12-05 13:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8937, 1064, 223, 3, '601680', '2019-12-05 14:53:00.000', '601680', '2019-12-05 14:53:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8938, 409, 116, 8, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8939, 409, 117, 9, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8940, 409, 26, 7, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8941, 409, 118, 10, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8942, 409, 115, 6, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8943, 409, 128, 5, '601680', '2019-12-05 16:15:00.000', '601680', '2019-12-05 16:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8944, 1015, 108, 1, '601680', '2019-12-06 10:27:00.000', '601680', '2019-12-06 10:27:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8945, 1025, 39, 2, '601680', '2019-12-09 14:55:00.000', '601680', '2019-12-09 14:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8946, 1025, 206, 3, '601680', '2019-12-09 14:56:00.000', '601680', '2019-12-09 14:56:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8947, 1025, 41, 4, '601680', '2019-12-09 14:56:00.000', '601680', '2019-12-09 14:56:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8948, 1025, 63, 5, '601680', '2019-12-09 14:56:00.000', '601680', '2019-12-09 14:56:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8949, 1025, 26, 6, '601680', '2019-12-09 14:56:00.000', '601680', '2019-12-09 14:56:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8950, 1026, 39, 2, '601498', '2019-12-11 10:28:00.000', '601498', '2019-12-11 10:28:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8951, 1015, 39, 2, '601498', '2019-12-11 10:31:00.000', '601498', '2019-12-11 10:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8952, 1024, 39, 2, '601498', '2019-12-11 10:33:00.000', '601498', '2019-12-11 10:33:00.000')
SET IDENTITY_INSERT [dbo].[DocumentControl] OFF
PRINT(N'Operation applied to 144 rows out of 144')

PRINT(N'Add constraints to [dbo].[DocumentControl]')

PRINT(N'Add constraints to [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]

PRINT(N'Add constraints to [dbo].[Category]')
ALTER TABLE [dbo].[Category] WITH CHECK CHECK CONSTRAINT [FK_Category_LOB]
COMMIT TRANSACTION
GO
