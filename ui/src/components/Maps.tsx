import React, { useState } from "react"
import { GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"

type PinProps = {
    lat : number;
    lng: number;
}

type ChooseProps = {
    onSubmit: Function
}

const UncomposedPinsMap = withScriptjs(withGoogleMap((props: any) => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.lat, lng: props.lng }}>    
      <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
    )));

export const PinsMap = (props: PinProps) => (
    <UncomposedPinsMap
        googleMapURL= {"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"}
        loadingElement= {<div style={{ height: `100%` }} />}
        containerElement= {<div style={{ height: `100%` }} />}
        mapElement= {<div style={{ height: `100%` }} />}
        lat= {props.lat} 
        lng= {props.lng}></UncomposedPinsMap>
)

const UncomposedChooseMap = withScriptjs(withGoogleMap((props: any) => {

    const [center, setCenter] = useState({lat:0, lng:0});
    const [zoom, setZoom] = useState(8)
    const [markerPosition, setMarkerPosition] = useState({lat:0, lng:0})
    const [markerVisible, setMarkerVisible] = useState(false)

    return <GoogleMap
        onRightClick={(e) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
                        setZoom(13)
                    }
                )
            }
        }}
        onClick={(e) => {
            if (e.latLng) {
                setMarkerPosition({lat: e.latLng.lat(), lng: e.latLng.lng()})
                setMarkerVisible(true)
                props.onSubmit(e.latLng.lat(), e.latLng.lng())
            }
        }}
        zoom={zoom}
        center={center}
        defaultZoom={8}
        defaultCenter={{lat:0,lng:0}}>
            <Marker position={markerPosition} visible={markerVisible}></Marker>
    </GoogleMap>
}));

export const ChooseMap = (props: ChooseProps) => (
    <UncomposedChooseMap
        googleMapURL= {"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"}
        loadingElement= {<div style={{ height: `100%` }} />}
        containerElement= {<div style={{ height: `100%` }} />}
        mapElement= {<div style={{ height: `100%` }} />}
        onSubmit={props.onSubmit}></UncomposedChooseMap>
)