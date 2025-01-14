/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/14/2019 10:31:31 AM

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

PRINT(N'Drop constraints from [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] NOCHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]

PRINT(N'Add rows to [dbo].[LookupItem]')
SET IDENTITY_INSERT [dbo].[LookupItem] ON
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (118, 'Mid-Term Change', 'M', 8, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (119, 'Renewal Change', 'R', 8, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (121, 'NJM', 'NJM', 9, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (122, 'Health Insurance', 'Health Insurance', 9, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (123, 'Limitation on Lawsuit', 'Limitation on Lawsuit', 9, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (125, 'No Limitation on Lawsuit', 'No Limitation on Lawsuit', 9, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (126, 'None', '', 10, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (127, 'Mr.', 'Mr.', 10, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (128, 'Mrs.', 'Mrs.', 10, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (129, 'Ms.', 'Ms.', 10, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (130, 'Dr.', 'Dr.', 10, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (131, 'Attn:', 'Attn:', 11, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (132, 'c/o', 'c/o', 11, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (133, 'Your Claim No:', 'Your Claim No:', 12, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (134, 'Your Policy No:', 'Your Policy No:', 12, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (135, 'Your Insured:', 'Your Insured:', 12, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (136, 'Your Client:', 'Your Client:', 12, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (137, 'Case Caption:', 'Case Caption:', 12, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (138, 'NJM Insurance Company', 'Manufacturers Insurance', 13, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (139, 'NJM Re-Insurance Company', 'Re-Insurance', 13, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (140, 'NJM Indemnity Insurance Company', 'Indemnity Insurance', 13, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (141, 'NJM Casualty Insurance Company', 'Casualty Insurance', 13, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (142, 'Claim Petition Number', 'Claim Petition Number', 14, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (143, 'State ID Number', 'State ID Number', 14, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (144, 'Docket Number', 'Docket Number', 14, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (145, 'Listing Date', 'Listing Date', 14, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (146, 'NY WCB Number', 'NY WCB Number', 14, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (147, 'AMA', 'AMA', 15, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (148, 'AAOS', 'AAOS', 15, 2)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (149, 'NJ Fee Schedule guidelines', 'NJ Fee Schedule guidelines', 15, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (150, 'Coding Companion', 'Coding Companion', 15, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (151, 'Physician’s Fee Reference', 'Physician’s Fee Reference', 15, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (152, 'RedBook PFR', 'RedBook PFR', 15, 6)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (153, 'Your File No:', 'Your File No:', 12, 6)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (154, 'Date(s) of Service:', 'Date(s) of Service:', 12, 7)
SET IDENTITY_INSERT [dbo].[LookupItem] OFF
PRINT(N'Operation applied to 35 rows out of 41')

PRINT(N'Add constraints to [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]
COMMIT TRANSACTION
GO
