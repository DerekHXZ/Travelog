var map;
var markers = [];
var openInfoWindows = [];
var myLoc;

var plaidObjects = [{u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 5, u'name': u'Hilton Stn Monorail', u'meta': {u'location': {u'city': u'Las Vegas', u'state': u'NV'}}, u'_entity': u'5415465c8380cb657f16a664', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465c8380cb657f16a66d', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-19', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 5, u'name': u'Ballys Stin Mnrail', u'meta': {u'location': {u'city': u'Las Vegas', u'state': u'NV'}}, u'_entity': u'5415465b8380cb657f16a655', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465b8380cb657f16a65b', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-19', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 5.92, u'name': u'Lvh Paradise Retail Shop', u'meta': {u'location': {u'city': u'Las Vegas', u'state': u'NV'}}, u'_entity': u'5415465a8380cb657f16a637', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465a8380cb657f16a63f', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-19', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 13.08, u'name': u'Fung Lum Concessions C', u'meta': {u'location': {u'city': u'San Francisco', u'state': u'CA'}}, u'_entity': u'5415465c8380cb657f16a66f', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465c8380cb657f16a673', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-18', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 7, u'name': u'LYFT FRI AT 654PM', u'meta': {u'location': {u'state': u'CA'}}, u'_entity': u'541510a35324c5650c722d85', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465a8380cb657f16a63a', u'type': {u'primary': u'digital', u'secondary': u'unresolved'}, u'pending': False, u'date': u'2014-07-18', u'score': {u'master': 0.5, u'detail': {u'identifier': 1}}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 82, u'name': u'Eye Exam 30003925', u'meta': {u'location': {u'city': u'San Francisco', u'state': u'CA'}}, u'_entity': u'541546598380cb657f16a61e', u'category_id': u'52544965f71e87d007000088', u'_id': u'541546598380cb657f16a622', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-17', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011c', u'amount': 101.27, u'name': u'IN *DORM2DORM LLC', u'meta': {u'location': {u'state': u'NY'}}, u'_entity': u'5415103f62f3e9565f713d58', u'_id': u'5415465b8380cb657f16a656', u'type': {u'primary': u'digital', u'secondary': u'unresolved'}, u'pending': False, u'date': u'2014-07-15', u'score': {u'master': 0.5, u'detail': {u'identifier': 1}}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 7.67, u'name': u'Subway 00390153', u'meta': {u'location': {u'city': u'San Francisco', u'state': u'CA'}}, u'_entity': u'5415465c5324c5650c727d6d', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465c5324c5650c727d76', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-13', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 3.28, u'name': u'Safeway Store 00026062', u'meta': {u'location': {u'city': u'San Francisco', u'state': u'CA'}}, u'_entity': u'5415465b8380cb657f16a653', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465b8380cb657f16a65f', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-13', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 11.42, u'name': u'Ayola Montgomery', u'meta': {u'location': {u'city': u'San Francisco', u'state': u'CA'}}, u'_entity': u'5415465b8380cb657f16a64f', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465b8380cb657f16a65c', u'type': {u'primary': u'unresolved'}, u'pending': False, u'date': u'2014-07-12', u'score': {u'master': 0}}, {u'_account': u'541545fd52575ff861e2011d', u'amount': 7.54, u'name': u'UBER TECHNOLOGIES INC', u'meta': {u'location': {u'state': u'CA'}}, u'_entity': u'53d198b4f687c3602ce2fb2f', u'_id': u'5415465c8380cb657f16a66c', u'type': {u'primary': u'digital', u'secondary': u'unresolved'}, u'pending': False, u'date': u'2014-07-11', u'score': {u'master': 0.5, u'detail': {u'identifier': 1}}}, {u'_account': u'541545fd52575ff861e2011d', u'category': [u'Miscellaneous'], u'amount': 480, u'name': u'A DELUXE DRIVING SCHOO', u'meta': {u'location': {u'state': u'CA'}}, u'_entity': u'541510a45324c5650c722d9c', u'category_id': u'52544965f71e87d007000088', u'_id': u'5415465a8380cb657f16a647', u'type': {u'primary': u'digital', u'secondary': u'unresolved'}, u'pending': False, u'date': u'2014-07-10', u'score': {u'master': 0.5, u'detail': {u'identifier': 1}}}];

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

  console.log(isFraudulent());
}

// Add a marker to the map and push to the array.
function addMarker(plaidObject) {
  var loc = new google.maps.LatLng(plaidObject.meta.location.coordinates.lat, plaidObject.meta.location.coordinates.lng);

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
