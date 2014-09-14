var map;
var markers = [];
var openInfoWindows = [];
var myLoc;

var bloopplaidObjects = [
{
  meta: {
    location: {
      coordinates: {
        lat: 42.3744,
        lng: -71.1169
      }
    }
  },
  name: "Harvard",
  amount: "$55,000"
},
{
  meta: {
    location: {
      coordinates: {
        lat: 41.3111,
        lng: -72.9267
      }
    }
  },
  name: "Yale",
  amount: "$52,000"
},
{
  meta: {
    location: {
      coordinates: {
        lat: 40.3487,
        lng: -74.6593
      }
    }
  },
  name: "Princeton",
  amount: "$50,000"
},
{
  meta: {
    location: {
      coordinates: {
        lat: 40.8075,
        lng: -73.9619
      }
    }
  },
  name: "Columbia",
  amount: "$60,000"
}
];

function initialize() {
  var myLoc = new google.maps.LatLng(40.8075,-73.9619);
  
  var mapOptions = {
    center: myLoc,
    zoom: 8
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    closeOpenWindows();
  });

  for (var i=0; i<plaidObjects.length; i++) {
    addMarker(plaidObjects[i]);
  }
}

// Add a marker to the map and push to the array.
function addMarker(plaidObject) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json";
  var addr = plaidObject.name.replace(/\s/g, "+");
  if (plaidObject.meta.location.city != null) {
    addr += plaidObject.meta.location.city.replace(/\s/g, "+");
  }
  if (plaidObject.meta.location.state != null) {
    addr += plaidObject.meta.location.state.replace(/\s/g, "+");
  }

//  var geocoder = new google.maps.Geocoder();
//  var geocoderRequest = { address: addr };
//  geocoder.geocode(geocoderRequest, function(results, status){
//    //do your result related activities here, maybe push the coordinates to the backend for later use, etc.
//  });

  $.ajax({
    url: url,
    data: {"address": addr, "key": key},
    success: function(data) {
      console.log(data);
      var loc = new google.maps.LatLng(data.results.geometry.location.lat, data.results.geometry.location.lng);

      var marker = new google.maps.Marker({
        position: loc,
        title: "Charged " + plaidObject.amount + " at " + plaidObject.name,
        map: map
      });

      google.maps.event.addListener(marker, 'click', function(event) {
        map.setZoom(15);
        map.setCenter(marker.getPosition());

        var infowindow = new google.maps.InfoWindow({
          content: "<span>" + marker.title + "</span>"
        });
        openInfoWindows.push(infowindow);
        infowindow.open(map,marker);
      });

      markers.push(marker);

    }
  });
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

// Close open info windows
function closeOpenWindows() {
  for(var infowindow in openInfoWindows) {
    infowindow.close();
  }
}

function getCoordinates(name, city, state, key) {
}

google.maps.event.addDomListener(window, 'load', initialize);
