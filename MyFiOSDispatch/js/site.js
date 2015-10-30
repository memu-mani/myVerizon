// call this from the developer console and you can control both instances
var calendars = {};


$(document).ready(function () {

    function initialize() {
        var map_options = {
            center: new google.maps.LatLng(33.84659, -84.35686),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var google_map = new google.maps.Map(document.getElementById("map_canvas"), map_options);

        var info_window = new google.maps.InfoWindow({
            content: 'loading'
        });
        setCustomerMarker(google_map);
        setTechnicianMarker(google_map);

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

    function setTechnicianMarker(google_map) {

        var installTechnician = [
['Technician 1', 33.84659, -84.35686, '<p><strong>Location Name 1</strong><br />Address 1</p>'],
['Technician 2', 33.846553, -84.35886, '<p><strong>Location Name 3</strong><br />Address 3</p>'],
['Technician 3', 33.846653, -84.366125, '<p><strong>Location Name 4</strong><br />Address 4</p>'],

        ];


        //var i = 0;
        for (var i = 0; i < installTechnician.length; i++) {
            var item = installTechnician[i];
            var m = new google.maps.Marker({
                map: google_map,
                animation: google.maps.Animation.DROP,
                title: item[0],
                position: new google.maps.LatLng(item[1], item[2]),
                html: item[3],

            });
        }

    }
    initialize();

    $('#repairOptionstag').hide();
    //  $('#dateforLater').hide();
    $('#datepickertag').hide();

    $('#repairOptions').click(function () {
        
        $("#selectedrepirValue").html('<h3>' + $("#repairOptions option:selected").text() + '</h3>');
          return false;
    });

    $('#action1').click(function () {

        $('#action1').text(' Now ');
        $('#action2').text(' Later ');
        return false;
    });

   

    $('#action2').click(function () {
    
        
        $('#repairOptions').hide();
        $('#datepickertag').hide();
        var action= $('#action2');
        
        if ($.trim(action.text()) == 'Later') {
           
            $('#datepickertag').show();
            $('#datepick').val('01/02/2015');
            $('#datepick').trigger('click');
        }
        else if (action.text().toLowerCase().indexOf("repair") >= 0)
        {
            $('#repairOptionstag').show();
            $('#repairOptions').trigger('click');
        }           
        else {
            
            $('#action1').text(' Now ');
            $('#action2').text(' Later ');
        }
          return false;
    });


    function setDatePicker()
    {

    }

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