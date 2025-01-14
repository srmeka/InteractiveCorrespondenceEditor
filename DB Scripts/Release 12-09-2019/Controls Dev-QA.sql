/*
Run this script on:

SQLQ14WT1\SQL16QA2.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 11/20/2019 1:32:27 PM

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

PRINT(N'Delete row from [dbo].[Control]')
DELETE FROM [dbo].[Control] WHERE [ControlId] = 209

PRINT(N'Update rows in [dbo].[Control]')
UPDATE [dbo].[Control] SET [ControlDescription]='<plbc-act-stmt-addressee-one-two-nt-required></plbc-act-stmt-addressee-one-two-nt-required>', [CreatedDateTime]='2019-11-14 08:41:00.000', [UpdatedBy]='MB1412', [UpdatedDateTime]='2019-11-14 08:41:00.000' WHERE [ControlId] = 6
UPDATE [dbo].[Control] SET [ControlDescription]='<gc-addressee-oneand-two></gc-addressee-oneand-two>', [CreatedDateTime]='2019-10-31 15:37:00.000', [UpdatedDateTime]='2019-10-31 15:37:00.000' WHERE [ControlId] = 159
PRINT(N'Operation applied to 2 rows out of 2')

PRINT(N'Add rows to [dbo].[Control]')
SET IDENTITY_INSERT [dbo].[Control] ON
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (220, '<wcc-doctype-dropdown></wcc-doctype-dropdown>', 'WccDoctypeDropdown', '601680', '2019-10-30 13:45:00.000', '601680', '2019-10-30 13:45:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (221, '<wcc-info-for-addtl-treatment-and-other></wcc-info-for-addtl-treatment-and-other>', 'WccInfoForAddtlTreatmentAndOther', '601680', '2019-10-31 12:03:00.000', '601680', '2019-10-31 12:03:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (222, '<gc-overpayment-reason-and-other></gc-overpayment-reason-and-other>', 'GcOverpaymentReasonAndOther', '601680', '2019-11-11 17:07:00.000', '601680', '2019-11-11 17:07:00.000')
SET IDENTITY_INSERT [dbo].[Control] OFF
PRINT(N'Operation applied to 3 rows out of 3')
COMMIT TRANSACTION
GO
