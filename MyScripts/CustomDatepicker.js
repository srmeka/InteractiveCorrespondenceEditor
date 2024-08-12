app.directive('datepicker', function () {
    function link(scope, element, attrs, ngModelCtrl) {
        var format, minView, maxView, startView;

        format = (!attrs.dateFormat) ? 'yyyy-mm-dd' : attrs.dateFormat;
        minView = (!attrs.minView) ? 'days' : attrs.minView;
        maxView = (!attrs.maxView) ? 'centuries' : attrs.maxView;
        startView = (!attrs.startView) ? 'days' : attrs.startView;

        $(element).datepicker({
            format: format,
            todayHighlight: true,
            minViewMode: minView,
            maxViewMode: maxView,
            viewMode: startView,
            autoclose: true,
            orientation: "bottom auto"
        }).on('changeDate', function (ev) {
            scope.$apply(function () {
                ngModelCtrl.$setViewValue(ev.format(format));
            });
        });
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    }
});