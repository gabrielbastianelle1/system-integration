import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import ObjectMarkersGroup from "./ObjectMarkersGroup";

function ObjectsMap() {
    const [options, setOptions] = useState({
        region: 'world',
        neLat: 0,
        neLng: 0,
        swLat: 0,
        swLng: 0
    })

    const handleClickWorld = (event) => {
        setOptions({
            region: 'world'
        })
    }

    const handleClickEurope = (event) => {
        setOptions({
            region: 'europe',
            neLat: -30.058594,
            neLng: 36.447305,
            swLat: 38.320313,
            swLng: 72.023019
        })
    }

    const handleClickAmerica = (event) => {
        setOptions({
            region: 'america',
            neLat: -137.636719,
            neLng: -59.516914,
            swLat: -25.312500,
            swLng: 60.282670
        })
    }

    const handleClickAsia = (event) => {
        setOptions({
            region: 'asia',
            neLat: 36.914063,
            neLng: -10.552599,
            swLat: 156.093750,
            swLng: 51.042857
        })
    }


    return (
        <>
            <button style={{
                display: 'absolute'
            }} onClick={handleClickWorld}>World</button>
            <button style={{
                display: 'absolute'
            }} onClick={handleClickEurope}>Europa</button>
            <button style={{
                display: 'absolute'
            }} onClick={handleClickAmerica}>America</button>
            <button style={{
                display: 'absolute'
            }} onClick={handleClickAsia}>Asia</button>
            <MapContainer style={{width: "100%", height: "100vh"}}
                        center={[0.000000, 0.000000]}
                        zoom={3}
                        scrollWheelZoom={false}
            >
                {<TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />}
                <ObjectMarkersGroup options={options}/>
            </MapContainer>
        </>
    );
}

export default ObjectsMap;