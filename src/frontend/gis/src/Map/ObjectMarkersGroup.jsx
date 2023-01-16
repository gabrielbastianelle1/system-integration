import React, {useEffect, useState} from 'react';
import {LayerGroup, useMap} from 'react-leaflet';
import { getAllCities, getAllMoviesName, getAllCitiesRegion } from '../services/service.data';
import {ObjectMarker} from "./ObjectMarker";


function changetypeFromArrayToObject(city){
    return city[0]
}

function addImageToProperties(city){
    city.properties.imgUrl = "https://cdn-icons-png.flaticon.com/512/777/777242.png"
    return city
}

function changeCoordinates(city){
    let lon = city.geometry.coordinates[0]
    let lat = city.geometry.coordinates[1]
    let coordinates = [lat,lon]
    city.geometry.coordinates = coordinates
    return city
}


function ObjectMarkersGroup({options}) {

    const map = useMap();
    const [geom, setGeom] = useState(undefined);
    const [bounds, setBounds] = useState(map.getBounds());



    /**
     * Setup the event to update the bounds automatically
     */
    useEffect(() => {
        const cb = () => {
            setBounds(map.getBounds());
        }
        map.on('moveend', cb);

        return () => {
            map.off('moveend', cb);
        }
    }, [])

    useEffect(() => {
        console.log('entrei')
        if (options.region === 'world') {
            getAllCities()
                .then((response) => {
                    let data = []
                    response.data.map((city) => {
                        city = changetypeFromArrayToObject(city)
                        city = addImageToProperties(city)
                        city = changeCoordinates(city)
                        data.push(city)
                    })
                    return data
                })
                .then((data) => {
                    data.map((value) => {
                        let id = value.properties.id
                        value.properties.movies = []
                        getAllMoviesName({id})
                            .then((response) => {
                                response.data.map((movie) => {
                                    value.properties.movies.push(movie[0])
                                })
                            })

                    })
                    setGeom(data)
                })
                .catch(error => console.log(error))
        }
        else{
            getAllCitiesRegion(options.neLat, options.neLng, options.swLat, options.swLng)
                .then((response) => {
                    let data = []
                    response.data.map((city) => {
                        city = changetypeFromArrayToObject(city)
                        city = addImageToProperties(city)
                        city = changeCoordinates(city)
                        data.push(city)
                    })
                    return data
                })
                .then((data) => {
                    data.map((value) => {
                        let id = value.properties.id
                        value.properties.movies = []
                        getAllMoviesName({id})
                            .then((response) => {
                                response.data.map((movie) => {
                                    value.properties.movies.push(movie[0])
                                })
                            })

                    })
                    setGeom(data)
                })
                .catch(error => console.log(error))
        }

    },[options])

    if (geom === undefined) {
        return (
            <div>loading</div>
        )
    }

    return (
        <>
            <LayerGroup>
                {
                    geom.map(geoJSON => <ObjectMarker key={geoJSON.properties.id} geoJSON={geoJSON}/>)
                }
            </LayerGroup>
        </>
    );
}

export default ObjectMarkersGroup;
