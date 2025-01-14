/*
Run this script on:

SQLQ14WT1\SQL16QA2.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 11/20/2019 2:00:23 PM

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
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 596
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 608
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3557
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3558
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3560
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3561
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3562
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3564
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 4658
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 4659
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 4661
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 4664
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5011
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5012
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5489
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5698
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6684
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6686
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6687
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 6688
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8401
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8434
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8435
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8440
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8442
PRINT(N'Operation applied to 25 rows out of 25')

PRINT(N'Update row in [dbo].[DocumentControl]')
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=4 WHERE [DocumentControlId] = 7286

PRINT(N'Add rows to [dbo].[DocumentControl]')
SET IDENTITY_INSERT [dbo].[DocumentControl] ON
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8608, 1030, 117, 8, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8609, 1030, 141, 3, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8610, 1030, 140, 2, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8611, 1030, 142, 5, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8612, 1030, 26, 6, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8613, 1030, 118, 9, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8614, 1030, 220, 1, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8615, 1030, 180, 7, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8616, 1030, 181, 4, 'JJ3999', '2019-10-30 13:47:00.000', 'JJ3999', '2019-10-30 13:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8617, 1031, 117, 8, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8618, 1031, 26, 6, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8619, 1031, 118, 9, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8620, 1031, 220, 1, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8621, 1031, 141, 3, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8622, 1031, 140, 2, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8623, 1031, 142, 5, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8624, 1031, 180, 7, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8625, 1031, 181, 4, 'JJ3999', '2019-10-30 13:58:00.000', 'JJ3999', '2019-10-30 13:58:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8626, 1033, 117, 8, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8627, 1033, 118, 9, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8628, 1033, 26, 6, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8629, 1033, 140, 2, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8630, 1033, 142, 5, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8631, 1033, 220, 1, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8632, 1033, 141, 3, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8633, 1033, 181, 4, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8634, 1033, 180, 7, 'JJ3999', '2019-10-30 14:00:00.000', 'JJ3999', '2019-10-30 14:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8635, 980, 180, 6, '601680', '2019-10-31 12:04:00.000', '601680', '2019-10-31 12:04:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8636, 980, 117, 7, '601680', '2019-10-31 12:04:00.000', '601680', '2019-10-31 12:04:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8637, 980, 221, 4, '601680', '2019-10-31 12:04:00.000', '601680', '2019-10-31 12:04:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8638, 980, 26, 5, '601680', '2019-10-31 12:04:00.000', '601680', '2019-10-31 12:04:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8639, 1034, 127, 5, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8640, 1034, 110, 1, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8641, 1034, 111, 2, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8642, 1034, 118, 10, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8643, 1034, 117, 9, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8645, 1034, 112, 3, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8646, 1034, 26, 7, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8647, 1034, 113, 4, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8648, 1034, 116, 8, '601680', '2019-11-05 16:12:00.000', '601680', '2019-11-05 16:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8649, 1035, 117, 8, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8650, 1035, 116, 7, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8651, 1035, 118, 9, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8652, 1035, 112, 3, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8653, 1035, 115, 5, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8654, 1035, 111, 2, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8655, 1035, 110, 1, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8656, 1035, 26, 6, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8657, 1035, 113, 4, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8658, 1034, 115, 6, '601680', '2019-11-05 17:05:00.000', '601680', '2019-11-05 17:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8659, 1036, 115, 5, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8660, 1036, 112, 3, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8661, 1036, 111, 2, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8662, 1036, 116, 8, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8663, 1036, 117, 7, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8664, 1036, 118, 9, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8665, 1036, 110, 1, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8666, 1036, 113, 4, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8667, 1036, 26, 6, '601680', '2019-11-05 17:07:00.000', '601680', '2019-11-05 17:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8668, 1037, 118, 10, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8669, 1037, 117, 9, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8670, 1037, 127, 5, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8671, 1037, 111, 2, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8672, 1037, 112, 3, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8673, 1037, 115, 6, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8674, 1037, 110, 1, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8675, 1037, 116, 8, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8676, 1037, 113, 4, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8677, 1037, 26, 7, '601680', '2019-11-05 17:09:00.000', '601680', '2019-11-05 17:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8678, 1038, 118, 11, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8679, 1038, 115, 7, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8680, 1038, 117, 10, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8681, 1038, 110, 1, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8682, 1038, 116, 9, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8683, 1038, 112, 3, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8684, 1038, 111, 2, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8685, 1038, 127, 6, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8686, 1038, 26, 8, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8687, 1038, 113, 4, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8688, 1038, 123, 5, '601680', '2019-11-05 17:11:00.000', '601680', '2019-11-05 17:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8689, 496, 116, 9, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8690, 496, 117, 10, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8691, 496, 118, 11, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8692, 496, 222, 5, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8693, 496, 138, 6, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8694, 496, 115, 7, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8695, 496, 26, 8, '601680', '2019-11-11 17:08:00.000', '601680', '2019-11-11 17:08:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8696, 106, 25, 3, 'MB1412', '2019-11-12 09:55:00.000', 'MB1412', '2019-11-12 09:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8697, 108, 25, 3, 'MB1412', '2019-11-12 09:55:00.000', 'MB1412', '2019-11-12 09:55:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8698, 1029, 27, 5, 'MB1412', '2019-11-12 09:57:00.000', 'MB1412', '2019-11-12 09:57:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8699, 1029, 28, 6, 'MB1412', '2019-11-12 09:57:00.000', 'MB1412', '2019-11-12 09:57:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8700, 847, 118, 9, '601680', '2019-11-18 10:29:00.000', '601680', '2019-11-18 10:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8701, 847, 26, 6, '601680', '2019-11-18 10:29:00.000', '601680', '2019-11-18 10:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8702, 847, 117, 8, '601680', '2019-11-18 10:29:00.000', '601680', '2019-11-18 10:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8703, 847, 154, 5, '601680', '2019-11-18 10:29:00.000', '601680', '2019-11-18 10:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8704, 847, 180, 7, '601680', '2019-11-18 10:29:00.000', '601680', '2019-11-18 10:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8705, 1010, 28, 6, '601680', '2019-11-19 15:12:00.000', '601680', '2019-11-19 15:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8706, 1010, 32, 2, '601680', '2019-11-19 15:12:00.000', '601680', '2019-11-19 15:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8707, 1010, 27, 5, '601680', '2019-11-19 15:12:00.000', '601680', '2019-11-19 15:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8708, 1010, 25, 3, '601680', '2019-11-19 15:12:00.000', '601680', '2019-11-19 15:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8709, 1010, 26, 4, '601680', '2019-11-19 15:12:00.000', '601680', '2019-11-19 15:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8712, 1024, 26, 8, '601680', '2019-11-20 12:30:00.000', '601680', '2019-11-20 12:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (8713, 1024, 218, 7, '601680', '2019-11-20 12:30:00.000', '601680', '2019-11-20 12:30:00.000')
SET IDENTITY_INSERT [dbo].[DocumentControl] OFF
PRINT(N'Operation applied to 103 rows out of 103')

PRINT(N'Add constraints to [dbo].[DocumentControl]')
COMMIT TRANSACTION
GO
