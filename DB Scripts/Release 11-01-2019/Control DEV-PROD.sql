/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/29/2019 10:38:57 AM

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

PRINT(N'Drop constraint FK_DocumentControl_Controls from [dbo].[DocumentControl]')
ALTER TABLE [dbo].[DocumentControl] NOCHECK CONSTRAINT [FK_DocumentControl_Controls]

PRINT(N'Delete rows from [dbo].[Control]')
DELETE FROM [dbo].[Control] WHERE [ControlId] = 114
DELETE FROM [dbo].[Control] WHERE [ControlId] = 172
DELETE FROM [dbo].[Control] WHERE [ControlId] = 187
DELETE FROM [dbo].[Control] WHERE [ControlId] = 188
PRINT(N'Operation applied to 4 rows out of 4')

PRINT(N'Add rows to [dbo].[Control]')
SET IDENTITY_INSERT [dbo].[Control] ON
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (200, '<gc-report-checkbox-list></gc-report-checkbox-list>', 'GcReportCheckboxList', '601680', '2019-10-15 10:08:00.000', '601680', '2019-10-15 10:08:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (201, '<gc-operator-checkbox-list></gc-operator-checkbox-list>', 'GcOperatorCheckboxList', '601680', '2019-10-15 10:09:00.000', '601680', '2019-10-15 10:09:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (202, '<gc-risk-checkbox-lst></gc-risk-checkbox-lst>', 'GcRiskCheckboxLst', '601680', '2019-10-15 11:41:00.000', '601680', '2019-10-15 11:41:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (203, '<gc-delete-coverage-checkbox-lst></gc-delete-coverage-checkbox-lst>', 'GcDeleteCoverageCheckboxLst', '601680', '2019-10-15 11:41:00.000', '601680', '2019-10-15 11:41:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (204, '<gc-claimant-nm-one-dropdown></gc-claimant-nm-one-dropdown>', 'GcClaimantNmOneDropdown', '601680', '2019-10-15 14:44:00.000', '601680', '2019-10-15 14:44:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (206, '<pcpa-ct-notice-of-nonrenew-dropdown></pcpa-ct-notice-of-nonrenew-dropdown>', 'PcpaCtNoticeOfNonrenewDropdown', '601680', '2019-10-17 11:24:00.000', '601680', '2019-10-17 11:24:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (208, '<pcpa-ct-midterm-cancel-reason-dropdown></pcpa-ct-midterm-cancel-reason-dropdown>', 'PcpaCtMidtermCancelReasonDropdown', '601680', '2019-10-17 11:26:00.000', '601680', '2019-10-17 11:26:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (209, '<pcumb-auto-driving-rec-repeaterw-checkbox></pcumb-auto-driving-rec-repeaterw-checkbox>', 'PcumbAutoDrivingRecRepeaterwCheckbox', '601680', '2019-10-17 11:27:00.000', '601680', '2019-10-17 11:27:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (210, '<gc-primary-addressee-dropdown></gc-primary-addressee-dropdown>', 'GcPrimaryAddresseeDropdown', '601680', '2019-10-17 14:24:00.000', '601680', '2019-10-17 14:24:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (211, '<wcc-law-firm-dropdown></wcc-law-firm-dropdown>', 'WccLawFirmDropdown', '601680', '2019-10-17 14:41:00.000', '601680', '2019-10-17 14:41:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (212, '<wcc-claimant-dependent-dropdown></wcc-claimant-dependent-dropdown>', 'WccClaimantDependentDropdown', '601680', '2019-10-18 09:27:00.000', '601680', '2019-10-18 09:27:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (213, '<wcc-guardian-name-dropdown></wcc-guardian-name-dropdown>', 'WccGuardianNameDropdown', '601680', '2019-10-18 09:27:00.000', '601680', '2019-10-18 09:27:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (214, '<wcc-surgical-checkbox-lst></wcc-surgical-checkbox-lst>', 'WccSurgicalCheckboxLst', '601680', '2019-10-18 16:23:00.000', '601680', '2019-10-18 16:23:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (215, '<wcc-dme-checkbox-lstw-status></wcc-dme-checkbox-lstw-status>', 'WccDmeCheckboxLstwStatus', '601680', '2019-10-18 16:24:00.000', '601680', '2019-10-18 16:24:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (216, '<wcc-hospital-nm-and-address></wcc-hospital-nm-and-address>', 'WccHospitalNmAndAddress', '601680', '2019-10-21 16:19:00.000', '601680', '2019-10-21 16:19:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (217, '<wcc-witness-name-dropdown></wcc-witness-name-dropdown>', 'WccWitnessNameDropdown', '601680', '2019-10-21 16:19:00.000', '601680', '2019-10-21 16:19:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (218, '<pcpa-garage-loc-checkboxw-checkboxlst></pcpa-garage-loc-checkboxw-checkboxlst>', 'PcpaGarageLocCheckboxwCheckboxlst', '601680', '2019-10-22 11:22:00.000', '601680', '2019-10-22 11:22:00.000')
INSERT INTO [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (219, '<wcc-check-amount-fields></wcc-check-amount-fields>', 'WccCheckAmountFields', '601680', '2019-10-28 11:05:00.000', '601680', '2019-10-28 11:05:00.000')
SET IDENTITY_INSERT [dbo].[Control] OFF
PRINT(N'Operation applied to 18 rows out of 18')
ALTER TABLE [dbo].[DocumentControl] WITH CHECK CHECK CONSTRAINT [FK_DocumentControl_Controls]
COMMIT TRANSACTION
GO
