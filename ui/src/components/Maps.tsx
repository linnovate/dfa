import React, { useState } from "react"
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"

type PinProps = {
    lat: number;
    lng: number;
}

type ChooseProps = {
    onSubmit: Function
}

const CustomMarker = (props: any) => {
    const [infoVisible, setInfoVisible] = useState(false);
    return <Marker
        position={props.position}
        visible={props.visible}
        onMouseOver={() => {
            setInfoVisible(true);
        }}
        onMouseOut={() => {
            setInfoVisible(false);
        }}>
        {infoVisible && (<InfoWindow><h4>Lat: {props.position.lat}<br /> Lng: {props.position.lng}</h4></InfoWindow>)}
    </Marker>
}

const UncomposedPinsMap = withScriptjs(withGoogleMap((props: any) => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.lat, lng: props.lng }}>
        <CustomMarker
            position={{ lat: props.lat, lng: props.lng }}
            visible={true}>
        </CustomMarker>
    </GoogleMap>
)));

export const PinMap = (props: PinProps) => (
    <UncomposedPinsMap
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCGNWEx_cSfFlxaon2GjBqynYxrAD7kJbY&libraries=geometry,drawing,places"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        lat={props.lat}
        lng={props.lng}></UncomposedPinsMap>
)

const UncomposedChooseMap = withScriptjs(withGoogleMap((props: any) => {

    const [center, setCenter] = useState({ lat: 33.36157687471931, lng: 35.648549973336756 });
    const [zoom, setZoom] = useState(9)
    const [markerPosition, setMarkerPosition] = useState({ lat: 33.36157687471931, lng: 35.648549973336756 })
    const [markerVisible, setMarkerVisible] = useState(false)

    return <GoogleMap
        onRightClick={(e) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                        setZoom(13)
                    }
                )
            }
        }}
        onClick={(e) => {
            if (e.latLng) {
                setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                setMarkerVisible(true)
                props.onSubmit(e.latLng.lat(), e.latLng.lng())
            }
        }}
        zoom={zoom}
        center={center}
        defaultZoom={8}
        defaultCenter={{ lat: 0, lng: 0 }}>
        <CustomMarker
            position={markerPosition}
            visible={markerVisible}>
        </CustomMarker>
    </GoogleMap>
}));

export const ChooseMap = (props: ChooseProps) => (
    <UncomposedChooseMap
        googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCGNWEx_cSfFlxaon2GjBqynYxrAD7kJbY&libraries=geometry,drawing,places"}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onSubmit={props.onSubmit}></UncomposedChooseMap>
)