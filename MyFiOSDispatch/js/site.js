// call this from the developer console and you can control both instances
var calendars = {};


$(document).ready(function () {

    function initialize(loadtype) {
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
       // setCustomerMarker(google_map);
      
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

        var customerLocation = [
['Your Location', 33.846253, -84.362125, '<p><strong>Location Name 2</strong><br />Address 2</p>'],

        ];


        for (var i = 0; i < customerLocation.length; i++) {
            var item = customerLocation[i];
            var m = new google.maps.Marker({
                map: google_map,
                icon: 'images/home1.png',
                animation: google.maps.Animation.DROP,
                title: item[0],
                position: new google.maps.LatLng(item[1], item[2]),
                html: item[3],

            });

        }
    }

    function setInstallTechnicianMarker(google_map) {

//        var installTechnician = [
//['Technician 1', 33.84659, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],
//['Technician 2', 33.846553, -84.35886, '<p><strong>Location Name 3</strong><br />Address 3</p>'],
//['Technician 3', 33.846653, -84.366125, '<p><strong>Location Name 4</strong><br />Address 4</p>'],

//        ];

        var api = 'GetInstallTechnician';
        // var technicians = getTechnicians(api);
        getTechnicians(google_map, api);
        //debugger;
        ////var i = 0;
        //for (var i = 0; i < installTechnician.length; i++) {
        //    var item = installTechnician[i];
        //    var m = new google.maps.Marker({
        //        map: google_map,
        //        animation: google.maps.Animation.DROP,
        //        title: item[0],
        //        position: new google.maps.LatLng(item[1], item[2]),
        //        html: item[3],

        //    });
        //}
        //if (technicians != null) {
        //    //var i = 0;
        //    for (var i = 0; i < technicians.length; i++) {
        //        var item = technicians[i];
        //        if (item != null) {
        //            var m = new google.maps.Marker({
        //                map: google_map,
        //                animation: google.maps.Animation.DROP,
        //                title: item.Name,
        //                position: new google.maps.LatLng(item.Lat, item.Lang),
        //                html: item.skill,

        //            });
        //        }
        //    }
        //}

    }

    function setRepairTechnicianMarker(google_map) {

        var technicianType = $("#repairOptions option:selected").val();
        var api='GetRepairTechnician/'+technicianType;
//        var technicians =
            getTechnicians(google_map, api);
       //debugger;
       //     if(technicians!=null)

       //     {
       //         //var i = 0;
       //         for (var i = 0; i < technicians.length; i++) {
       //             var item = technicians[i];
       //             if (item != null) {
       //                 var m = new google.maps.Marker({
       //                     map: google_map,
       //                     animation: google.maps.Animation.DROP,
       //                     title: item.Name,
       //                     position: new google.maps.LatLng(item.Lat, item.Lang),
       //                     html: item.skill,

       //                 });
       //             }
       //         }
       //     }

        }

        function getTechniciandetails()
        {
           
            var technicianType = $("#repairOptions option:selected").val() ;

            if(technicianType=='equipment')

            {
                var technicians = [
['Technician 1', 33.84359, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],


                ];

                return technicians;
            }
            else  if(technicianType=='internet')
            {
                var technicians = [
['Technician 1', 33.84559, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],
['Technician 1', 33.84759, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],
   

                ];

                return technicians;

            }
            else  if(technicianType=='voice')
            {
                var technicians = [
['Technician 1', 33.84659, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],

                ];

                return technicians;

            }
            else
            {
                return null;

            }
             
                   
        }
       
    
    
        function getTechnicians(google_map, api) {
            var technicians;
            
            $.ajax({
                type: "GET",
                async: false,
                crossDomain: true,
                url: "http://ondemandservice.azurewebsites.net/Service1.svc/GetInstallTechnician",
                //url: "http://localhost:22283/Service1.svc/GetInstallTechnician",// + api,
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

                    // initialize(actiontype, techniciandata);
                    //return techniciandata;
                   // $('#selectedrepirValue').text(data);
                },

                error: function (jqXHR, status) {
                   debugger;
                    $("#selectedrepirValue").text("Sever Error");
                    techniciandata= null;
                    // error handler
                }
            });
         //   return techniciandata;
        }

        function getCustomerdetails(api) {
            var techniciandata;

            $.ajax({
                type: "GET",
                async: false,               
                url: "http://localhost:22283/Service1.svc/" + api,
                contentType: "application/json; charset=utf-8",
                dataType: "json",

                success: function (data, status, jqXHR) {

                    techniciandata = $.parseJSON(data);
                    // initialize(actiontype, techniciandata);
                    //return techniciandata;
                    // $('#selectedrepirValue').text(data);
                },

                error: function (jqXHR, status) {
                    debugger;
                    techniciandata = null;
                    // error handler
                }
            });
            return techniciandata;
        }
     initialize();
    //    getTechnicians();

    
    $('#subAction').hide();
    $('#repairOptionstag').hide();    
    $('#datepickertag').hide();

    $('#lnkinstall').click(function () {
        
        initialize('install');
        $('#masterAction').hide();
        $('#subAction').show();

        return false;
    });
    
    $('#lnkrepair').click(function () {
        
        $('#masterAction').hide();
        $('#repairOptions').trigger("click");
        //$('#repairOptionstag').show();      
        return false;
    });

    $('#lnkback').click(function () {
        initialize();
        $('#masterAction').show();
           $('#subAction').hide();
       
        return false;
    });

    $("#repairOptions").change(function () {
         $('#repairOptionstag').hide();
        $('#subAction').show();       
        initialize('repair');
    });
    
    $('#repairOptions').click(function () {
        
        $('#repairOptionstag').show();
          return false;
    });
     



 

    //$(".repair_option").click(function (e) {
    //   debugger;
    //    alert(e.val());
    //});



});



