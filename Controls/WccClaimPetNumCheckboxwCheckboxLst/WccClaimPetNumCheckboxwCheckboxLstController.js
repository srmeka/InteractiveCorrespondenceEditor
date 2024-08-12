app.controller('WccClaimPetNumCheckboxwCheckboxLstController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ClaimPetNums = JSPath.apply(".Claim.Matters.Matter", shareData.shareJSONClaim.CorrespondenceDataResponse);

        $scope.numberDataRe = UniqueArray($scope.ClaimPetNums, "CaseNumber");
        function UniqueArray(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        };

        $scope.numberDataBody = angular.copy($scope.numberDataRe);

        //determine where to show the list, and where to output it (Re vs Body)
        $scope.ShowInRe = true;
        $scope.ShowInBody = false;
        $scope.OutputToRe = true;
        $scope.OutputToBody = false;
        $scope.Required = false;
        $scope.OnlyOne = false;

        // adjust for the exceptions to the above defaults
        switch ($scope.Category.categoryName) {
            case 'WCC_ADJUSTER':
                $scope.ShowInRe = ($scope.SelectedDocument.documentFriendlyName != 'Hospital Record Request');
                $scope.ShowInBody = ($scope.SelectedDocument.documentFriendlyName == 'Hospital Record Request');
                $scope.OutputToRe = $scope.ShowInRe;
                $scope.OutputToBody = $scope.ShowInBody;
                break;
            case 'WCC_AWARDS_PROCESSING':
                break;
            case 'WCC_DEPENDENCY':
                break;
            case 'WCC_FIRST_NOTICE_OF_LOSS':
                $scope.Required = ($scope.SelectedDocument.documentFriendlyName == 'Correct Carrier');
                break;
            case 'WCC_FOLLOW_UP':
                break;
            case 'WCC_LEGAL':
                $scope.ShowInRe = (['Adjournment Request', 'Affidavit', 'Certification', 'CP Answer Initial', 'CP Answer Reopener', 'Generic Order', 'Interrogatories Formalized', 'Occupational Interrogatories', 'Substitution of Attorney'].indexOf($scope.SelectedDocument.documentFriendlyName) == -1);
                $scope.ShowInBody = (['Adjournment Request', 'Affidavit', 'Certification', 'CP Answer Initial', 'CP Answer Reopener', 'Generic Order', 'Interrogatories Formalized', 'Occupational Interrogatories', 'Substitution of Attorney'].indexOf($scope.SelectedDocument.documentFriendlyName) > -1);
                $scope.OutputToRe = (['Adjournment Request', 'CP Answer Initial', 'CP Answer Reopener', 'Interrogatories Formalized', 'Occupational Interrogatories', 'Substitution of Attorney'].indexOf($scope.SelectedDocument.documentFriendlyName) > -1 || $scope.ShowInRe);
                $scope.OutputToBody = true;
                $scope.Required = (['Adjournment Request', 'Affidavit', 'Amended Order', 'Certification', 'Closing Letter', 'Conflict of Interest', 'Correct Carrier to PA', 'Demand for Medical', 'Dependency Interrogatories', 'Generic Legal Document', 'Generic Order', 'Impleader Int Cover Ltr w Form', 'Int to Policyholder Cov Ltr w Form', 'Motion Dismiss Lack of Pros', 'Motion Dismiss UW', 'Motion for Temp and Med Benefits', 'Motion in Opp to Motion to Re', 'Motion to Compel Ans Special Rogs', 'Motion to Implead', 'Motion-Generic', 'MP Answer to Rogs', 'Occupational Interrogatories', 'Regular Interrogatories', 'Re-opener Interrogatories', 'Request for Records Inspection', 'Subpoena Ad Testificandum', 'Subpoena Duces Tecum', 'Substitution of Attorney', 'Supplemental Interrogatories'].indexOf($scope.SelectedDocument.documentFriendlyName) > -1);
                $scope.OnlyOne = (['Motion for Temp and Med Benefits', 'Request for Records Inspection'].indexOf($scope.SelectedDocument.documentFriendlyName) > -1)
                break;
            case 'WCC_MEDICAL_UTILIZATION':
                break;
            case 'WCC_NY_FORMS':
                break;
            case 'WCC_OUT_OF_STATE':
                break;
            case 'WCC_PA_FORMS':
                break;
            case 'WCC_SUBROGATION':
                break;
            default:
                //use the defaults
                break;
        }

        $scope.clearAllData = function () {
            $scope.SelectedDataRe = [];
            $scope.SelectedDataBody = [];
            $scope.numberDataRe.map(function (item) {
                item.checked = false;
            });
            $scope.numberDataBody.map(function (item) {
                item.checked = false;
            });
        }

        $scope.selectedNumRe = function (numItem) {

            $scope.SelectedDataRe = $scope.SelectedDataRe || [];
            if (numItem.checked) {
                $scope.SelectedDataRe.push(numItem);
            } else {
                $scope.SelectedDataRe.pop(numItem);
            }

            if ($scope.OnlyOne) {

                for (i = 0; i <= $scope.numberDataRe.length - 1; i++) {
                    if (numItem != $scope.numberDataRe[i] && numItem.checked) {
                        $scope.numberDataRe[i].checked = false;
                    }
                }
            }
        }

        $scope.selectedNumBody = function (numItem) {
            $scope.SelectedDataBody = $scope.SelectedDataBody || [];
            if (numItem.checked) {
                $scope.SelectedDataBody.push(numItem);
            } else {
                $scope.SelectedDataBody.pop(numItem);
            }
        }

        $(document).ready($scope.clearAllData());
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('WccClaimPetNumCheckboxwCheckboxLst', function (event) {
        try {

            if ($scope.OutputToRe) {

                var ClaimList = '';
                if ($scope.ShowInRe) {
                    for (var i = 0; i < $scope.SelectedDataRe.length; i++) {
                        ClaimList += $scope.SelectedDataRe[i].CaseNumber + ', ';
                    }
                }
                else {
                    for (var i = 0; i < $scope.SelectedDataBody.length; i++) {
                        ClaimList += $scope.SelectedDataBody[i].CaseNumber + ', ';
                    }
                }

                //if there was any selections, trim off the final comma and space and then output the table
                if (ClaimList.length) {
                    ClaimList = ClaimList.substr(0, ClaimList.length - 2);

                    var id = shareData.shareOutputXML.getElementsByTagName("WCC_RE_OPT").length;

                    HomeService.createSecondaryTableXML("WCC_RE_OPT");
                    HomeService.createSecondaryXMLValue("WCC_RE_OPT", "CLM_FK", "1", id);
                    HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_NAME", "CP Numbers", id);
                    HomeService.createSecondaryXMLValue("WCC_RE_OPT", "RE_OPT_VAL", ClaimList, id);
                }
            }

            if ($scope.OutputToBody) {

                if ($scope.ShowInBody) {
                    for (var i = 0; i < $scope.SelectedDataBody.length; i++) {
                        var id = shareData.shareOutputXML.getElementsByTagName("CLM_PETITION_NO_REC").length;

                        HomeService.createSecondaryTableXML("CLM_PETITION_NO_REC");
                        HomeService.createSecondaryXMLValue("CLM_PETITION_NO_REC", "CLM_FK", "1", id);
                        HomeService.createSecondaryXMLValue("CLM_PETITION_NO_REC", "CLM_PETITION_NO", $scope.SelectedDataBody[i].CaseNumber, id);
                    }
                }
                else {
                    for (var i = 0; i < $scope.SelectedDataRe.length; i++) {
                        var id = shareData.shareOutputXML.getElementsByTagName("CLM_PETITION_NO_REC").length;

                        HomeService.createSecondaryTableXML("CLM_PETITION_NO_REC");
                        HomeService.createSecondaryXMLValue("CLM_PETITION_NO_REC", "CLM_FK", "1", id);
                        HomeService.createSecondaryXMLValue("CLM_PETITION_NO_REC", "CLM_PETITION_NO", $scope.SelectedDataRe[i].CaseNumber, id);
                    }
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

