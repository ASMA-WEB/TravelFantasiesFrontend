import React, { useState } from "react";

let map;
let service;
let infowindow;

export default function Initialize() {
  var pyrmont = new window.google.maps.LatLng(-33.8665433, 151.1956316);
  infowindow = new window.google.maps.InfoWindow();

  map = new window.google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 15,
  });

  var request = {
    location: pyrmont,
    radius: "500",
    type: ["restaurant"],
  };

  service = new window.google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == window.google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
function createMarker(place) {
  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  window.google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}
window.google.maps.event.addDomListener(window, "load", initialize);