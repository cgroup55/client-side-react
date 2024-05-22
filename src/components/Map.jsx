import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

export default function Map() {

    // let times = 0;
    // let cent = [34.90899, 32.17828];
    // useEffect(() => {
    //     console.log(++times);///how many times does the page re-render?
    //     const map = tt.map({
    //         key: 'VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI',
    //         container: 'map',
    //         center:  [34.90899, 32.17828],
    //         zoom: 12
    //     });


    //     //component unmount
    //     return () => {
    //         map.remove();
    //     };
    // }, []); // Empty dependency array ensures this effect runs only once after the component is mounted


    // return (
    //     <>

    //         <div id="map" style={{ width: '80vw', height: '350px' }}></div>
    //     </>
    // )


    const mapElement = useRef();

    const [mapLongitude, setMapLongitude] = useState(34.90899);
    const [mapLatitude, setMapLatitude] = useState(32.17828);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState({});

    useEffect(() => {
        let map = tt.map({
            key: "VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        setMap(map);

        //component unmount
        return () => map.remove();
        
    }, []); // Empty dependency array ensures this effect runs only once after the component is mounted

    return (
        <div id="map" ref={mapElement} className="mapDiv" style={{ width: '80vw', height: '550px' }}></div>
    )



}
