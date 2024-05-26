import React, { useRef, useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';
import { Button } from 'react-bootstrap';

export default function Map() {
    const mapElement = useRef();
    const [mapLongitude, setMapLongitude] = useState(34.90899);
    const [mapLatitude, setMapLatitude] = useState(32.17828);
    const [mapZoom, setMapZoom] = useState(13);
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const map = tt.map({
            key: "VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI",
            container: mapElement.current,
            center: [mapLongitude, mapLatitude],
            zoom: mapZoom
        });
        setMap(map);

        // Clean up on component unmount
        return () => map.remove();
    }, []);

    const handleSearch = () => {
        ttServices.services.fuzzySearch({
            key: "VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI",
            query: searchQuery,
            limit: 1
        })
        .then(response => {
            const result = response.results[0];
            if (result) {
                const { position } = result;
                map.setCenter([position.lng, position.lat]);
                setMapLongitude(position.lng);
                setMapLatitude(position.lat);

                // Add a marker to the map
                new tt.Marker().setLngLat([position.lng, position.lat]).addTo(map);
            }
        })
        .catch(error => {
            console.error('Error performing search:', error);
        });
    };

    return (
        
        <div style={{ position: 'relative',top:"0px", width: '80vw', height: '600px' }}>
            <div style={{position: 'relative',top:"0px"}}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="הזן כתובת"
                className='text-start'
                style={{
                    position: 'absolute',
                    zIndex: 1000,
                    padding: '10px',
                    width: '300px',
                    borderRadius: '5px',
                    direction: 'rtl' // Right-to-left text direction
                }}
            />
            <Button
                onClick={handleSearch}
                className='primary'
                style={{
                    position: 'relative',
                    top: '1px',
                    right: '310px',
                    zIndex: 1000,
                    padding: '10px',
                    borderRadius: '5px',
                    direction: 'rtl' // Right-to-left text direction
                }}
             >
                חיפוש
                </Button>
            </div>
            <div id="map" ref={mapElement} className="mapDiv" style={{ position:"relative",top:"10px", width: '100%', height: '90%' }}></div>
            
        </div>
    );
}
