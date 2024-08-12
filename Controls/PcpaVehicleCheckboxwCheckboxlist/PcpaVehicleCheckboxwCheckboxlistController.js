app.controller('PcpaVehicleCheckboxwCheckboxlistController', function ($scope, shareData, $http, HomeService) {
    try {

        $scope.SelectionCount = 0;

        $scope.CtrlEnabledCheckbox = new Array;
        $scope.optShow = [];
        $scope.SelectedText = [];
        $scope.Vehicle = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.*}', shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.clearAllSelectedData = function () {
            $scope.Vehicle.map(function (Vehicle) {
                Vehicle.checked = false;
            })
            $scope.SelectionCount = 0;
        }
        $scope.CoverageTypeCollison = [];
        $scope.CoverageTypePACollison = [];
        $scope.CoveragePALiability = [];
        $scope.CoverageComprehensive = [];
        $scope.CoveragePAComprehensive = [];
        $scope.CoveragePAComprehensive2 = [];
        $scope.LeaseName = [];
        $scope.LeaseCompanyAddressLine1Tx = [];
        $scope.LeaseCompanyAddressLine2Tx = [];
        $scope.LeaseCompanyAddressLine3Tx = [];
        $scope.LeaseCompanyAddressCity = [];
        $scope.LeaseCompanyAddressState = [];
        $scope.LeaseCompanyAddressZip = [];
        $scope.FinanceName = [];
        $scope.FinanceCompanyAddressLine1Tx = [];
        $scope.FinanceCompanyAddressLine2Tx = [];
        $scope.FinanceCompanyAddressLine3Tx = [];
        $scope.FinanceCompanyAddressCity = [];
        $scope.FinanceCompanyAddressState = [];
        $scope.FinanceCompanyAddressZip = [];
        $scope.AdditionalInsuredName = [];
        $scope.AdditionalInsuredCompanyAddressLine1Tx = [];
        $scope.AdditionalInsuredCompanyAddressLine2Tx = [];
        $scope.AdditionalInsuredCompanyAddressLine3Tx = [];
        $scope.AdditionalInsuredCompanyAddressCity = [];
        $scope.AdditionalInsuredCompanyAddressState = [];
        $scope.AdditionalInsuredCompanyAddressZip = [];

        $scope.addressType = "";
        $scope.getMailingAddr = false;

        $scope.UpdateInfo = function (idPassed, index) {
            $scope.CoverageTypeCollison[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "Collision"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.CoverageTypePACollison[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "PACollisionCov"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.CoveragePALiability[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "PALiabilityCov"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.CoverageComprehensive[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "Comprehensive"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.CoveragePAComprehensive[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "PAComprehensiveCov"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.CoveragePAComprehensive2[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}.Coverages{.CoverageTypeCd == "PAComprehensiveCov"}.CoverageParameterUnformattedValueTx', shareData.shareJSONClaim.CorrespondenceDataResponse);

            $scope.FinanceName[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.OrganizationNm', shareData.shareJSONClaim.CorrespondenceDataResponse);

            $scope.addressType = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses.AddressUseCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.getMailingAddr = haveMailingAddr($scope.addressType);

            if ($scope.getMailingAddr) {
                $scope.FinanceCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            } else {
                $scope.FinanceCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.FinanceCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Financed"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            }

            $scope.LeaseName[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.OrganizationNm', shareData.shareJSONClaim.CorrespondenceDataResponse);

            $scope.addressType = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses.AddressUseCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.getMailingAddr = haveMailingAddr($scope.addressType);

            if ($scope.getMailingAddr) {
                $scope.LeaseCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            } else {

                $scope.LeaseCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.LeaseCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lessor" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            }

            $scope.AdditionalInsuredName[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.OrganizationNm', shareData.shareJSONClaim.CorrespondenceDataResponse);

            $scope.addressType = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses.AddressUseCd', shareData.shareJSONClaim.CorrespondenceDataResponse);
            $scope.getMailingAddr = haveMailingAddr($scope.addressType);

            if ($scope.getMailingAddr) {
                $scope.AdditionalInsuredCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.AddressUseCd == "Mailing"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);

            } else {
                $scope.AdditionalInsuredCompanyAddressLine1Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line1Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressLine2Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line2Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressLine3Tx[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Line3Tx', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressCity[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.Municipality.{.MunicipalityTypeCd == "CITY"}.MunicipalityNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressState[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.CountrySubdivision{.CountrySubdivisionTypeCd =="State"}.CountrySubdivisionNm', shareData.shareJSONClaim.CorrespondenceDataResponse);
                $scope.AdditionalInsuredCompanyAddressZip[index] = JSPath.apply('.Policy.PolicyPeriod.PolicyLines.PersonalAutoLine.VehicleCoverageDetails{.Vehicle._id ==' + idPassed + '}{.OwnershipTypeCd == "Leased"}.AssociatedParties{.PartyRoles == "Lien Holder" && .PartyTypeCd == "Organization"}.Organization.Addresses{.PrimaryAddressIn == "true"}.Address.PostalCd', shareData.shareJSONClaim.CorrespondenceDataResponse);

            }

            if ($scope.FinanceName[index].length) {
                $scope.optShow[index] = "Finance";
            }
            else if ($scope.LeaseName[index].length) {
                if ($scope.AdditionalInsuredName[index].length) {
                    $scope.optShow[index] = "Additional";
                }
                else {
                    $scope.optShow[index] = "Lease";
                }
            }
            else {
                $scope.optShow[index] = "Owned";
            }

            if ($scope.CtrlEnabledCheckbox[index]) {
                $scope.SelectionCount++;
            }
            else {
                $scope.SelectionCount--;
            }
        }

        function haveMailingAddr(addressType) {

            $scope.getMailingAddr = false;

            if (Array.isArray(addressType)) {
                for (var i = 0; i < addressType.length; i++) {
                    if (addressType[i] == 'Mailing') {
                        $scope.getMailingAddr = true;
                    }
                }
            } else {
                if (addressType == 'Mailing') {
                    $scope.getMailingAddr = true;
                }
            }
            return $scope.getMailingAddr;
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaVehicleCheckboxwCheckboxlist', function (event) {
        try {

            var id = shareData.shareOutputXML.getElementsByTagName("VEH_DESC").length;
            for (var i = 0; i < $scope.Vehicle.length; i++) {
                if ($scope.CtrlEnabledCheckbox[i] == true) {

                    HomeService.createSecondaryTableXML("VEH_DESC");
                    HomeService.createSecondaryXMLValue("VEH_DESC", "POL_FK", "1", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VERIFY_COV_IND", "Y", id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "COLL_DED", $scope.CoverageTypeCollison[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "COLL_PREM", $scope.CoverageTypePACollison[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "LIAB_PREM", $scope.CoveragePALiability[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "OTH_THAN_COLL_DED", $scope.CoverageComprehensive[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "OTH_THAN_COLL_PREM", $scope.CoveragePAComprehensive[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "PIP_MED_LMT_PREM", $scope.CoveragePAComprehensive2[i], id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "ST_AMT", $scope.Vehicle[i].Vehicle.StatedValue, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_BODY_TYPE", $scope.Vehicle[i].Vehicle.ModelNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_MK", $scope.Vehicle[i].Vehicle.VehicleTradeNm, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_YR", $scope.Vehicle[i].Vehicle.ModelYearNr, id);
                    HomeService.createSecondaryXMLValue("VEH_DESC", "VEH_VIN", $scope.Vehicle[i].Vehicle.ManufacturerVehicleIdentificationNr, id);
                    if ($scope.optShow[i] == "Finance") {
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_NAME", $scope.FinanceName[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_1", $scope.FinanceCompanyAddressLine1Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_2", $scope.FinanceCompanyAddressLine2Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_3", $scope.FinanceCompanyAddressLine3Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_CTY", $scope.FinanceCompanyAddressCity[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ST", $scope.FinanceCompanyAddressState[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ZIP", $scope.FinanceCompanyAddressZip[i], id);
                    }
                    if ($scope.optShow[i] == "Lease" || $scope.optShow[i] == "Additional") {
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_NAME", $scope.LeaseName[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_1", $scope.LeaseCompanyAddressLine1Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_2", $scope.LeaseCompanyAddressLine2Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ADDR_3", $scope.LeaseCompanyAddressLine3Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_CTY", $scope.LeaseCompanyAddressCity[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ST", $scope.LeaseCompanyAddressState[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "LEASE_CO_ZIP", $scope.LeaseCompanyAddressZip[i], id);
                    }
                    if ($scope.optShow[i] == "Additional") {
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_NAME", $scope.AdditionalInsuredName[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_1", $scope.AdditionalInsuredCompanyAddressLine1Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_2", $scope.AdditionalInsuredCompanyAddressLine2Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ADDR_3", $scope.AdditionalInsuredCompanyAddressLine3Tx[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_CTY", $scope.AdditionalInsuredCompanyAddressCity[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ST", $scope.AdditionalInsuredCompanyAddressState[i], id);
                        HomeService.createSecondaryXMLValue("VEH_DESC", "FINANCE_CO_ZIP", $scope.AdditionalInsuredCompanyAddressZip[i], id);
                    }
                    id = id + 1;
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