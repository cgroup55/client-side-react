import React, { useRef, useState, useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';

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
        <div style={{ position: 'relative', width: '80vw', height: '600px' }}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="הזן כתובת"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 1000,
                    padding: '10px',
                    width: '300px',
                    borderRadius: '5px',
                    direction: 'rtl' // Right-to-left text direction
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '320px',
                    zIndex: 1000,
                    padding: '10px',
                    borderRadius: '5px',
                    direction: 'rtl' // Right-to-left text direction
                }}
            >
                חיפוש
            </button>
            <div id="map" ref={mapElement} className="mapDiv" style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
}
