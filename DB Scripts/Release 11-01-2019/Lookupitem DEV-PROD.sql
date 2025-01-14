/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/29/2019 10:44:43 AM

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

PRINT(N'Delete rows from [dbo].[LookupItem]')
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 113
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 114
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 115
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 116
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Update row in [dbo].[LookupItem]')
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='New Policy', [LookupItemValue]='N', [LookupTypeID]=8, [LookupItemOrder]=1 WHERE [LookupItemID] = 117

PRINT(N'Add rows to [dbo].[LookupItem]')
SET IDENTITY_INSERT [dbo].[LookupItem] ON
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (25, 'HCL_India2', 'HCL_India2', 2, 6)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (28, 'HCL_India2', 'HCL_India2', 3, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (29, 'XP4250', 'XP4250', 3, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (32, 'ACLB10', 'ACLB10', 3, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (103, 'PRT_IT_CLRMFP5', 'PRT_IT_CLRMFP5', 3, 9)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (111, 'WCUBC1 ', 'WCUBC1 ', 3, 10)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (155, 'Personal Lines Underwriting', 'Personal Lines Underwriting', 16, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (156, 'Commercial Lines Underwriting', 'Commercial Lines Underwriting', 16, 2)
SET IDENTITY_INSERT [dbo].[LookupItem] OFF
PRINT(N'Operation applied to 8 rows out of 8')

PRINT(N'Add constraints to [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]
COMMIT TRANSACTION
GO
