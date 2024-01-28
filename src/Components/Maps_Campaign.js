import React, { useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
    width: "600px",
    height: "500px",
};

const center = {
    lat: 25.4294,
    lng: 81.7702,
};

export default function Maps_DashBoard({ zoom, onMarkerClick }) {
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });
    const continentsBoundingBox = {
        north: 85,
        south: -85,
        east: 180,
        west: -180,
    };

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        map.setZoom(14);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const [selectedMarker, setSelectedMarker] = useState(null);
    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        onMarkerClick(marker);
    };

    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (event) => {
        // Extract latitude and longitude from the click event
        console.log(event);
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        console.log("LAT: ", latitude);
        console.log("LNG: ", longitude);

        // Set the marker position
        setMarkerPosition({ lat: latitude, lng: longitude });
    };

    const initialCenter = {
        lat: (continentsBoundingBox.north + continentsBoundingBox.south) / 2,
        lng: (continentsBoundingBox.east + continentsBoundingBox.west) / 2,
    };

    const initialZoom = 1;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            // center={initialCenter}
            zoom={initialZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {markerPosition && <Marker position={markerPosition} />}

            <>
                <img
                    className="mt-10 w-[600px] 2xl:w-[700px]"
                    src={map}
                    alt=""
                />
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}
