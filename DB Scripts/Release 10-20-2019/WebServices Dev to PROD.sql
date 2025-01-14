/*
Run this script on:

SQLP20AGBUS7,57363.ICE    -  This database will be modified

to synchronize it with:

SQLD14WT1\SQL16DEV2.ICE

You are recommended to back up your database before running this script

Script created by SQL Data Compare version 12.3.3.4490 from Red Gate Software Ltd at 10/14/2019 12:00:01 PM

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

PRINT(N'Drop constraints from [dbo].[WebServices]')
ALTER TABLE [dbo].[WebServices] NOCHECK CONSTRAINT [FK_WebServices_Region]

PRINT(N'Add rows to [dbo].[WebServices]')
SET IDENTITY_INSERT [dbo].[WebServices] ON
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (65, 10, 'PC-CA', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:8448/PolicyDataService/CAPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (66, 10, 'PC-CGL', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:8453/PolicyDataService/CGLPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (67, NULL, 'PC-PA', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (68, NULL, 'PC-PA', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (69, 1, 'PC-PA', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3026/PAPolicyInformationRetrieverWeb/sca/PAPolicyInformationRetrieverEnhancer')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (70, 3, 'PC-PA', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:3026/PAPolicyInformationRetrieverWeb/sca/PAPolicyInformationRetrieverEnhancer')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (71, NULL, 'PC-PA', 'QA', 'InteractiveURL', 'Interactive_URL', 'https://inspireqaint.njmgroup.com/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (72, NULL, 'PC-PA', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (73, NULL, 'PC-HO', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (74, NULL, 'PC-HO', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (75, 1, 'PC-HO', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:3036/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (76, 1, 'PC-DW', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:3036/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (77, NULL, 'PC-DW', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (78, NULL, 'PC-DW', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (79, 1, 'PC-UMB', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:3039/PolicyDataService/UMCorrespondenceData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (80, NULL, 'PC-UMB', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (81, NULL, 'PC-UMB', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (82, NULL, 'PC-HO', 'QA', 'InteractiveURL', 'Interactive_URL', 'https://inspireqaint.njmgroup.com/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (83, NULL, 'PC-HO', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (84, 3, 'PC-HO', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5122/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (85, NULL, 'PC-DW', 'QA', 'InteractiveURL', 'Interactive_URL', 'https://inspireqaint.njmgroup.com/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (86, NULL, 'PC-DW', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (87, 3, 'PC-DW', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5122/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (88, NULL, 'PC-UMB', 'QA', 'InteractiveURL', 'Interactive_URL', 'https://inspireqaint.njmgroup.com/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (89, NULL, 'PC-UMB', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (90, 3, 'PC-UMB', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5122/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (91, NULL, 'PC-DW', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (92, 3, 'PC-DW', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5122/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (93, NULL, 'PC-UMB', 'QA', 'InteractiveURL', 'Interactive_URL', 'https://inspireqaint.njmgroup.com/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (94, NULL, 'PC-UMB', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (95, 3, 'PC-UMB', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5122/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (96, 11, 'PC-PA', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3026/PAPolicyInformationRetrieverWeb/sca/PAPolicyInformationRetrieverEnhancer')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (97, NULL, 'PC-PA', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (98, NULL, 'PC-PA', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (99, 12, 'BC-PA', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:7469/WCUBillingDataServiceWeb/sca/WCUBillingDataService')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (100, NULL, 'GC', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewGCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (101, NULL, 'GC', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (102, 15, 'GC', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:5407/XpCCCorrGCWeb/sca/DocumentDataRepository')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (103, NULL, 'GC', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewGCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (104, NULL, 'GC', 'QA', 'InteractiveURL', 'Interactive_URL', 'http://inspireqaint.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (105, 9, 'GC', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:5407/XpCCCorrGCWeb/sca/DocumentDataRepository')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (106, NULL, 'GC', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewGCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (107, NULL, 'GC', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (108, 11, 'GC', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:5407/XpCCCorrGCWeb/sca/DocumentDataRepository')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (109, 16, 'BC-WCU', 'Dev', 'ClaimsURL', 'ESB_URL', 'http://172.25.7.17:8469/WCUBillingDataServiceWeb/sca/WCUBillingDataService')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (110, 11, 'PC-HO', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3012/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (111, NULL, 'PC-HO', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (112, NULL, 'PC-HO', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (113, 11, 'PC-DW', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3012/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (114, NULL, 'PC-DW', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (115, NULL, 'PC-DW', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (116, 11, 'PC-UMB', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3013/PolicyDataService/UMCorrespondenceData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (117, NULL, 'PC-UMB', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (118, NULL, 'PC-UMB', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (119, NULL, 'WCC', 'DEV', 'SampleURL', 'Sample_URL', 'http://inspiredwt1:30600/rest/api/submit-job/PreviewWCCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (120, NULL, 'WCC', 'DEV', 'InteractiveURL', 'Interactive_URL', 'http://inspiredwt1.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (121, 17, 'WCC', 'DEV', 'ClaimsURL', 'ESB_URL', 'http://esbd.njmgroup.com:8001/XpCorrESBWeb/sca/GetCorrData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (122, NULL, 'WCC', 'QA', 'SampleURL', 'Sample_URL', 'http://inspireqa:30600/rest/api/submit-job/PreviewWCCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (123, NULL, 'WCC', 'QA', 'InteractiveURL', 'Interactive_URL', 'http://inspireqaint.njmgroup.com:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (124, 18, 'WCC', 'QA', 'ClaimsURL', 'ESB_URL', 'http://esbq.njmgroup.com:7003/XpCorrESBWeb/sca/GetCorrData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (125, NULL, 'WCC', 'UAT', 'SampleURL', 'Sample_URL', 'http://insprappuva1c01:30600/rest/api/submit-job/PreviewWCCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (126, NULL, 'WCC', 'UAT', 'InteractiveURL', 'Interactive_URL', 'http://insprappuva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (127, 19, 'WCC', 'UAT', 'ClaimsURL', 'ESB_URL', 'http://esbu.njmgroup.com:3403/XpCorrESBWeb/sca/GetCorrData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (128, NULL, 'WCC', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewWCCDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (129, NULL, 'WCC', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (130, 5, 'WCC', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3403/XpCorrESBWeb/sca/GetCorrData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (131, 5, 'PC-PA', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3026/PAPolicyInformationRetrieverWeb/sca/PAPolicyInformationRetrieverEnhancer')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (132, NULL, 'PC-PA', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (133, NULL, 'PC-PA', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewPCAutoDocument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (134, 5, 'PC-HO', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3011/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (135, NULL, 'PC-HO', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (136, NULL, 'PC-HO', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (137, 5, 'PC-DW', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3011/PolicyDataService/CorrEditor/HOPolicyInformationRetriever')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (138, NULL, 'PC-DW', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (139, NULL, 'PC-DW', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (140, 5, 'PC-UMB', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3012/PolicyDataService/UMCorrespondenceData')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (141, NULL, 'PC-UMB', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (142, NULL, 'PC-UMB', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewPCHUDDcoument')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (143, 5, 'GC', 'Prod', 'ClaimsURL', 'ESB_URL', 'http://esbp.njmgroup.com:3209/XpCCCorrGCWeb/sca/DocumentDataRepository')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (144, NULL, 'GC', 'Prod', 'InteractiveURL', 'Interactive_URL', 'http://insprapppva1a01:30701/interactive/')
INSERT INTO [dbo].[WebServices] ([WebServicesId], [RegionId], [LOB], [Environment], [URLType], [URLInfo], [URL]) VALUES (145, NULL, 'GC', 'Prod', 'SampleURL', 'Sample_URL', 'http://inspireprod:30600/rest/api/submit-job/PreviewGCDocument')
SET IDENTITY_INSERT [dbo].[WebServices] OFF
PRINT(N'Operation applied to 81 rows out of 82')

PRINT(N'Add constraints to [dbo].[WebServices]')
ALTER TABLE [dbo].[WebServices] WITH CHECK CHECK CONSTRAINT [FK_WebServices_Region]
COMMIT TRANSACTION
GO
