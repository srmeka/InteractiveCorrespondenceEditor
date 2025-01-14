/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/14/2019 9:33:57 AM

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

PRINT(N'Drop constraints from [dbo].[LOB]')
ALTER TABLE [dbo].[LOB] NOCHECK CONSTRAINT [FK_LOB_LOB]

PRINT(N'Drop constraint FK_Category_LOB from [dbo].[Category]')
ALTER TABLE [dbo].[Category] NOCHECK CONSTRAINT [FK_Category_LOB]

PRINT(N'Update row in [dbo].[LOB]')
UPDATE [dbo].[LOB] SET [LOBName]='PC-PA' WHERE [LOBId] = 5

PRINT(N'Add rows to [dbo].[LOB]')
SET IDENTITY_INSERT [dbo].[LOB] ON
INSERT INTO [dbo].[LOB] ([LOBId], [LOBName]) VALUES (6, 'PC-HO')
INSERT INTO [dbo].[LOB] ([LOBId], [LOBName]) VALUES (7, 'PC-DW')
INSERT INTO [dbo].[LOB] ([LOBId], [LOBName]) VALUES (8, 'PC-UMB')
INSERT INTO [dbo].[LOB] ([LOBId], [LOBName]) VALUES (9, 'GC')
INSERT INTO [dbo].[LOB] ([LOBId], [LOBName]) VALUES (10, 'WCC')
SET IDENTITY_INSERT [dbo].[LOB] OFF
PRINT(N'Operation applied to 5 rows out of 5')

PRINT(N'Add constraints to [dbo].[LOB]')
ALTER TABLE [dbo].[LOB] WITH CHECK CHECK CONSTRAINT [FK_LOB_LOB]
ALTER TABLE [dbo].[Category] WITH CHECK CHECK CONSTRAINT [FK_Category_LOB]
COMMIT TRANSACTION
GO
