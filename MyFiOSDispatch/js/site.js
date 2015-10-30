
$(document).ready(function () {


    //---------------- Google Map methods --------------------
    function initMap(loadtype) {
        var map_options = {
            center: new google.maps.LatLng(33.84659, -84.35686),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI:true

        };

        var google_map = new google.maps.Map(document.getElementById("map_canvas"), map_options);

        var info_window = new google.maps.InfoWindow({
            content: 'loading'
        });
     
        setCustomerMarker(google_map);
      
        if(loadtype=='install')
        {
            setInstallTechnicianMarker(google_map);
        }
        else  if(loadtype=='repair')
        {
            setRepairTechnicianMarker(google_map);
        }

    }

    function setCustomerMarker(google_map) {

        getCustomerdetails(google_map);

    }

    function setInstallTechnicianMarker(google_map) {

        var api = 'GetInstallTechnician';
        
        getTechnicians(google_map, api);
       

    }

    function setRepairTechnicianMarker(google_map) {

        var technicianType = $("#repairOptions option:selected").val();
        var api='GetRepairTechnician/'+technicianType;
                    getTechnicians(google_map, api);
       
        }

    //---------------- Google Map methods --------------------
    
       
    //------------On Load ------------------
        initMap();
        LoadMessages();   
     $('#mapBox').show();
     $('#messagebox').hide();
    $('#subAction').hide();
    $('#repairOptionstag').hide();    
    $('#datepickertag').hide();
    //------------On Load ------------------


    //------------Events------------------
    $('#lnkordernow').click(function () {
       // debugger;
        $('#messagebox').hide();
        $('#mapBox').show();
        initMap();

        return false;
    });

    $('#lnkmessage').click(function () {
        // debugger;
       // LoadMessages();
        $('#messagebox').show();
        $('#mapBox').hide();

        return false;
    });
    
    $('#lnkinstall').click(function () {

        initMap('install');
        $('#masterAction').hide();
        $('#subAction').show();

        return false;
    });

   

    $("#lnkrepair").click(function () {
        $('#masterAction').hide();
        $('#repairOptionstag').show();
        $('#subAction').show();
        $("#lnkrequestnow").prop("disabled", true);
        $("#lnklater").prop("disabled", true);
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

    $('#lnkback').click(function () {
        initMap();
        $('#masterAction').show();
           $('#subAction').hide();
           $('#repairOptionstag').hide();
           $('#datepickertag').hide();
        return false;
    });

    $('#lnklater').click(function () {
        initMap();
        $('#masterAction').hide();
        $('#subAction').show();
        $('#datepickertag').show();
        return false;
    });

  
    $("#datepickid").change(function () {
       
        var selecteddate = $("#datepickid").val();
        $("#datepickertag1").html(selecteddate);
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

    function LoadMessages() {
       
        var customerid='001'

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/GetAvialbleMessages/" + customerid;
        //var apiUrl = "http://localhost:22283/Service1.svc/GetAvialbleMessages/" + customerid;

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

    function getTechnicians(google_map, api) {
        var technicians;

        var apiUrl = "http://ondemandservice.azurewebsites.net/Service1.svc/" + api;
        // var apiUrl = "http://localhost:22283/Service1.svc/" + api

        $.ajax({
            type: "GET",
            async: false,
            crossDomain: true,
            url: apiUrl,
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {
                //  debugger;
                technicians = $.parseJSON(data);
                if (technicians != null) {
                    //var i = 0;
                    for (var i = 0; i < technicians.length; i++) {
                        var item = technicians[i];
                        if (item != null) {
                            var m = new google.maps.Marker({
                                map: google_map,
                                animation: google.maps.Animation.DROP,
                                title: item.Name,
                                position: new google.maps.LatLng(item.Lat, item.Lang),
                                html: item.skill,

                            });
                        }
                    }
                }

            },

            error: function (jqXHR, status) {
                debugger;
                $("#selectedrepirValue").text("Sever Error");
                techniciandata = null;
                // error handler
            }
        });
        
    }

    function getCustomerdetails(google_map, api) {
        var customerLocation;

        $.ajax({
            type: "GET",
            async: false,
            url: "http://ondemandservice.azurewebsites.net/Service1.svc/GetCustomerLocation",
            contentType: "application/json; charset=utf-8",
            dataType: "jsonp",

            success: function (data, status, jqXHR) {

                customerLocation = $.parseJSON(data);

                for (var i = 0; i < customerLocation.length; i++) {
                    var item = customerLocation[i];
                    var m = new google.maps.Marker({
                        map: google_map,
                        icon: 'images/home1.png',
                        animation: google.maps.Animation.DROP,
                        title: item.Name,
                        position: new google.maps.LatLng(item.Lat, item.Lang),
                        html: item.ServiceType,

                    });

                }
            },

            error: function (jqXHR, status) {

                customerLocation = null;
                // error handler
            }
        });
        
    }

    //------------Service Methods ---------------------
});

