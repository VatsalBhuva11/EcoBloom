import React, { useState } from "react";
import {
    GoogleMap,
    useJsApiLoader,
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

export default function Maps_DashBoard({ zoom, onMarkerClick, markers }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

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

    const continentsBoundingBox = {
        north: 85,
        south: -85,
        east: 180,
        west: -180,
    };

    const initialCenter = {
        lat: (continentsBoundingBox.north + continentsBoundingBox.south) / 2,
        lng: (continentsBoundingBox.east + continentsBoundingBox.west) / 2,
    };

    const initialZoom = 1;

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={initialCenter}
            zoom={initialZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => onMarkerClick(marker)}
                />
            ))}

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