//$(document).ready( function() {

//  // assuming you've got the appropriate language files,
//  // clndr will respect whatever moment's language is set to.
//  // moment.lang('ru');

//    $(".compliantregister").hide();

//  // here's some magic to make sure the dates are happening this month.
//  var thisMonth = moment().format('YYYY-MM');

//  var eventArray = [
//    { startDate: thisMonth + '-10', endDate: thisMonth + '-14', title: 'Multi-Day Event' },
//    { startDate: thisMonth + '-21', endDate: thisMonth + '-23', title: 'Another Multi-Day Event' }
//  ];

//  // the order of the click handlers is predictable.
//  // direct click action callbacks come first: click, nextMonth, previousMonth, nextYear, previousYear, or today.
//  // then onMonthChange (if the month changed).
//  // finally onYearChange (if the year changed).

//  calendars.clndr1 = $('.cal1').clndr({
//    events: eventArray,
//    // constraints: {
//    //   startDate: '2013-11-01',
//    //   endDate: '2013-11-15'
//    // },
//    clickEvents: {
//      click: function(target) {
//        console.log(target);
//        if($(target.element).hasClass('inactive')) {
//          console.log('not a valid datepicker date.');
//        } else {
//          console.log('VALID datepicker date.');
//        }
//      },
//      nextMonth: function() {
//        console.log('next month.');
//      },
//      previousMonth: function() {
//        console.log('previous month.');
//      },
//      onMonthChange: function() {
//        console.log('month changed.');
//      },
//      nextYear: function() {
//        console.log('next year.');
//      },
//      previousYear: function() {
//        console.log('previous year.');
//      },
//      onYearChange: function() {
//        console.log('year changed.');
//      }
//    },
//    multiDayEvents: {
//      startDate: 'startDate',
//      endDate: 'endDate'
//    },
//    showAdjacentMonths: true,
//    adjacentDaysChangeMonth: false
//  });

//  // calendars.clndr2 = $('.cal2').clndr({
//  //   template: $('#template-calendar').html(),
//  //   events: eventArray,
//  //   startWithMonth: moment().add('month', 1),
//  //   clickEvents: {
//  //     click: function(target) {
//  //       console.log(target);
//  //     }
//  //   }
//  // });

//  // bind both clndrs to the left and right arrow keys
//  $(document).keydown( function(e) {
//    if(e.keyCode == 37) {
//      // left arrow
//      calendars.clndr1.back();
//      calendars.clndr2.back();
//    }
//    if(e.keyCode == 39) {
//      // right arrow
//      calendars.clndr1.forward();
//      calendars.clndr2.forward();
//    }
//  });


//  $('#lnkCompliants').click(function () {
      
//       $(".compliantregister").show();
      
//       $(".column_left").hide();
    
//      return false;
//  });

//  $('#lnkProfile').click(function () {

//      $(".column_left").show();

//      $(".compliantregister").hide();

//      return false;
//  });

//});