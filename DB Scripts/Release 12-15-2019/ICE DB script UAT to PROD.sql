/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLU14WT1\SQL16UAT2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 12/19/2019 2:35:36 PM

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

PRINT(N'Delete rows from [dbo].[DocumentControl]')
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 408
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2798
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2799
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2801
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2803
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 2805
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 5112
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8358
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8598
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8599
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8600
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8601
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8731
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8732
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8733
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8734
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8735
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8736
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8737
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8738
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8739
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8740
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8741
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8742
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8743
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8744
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8745
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8746
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8747
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8748
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8749
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8750
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8751
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8752
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8753
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8754
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8755
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8756
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8757
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8758
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8759
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8760
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8761
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8762
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8763
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8764
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8765
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8766
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8767
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8768
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8769
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8770
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8771
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8772
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8773
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8774
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8775
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8776
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8777
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8778
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8779
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8780
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8781
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8782
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8783
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8784
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8785
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8786
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8787
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8788
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8789
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8790
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8791
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8792
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8793
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8794
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8795
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8796
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8797
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8798
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8799
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8800
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8801
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8802
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8803
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8804
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8805
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8806
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8807
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8808
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8809
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8810
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8811
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8812
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8813
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8814
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8815
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8816
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8817
DELETE FROM [dbo].[DocumentControl] WHERE [DocumentControlId] = 8818
PRINT(N'Operation applied to 100 rows out of 100')

PRINT(N'Delete rows from [dbo].[LookupItem]')
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 185
DELETE FROM [dbo].[LookupItem] WHERE [LookupItemID] = 186
PRINT(N'Operation applied to 2 rows out of 2')

PRINT(N'Update rows in [dbo].[DocumentControl]')
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8359
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=6 WHERE [DocumentControlId] = 8436
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8437
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=5 WHERE [DocumentControlId] = 8439
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=4 WHERE [DocumentControlId] = 8441
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=7 WHERE [DocumentControlId] = 8443
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=3 WHERE [DocumentControlId] = 8595
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=9 WHERE [DocumentControlId] = 8712
UPDATE [dbo].[DocumentControl] SET [ControlOrder]=8 WHERE [DocumentControlId] = 8714
PRINT(N'Operation applied to 9 rows out of 9')

PRINT(N'Update rows in [dbo].[LookupItem]')
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Insurance Company', [LookupItemValue]='NJM', [LookupTypeID]=17, [LookupItemOrder]=1 WHERE [LookupItemID] = 157
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Re-Insurance Company', [LookupItemValue]='NJRe', [LookupTypeID]=17, [LookupItemOrder]=2 WHERE [LookupItemID] = 158
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='NJM Indemnity Insurance Company', [LookupItemValue]='NJ Indemnity', [LookupTypeID]=17, [LookupItemOrder]=3 WHERE [LookupItemID] = 159
UPDATE [dbo].[LookupItem] SET [LookupItemCode]='MFP5', [LookupItemValue]='MFP5', [LookupTypeID]=4, [LookupItemOrder]=25 WHERE [LookupItemID] = 184
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Update rows in [dbo].[Document]')
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
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1034
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1035
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1036
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1037
UPDATE [dbo].[Document] SET [BaseState]=NULL, [UpdatedDateTime]='2019-12-06 14:52:00.000' WHERE [DocumentId] = 1038
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1070
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1071
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1072
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1073
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1074
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1075
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1076
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1077
UPDATE [dbo].[Document] SET [JldFilePath]='companyRoot:S:Production://Templates/PolicyCenterUmbrella/PL_UMB Scan Sheet.jld', [UpdatedBy]='601498', [UpdatedDateTime]='2019-12-11 09:41:00.000' WHERE [DocumentId] = 1078
PRINT(N'Operation applied to 41 rows out of 41')

PRINT(N'Add rows to [dbo].[Control]')
SET IDENTITY_INSERT [dbo].[Control] ON
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (223, '<pl-scan-sheet-dropdown></pl-scan-sheet-dropdown>', 'PlScanSheetDropdown', '601680', '2019-12-04 15:53:00.000', '601680', '2019-12-04 15:53:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (224, '<pl-scan-sheet-printer></pl-scan-sheet-printer>', 'PlScanSheetPrinter', '601680', '2019-12-04 15:53:00.000', '601680', '2019-12-04 15:53:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (225, '<pl-scan-sheet-year-dropdown></pl-scan-sheet-year-dropdown>', 'PlScanSheetYearDropdown', '601680', '2019-12-04 15:58:00.000', '601680', '2019-12-04 15:58:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (226, '<pcpa-added-pip-checkbox-list></pcpa-added-pip-checkbox-list>', 'PcpaAddedPipCheckboxList', '601680', '2019-12-05 12:22:00.000', '601680', '2019-12-05 12:22:00.000')
SET IDENTITY_INSERT [dbo].[Control] OFF
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Add rows to [dbo].[LookupItem]')
SET IDENTITY_INSERT [dbo].[LookupItem] ON
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (28, 'HCL_India2', 'HCL_India2', 3, 3)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (29, 'XP4250', 'XP4250', 3, 4)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (31, 'Archive Only', 'Archive Only', 3, 1)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (32, 'ACLB10', 'ACLB10', 3, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (49, 'ACLB9', 'ACLB9', 4, 5)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (103, 'PRT_IT_CLRMFP5', 'PRT_IT_CLRMFP5', 3, 9)
INSERT INTO [dbo].[LookupItem] ([LookupItemID], [LookupItemCode], [LookupItemValue], [LookupTypeID], [LookupItemOrder]) VALUES (111, 'WCUBC1 ', 'WCUBC1 ', 3, 10)
SET IDENTITY_INSERT [dbo].[LookupItem] OFF
PRINT(N'Operation applied to 7 rows out of 7')

PRINT(N'Add rows to [dbo].[DocumentControl]')
SET IDENTITY_INSERT [dbo].[DocumentControl] ON
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
PRINT(N'Operation applied to 125 rows out of 125')

PRINT(N'Add constraints to [dbo].[DocumentControl]')

PRINT(N'Add constraints to [dbo].[LookupItem]')
ALTER TABLE [dbo].[LookupItem] WITH CHECK CHECK CONSTRAINT [FK_T_LookupItem_T_LookupType]

PRINT(N'Add constraints to [dbo].[Document]')
ALTER TABLE [dbo].[Document] WITH CHECK CHECK CONSTRAINT [FK_Document_Category]
COMMIT TRANSACTION
GO
