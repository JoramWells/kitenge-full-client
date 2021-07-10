import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: -0.00442, lng: 34.598122 }}
    />
  );
}
const Wrapper = withScriptjs(withGoogleMap(Map));

export default function MapComponent() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Wrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places
        &key=AIzaSyDOhUEd6UELM67q5pKRUaCQlQU1Wg0nFaE
        "
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      >
        <Marker position={{ lat: 0.02551, lng: 34.585972 }} />
      </Wrapper>
    </div>
  );
}
