app.controller('PcpaLicenseDriverNameCheckboxController', function ($scope, shareData, $http, HomeService) {
    try {
        $scope.SelectedDriver= [];
        $scope.Driver = JSPath.apply('.Policy.PolicyPeriod.ListedParties{.Party.Person.VehicleDriverLicense.LicenseStatusCd=="International" || .Party.Person.OfficialIdentifications.IdentificationTypeCd=="Driver License"}', shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.clearAllSelectedData = function () {
            $scope.SelectedDriver = [];
            $scope.Driver.map(function (Driver) {
                Driver.checked = false;
            })
        }

        $scope.selectDriver = function (Driver) {
            var DriverId = "DriverCheckboxLstId" + Driver._id;
            $scope.SelectedDriver = $scope.SelectedDriver || [];
            if (document.getElementById(DriverId).checked) {
                $scope.SelectedDriver.push(Driver);
            }
            else {
                $scope.SelectedDriver.pop(Driver);
            }
        }
    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('PcpaLicenseDriverNameCheckbox', function (event) {
        try {
            
           

            var DriverName = "";
            var BirthDay = "";
            var dob = "";

                var id = shareData.shareOutputXML.getElementsByTagName("POL_DRVR_DESC").length;

                    for (var i = 0; i < $scope.SelectedDriver.length; i++) {

                        if ($scope.SelectedDriver) {
                            if ($scope.SelectedDriver[i].Party.Person.PersonName.FirstGivenNm) {
                                DriverName = DriverName + $scope.SelectedDriver[i].Party.Person.PersonName.FirstGivenNm + " ";
                            }

                            if ($scope.SelectedDriver[i].Party.Person.PersonName.FamilyNm) {
                                DriverName = DriverName + $scope.SelectedDriver[i].Party.Person.PersonName.FamilyNm + " ";
                            }
                            if ($scope.SelectedDriver[i].Party.Person.PersonName.FamilyNameGenerationCd) {
                              DriverName = DriverName + $scope.SelectedDriver[i].Party.Person.PersonName.FamilyNameGenerationCd + " ";
                            }
                            if ($scope.SelectedDriver[i].Party.Person.BirthDt) {
                                BirthDay = BirthDay + $scope.SelectedDriver[i].Party.Person.BirthDt + " ";
                                dob = BirthDay.substring(0,4);
                            }
                        }

                        HomeService.createSecondaryTableXML("POL_DRVR_DESC");
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "POL_FK", "1", id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_NAME", DriverName, id);
                        HomeService.createSecondaryXMLValue("POL_DRVR_DESC", "DRVR_YR_BRTH", dob, id);
                        id = id + 1;
                        DriverName = "";
                        BirthDay = "";
                        dob = "";
                    }
                }
              
            catch (ex) {
                $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
                HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
                throw (ex);
            }
        });
    });