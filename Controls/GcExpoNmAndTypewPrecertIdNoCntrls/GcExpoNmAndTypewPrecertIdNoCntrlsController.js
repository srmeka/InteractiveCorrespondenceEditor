app.controller('GcExpoNmAndTypewPrecertIdNoCntrlsController', function ($scope, $http, shareData, HomeService) {
    try {
        $scope.ExposureJsonData = JSPath.apply(".Claim.InvolvedParties.Party{.Role === 'Claimant'}", shareData.shareJSONClaim.CorrespondenceDataResponse);
        
        $scope.ExposureData = []
        function getData(sourceData) {
            var displayData = [];
            sourceData.forEach(function (item) {

                if (item.Type === 'Person') {
                    item.displayName = item.FirstName + ' ' + item.MiddleName + ' ' + item.LastName + ' ' + item.Suffix;
                    item.displayName = item.displayName.replace(/undefined/g, '').replace('  ', ' ');
                }
                if (item.Type == 'Company') {
                    item.displayName = item.Name;
                }

                displayData.push(item);
            });
            return displayData;
        }

        function inintPage() {
            $scope.ExposureData = getData($scope.ExposureJsonData);
           
        };

        inintPage();

        $scope.typeData = [];
        $scope.precertData = [];
        $scope.selectName = function () {
            if ($scope.selectedName) {
                var types = $scope.selectedName.Exposures.Exposure;
                if (types) {
                    $scope.typeData = [];
                    if (typeof (types.ExposureType) === 'string') {
                        $scope.typeData.push(types);
                        $scope.selectedType = types.ExposureType;
                        $scope.selectType(types);
                    } else {
                      
                            $scope.typeData = types
                    
                    }
                } else {
                    $scope.typeData = 'Information not provided from ClaimCenter';
                    $scope.precertData = 'Information not provided from ClaimCenter';
                }
            } else {
                $scope.typeData = [];
                $scope.selectedType = undefined;
                $scope.precertData = [];
            }
            
        }

        $scope.selectType = function (type) {
          
            if (type) {
                $scope.selectedType = type;
                if ($scope.selectedType.Precertifications) {
                    var precert = $scope.selectedType.Precertifications.Precertification;
                    if (precert) {
                        $scope.precertData = [];
                        if (typeof (precert) === 'string') {
                            $scope.selectedPrecertId = precert;
                            $scope.precertData.push(precert);
                        } else {
                            $scope.precertData = precert;
                            $scope.selectedPrecertId = $scope.precertData[0];
                        }
                    }
                } else {
                    $scope.precertData = 'Information not provided from ClaimCenter';
                }
            } else {
                $scope.precertData = [];
                $scope.selectedType = undefined;
                $scope.selectedPrecertId = undefined;
            }
        }
       
    }

    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }
    $scope.$on('GcExpoNmAndTypewPrecertIdNoCntrls', function (event) {
        try {
            var outputName = '';
            var clmt_id = '';
            var typeValue = '', numValue = '';
            var precert_id = '';
            if( $scope.selectedName){
                outputName = $scope.selectedName.displayName;
         
                if(outputName){
                    outputName = outputName.replace(/undefined/g, '').replace('  ', ' ');
                }
                clmt_id = $scope.selectedName._id;
                if ($scope.selectedType) {
                    typeValue = $scope.selectedType.ExposureType;
                    numValue = $scope.selectedType.ExposureNumber;
                    if (numValue.length < 4) {
                        numValue = ("0000" + numValue).slice(-4);
                    }
                    if ($scope.selectedPrecertId) {
                        precert_id = $scope.selectedPrecertId.PrecertificationId;
                    }
                   
                }
               
            }
            HomeService.createPrimaryXML("EXPOSURE_NAME", outputName.trim());
            HomeService.createPrimaryXML("CLMT_ID", clmt_id);
            HomeService.createPrimaryXML("EXPOSURE_TYPE", typeValue);
            HomeService.createPrimaryXML("EXPOSURE_NUM", numValue);

            var id = shareData.shareOutputXML.getElementsByTagName("PRECERT_CODE_REC").length;
            HomeService.createSecondaryTableXML("PRECERT_CODE_REC");
            HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "CLM_FK", "1", id);
            HomeService.createSecondaryXMLValue("PRECERT_CODE_REC", "PRECERT_ID", precert_id.trim(), id);
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    });

});

