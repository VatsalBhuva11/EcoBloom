import React, { useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

export default function Maps_DashBoard({ zoom, onMarkerClick, onMapClick }) {
    const containerStyle = {
        height: "100%",
        width: "95%",
    };
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: "process.env.REACT_APP_GOOGLE_MAPS_API_KEY",
    });
    const continentsBoundingBox = {
        north: 60,
        south: -60,
        east: 140,
        west: -140,
    };

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(center);
        setMap(map);
        const worldBounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(
                continentsBoundingBox.south,
                continentsBoundingBox.west
            ),
            new window.google.maps.LatLng(
                continentsBoundingBox.north,
                continentsBoundingBox.east
            )
        );
        map.fitBounds(worldBounds);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    const [markerPosition, setMarkerPosition] = useState(null);

    const handleMapClick = (event) => {
        // Extract latitude and longitude from the click event
        console.log(event);
        const { latLng } = event;
        const latitude = latLng.lat();
        const longitude = latLng.lng();
        console.log("LAT: ", latitude);
        console.log("LNG: ", longitude);
        onMapClick({
            lat: latitude,
            lng: longitude,
        });

        // Set the marker position
        setMarkerPosition({ lat: latitude, lng: longitude });
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={1}
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
