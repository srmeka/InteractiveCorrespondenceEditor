app.directive('gcEmailwCheckbox', GcEmailwCheckbox);

function GcEmailwCheckbox() {
    var baseurl = location.href.split("Home?");
    return {

        templateUrl: baseurl[0] +"Controls/GcEmailwCheckbox/GcEmailwCheckbox.html",
    }
}