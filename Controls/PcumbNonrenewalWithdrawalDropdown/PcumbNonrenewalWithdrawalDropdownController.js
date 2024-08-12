app.controller('PcumbNonrenewalWithdrawalDropdownController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.Reasons = ["Driving Record", "No Longer Licensed", "Obtained Underlying Policies", "Inspection", "Geographic", "Claims-No Longer in Household", "Renewed in Error", "Reconsideration"];
        $scope.UnderlyingPolicy = ["an Automobile", "a Homeowner", "an Automobile and/or a Homeowner"];

        $scope.LicFamilyMember = JSPath.apply(".Policy.PolicyPeriod.PolicyLines.UmbrellaLine.HouseholdMembers{.Person.VehicalDriverLicense.LicenseStatusCd =='Active DL' || .Person.VehicalDriverLicense.LicenseStatusCd =='Suspended' || .Person.VehicalDriverLicense.LicenseStatusCd =='International' || .Person.VehicalDriverLicense.LicenseStatusCd =='Permit'}", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.TotalCount = [1];
        $scope.MaxCtls = [7];
        $scope.SelectedLicFamilyMember = new Array;
        $scope.ManualLicFamilyMember = new Array;
        $scope.RepeatStyle = { "padding-bottom": "10px", "border-bottom": "2px solid lightgray" };

        $scope.ShowUnderlyingPolicy = function () {
            if ($scope.NonrenewReason == "Obtained Underlying Policies")
                return true;
            return false;
        }

        $scope.ShowLicFamilyMember = function () {
            if ($scope.NonrenewReason == "Driving Record" || $scope.NonrenewReason == "No Longer Licensed" || $scope.NonrenewReason == "Claims-No Longer in Household")
                return true;
            return false;
        }

        $scope.IsUndefined = function (item) {
            if (item == undefined)
                return true;
            return false;
        }

        $scope.AddNewLicFamilySection = function () {
            var newItemNum = $scope.TotalCount.length + 1;
            if ($scope.TotalCount.length < $scope.MaxCtls) {
                $scope.TotalCount.push(newItemNum);
            }
        }
        $scope.RemoveLicFamilySection = function () {
            if ($scope.TotalCount.length > 1) {
                $scope.TotalCount.pop();
                $scope.ClearDivRecData($scope.TotalCount.length);
            }
        }

        $scope.ClearAllData = function () {
            $scope.SelectedUnderlyingPolicy = undefined;

            $scope.TotalCount = [1];
            $scope.SelectedLicFamilyMember = [];
            $scope.ManualLicFamilyMember = [];
        }

        $scope.ClearDivRecData = function (index) {
            $scope.SelectedLicFamilyMember[index] = undefined;
            $scope.ManualLicFamilyMember[index] = "";
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('PcumbNonrenewalWithdrawalDropdown', function (event) {
        try {
            if ($scope.NonrenewReason) {
                var id;
                HomeService.createPrimaryXML("NONRNWL_WTHDR_RSN", $scope.NonrenewReason);
                if ($scope.NonrenewReason == "Driving Record" || $scope.NonrenewReason == "No Longer Licensed" || $scope.NonrenewReason == "Claims-No Longer in Household") {
                    id = shareData.shareOutputXML.getElementsByTagName("FAMILY_REC").length;
                    for(var i = 0; i < $scope.TotalCount.length; i++){
                        HomeService.createSecondaryTableXML("FAMILY_REC");
                        if ($scope.SelectedLicFamilyMember[i]) {
                            var name = "";
                            if ($scope.SelectedLicFamilyMember[i].Person.PersonName.FirstGivenNm) {
                                name = $scope.SelectedLicFamilyMember[i].Person.PersonName.FirstGivenNm + ' ';
                            }
                            if ($scope.SelectedLicFamilyMember[i].Person.PersonName.SecondGivenNm) {
                                name = name + $scope.SelectedLicFamilyMember[i].Person.PersonName.SecondGivenNm + ' ';
                            }
                            if ($scope.SelectedLicFamilyMember[i].Person.PersonName.FamilyNm) {
                                name = name + $scope.SelectedLicFamilyMember[i].Person.PersonName.FamilyNm;
                            }
                            HomeService.createSecondaryXMLValue("FAMILY_REC", "LICENSE_FAM_MEM", name.trim(), id);
                        }
                        else if ($scope.ManualLicFamilyMember[i]) {
                            HomeService.createSecondaryXMLValue("FAMILY_REC", "LICENSE_FAM_MEM", $scope.ManualLicFamilyMember[i], id);
                        }
                        HomeService.createSecondaryXMLValue("FAMILY_REC", "POL_FK", 1, id);
                        id++;
                    }
                }
                else if ($scope.NonrenewReason == "Obtained Underlying Policies") {
                    HomeService.createPrimaryXML("UNLY_POL_TYPE", $scope.SelectedUnderlyingPolicy);
                }
            }
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});