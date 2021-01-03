import React, { useState } from "react";
import mapStyles from "./../../mapStyles";
import {
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Grid, Select, Button } from "@material-ui/core";
import {
  DirectionsRenderer,
  DistanceMatrixRenderer,
  PlacesRenderer,
} from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import Search from "./Search";

let service;
const libraries = ["places", "geometry", "drawing"];

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 31.52,
  lng: 74.3587,
};

const NearbyPlaces = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAxVjDd3vsB_QrDH82pyIhsP6bkM54oi6I",
    libraries,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
    let map = mapRef.current;

    // let request = {
    //   location: { lat, lng },
    //   radius: "500",
    //   type: ["hospital"],
    // };
    var request = {
      location: { lat, lng },
      radius: "500",
      query: "restaurant",
    };
    service = new window.google.maps.places.PlacesService(mapRef.current);
    service.textSearch(request, callback);
    function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let place = results[i];
          new window.google.maps.Marker({
            position: place.geometry.location,
            map,
          });
        }
      }
    }
  }, []);

  return (
    <div>
      <Search panTo={panTo} />
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        ref={mapRef}
        zoom={20}
        center={center}
        options={options}
        onLoad={onMapLoad}
      />
    </div>
  );
};

export default NearbyPlaces;
