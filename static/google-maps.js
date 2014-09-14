var map;
var markers = [];
var openInfoWindows = [];
var myLoc;

var plaidObjects = [
{
  location: {
    lat: 42.3744,
    lng: -71.1169
  },
  place: "Harvard",
  charge: "$55,000"
},
{
  location: {
    lat: 41.3111,
    lng: -72.9267
  },
  place: "Yale",
  charge: "$52,000"
},
{
  location: {
    lat: 40.3487,
    lng: -74.6593
  },
  place: "Princeton",
  charge: "$50,000"
},
{
  location: {
    lat: 40.8075,
    lng: -73.9619
  },
  place: "Columbia",
  charge: "$60,000"
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

  console.log(isFraudulent());
}

// Add a marker to the map and push to the array.
function addMarker(plaidObject) {
  var loc = new google.maps.LatLng(plaidObject.location.lat, plaidObject.location.lng);

  var marker = new google.maps.Marker({
    position: loc,
    title: "Charged " + plaidObject.charge + " at " + plaidObject.place,
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

function isFraudulent() {
  var params = "origins=" + myLoc.lat() + "," + myLoc.lng() + "&destinations=";
  for (var i = 0; i < markers.length; i++) {
    params += marker[i].getPosition().lat() + "," + marker[i].getPosition().lng();
    if (i != markers.length-1) {
      params += "|";
    }
  }

  console.log(params);

  $.ajax({
    url: "http://maps.googleapis.com/maps/api/distancematrix/output?" + params,
    data: data,
    success: function(data) {
      console.log(data);
      for (var element in data.rows.elements) {
        console.log(element.duration.text);
      }
    },
    dataType: dataType
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
