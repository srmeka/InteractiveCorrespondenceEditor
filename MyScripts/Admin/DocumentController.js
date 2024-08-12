app.controller('DocumentController', function ($scope, $http, shareData, $window, $filter, HomeService) {
    $('input[type=radio]').on('change', function () {
        if (!this.checked) return
        $('.collapse').not($('div.' + $(this).attr('class'))).slideUp();
        $('.collapse.' + $(this).attr('class')).slideDown();
    });

    getLOB();

    function getLOB() {
        HomeService.GetLob().then(function (response) {
            $scope.LOBDropdown = response.data;
        },
      function (error) {
          $scope.error = error;
      });
    }

    $scope.GetDevCategory = function () {
        try {
            var LOBName = $scope.SelectedDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(2,LOBName,"none").then(function (response) {
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
            HomeService.GetLOBandCategoryWithParam(2,LOBName,"none").then(function (response) {
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

    $scope.GetUpdateCategory = function () {
        try {
            var LOBName = $scope.SelectedUpdateLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(2,LOBName,"none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryUpdateDropdown = response.data;
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

    $scope.GetUpdateNonDevCategory = function () {
        try {
            var LOBName = $scope.SelectedUpdateNonDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(2,LOBName,"none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryUpdateNonDevDropdown = response.data;
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

    $scope.InsertDocument = function () {
        try {
            //var script = "&#13;&#10; USE [ICE]  &#13;&#10; BEGIN TRAN  &#13;&#10;"
            //script = script + " &#13;&#10; INSERT INTO [dbo].[Document] VALUES (" + $scope.SelectedDevCategory.categoryId + "," + $scope.DocumentName + "," + $scope.DocumentFrndlyName + "," + $scope.SelectedDocumentActive + "," + $scope.BaseState + "," + $scope.JLDFilePath + "," + $scope.DocType + ")";

            //script = script + "&#13;&#10; &#13;&#10; COMMIT";
            //var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

            //var OutputXMLWindow = window.open('/', 'DB script', params);
            //OutputXMLWindow.document.open("text/html");
            //OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
            //OutputXMLWindow.document.close();

            var document = {
                documentFriendlyName: $scope.DocumentFrndlyName,
                documentName: $scope.DocumentName,
                documentActive: $scope.SelectedDocumentActive,
                baseState: $scope.BaseState,
                jldFilePath: $scope.JLDFilePath,
                docType:$scope.DocType,
                categoryId: $scope.SelectedDevCategory.categoryId,
                createdBy: shareData.shareUsername,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                updatedBy: shareData.shareUsername,
                updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
            };
            var PromisePost = HomeService.addDocument(document);
            PromisePost.then(function (response) {
                alert("Document insert successful - Document Id: " + response.data.documentId)
            },
                  function (errorPl) {
                      $scope.errorDetail = errorPl.data.message;
                  });

        }
        catch (ex) {
            $scope.errorDetail = "Error occurred inserting document -- " + ex.message;
        }
    }

    $scope.GetNonDevDocument = function () {
        try {
            
            var PromiseGet = HomeService.GetDocumentWithParam($scope.SelectedNonDevCategory.categoryId, 'none');
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

    $scope.GetUpdateDocument = function () {
        try {

            var PromiseGet = HomeService.GetDocumentWithParam($scope.SelectedUpdateCategory.categoryId,'none');
            PromiseGet.then(function (response) {
                $scope.DocumentUpdateList = response.data;
                $scope.NumberOfUpdateDocument = response.data.length;
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

    $scope.GetNonDevUpdateDocument = function () {
        try {

            var PromiseGet = HomeService.GetDocumentWithParam($scope.SelectedNonDevUpdateCategory.categoryId, 'none');
            PromiseGet.then(function (response) {
                $scope.DocumentNonDevUpdateList = response.data;
                $scope.NumberOfNonDevUpdateDocument = response.data.length;
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

    $scope.GenerateNonDevInsertQuery = function () {

        var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
        script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
        script = script + " &#13;&#10;GO";
        script = script + " &#13;&#10;BEGIN TRANSACTION";
        for (i = 0; i < $scope.ListOfDocument.length; i++) {
            script = script + " &#13;&#10; Delete from Document where DocumentId = " + $scope.ListOfDocument[i].documentId + "&#13;&#10;";
            script = script + "Go &#13;&#10;";
        }
        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Document] ON &#13;&#10;";
        script = script + "Go &#13;&#10;";
        for (i = 0; i < $scope.ListOfDocument.length; i++) {
            var isActive = $scope.ListOfDocument[i].documentActive === true ? 1 : 0;
            if ($scope.ListOfDocument[i].baseState == null) {
                script = script + " &#13;&#10; INSERT [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.ListOfDocument[i].documentId + "," + $scope.ListOfDocument[i].categoryId + ",'" + $scope.ListOfDocument[i].documentName + "','" + $scope.ListOfDocument[i].documentFriendlyName + "'," + isActive + "," + $scope.ListOfDocument[i].baseState + ",'" + $scope.ListOfDocument[i].jldFilePath + "','" + $scope.ListOfDocument[i].docType + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
            }
            else {
                script = script + " &#13;&#10; INSERT [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.ListOfDocument[i].documentId + "," + $scope.ListOfDocument[i].categoryId + ",'" + $scope.ListOfDocument[i].documentName + "','" + $scope.ListOfDocument[i].documentFriendlyName + "'," + isActive + ",'" + $scope.ListOfDocument[i].baseState + "','" + $scope.ListOfDocument[i].jldFilePath + "','" + $scope.ListOfDocument[i].docType + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
            }
        }
        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Document] OFF &#13;&#10;";
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

    $scope.GenerateUpdateQuery = function () {

        var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
        script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
        script = script + " &#13;&#10;GO";
        script = script + " &#13;&#10;BEGIN TRANSACTION";
        for (i = 0; i < $scope.ListOfNonDevUpdateDocument.length; i++) {
            script = script + " &#13;&#10; Delete from Document where DocumentId = " + $scope.ListOfNonDevUpdateDocument[i].documentId + "&#13;&#10;";
            script = script + "Go &#13;&#10;";
        }
        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Document] ON &#13;&#10;";
        script = script + "Go &#13;&#10;";
        for (i = 0; i < $scope.ListOfNonDevUpdateDocument.length; i++) {
            var isActive = $scope.ListOfNonDevUpdateDocument[i].documentActive === true ? 1 : 0;
            if ($scope.ListOfNonDevUpdateDocument[i].baseState == null) {
                script = script + " &#13;&#10; INSERT [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.ListOfNonDevUpdateDocument[i].documentId + "," + $scope.ListOfNonDevUpdateDocument[i].categoryId + ",'" + $scope.ListOfNonDevUpdateDocument[i].documentName + "','" + $scope.ListOfNonDevUpdateDocument[i].documentFriendlyName + "'," + isActive + "," + $scope.ListOfNonDevUpdateDocument[i].baseState + ",'" + $scope.ListOfNonDevUpdateDocument[i].jldFilePath + "','" + $scope.ListOfNonDevUpdateDocument[i].docType + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
            }
            else {
                script = script + " &#13;&#10; INSERT [dbo].[Document] ([DocumentId], [CategoryId], [DocumentName], [DocumentFriendlyName], [DocumentActive], [BaseState], [JldFilePath], [DocType], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.ListOfNonDevUpdateDocument[i].documentId + "," + $scope.ListOfNonDevUpdateDocument[i].categoryId + ",'" + $scope.ListOfNonDevUpdateDocument[i].documentName + "','" + $scope.ListOfNonDevUpdateDocument[i].documentFriendlyName + "'," + isActive + ",'" + $scope.ListOfNonDevUpdateDocument[i].baseState + "','" + $scope.ListOfNonDevUpdateDocument[i].jldFilePath + "','" + $scope.ListOfNonDevUpdateDocument[i].docType + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
            }
        }
        script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Document] OFF &#13;&#10;";
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

    $scope.UpdateInDev = function () {
        try {
            for (i = 0; i < $scope.ListOfUpdateDocument.length; i++) {
                //script = script + " &#13;&#10;UPDATE [dbo].[Category] set categoryName='" + $scope.Category[i].categoryName + "',categoryFriendlyName = '" + $scope.Category[i].categoryFriendlyName + "',categoryActive = '" + $scope.Category[i].categoryActive + "', lobId = '" + $scope.Category[i].lobId + "' where categoryId = '" + $scope.Category[i].categoryId + "'&#13;&#10;";
                var updatedDocument = {
                    documentId: $scope.ListOfUpdateDocument[i].documentId,
                    categoryId: $scope.ListOfUpdateDocument[i].categoryId,
                    documentName: $scope.ListOfUpdateDocument[i].documentName,
                    documentFriendlyName: $scope.ListOfUpdateDocument[i].documentFriendlyName,
                    documentActive: $scope.ListOfUpdateDocument[i].documentActive,
                    baseState: $scope.ListOfUpdateDocument[i].baseState,
                    jldFilePath:$scope.ListOfUpdateDocument[i].jldFilePath,
                    docType: $scope.ListOfUpdateDocument[i].docType,
                    createdBy: $scope.ListOfUpdateDocument[i].createdBy,
                    createdDateTime: $scope.ListOfUpdateDocument[i].createdDateTime,
                    updatedBy: shareData.shareUsername,
                    updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
                };
                var PromisePut = HomeService.updateDocument($scope.ListOfUpdateDocument[i].documentId, updatedDocument);
                PromisePut.then(function (response) {
                    alert("Category updated - Category Id: " + response.config.data.documentId);
                },
                function (errorPl) {
                    $scope.errorDetail = errorPl.data.message;
                });
            }

        }
        catch (ex) {
            $scope.errorDetail = "Error updating category -- " + ex.message;
        }
    }
});