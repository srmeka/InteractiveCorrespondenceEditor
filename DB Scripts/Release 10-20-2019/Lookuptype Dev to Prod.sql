/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/14/2019 10:27:57 AM

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

PRINT(N'Drop constraint FK_T_LookupItem_T_LookupType from [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] NOCHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]

PRINT(N'Add rows to [dbo].[LookupType]')
SET IDENTITY_INSERT [dbo].[LookupType] ON
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (8, 'CSFEffective')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (9, 'CSFCoverage')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (10, 'Greeting')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (11, 'Attention')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (12, 'ReItem')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (13, 'NJMCompany')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (14, 'ReSection')
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (15, 'DocumentsReferenced')
SET IDENTITY_INSERT [dbo].[LookupType] OFF
PRINT(N'Operation applied to 8 rows out of 8')
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]
COMMIT TRANSACTION
GO
