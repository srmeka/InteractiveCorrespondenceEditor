app.controller('ControlController', function ($scope, $http, shareData, $window, $filter, HomeService) {
    $('input[type=radio]').on('change', function () {
        if (!this.checked) return
        $('.collapse').not($('div.' + $(this).attr('class'))).slideUp();
        $('.collapse.' + $(this).attr('class')).slideDown();
    });

    getControls();
    getLOB();

    function getLOB() {
        HomeService.GetLob().then(function (response) {
            $scope.LOBDropdown = response.data;
        },
      function (error) {
          $scope.error = error;
      });
    }

    $scope.InsertControl = function () {
        try {
            var control = {
                controlDescription: $scope.ControlDescription,
                controlName: $scope.ControlName,
                createdBy: shareData.shareUsername,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                updatedBy: shareData.shareUsername,
                updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
            };
            var PromisePost = HomeService.addControl(control);
            PromisePost.then(function (response) {
                alert("Control insert successful -" + response.data.controlId);
                getControls();
            },
                  function (errorPl) {
                      $scope.errorDetail = errorPl.data.message;
                  });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred inserting category  -- " + ex.message;
        }
    }

    $scope.UpdateConrolInDev = function () {
        try {
            for (i = 0; i < $scope.SelectedUpdateDevControl.length; i++) {
                var control = {
                    controlId: $scope.SelectedUpdateDevControl[i].controlId,
                    controlDescription: $scope.SelectedUpdateDevControl[i].controlDescription,
                    controlName: $scope.SelectedUpdateDevControl[i].controlName,
                    createdBy: shareData.shareUsername,
                    createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                    updatedBy: shareData.shareUsername,
                    updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
                };
                var PromisePost = HomeService.updateControl($scope.SelectedUpdateDevControl[i].controlId,control);
                PromisePost.then(function (response) {
                    alert("Control update successful");
                    getControls();

                },
                      function (errorPl) {
                          $scope.errorDetail = errorPl.data.message;
                      });
            }
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred inserting category  -- " + ex.message;
        }
    }

    function getControls()
    {
        var PromiseGetDetails = HomeService.GetAllControls();
        PromiseGetDetails.then(function (response) {
            $scope.NumberOfControl = response.data.length;
            $scope.ControlNonDevDropdown = response.data;
        },
        function (error) {
        $scope.errorDetail = error;
        });
    }



    $scope.GenerateNonDevControlInsertQuery = function () {
        try {
            var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
            script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
            script = script + " &#13;&#10;GO";
            script = script + " &#13;&#10;BEGIN TRANSACTION";
            for (i = 0; i < $scope.NonDevControl.length; i++) {
                script = script + " &#13;&#10; Delete from Control where ControlId = " + $scope.NonDevControl[i].controlId + "&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] ON &#13;&#10;";
            script = script + "Go &#13;&#10;";
            for (i = 0; i < $scope.NonDevControl.length; i++) {
                script = script + " &#13;&#10;INSERT [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.NonDevControl[i].controlId + ",'" + $scope.NonDevControl[i].controlDescription + "','" + $scope.NonDevControl[i].controlName + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] OFF &#13;&#10;";
            script = script + "Go &#13;&#10;";
            script = script + " IF(@@ERROR > 0) &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " ROLLBACK TRANSACTION &#13;&#10;";
            script = script + " END &#13;&#10;";
            script = script + " ELSE &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " COMMIT TRANSACTION &#13;&#10;";
            script = script + " END	 &#13;&#10;";
            script = script + " GO &#13;&#10;";
            var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

            var OutputXMLWindow = window.open('/', 'DB script', params);
            OutputXMLWindow.document.open("text/html");
            OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
            OutputXMLWindow.document.close();
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while generating DB script -- " + ex.message;
        }
    }

    //First delete and then insert updated control
    $scope.GenerateUpdateNonDevControlInsertQuery = function () {
        try {
            var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
            script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
            script = script + " &#13;&#10;GO";
            script = script + " &#13;&#10;BEGIN TRANSACTION";
            for (i = 0; i < $scope.UpdateNonDevControl.length; i++) {
                script = script + " &#13;&#10; Delete from Control where ControlId = " + $scope.UpdateNonDevControl[i].controlId + "&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] ON &#13;&#10;";
            script = script + "Go &#13;&#10;";
            for (i = 0; i < $scope.UpdateNonDevControl.length; i++) {
                script = script + " &#13;&#10;INSERT [dbo].[Control] ([ControlId], [ControlDescription], [ControlName], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.UpdateNonDevControl[i].controlId + ",'" + $scope.UpdateNonDevControl[i].controlDescription + "','" + $scope.UpdateNonDevControl[i].controlName + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] OFF &#13;&#10;";
            script = script + "Go &#13;&#10;";
            script = script + " IF(@@ERROR > 0) &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " ROLLBACK TRANSACTION &#13;&#10;";
            script = script + " END &#13;&#10;";
            script = script + " ELSE &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " COMMIT TRANSACTION &#13;&#10;";
            script = script + " END	 &#13;&#10;";
            script = script + " GO &#13;&#10;";
            var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

            var OutputXMLWindow = window.open('/', 'DB script', params);
            OutputXMLWindow.document.open("text/html");
            OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
            OutputXMLWindow.document.close();
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while generating DB script -- " + ex.message;
        }
    }

    //Update query
    //$scope.GenerateUpdateNonDevControlInsertQuery = function () {
    //    try {
    //        var script = "&#13;&#10; USE [ICE]  &#13;&#10; BEGIN TRAN  &#13;&#10;"
    //        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] ON &#13;&#10;";
    //        script = script + "Go &#13;&#10;";

    //        for (i = 0; i < $scope.UpdateNonDevControl.length; i++) {
    //            script = script + " &#13;&#10;Update [dbo].[Control] set ControlDescription = '" + $scope.UpdateNonDevControl[i].controlDescription + "',ControlName = '" + $scope.UpdateNonDevControl[i].controlName + "', UpdatedBy = '" + shareData.shareUsername + "', UpdatedDateTime = '" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "' where ControlId = '" + $scope.UpdateNonDevControl[i].controlId + "'&#13;&#10;";
    //            script = script + "Go &#13;&#10;";
    //        }
    //        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Control] OFF &#13;&#10;";
    //        script = script + "Go &#13;&#10;";
    //        var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

    //        var OutputXMLWindow = window.open('/', 'DB script', params);
    //        OutputXMLWindow.document.open("text/html");
    //        OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
    //        OutputXMLWindow.document.close();
    //    }
    //    catch (ex) {
    //        $scope.errorDetail = "Error occurred while generating DB script -- " + ex.message;
    //    }
    //}

    $scope.GenerateNonDevDocumentControlInsertQuery = function () {
        try {
            var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
            script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
            script = script + " &#13;&#10;GO";
            script = script + " &#13;&#10;BEGIN TRANSACTION";
            for (i = 0; i < $scope.ControlsForNonDevDocument.length; i++) {
                script = script + " &#13;&#10; Delete from [dbo].[DocumentControl] where DocumentId = " + $scope.ControlsForNonDevDocument[i].documentControlId + "&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[DocumentControl] ON &#13;&#10;";
            for (i = 0; i < $scope.ControlsForNonDevDocument.length; i++) {
                script = script + " &#13;&#10;INSERT [dbo].[DocumentControl] ([DocumentControlId], [DocumentId], [ControlId], [ControlOrder], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.ControlsForNonDevDocument[i].documentControlId + "," + $scope.ControlsForNonDevDocument[i].documentId + "," + $scope.ControlsForNonDevDocument[i].controlId + "," + $scope.ControlsForNonDevDocument[i].controlOrder + ",'" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[DocumentControl] OFF &#13;&#10;";
            script = script + "Go &#13;&#10;";
            script = script + " IF(@@ERROR > 0) &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " ROLLBACK TRANSACTION &#13;&#10;";
            script = script + " END &#13;&#10;";
            script = script + " ELSE &#13;&#10;";
            script = script + " BEGIN &#13;&#10;";
            script = script + " COMMIT TRANSACTION &#13;&#10;";
            script = script + " END	 &#13;&#10;";
            script = script + " GO &#13;&#10;";
            var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

            var OutputXMLWindow = window.open('/', 'DB script', params);
            OutputXMLWindow.document.open("text/html");
            OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
            OutputXMLWindow.document.close();
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while generating DB script -- " + ex.message;
        }
    }


    $scope.GetDevCategory = function () {
        try {
            var LOBName = $scope.SelectedDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(2, LOBName, "none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryDevDropdown = response.data;
            },
           function (error) {

               if (error.data.message) {
                   $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data.message;
               }

               else if (error.data) {
                   $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data;
               }
               else {
                   $scope.errorDetail = "Error occurred while retrieving categories.";
               }
           });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while retrieving categories -- " + ex.message;
            return;
        }
    }

    $scope.GetNonDevCategory = function () {
        try {
            var LOBName = $scope.SelectedNonDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(2, LOBName, "none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryNonDevDropdown = response.data;
            },
           function (error) {

               if (error.data.message) {
                   $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data.message;
               }

               else if (error.data) {
                   $scope.errorDetail = "Error occurred while retrieving categories -- " + error.data;
               }
               else {
                   $scope.errorDetail = "Error occurred while retrieving categories.";
               }
           });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while retrieving categories -- " + ex.message;
            return;
        }
    }

    $scope.GetDevDocument = function () {
        try {

            var PromiseGet = HomeService.GetDocumentWithParam($scope.SelectedDevCategory.categoryId, 'none');
            PromiseGet.then(function (response) {
                $scope.DocumentList = response.data;
                $scope.NumberOfDocument = response.data.length;
            },
                  function (errorPl) {
                      $scope.errorDetail = errorPl.data.message;
                  });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while retrieving categories -- " + ex.message;
            return;
        }
    }

    $scope.GetNonDevDocument = function () {
        try {

            var PromiseGet = HomeService.GetDocumentWithParam($scope.SelectedNonDevCategory.categoryId, 'none');
            PromiseGet.then(function (response) {
                $scope.NonDevDocumentList = response.data;
                $scope.NumberOfDocument = response.data.length;
            },
                  function (errorPl) {
                      $scope.errorDetail = errorPl.data.message;
                  });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred while retrieving categories -- " + ex.message;
            return;
        }
    }

    $scope.GetControlsForDocument = function () {
        try
        {
            getControlsForDocument();
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    }

    $scope.GetNonDevControlsForDocument = function () {
        try {
            HomeService.GetControls($scope.SelectedNonDevDocument.documentId).then(function (response) {
              //  getControls();
                $scope.ControlsForNonDevDocument = response.data;
            },
            function error(response) {
                $scope.errorDetail = "We’re sorry, an error has occurred while retrieving  Controls. Notification has been sent to IT Enterprise Support team";

                if (response.data.messageDetail) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.messageDetail, $scope.SelectedDocument.documentFriendlyName);
                }
                else if (response.data.message) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                }
                else if (response.data) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                }
                else {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls.", $scope.SelectedDocument.documentFriendlyName);
                }
            });
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    }

    function getControlsForDocument() {
        try {
            HomeService.GetControls($scope.SelectedDocument.documentId).then(function (response) {
                getControls();
                $scope.ControlsForDocument = response.data;
            },
            function error(response) {
                $scope.errorDetail = "We’re sorry, an error has occurred while retrieving  Controls. Notification has been sent to IT Enterprise Support team";

                if (response.data.messageDetail) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.messageDetail, $scope.SelectedDocument.documentFriendlyName);
                }
                else if (response.data.message) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data.message, $scope.SelectedDocument.documentFriendlyName);
                }
                else if (response.data) {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls -- " + response.data, $scope.SelectedDocument.documentFriendlyName);
                }
                else {
                    HomeService.sendErrorMailandUpdateLog("Error occurred while retrieving  Controls.", $scope.SelectedDocument.documentFriendlyName);
                }
            });
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    }

    $scope.DeleteControl = function (id) {
        try{
            var PromiseDeleteDocumentControl = HomeService.DeleteDocumentControl(id);

            PromiseDeleteDocumentControl.then(function (response) {
                getControlsForDocument();
            },
               function (errorPl) {
                   $scope.errorDetail = errorPl.data.message;
               });
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
        }
    }

    function DeleteDocumentControl(id,data) {
        try {
            var PromiseDeleteDocumentControl = HomeService.DeleteDocumentControl(id,data);

            PromiseDeleteDocumentControl.then(function (response) {
                getControlsForDocument();
            },
               function (errorPl) {
                   $scope.errorDetail = errorPl.data.message;
               });
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    }

    $scope.InsertDocumentControl = function ()
    {
        try {
            if ($scope.SelectedControls && !$scope.ControlsForDocument) {
                insertDocControl();
            }
            if (!$scope.SelectedControls && $scope.ControlsForDocument) {
               // DeleteDocumentControl(1,$scope.SelectedDocument.documentId)
                insertDocControl();
            }
            if ($scope.SelectedControls && $scope.ControlsForDocument) {
               // DeleteDocumentControl(1,$scope.SelectedDocument.documentId)
                insertDocControl();
            }
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
        
    }

    function insertDocControl() {
        try {

            for (var i = 0 ; i < $scope.SelectedControls.length; i++) {
                var documentControl = {
                    documentId: $scope.SelectedDocument.documentId,
                    controlId: $scope.SelectedControls[i].controlId,
                    controlOrder: $scope.SelectedControls[i].controlOrder,
                    createdBy: shareData.shareUsername,
                    createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                    updatedBy: shareData.shareUsername,
                    updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
                };
                var PromisePost = HomeService.addDocumentControl(documentControl);
                PromisePost.then(function (response) {
                    getControlsForDocument();
                },
                      function (errorPl) {
                          $scope.errorDetail = errorPl.data.message;
                      });
            }

            //$scope.ControlsForDocument = undefined;
            //$scope.SelectedControls = undefined;
            
        }
        catch (ex) {
            $scope.errorDetail = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }
    }

});