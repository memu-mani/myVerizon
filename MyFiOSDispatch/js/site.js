//var map = null;
$(document).ready(function ()
{
    debugger;
    setCustomerMarker();

    function initMap(loadtype, repairOption) {
        //SetCustomerLocation();
        setCustomerMarker();

        if (loadtype == 'newfios') {
            setNewFiosMarker();
        }
        else if (loadtype == 'repair') {
            setRepairTechnicianMarker(repairOption);
        }
        else if (loadtype == 'track') {
            getTechdetails()
        }

    }

    function setCustomerMarker() {
        getCustomerdetails();
    }

    function setNewFiosMarker() {
        var api = 'GetNewFiosAgent';

        getTechniciansOrAgent(api);


    }

    function setRepairTechnicianMarker(repairOption) {

        var technicianType = repairOption;
        var api = 'GetRepairTechnician/' + technicianType;
        getTechniciansOrAgent(api);

    }

    //---------------- Google Map methods --------------------


    //------------On Load ------------------
    //    initMap();
    $('.centerDiv').hide();
    LoadMessages();
    $('#loader').hide();
    $('#divTrack').hide();
    $('#mapBox').show();
    $('#menuIcon').show();

    $('#messagebox').hide();
    $('#subAction').hide();
    $('#repairOptionstag').hide();
    $('#divTrackHeader').hide();
    $('#divNewFioskHeader').hide();
    $('#divDispatchkHeader').hide();
    $('#divNewFiosHeader').hide();
    $('#datepickertag').hide();

    //------------On Load ------------------


    //------------Events------------------
    $('#lnkNewFios').click(function () {
        // debugger;
        $('#messagebox').hide();
        $('#divNewFiosHeader').show();
        $('#mapBox').show();
        $('#divRepair').hide();
        $('#divTrack').hide();
        $('#divTrackHeader').hide();
        $('#divMessageHeader').hide();
        $('#divDispatchHeader').hide();
        $('#divAppoinment').show();


        initMap('newfios', 'na');

        return false;
    });

    $('#laterOk').click(function () {
        debugger;
        $('.centerDiv').hide();
        $('#mapBox').show();

        UpdateAppointment($('#dispatchDate').val());
        return false;
    });

    $('#lnkmessage').click(function () {
        //debugger;
        LoadMessages();
        $('#messagebox').show();
        $('#mapBox').hide();
        $('#divTrack').hide();
        $('#divDispatchHeader').hide();
        $('#divNewFiosHeader').hide();
        return false;
    });

    $('#lnkTrack').click(function () {
        //debugger;
        $('#mapBox').show();
        $('#divTrackHeader').show();
        $('#messagebox').hide();
        $('#divTrack').show();
        $('#divAppoinment').hide();
        $('#divRepair').hide();
        $('#divDispatchHeader').hide();
        $('#divNewFiosHeader').hide();
        initMap('track', 'track');
        return false;
    });

    $('#lnkRequestTech').click(function () {
        // debugger;
        $('.centerDiv').hide();
        LoadMessages();
        $('#loader').hide();
        $('#divTrack').hide();
        $('#mapBox').show();
        $('#menuIcon').show();

        $('#messagebox').hide();
        $('#subAction').hide();
        $('#repairOptionstag').hide();
        $('#divTrackHeader').hide();
        $('#divNewFioskHeader').hide();
        $('#divDispatchHeader').show();
        $('#divRepair').show();
        $('#divAppoinment').show();
        $('#divNewFiosHeader').hide();

    });

    $('.repairImg').click(function () {
        debugger;
        repairOption = $(this).attr('id');
        $('#divNewFiosHeader').hide();
        $('#divMessageHeader').hide();
        $('#messagebox').hide();
        $('#divTrackHeader').hide();
        $('#divDispatchHeader').show();
        $('#divRepair').show();
        $('#mapBox').show();
        initMap('repair', repairOption);

    });

    $('#requestNow').click(function () {


        //alert("Please confirm your request");

        var result = window.confirm("Kindly confirm. Upon your confirmation our technician will be reach out to you within 1 hour. Check messages for more details.");

        if (result = true) {
            UpdateAppointment('now');
        }

        return false;
    });

    $('#later').click(function () {
        //debugger;
        //confirm("Please confirm your request");

        $('.centerDiv').show();
        //divDate

        return false;
    });


    $("#lnkrepair").click(function () {
        $('#masterAction').hide();
        $('#repairOptionstag').show();
        $('#subAction').show();
        $("#lnkrequestnow").prop("disabled", true);
        $("#lnklater").prop("disabled", true);
        $('#divNewFiosHeader').hide();
        $('#masterAction').hide();
        // open($('#repairOptions'));
    });


    function open(elem) {
        //  debugger;
        if (document.createEvent) {
            var e = document.createEvent("MouseEvents");
            e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem[0].dispatchEvent(e);
        } else if (element.fireEvent) {
            elem[0].fireEvent("onmousedown");
        }
    }

    $('#lnklater').click(function () {
        initMap();
        $('#masterAction').hide();
        $('#subAction').show();
        $('#datepickertag').show();
        return false;
    });


    $("#repairOptions").change(function () {
        initMap('repair');
        $('#repairOptionstag').hide();
        $('#subAction').show();
        $("#lnkrequestnow").prop("disabled", false);
        $("#lnklater").prop("disabled", false);

    });

    //------------Events------------------

    //------------Service Methods ---------------------

    
    function LoadMessages(type) {

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/GetAvialbleMessages/" + type;
//        var apiUrl = "http://localhost:22283/Service1.svc/GetAvialbleMessages/" + type;

        $.ajax({
            type: "GET",
            async: false,
            crossDomain: true,
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {
                //  debugger;
                var messages = $.parseJSON(data);
                if (messages != null) {
                    $('#messagesCount').text(messages.length);
                    $("#messageContainer").empty();
                    $("#messageTemplate").tmpl(messages).appendTo("#messageContainer");

                    $(document).on("click", "a.messageitem", function () {
                        alert($(this).text());
                    });
                }
            },

            error: function (jqXHR, status) {
                debugger;
                $("#selectedrepirValue").text("Sever Error");
                // error handler
            }
        });

    }

    function UpdateAppointment(type) {

        //var customerid='001'

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/UpdateAppointment/" + type;
        //var apiUrl = "http://localhost:22283/Service1.svc/UpdateAppointment/" + type;

        $.ajax({
            type: "GET",
            async: false,
            crossDomain: true,
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {
                //  debugger;
                var messages = $.parseJSON(data);
                if (messages != null) {
                    $('#messagesCount').text(messages.length);
                    $("#messageContainer").empty();
                    $("#messageTemplate").tmpl(messages).appendTo("#messageContainer");


                }
            },

            error: function (jqXHR, status) {
                debugger;
                $("#selectedrepirValue").text("Sever Error");
                // error handler
            }
        });

    }

    function getTechniciansOrAgent(api) {

        var technicians;
        debugger;
       // setCustomerMarker(map);
        var t = new google.maps.Marker({
            map: map,
            icon: 'images/homemarker.png',
            animation: google.maps.Animation.DROP,
            title: 'Test',
            position: new google.maps.LatLng('12.971104', '80.24434500000106'),
            html: 'Home',

        });
      
       
        //map.panTo(new LatLng('12.981106', '80.24433510000005'));

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/" + api;
        //var apiUrl = "http://localhost:22283/Service1.svc/" + api


        $.ajax({
            type: "GET",
            async: false,
            crossDomain: true,
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {
                debugger;
                technicians = $.parseJSON(data);
                if (technicians != null) {
                    //var i = 0;
                    for (var i = 0; i < technicians.length; i++)
                    {
                        var item = technicians[i];
                        var myLatLng = { lat: item.Lang, lng: item.Lat };
                        var lang = item.Lang;
                        var lat = item.Lat;

                        if (item != null) {
                            var m = new google.maps.Marker({
                                map: map,
                                icon: 'images/repair1.png',
                                animation: google.maps.Animation.DROP,
                                title: item.Name,
                                position: new google.maps.LatLng(lang, lat),
                                html: item.skill
                            });
                            m.setMap(map);
                            map.setCenter(m.getPosition());
                            //OR map.panTo(marker.getPosition());  
                        }
                       
                    }
                }
                map.setZoom(19);
                
                
            },

            error: function (jqXHR, status) {
                debugger;
                $("#selectedrepirValue").text("Sever Error");
                techniciandata = null;
                // error handler
            }
        });

    }

    function getCustomerdetails(api)
    {
        debugger;

        var item = customerLocation;
        
        var m = new google.maps.Marker({
            map: map,
            icon: 'images/homemarker.png',
            animation: google.maps.Animation.DROP,
            title: 'Test',
            position: new google.maps.LatLng('12.971104', '80.24434500000106'),
            html: 'Test SErvice',

        });
        
        
        ////var customerLocation;

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/GetCustomerLocation";
        //var apiUrl = "http://localhost:22283/Service1.svc/GetCustomerLocation";

        //$.ajax({
        //    type: "GET",
        //    async: false,
        //    url: apiUrl,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "jsonp",

        //    success: function (data, status, jqXHR) {

        //        customerLocation = $.parseJSON(data);
        //        var item = customerLocation;
        //        var myLatLng = { lat: item.Lat, lng: item.Lang };

        //            var m = new google.maps.Marker({
        //                map: map,
        //                icon: 'images/homemarker.png',
        //                animation: google.maps.Animation.DROP,
        //                title: item.Name,
        //                position: myLatLng,
        //                html: item.ServiceType

        //            });
        //           map.setZoom(18);
                  
        //    },

        //    error: function (jqXHR, status) {

        //        customerLocation = null;
        //        // error handler
        //    }
        //});

    }

    function getTechdetails() {

        //var item = customerLocation;

        var m = new google.maps.Marker({
            map: map,
            icon: 'images/homemarker.png',
            animation: google.maps.Animation.DROP,
            title: 'Test',
            position: new google.maps.LatLng('12.971104', '80.24434500000106'),
            html: 'Test SErvice',

        });

        var customerLocation;
        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/GetTechLocation";
        //var apiUrl = "http://localhost:22283/Service1.svc/GetTechLocation";

        $.ajax({
            type: "GET",
            async: false,
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {

                customerLocation = $.parseJSON(data);

              
                    var item = customerLocation;
                    var myLatLng = { lat: item.Lat, lng: item.Lang };
                  
                    var m = new google.maps.Marker({
                        map: map,
                        icon: 'images/repair1.png',
                        animation: google.maps.Animation.DROP,
                        title: item.Name,
                        position: myLatLng
                    });
                    map.setZoom(19);
                    map.panTo(new LatLng('12.981106', '80.24433510000005'));
               
            },

            error: function (jqXHR, status) {

                customerLocation = null;
                // error handler
            }

        });
    }


    function  SetCustomerLocation()
     {
      debugger;

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/SetCustomerLocation/" + location;
     //var apiUrl = "http://localhost:22283/Service1.svc/SetCustomerLocation/" + customerLocation;

         $.ajax({
             type: "GET",
             async: false,
             crossDomain: true,
             url: apiUrl,
             contentType: "application/json; charset=utf-8",
             dataType: "jsonp",

             success: function (data, status, jqXHR) {
             },
         });
     }
    //------------Service Methods ---------------------
});