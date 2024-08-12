/*
Run this script on:

SQLQ14WT1\SQL16QA2.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 12/27/2019 8:15:18 AM

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

PRINT(N'Drop constraints from [dbo].[Document]')
ALTER TABLE [dbo].[Document] NOCHECK CONSTRAINT [FK_Document_Category]

PRINT(N'Drop constraints from [dbo].[Category]')
ALTER TABLE [dbo].[Category] NOCHECK CONSTRAINT [FK_Category_LOB]

PRINT(N'Delete rows from [dbo].[DocumentControl]')
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 3477
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8956
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8958
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8964
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9050
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9052
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9076
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9077
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9079
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9084
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9086
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 9119
PRINT(N'Operation applied to 12 rows out of 12')

PRINT(N'Update rows in [dbo].[Document]')
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 901
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 902
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 910
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 911
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 913
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 914
UPDATE [dbo].[Document] SET [BaseState]=NULL WHERE [DocumentId] = 1027
UPDATE [dbo].[Document] SET [DocumentFriendlyName]='Miscellaneous' WHERE [DocumentId] = 1115
PRINT(N'Operation applied to 8 rows out of 8')

PRINT(N'Update row in [dbo].[Category]')
UPDATE [dbo].[Category] SET [UpdatedDateTime]='2019-12-23 13:25:00.000' WHERE [CategoryId] = 1

PRINT(N'Add rows to [dbo].[Control]')
SET IDENTITY_INSERT [dbo].[Control] ON
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (231, '<gc-scan-sheet-clmt-exp></gc-scan-sheet-clmt-exp>', 'GcScanSheetClmtExp', '601680', '2019-12-20 09:31:00.000', '601680', '2019-12-20 09:31:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (232, '<gc-scan-sheet-assign-to-dropdown></gc-scan-sheet-assign-to-dropdown>', 'GcScanSheetAssignToDropdown', '601680', '2019-12-23 13:51:00.000', '601680', '2019-12-23 13:51:00.000')
SET IDENTITY_INSERT [dbo].[Control] OFF
PRINT(N'Operation applied to 2 rows out of 2')

PRINT(N'Add rows to [dbo].[DocumentControl]')
SET IDENTITY_INSERT [dbo].[DocumentControl] ON
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9328, 1079, 231, 2, '601680', '2019-12-20 09:31:00.000', '601680', '2019-12-20 09:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9329, 1081, 228, 3, '602614', '2019-12-23 11:00:00.000', '602614', '2019-12-23 11:00:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9330, 1080, 231, 2, '601680', '2019-12-23 11:01:00.000', '601680', '2019-12-23 11:01:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9331, 1081, 231, 2, '601680', '2019-12-23 11:02:00.000', '601680', '2019-12-23 11:02:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9332, 1082, 231, 2, '601680', '2019-12-23 11:02:00.000', '601680', '2019-12-23 11:02:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9333, 1083, 231, 2, '601680', '2019-12-23 11:02:00.000', '601680', '2019-12-23 11:02:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9334, 1084, 231, 2, '601680', '2019-12-23 11:02:00.000', '601680', '2019-12-23 11:02:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9335, 1085, 231, 2, '601680', '2019-12-23 11:02:00.000', '601680', '2019-12-23 11:02:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9336, 1087, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9337, 1088, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9338, 1089, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9339, 1090, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9340, 1091, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9341, 1092, 231, 2, '601680', '2019-12-23 11:06:00.000', '601680', '2019-12-23 11:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9342, 1093, 231, 2, '601680', '2019-12-23 11:07:00.000', '601680', '2019-12-23 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9343, 1094, 231, 2, '601680', '2019-12-23 11:07:00.000', '601680', '2019-12-23 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9344, 1095, 231, 2, '601680', '2019-12-23 11:07:00.000', '601680', '2019-12-23 11:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9345, 1096, 231, 2, '601680', '2019-12-23 11:09:00.000', '601680', '2019-12-23 11:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9346, 1097, 231, 2, '601680', '2019-12-23 11:09:00.000', '601680', '2019-12-23 11:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9347, 1116, 231, 2, '602614', '2019-12-23 11:13:00.000', '602614', '2019-12-23 11:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9348, 1098, 231, 2, '601680', '2019-12-23 11:23:00.000', '601680', '2019-12-23 11:23:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9349, 1099, 231, 2, '601680', '2019-12-23 11:24:00.000', '601680', '2019-12-23 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9350, 1100, 231, 2, '601680', '2019-12-23 11:24:00.000', '601680', '2019-12-23 11:24:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9351, 1101, 231, 2, '601680', '2019-12-23 11:30:00.000', '601680', '2019-12-23 11:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9352, 1102, 231, 2, '601680', '2019-12-23 11:30:00.000', '601680', '2019-12-23 11:30:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9353, 1103, 231, 2, '601680', '2019-12-23 11:32:00.000', '601680', '2019-12-23 11:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9354, 1104, 231, 2, '601680', '2019-12-23 11:32:00.000', '601680', '2019-12-23 11:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9355, 1105, 231, 2, '601680', '2019-12-23 11:32:00.000', '601680', '2019-12-23 11:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9356, 1106, 231, 2, '601680', '2019-12-23 11:32:00.000', '601680', '2019-12-23 11:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9357, 1107, 231, 2, '601680', '2019-12-23 11:32:00.000', '601680', '2019-12-23 11:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9358, 1108, 231, 2, '601680', '2019-12-23 11:36:00.000', '601680', '2019-12-23 11:36:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9359, 1109, 231, 2, '601680', '2019-12-23 11:36:00.000', '601680', '2019-12-23 11:36:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9360, 1110, 231, 2, '601680', '2019-12-23 11:36:00.000', '601680', '2019-12-23 11:36:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9361, 1111, 231, 2, '601680', '2019-12-23 11:37:00.000', '601680', '2019-12-23 11:37:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9362, 1112, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9363, 1114, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9364, 1115, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9365, 1119, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9366, 1120, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9367, 1121, 231, 2, '601680', '2019-12-23 11:38:00.000', '601680', '2019-12-23 11:38:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9368, 1122, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9369, 1123, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9370, 1124, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9371, 1125, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9372, 1126, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9373, 1127, 231, 2, '601680', '2019-12-23 11:39:00.000', '601680', '2019-12-23 11:39:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9374, 1128, 231, 2, '601680', '2019-12-23 11:49:00.000', '601680', '2019-12-23 11:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9375, 1129, 231, 2, '601680', '2019-12-23 11:49:00.000', '601680', '2019-12-23 11:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9376, 1130, 231, 2, '601680', '2019-12-23 11:49:00.000', '601680', '2019-12-23 11:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9377, 1131, 231, 2, '601680', '2019-12-23 11:49:00.000', '601680', '2019-12-23 11:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9378, 1132, 231, 2, '601680', '2019-12-23 11:49:00.000', '601680', '2019-12-23 11:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9379, 1133, 231, 2, '601680', '2019-12-23 11:50:00.000', '601680', '2019-12-23 11:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9380, 1134, 231, 2, '601680', '2019-12-23 11:50:00.000', '601680', '2019-12-23 11:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9381, 1135, 231, 2, '601680', '2019-12-23 12:05:00.000', '601680', '2019-12-23 12:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9382, 1136, 231, 2, '601680', '2019-12-23 12:05:00.000', '601680', '2019-12-23 12:05:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9383, 1137, 231, 2, '601680', '2019-12-23 12:06:00.000', '601680', '2019-12-23 12:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9384, 1138, 231, 2, '601680', '2019-12-23 12:06:00.000', '601680', '2019-12-23 12:06:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9385, 1139, 231, 2, '601680', '2019-12-23 12:07:00.000', '601680', '2019-12-23 12:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9386, 1140, 231, 2, '601680', '2019-12-23 12:07:00.000', '601680', '2019-12-23 12:07:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9387, 1141, 231, 2, '601680', '2019-12-23 12:09:00.000', '601680', '2019-12-23 12:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9388, 1142, 231, 2, '601680', '2019-12-23 12:09:00.000', '601680', '2019-12-23 12:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9389, 1143, 231, 2, '601680', '2019-12-23 12:09:00.000', '601680', '2019-12-23 12:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9390, 1144, 231, 2, '601680', '2019-12-23 12:09:00.000', '601680', '2019-12-23 12:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9391, 1145, 231, 2, '601680', '2019-12-23 12:09:00.000', '601680', '2019-12-23 12:09:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9392, 1146, 231, 2, '601680', '2019-12-23 12:10:00.000', '601680', '2019-12-23 12:10:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9393, 1147, 231, 2, '601680', '2019-12-23 12:10:00.000', '601680', '2019-12-23 12:10:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9394, 1148, 231, 2, '601680', '2019-12-23 12:10:00.000', '601680', '2019-12-23 12:10:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9395, 1149, 231, 2, '601680', '2019-12-23 12:11:00.000', '601680', '2019-12-23 12:11:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9396, 1150, 231, 2, '601680', '2019-12-23 12:12:00.000', '601680', '2019-12-23 12:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9397, 1151, 231, 2, '601680', '2019-12-23 12:12:00.000', '601680', '2019-12-23 12:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9398, 1152, 231, 2, '601680', '2019-12-23 12:12:00.000', '601680', '2019-12-23 12:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9399, 1153, 231, 2, '601680', '2019-12-23 12:12:00.000', '601680', '2019-12-23 12:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9400, 1154, 231, 2, '601680', '2019-12-23 12:12:00.000', '601680', '2019-12-23 12:12:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9401, 1155, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9402, 1156, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9403, 1157, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9404, 1158, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9405, 1159, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9406, 1160, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9407, 1161, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9408, 1162, 231, 2, '601680', '2019-12-23 12:13:00.000', '601680', '2019-12-23 12:13:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9409, 1163, 231, 2, '601680', '2019-12-23 12:14:00.000', '601680', '2019-12-23 12:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9410, 1164, 231, 2, '601680', '2019-12-23 12:14:00.000', '601680', '2019-12-23 12:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9411, 1165, 231, 2, '601680', '2019-12-23 12:14:00.000', '601680', '2019-12-23 12:14:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9412, 1166, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9413, 1167, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9414, 1168, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9415, 1169, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9416, 1170, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9417, 1171, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9418, 1172, 231, 2, '601680', '2019-12-23 12:15:00.000', '601680', '2019-12-23 12:15:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9419, 1173, 231, 2, '601680', '2019-12-23 12:16:00.000', '601680', '2019-12-23 12:16:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9420, 1174, 231, 2, '601680', '2019-12-23 12:16:00.000', '601680', '2019-12-23 12:16:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9421, 1175, 231, 2, '601680', '2019-12-23 12:16:00.000', '601680', '2019-12-23 12:16:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9422, 1176, 231, 2, '601680', '2019-12-23 12:17:00.000', '601680', '2019-12-23 12:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9423, 1177, 231, 2, '601680', '2019-12-23 12:17:00.000', '601680', '2019-12-23 12:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9424, 1178, 231, 2, '601680', '2019-12-23 12:17:00.000', '601680', '2019-12-23 12:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9425, 1179, 231, 2, '601680', '2019-12-23 12:17:00.000', '601680', '2019-12-23 12:17:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9426, 1180, 231, 2, '601680', '2019-12-23 12:18:00.000', '601680', '2019-12-23 12:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9427, 1181, 231, 2, '601680', '2019-12-23 12:18:00.000', '601680', '2019-12-23 12:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9428, 1182, 231, 2, '601680', '2019-12-23 12:18:00.000', '601680', '2019-12-23 12:18:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9429, 1086, 231, 2, '602614', '2019-12-23 12:28:00.000', '602614', '2019-12-23 12:28:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9430, 1086, 230, 3, '602614', '2019-12-23 12:29:00.000', '602614', '2019-12-23 12:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9431, 1086, 229, 4, '602614', '2019-12-23 12:29:00.000', '602614', '2019-12-23 12:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9432, 1086, 228, 5, '602614', '2019-12-23 12:29:00.000', '602614', '2019-12-23 12:29:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9433, 1116, 228, 4, '602614', '2019-12-23 13:49:00.000', '602614', '2019-12-23 13:49:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9434, 1144, 228, 5, '602614', '2019-12-23 13:50:00.000', '602614', '2019-12-23 13:50:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9435, 1144, 232, 4, '601680', '2019-12-23 13:52:00.000', '601680', '2019-12-23 13:52:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9436, 1116, 232, 3, '601680', '2019-12-23 13:53:00.000', '601680', '2019-12-23 13:53:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9437, 1183, 231, 2, '601680', '2019-12-23 13:53:00.000', '601680', '2019-12-23 13:53:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9438, 1184, 231, 2, '601680', '2019-12-23 13:53:00.000', '601680', '2019-12-23 13:53:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9439, 485, 26, 7, '602614', '2019-12-23 14:47:00.000', '602614', '2019-12-23 14:47:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9440, 1185, 231, 2, '601680', '2019-12-23 16:31:00.000', '601680', '2019-12-23 16:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9441, 1187, 231, 2, '601680', '2019-12-23 16:31:00.000', '601680', '2019-12-23 16:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9442, 1188, 231, 2, '601680', '2019-12-23 16:31:00.000', '601680', '2019-12-23 16:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9443, 1189, 231, 2, '601680', '2019-12-23 16:31:00.000', '601680', '2019-12-23 16:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9444, 1190, 231, 2, '601680', '2019-12-23 16:31:00.000', '601680', '2019-12-23 16:31:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9445, 1191, 231, 2, '601680', '2019-12-23 16:32:00.000', '601680', '2019-12-23 16:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9446, 1192, 231, 2, '601680', '2019-12-23 16:32:00.000', '601680', '2019-12-23 16:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9447, 1193, 231, 2, '601680', '2019-12-23 16:32:00.000', '601680', '2019-12-23 16:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9448, 1194, 231, 2, '601680', '2019-12-23 16:32:00.000', '601680', '2019-12-23 16:32:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9450, 1125, 228, 4, '602614', '2019-12-26 12:37:00.000', '602614', '2019-12-26 12:37:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9452, 1126, 228, 4, '602614', '2019-12-26 12:41:00.000', '602614', '2019-12-26 12:41:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9454, 1127, 228, 4, '602614', '2019-12-26 12:46:00.000', '602614', '2019-12-26 12:46:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9456, 1129, 228, 4, '602614', '2019-12-26 12:53:00.000', '602614', '2019-12-26 12:53:00.000')
INSERT INTO [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (9458, 1130, 228, 4, '602614', '2019-12-26 12:58:00.000', '602614', '2019-12-26 12:58:00.000')
SET IDENTITY_INSERT [dbo].[DocumentControl] OFF
PRINT(N'Operation applied to 126 rows out of 126')

PRINT(N'Add constraints to [dbo].[DocumentControl]')

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]

PRINT(N'Add constraints to [dbo].[Category]')
ALTER TABLE [dbo].[Category] WITH CHECK CHECK CONSTRAINT [FK_Category_LOB]
COMMIT TRANSACTION
GO
