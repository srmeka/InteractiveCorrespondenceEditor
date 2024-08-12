app.controller('CategoryController', function ($scope, $http, shareData, $window, $filter, HomeService) {
    $('input[type=radio]').on('change', function () {
        if (!this.checked) return
        $('.collapse').not($('div.' + $(this).attr('class'))).slideUp();
        $('.collapse.' + $(this).attr('class')).slideDown();
    });
    $scope.SelectedCategoryActive = "True";
    getLOB();

    function getLOB() {
        HomeService.GetLob().then(function (response) {
            $scope.LOBDropdown = response.data;
        },
      function (error) {
          $scope.errorDetail = error;
      });
    }


    $scope.GetNonDevCategory = function (control) {
        try {
            var LOBName = $scope.SelectedNonDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(1, LOBName, "none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryNonDevDropdown = response.data;
                $scope.NumberOfCategory = response.data.length;
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

    $scope.GetUpdateDevCategory = function () {
        try {
            var LOBName = $scope.SelectedUpdateDevLOB.lobName;
            var userData = [];
            HomeService.GetLOBandCategoryWithParam(1, LOBName, "none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryUpdateDevDropdown = response.data;
                $scope.NumberOfUpdateDevCategory = response.data.length;
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
            HomeService.GetLOBandCategoryWithParam(1, LOBName, "none").then(function (response) {
                //var LOBId =  response.data[0].lobId;
                //GetCategory(LOBId);
                $scope.CategoryUpdateNonDevDropdown = response.data;
                $scope.NumberOfUpdateNonDevCategory = response.data.length;
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



    $scope.InsertCategory = function () {
        try {
            //var script = "&#13;&#10; USE [ICE]  &#13;&#10; BEGIN TRAN  &#13;&#10;"
            //    script = script + " &#13;&#10; INSERT INTO [dbo].[Category] VALUES (" + $scope.CategoryName + "," + $scope.CategoryFrndlyName + "," + $scope.SelectedCategoryActive + "," + $scope.SelectedDevLOB.lobId + ")";

            //script = script + "&#13;&#10; &#13;&#10; COMMIT";
            //var params = 'scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,width=800,height=800,left=200,top=100';

            //var OutputXMLWindow = window.open('/', 'DB script', params);
            //OutputXMLWindow.document.open("text/html");
            //OutputXMLWindow.document.write("<html><body><textarea style=\"border:none;height:90%;width:90%\" readonly>" + script + "</textarea></body></html>");
            //OutputXMLWindow.document.close();

            var category = {
                categoryName: $scope.CategoryName,
                categoryFriendlyName: $scope.CategoryFrndlyName,
                categoryActive: $scope.SelectedCategoryActive,
                lobId: $scope.SelectedDevLOB.lobId,
                categoryGroups: $scope.CategoryGroups,
                createdBy: shareData.shareUsername,
                createdDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a'),
                updatedBy: shareData.shareUsername,
                updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')

            };
            var PromisePost = HomeService.addCategory(category);
            PromisePost.then(function (response) {
                alert("Category insert successful -" + response.data.categoryId)
            },
                  function (errorPl) {
                      if (errorPl.data.innerException.innerException.exceptionMessage) {
                          $scope.errorDetail = errorPl.data.innerException.innerException.exceptionMessage;
                      }
                      else {
                          $scope.errorDetail = errorPl.data.message;
                      }
                  });
        }
        catch (ex) {
            $scope.errorDetail = "Error occurred inserting category  -- " + ex.message;
        }
    }

    $scope.GenerateNonDevInsertQuery = function () {
        try {
            var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
            script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
            script = script + " &#13;&#10;GO";
            script = script + " &#13;&#10;BEGIN TRANSACTION";

            for (i = 0; i < $scope.NonDevCategory.length; i++) {
                script = script + " &#13;&#10; Delete from [dbo].[Category] where categoryId = '" + $scope.NonDevCategory[i].categoryId + "'&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Category] ON &#13;&#10;";
            script = script + "Go &#13;&#10;";
            for (i = 0; i < $scope.NonDevCategory.length; i++) {
                var isActive = $scope.NonDevCategory[i].categoryActive === true ? 1 : 0;
                script = script + " &#13;&#10;INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId],[CategoryGroups], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.NonDevCategory[i].categoryId + ",'" + $scope.NonDevCategory[i].categoryName + "','" + $scope.NonDevCategory[i].categoryFriendlyName + "'," + isActive + "," + $scope.NonDevCategory[i].lobId + ",'" + $scope.NonDevCategory[i].categoryGroups + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Category] OFF &#13;&#10;";
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

    $scope.GenerateUpdateQuery = function () {
        try {
            var script = "&#13;&#10; USE [ICE]  &#13;&#10;"
            script = script + " &#13;&#10; SET XACT_ABORT, ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON"
            script = script + " &#13;&#10;GO";
            script = script + " &#13;&#10;BEGIN TRANSACTION";
            for (i = 0; i < $scope.SelectedUpdateNonDevCategory.length; i++) {
                script = script + " &#13;&#10; Delete from [dbo].[Category] where categoryId = '" + $scope.SelectedUpdateNonDevCategory[i].categoryId + "'&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Category] ON &#13;&#10;";
            script = script + "Go &#13;&#10;";
            for (i = 0; i < $scope.SelectedUpdateNonDevCategory.length; i++) {
                var isActive = $scope.SelectedUpdateNonDevCategory[i].categoryActive === true? 1:0;
                script = script + " &#13;&#10;INSERT [dbo].[Category] ([CategoryId], [CategoryName], [CategoryFriendlyName], [CategoryActive], [LOBId],[CategoryGroups], [CreatedBy], [CreatedDateTime], [UpdatedBy], [UpdatedDateTime]) VALUES (" + $scope.SelectedUpdateNonDevCategory[i].categoryId + ",'" + $scope.SelectedUpdateNonDevCategory[i].categoryName + "','" + $scope.SelectedUpdateNonDevCategory[i].categoryFriendlyName + "'," + isActive + "," + $scope.SelectedUpdateNonDevCategory[i].lobId + ",'" + $scope.SelectedUpdateNonDevCategory[i].categoryGroups + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "','" + shareData.shareUsername + "','" + $filter('date')(new Date(), 'MMM d, y h:mm:ss a') + "')&#13;&#10;";
                script = script + "Go &#13;&#10;";
            }
            script = script + " &#13;&#10; SET IDENTITY_INSERT [dbo].[Category] OFF &#13;&#10;";
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

    $scope.UpdateInDev = function () {
        try {

            for (i = 0; i < $scope.SelectedUpdateDevCategory.length; i++) {

                //script = script + " &#13;&#10;UPDATE [dbo].[Category] set categoryName='" + $scope.Category[i].categoryName + "',categoryFriendlyName = '" + $scope.Category[i].categoryFriendlyName + "',categoryActive = '" + $scope.Category[i].categoryActive + "', lobId = '" + $scope.Category[i].lobId + "' where categoryId = '" + $scope.Category[i].categoryId + "'&#13;&#10;";
                var updatedCategory = {
                    categoryId: $scope.SelectedUpdateDevCategory[i].categoryId,
                    categoryName: $scope.SelectedUpdateDevCategory[i].categoryName,
                    categoryFriendlyName: $scope.SelectedUpdateDevCategory[i].categoryFriendlyName,
                    categoryActive: $scope.SelectedUpdateDevCategory[i].categoryActive,
                    lobId: $scope.SelectedUpdateDevCategory[i].lobId,
                    categoryGroups: $scope.SelectedUpdateDevCategory[i].categoryGroups,
                    createdBy: $scope.SelectedUpdateDevCategory[i].createdBy,
                    createdDateTime: $scope.SelectedUpdateDevCategory[i].createdDateTime,
                    updatedBy: shareData.shareUsername,
                    updatedDateTime: $filter('date')(new Date(), 'MMM d, y h:mm:ss a')
                };
                var PromisePut = HomeService.updateCategory($scope.SelectedUpdateDevCategory[i].categoryId, updatedCategory);
                PromisePut.then(function (response) {
                    alert("Category updated - Category Id: " + response.config.data.categoryId);
                },
                function (errorPl) {
                    if (errorPl.data.innerException.innerException.exceptionMessage) {
                        $scope.errorDetail = errorPl.data.innerException.innerException.exceptionMessage;
                    }
                    else {
                        $scope.errorDetail = errorPl.data.message;
                    }
                });
            }

        }
        catch (ex) {
            $scope.errorDetail = "Error updating category -- " + ex.message;
        }
    }
});