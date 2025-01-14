/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLU14WT1\SQL16UAT2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 3/13/2020 8:40:52 AM

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

PRINT(N'Delete rows from [dbo].[DocumentControl]')
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3134
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3136
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3138
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3141
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3142
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 7187
PRINT(N'Operation applied to 6 rows out of 6')

PRINT(N'Add rows to [dbo].[DocumentControl]')
SET IDENTITY_INSERT [dbo].[DocumentControl] ON
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9759, 1294, 11, 3, 'SD7934', '2020-02-03 10:25:00.000', 'SD7934', '2020-02-03 10:25:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9761, 1296, 3, 2, '601680', '2020-02-03 10:51:00.000', '601680', '2020-02-03 10:51:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9763, 1297, 3, 2, '601680', '2020-02-03 10:54:00.000', '601680', '2020-02-03 10:54:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9764, 1296, 6, 1, '601680', '2020-02-03 11:06:00.000', '601680', '2020-02-03 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9784, 838, 118, 6, '601680', '2020-02-10 09:22:00.000', '601680', '2020-02-10 09:22:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9786, 874, 118, 5, '601680', '2020-02-10 09:27:00.000', '601680', '2020-02-10 09:27:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9787, 512, 118, 6, '601680', '2020-02-10 09:28:00.000', '601680', '2020-02-10 09:28:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9788, 883, 118, 6, '601680', '2020-02-10 09:30:00.000', '601680', '2020-02-10 09:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9789, 884, 118, 6, '601680', '2020-02-10 09:30:00.000', '601680', '2020-02-10 09:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9790, 888, 118, 5, '601680', '2020-02-10 09:31:00.000', '601680', '2020-02-10 09:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9791, 1196, 118, 6, '601680', '2020-02-10 09:31:00.000', '601680', '2020-02-10 09:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9792, 1197, 118, 6, '601680', '2020-02-10 09:31:00.000', '601680', '2020-02-10 09:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9793, 1198, 118, 5, '601680', '2020-02-10 09:32:00.000', '601680', '2020-02-10 09:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9794, 910, 118, 5, '601680', '2020-02-10 09:32:00.000', '601680', '2020-02-10 09:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9795, 1199, 118, 5, '601680', '2020-02-10 09:34:00.000', '601680', '2020-02-10 09:34:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9796, 1200, 118, 5, '601680', '2020-02-10 09:34:00.000', '601680', '2020-02-10 09:34:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9797, 921, 118, 5, '601680', '2020-02-10 09:34:00.000', '601680', '2020-02-10 09:34:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9798, 1002, 118, 7, '601680', '2020-02-10 09:35:00.000', '601680', '2020-02-10 09:35:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9799, 857, 118, 5, '601680', '2020-02-10 09:36:00.000', '601680', '2020-02-10 09:36:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9800, 576, 118, 6, '601680', '2020-02-10 09:37:00.000', '601680', '2020-02-10 09:37:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9801, 918, 118, 5, '601680', '2020-02-10 09:38:00.000', '601680', '2020-02-10 09:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9802, 919, 118, 5, '601680', '2020-02-10 09:38:00.000', '601680', '2020-02-10 09:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9803, 823, 127, 5, '601680', '2020-02-13 14:31:00.000', '601680', '2020-02-13 14:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9804, 448, 117, 8, '601680', '2020-02-27 09:05:00.000', '601680', '2020-02-27 09:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9805, 448, 116, 7, '601680', '2020-02-27 09:05:00.000', '601680', '2020-02-27 09:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9806, 448, 115, 5, '601680', '2020-02-27 09:05:00.000', '601680', '2020-02-27 09:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9807, 448, 26, 6, '601680', '2020-02-27 09:05:00.000', '601680', '2020-02-27 09:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9808, 448, 118, 9, '601680', '2020-02-27 09:05:00.000', '601680', '2020-02-27 09:05:00.000')
SET IDENTITY_INSERT [dbo].[DocumentControl] OFF
PRINT(N'Operation applied to 37 rows out of 37')

PRINT(N'Add constraints to [dbo].[DocumentControl]')
COMMIT TRANSACTION
GO
