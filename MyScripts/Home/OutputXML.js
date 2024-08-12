app.service('OutputXML', OutputXML);

function OutputXML($http, shareData, $filter) {
    //This JavaScript function retrun Current Date in the format required by ad hoc document   Full Month DD, YYYY
   this.getCurrentDate = function(){
        try {

            var month = new Array(12);
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            var now = new Date();

            //fix for UTC time value 
            var d = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

            //var d = new Date();
            var _year = d.getUTCFullYear();
            var _month = d.getUTCMonth();

            var _fullMonth = month[_month];

            var _day = d.getUTCDate();

            var _currentDate = _fullMonth + " " + _day + ", " + _year;
            return _currentDate;
        }
        catch (ex) {
            $scope.$parent.$parent.error = "We’re sorry, an unexpected error has occurred. Notification has been sent to IT Enterprise Support team";
            HomeService.sendErrorMailandUpdateLog(ex.message, $scope.SelectedDocument.documentFriendlyName);
            throw (ex);
        }

    };

    //Function for returning transformed description text
    this.transformDescription = function(desc) {

        var data = "";
        var Untransform_data = desc;

        if (Untransform_data != "") {
            //remove any digit and # sign from data
            data = Untransform_data.replace(/#/, '');
           
            if (data.indexOf("reversal") != -1 || data.indexOf("Reversal") != -1) {
                data = data.replace(/reversal/, "Returned");
                data = data.replace(/Reversal/, "Returned");
            }
            else if (data.indexOf("Disbursement") != -1 || data.indexOf("disbursement") != -1) {
                //HP26248 - SP144
                if (data.indexOf("[NJM]") != -1) {
                    data = data.replace(/Disbursement/, "Transferred");
                    data = data.replace(/\[.*?\]/g, "");
                }
            }
            else if (data.indexOf("reversal") != -1 || data.indexOf("Reversal") != -1) {
                data = data.replace(/reversal/, "Returned");
                data = data.replace(/Reversal/, "Returned");
            }
            else {
                data = data.replace(/\[.*?\]/g, "Thank You");
            }
        }

        return data;
    }

    this.getIDCardDate = function(dt) {
        var month = new Array(12);
        month[1] = "JAN";
        month[2] = "FEB";
        month[3] = "MAR";
        month[4] = "APR";
        month[5] = "MAY";
        month[6] = "JUN";
        month[7] = "JUL";
        month[8] = "AUG";
        month[9] = "SEP";
        month[10] = "OCT";
        month[11] = "NOV";
        month[12] = "DEC";

        var yr1 = parseInt(dt.substring(0, 4));
        var mon1 = parseInt(dt.substring(5, 7), 10);
        var dt1 = parseInt(dt.substring(8, 10), 10);

        var d = new Date(yr1, mon1 - 1, dt1);

        var _year = d.getFullYear();
        var _month = d.getMonth() + 1;

        var _fullMonth = month[_month];
        var _day = d.getDate() + '';

        var dayLen = _day.length;

        if (dayLen == 1) {
            _day = "0" + _day;
        }

        var _idCardDate = _fullMonth + " " + _day + ", " + _year;
        return _idCardDate;
    }

    //Used By GC
    this.getClaimLossDate = function(dt) {
        var month = new Array(12);
        month[1] = "January";
        month[2] = "February";
        month[3] = "March";
        month[4] = "April";
        month[5] = "May";
        month[6] = "June";
        month[7] = "July";
        month[8] = "August";
        month[9] = "September";
        month[10] = "October";
        month[11] = "November";
        month[12] = "December";

        var yr1 = parseInt(dt.substring(0, 4));
        var mon1 = parseInt(dt.substring(5, 7), 10);
        var dt1 = parseInt(dt.substring(8, 10), 10);
        var hr = parseInt(dt.substring(11, 13));
        var min = parseInt(dt.substring(14, 16));
        var sec = parseInt(dt.substring(17, 19));

        var d = new Date(yr1, mon1 - 1, dt1, hr, min, sec);
        var dtLocal = ConvertUTCTimeToLocalTime(d);

        //var d = new Date(yr1, mon1-1, dt1);

        var _year = dtLocal.getFullYear();
        var _month = dtLocal.getMonth() + 1;

        var _fullMonth = month[_month];
        var _day = dtLocal.getDate() + '';

        var dayLen = _day.length;

        if (dayLen == 1) {
            _day = "0" + _day;
        }

        var _lossDate = _fullMonth + " " + _day + ", " + _year;
        return _lossDate;
    }
    function ConvertUTCTimeToLocalTime(UTCDateString) {
        var convertdLocalTime = new Date(UTCDateString);

        var hourOffset = convertdLocalTime.getTimezoneOffset() / 60;

        convertdLocalTime.setHours(convertdLocalTime.getHours() - hourOffset);

        return convertdLocalTime;
    }

    this.getAuthExpDate= function (m) {
        var d = new Date();
        var years = Math.floor(m / 12);
        var months = m - (years * 12);
        if (years) d.setFullYear(d.getFullYear() + years);
        if (months) d.setMonth(d.getMonth() + months);

        var _year = d.getUTCFullYear();
        var _month = d.getUTCMonth();
        var _day = d.getUTCDate();

        var _authtDate = _month + "/" + _day + "/" + _year;
        return _authtDate;
    }

    this.getLetterDate = function() {

        var month = new Array(12);
        month[1] = "January";
        month[2] = "February";
        month[3] = "March";
        month[4] = "April";
        month[5] = "May";
        month[6] = "June";
        month[7] = "July";
        month[8] = "August";
        month[9] = "September";
        month[10] = "October";
        month[11] = "November";
        month[12] = "December";

        var d = new Date();
        var _year = d.getUTCFullYear();
        var _month = d.getUTCMonth() + 1;
        var _fullMonth = month[_month];
        var _day = d.getUTCDate();

        //var _shortYear = _year.substring(0,2);

        var _ltrDate = _month + "" + _day + "" + _year;
        return _ltrDate;
    }

    //Used BY WCC 
    this.getWCCClaimLossDate = function(dt) {
        var month = new Array(12);
        month[1] = "January";
        month[2] = "February";
        month[3] = "March";
        month[4] = "April";
        month[5] = "May";
        month[6] = "June";
        month[7] = "July";
        month[8] = "August";
        month[9] = "September";
        month[10] = "October";
        month[11] = "November";
        month[12] = "December";


        var yr1 = parseInt(dt.substring(0, 4));
        var mon1 = parseInt(dt.substring(5, 7), 10);
        var dt1 = parseInt(dt.substring(8, 10), 10);

        var d = new Date(yr1, mon1 - 1, dt1);

        var _year = d.getUTCFullYear();
        var _month = d.getUTCMonth() + 1;

        var _fullMonth = month[_month];
        var _day = d.getUTCDate();

        var _lossDate = _fullMonth + " " + _day + ", " + _year;
        return _lossDate;
    }
};
