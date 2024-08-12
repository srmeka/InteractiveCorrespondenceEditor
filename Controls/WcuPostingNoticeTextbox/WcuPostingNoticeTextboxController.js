app.controller('WcuPostingNoticeTextboxController', function ($scope, shareData, $http, HomeService, $filter) {


    var DBA = JSPath.apply(".Policy.PolicyPeriod.InvolvedParties{.PartyRoles === 'Named Insured' || .PartyRoles === 'Named Insured'}.Organization.OrganizationNm", shareData.shareJSONClaim.CorrespondenceDataResponse);

    try {
        $scope.PostingNoticeValue = "1";

        $scope.validateNumber = function (inputValue) {
            if (inputValue) {
                inputValue = inputValue.replace(/[^0-9]/g, '');
            }
            return inputValue;
        }

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('WcuPostingNoticeTextbox', function (event) {
        try {
            var id = 0;
            var baseState = '';

            switch ($scope.SelectedDocument.documentFriendlyName) {
                case 'CT Posting Notice':
                case 'CT Spanish Posting Notice':

                    baseState = 'CT';
                    break;

                case 'DE Posting Notice':
                case 'DE Spanish Posting Notice':

                    baseState = 'DE';
                    break;

                case 'MD Posting Notice':

                    baseState = 'MD';
                    break;

                case 'NY Posting Notice':

                    baseState = 'NY';
                    break;

                case 'PA Posting Notice':
                case 'PA Spanish Posting Notice':

                    baseState = 'PA';
                    break;

                case 'Posting Notice':
                case 'Spanish Posting Notice':

                    baseState = 'NJ';
                    break;

            }

            if ($scope.PostingNoticeValue) {
                HomeService.createSecondaryTableXML("STATES_OF_COV_REC");
                HomeService.createSecondaryXMLValue("STATES_OF_COV_REC", "POST_NOTICE_COUNTER", $scope.PostingNoticeValue, id);
                HomeService.createSecondaryXMLValue("STATES_OF_COV_REC", "POL_FK", "1", id);
                HomeService.createSecondaryXMLValue("STATES_OF_COV_REC", "COVERED_STATE_ABBR", baseState, id);
            }

            //if (DBA) {
            //    for (var i = 0; i < DBA.length; i++) {
            //        HomeService.createSecondaryTableXML("NJM_POL_HLD");
            //        HomeService.createSecondaryXMLValue("NJM_POL_HLD", "POL_FK", "1", id);
            //        HomeService.createSecondaryXMLValue("NJM_POL_HLD", "POL_HLD_NAME_MULTI", DBA[i], id);

            //        id = id + 1;

            //    }
            //}

           
        } //try
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });
});