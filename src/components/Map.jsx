import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ttServices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import { Button } from 'react-bootstrap';

export default function Map({ mode, routeDetails = [], linewithPoints}) {
    const mapElement = useRef();
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [updatedListofPoints, setUpdatedListofPoints] = useState(routeDetails);
    const myKey = "VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI";

    //set map to default center
    useEffect(() => {
        const map = tt.map({
            key: myKey,
            container: mapElement.current,
            center: [34.90899, 32.17828],
            zoom: 13
        });
        setMap(map);

        return () => map.remove();
    }, []);

    useEffect(() => {
        console.log(linewithPoints);
        AddSchoolToRoute();
    }, [linewithPoints]);

    useEffect(() => {
        if (map && updatedListofPoints.length > routeDetails.length ) {
            console.log("updatedListofPoints",updatedListofPoints);
            console.log("updatedListofPoints[0]",updatedListofPoints[0].studentFullName);
            // Add markers for each route point
            updatedListofPoints.forEach((point) => {
                const marker = new tt.Marker()
                    .setLngLat([point.longitude, point.latitude])
                    .addTo(map);

                // Add a popup to the marker
                const popup = new tt.Popup({ offset: 35 });
                if (point.studentFullName != undefined) {
                    popup.setHTML(`
                    <div class="custom-popup">
                        <b>${point.studentFullName}</b><br>
                        כתובת: ${point.street} ${point.houseNumber}, ${point.city}
                    </div>`
                );
                }
                else{
                    popup.setHTML(`
                    <div class="custom-popup">
                        <b>תחנת ${linewithPoints.line.station_definition}:</b><br>
                        בית ספר ${linewithPoints.line.school_of_line}
                        
                    </div>`);
                }
                 marker.setPopup(popup);
                popup.addTo(map);

               

            });
            console.log("routeDetails", routeDetails);
            drawRoute(updatedListofPoints);
        }
    }, [map, updatedListofPoints]);


    //gets routePoints and draws map
    const drawRoute = (routeDetails) => {
        const routeOptions = {
            key: myKey,
            locations: routeDetails.map(point => ({
                latitude: point.latitude,
                longitude: point.longitude

            }))
        };


        //calculate the route on map
        console.log("routeOptions", routeOptions);
        ttServices.services.calculateRoute(routeOptions)
            .then(response => {
                console.log("response", response);
                const geojson = response.toGeoJson();
                console.log("geojson", geojson);
                if (map.getSource('route')) {
                    map.getSource('route').setData(geojson);
                } else {
                    map.addSource('route', { type: 'geojson', data: geojson });
                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        paint: {
                            'line-color': '#4a90e2',
                            'line-width': 6
                        }
                    });
                }

                const bounds = new tt.LngLatBounds();
                routeDetails.forEach(point => {
                    bounds.extend([point.longitude, point.latitude]);
                });
                map.fitBounds(bounds, { padding: 20 });
            })
            .catch(err => {
                console.error('Error calculating route:', err);
            });
    };

    const AddSchoolToRoute= ()=>{
    if(mode=='route'){
    console.log("in AddSchoolToRoute",linewithPoints);
        let schoolStation={
            latitude:linewithPoints.latitude,
            longitude:linewithPoints.longitude,
            comment:"" 
        };

        if(linewithPoints.line.station_definition=="מוצא")
        {
            schoolStation.comment="נקודת המוצא:";
            setUpdatedListofPoints(prevList => [schoolStation, ...prevList]);

        }
        else{
            schoolStation.comment="נקודת היעד:";
            setUpdatedListofPoints(prevList => [...prevList, schoolStation]);
        }
    }}


    //add marker to a spesific point from search
    const handleSearch = () => {
        ttServices.services.fuzzySearch({
            key: myKey,
            query: searchQuery,
            limit: 1
        })
            .then(response => {
                const result = response.results[0];
                if (result) {
                    const { position } = result;
                    map.setCenter([position.lng, position.lat]);
                    new tt.Marker().setLngLat([position.lng, position.lat]).addTo(map);
                }
            })
            .catch(error => {
                console.error('Error performing search:', error);
            });
    };

    return (
        <div style={{ position: 'relative', top: "0px", width: '80vw', height: '600px' }}>
            {mode === 'map' && (
                <div style={{ position: 'relative', top: "0px" }}>
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
                            direction: 'rtl'
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
                            direction: 'rtl'
                        }}
                    >
                        חיפוש
                    </Button>
                </div>
            )}

            <div id="map" ref={mapElement} className="mapDiv" style={{ position: "relative", top: "10px", width: '100%', height: '90%' }}></div>
        </div>
    );
}
