/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/29/2019 10:42:54 AM

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

PRINT(N'Add row to [dbo].[LookupType]')
SET IDENTITY_INSERT [dbo].[LookupType] ON
INSERT INTO [dbo].[LookupType] ([LookupTypeID], [LookupTypeValue]) VALUES (16, 'LineOfBusiness')
SET IDENTITY_INSERT [dbo].[LookupType] OFF
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]
COMMIT TRANSACTION
GO
