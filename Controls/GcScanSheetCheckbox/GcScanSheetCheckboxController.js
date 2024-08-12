app.controller('GcScanSheetCheckboxController', function ($scope, shareData, $http, HomeService, $filter) {
    try {
        $scope.CheckBoxValue = false;
        $scope.labelText = "";

        switch ($scope.SelectedDocument.documentFriendlyName) {
            case 'Arbitration Demand':
            case 'Arbitration Submission':
                $scope.LabelName1 = 'Emergent Relief?';
                break;

            case 'Medical Attachment':
            case 'Diagnostic Report':
            case 'Medical Records':
                $scope.LabelName1 = 'Preexisting History?';
                break;

            case 'Independent Medical Exam':
            case 'Precert':
                $scope.LabelName1 = 'Appeal?';
                break;
        };

    }
    catch (ex) {
        $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
        HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        throw (ex);
    }

    $scope.$on('GcScanSheetCheckbox', function (event) {
        try {
            if ($scope.GcCheckBoxValue == true) {
                HomeService.createPrimaryXML("TAG4", "Suppress Notification:");
                HomeService.createPrimaryXML("TAG4_NUM", "066:");
                HomeService.createPrimaryXML("VALUE4", "YES");

                if ($scope.GcCheckBoxValue1 == true) {

                    switch ($scope.SelectedDocument.documentFriendlyName) {

                        case 'Arbitration Demand':
                        case 'Arbitration Submission':

                            HomeService.createPrimaryXML("TAG10", "Emergent Relief:");
                            HomeService.createPrimaryXML("TAG10_NUM", "064:");
                            HomeService.createPrimaryXML("VALUE10", "Emergent");
                            break;

                        case 'Medical Attachment':
                            HomeService.createPrimaryXML("TAG11", "Preexisting:");
                            HomeService.createPrimaryXML("TAG11_NUM", "060:");
                            HomeService.createPrimaryXML("VALUE11", "Preexisting");
                            break;

                        case 'Diagnostic Report':
                        case 'Medical Records':
                            HomeService.createPrimaryXML("TAG10", "Preexisting:");
                            HomeService.createPrimaryXML("TAG10_NUM", "060:");
                            HomeService.createPrimaryXML("VALUE10", "Preexisting");
                            break;

                        case 'Independent Medical Exam':
                            HomeService.createPrimaryXML("TAG10", "Appeal:");
                            HomeService.createPrimaryXML("TAG10_NUM", "057:");
                            HomeService.createPrimaryXML("VALUE10", "Appeal");
                            break;
                        case 'Precert':
                            HomeService.createPrimaryXML("TAG12", "Appeal:");
                            HomeService.createPrimaryXML("TAG12_NUM", "057:");
                            HomeService.createPrimaryXML("VALUE12", "Appeal");
                            break;

                    };
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