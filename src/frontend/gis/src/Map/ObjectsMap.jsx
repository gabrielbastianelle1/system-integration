import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import ObjectMarkersGroup from "./ObjectMarkersGroup";

function ObjectsMap() {
    return (
        <>
            <button style={{
                display: 'absolute'
            }}>Clica carai</button>
            <MapContainer style={{width: "100%", height: "100vh"}}
                        center={[0.000000, 0.000000]}
                        zoom={3}
                        scrollWheelZoom={false}
            >
                {<TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />}
                <ObjectMarkersGroup/>
            </MapContainer>
        </>
    );
}

export default ObjectsMap;