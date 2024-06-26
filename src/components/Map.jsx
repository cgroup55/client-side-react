import React, { useEffect, useRef, useState } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import ttServices from '@tomtom-international/web-sdk-services';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import { Button } from 'react-bootstrap';
import '../styling/Map.css';
import { FaSchool } from 'react-icons/fa';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

export default function Map({ mode, routeDetails = [], school }) {
    const mapElement = useRef();
    const [map, setMap] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const schoolMarker = useRef();
    const [modeFlag, setModeFlag] = useState(false);
    //const [updatedListofPoints, setUpdatedListofPoints] = useState(routeDetails);
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
        console.log('mode in Map:', mode);
        //mode - 'map' for home page, 'route' for office view, 'escort' for escort view
        if (mode != 'map') {
            setModeFlag(true);
        }
        return () => map.remove();
    }, []);



    // Function to create popup content
    const createPopupContent = (point, index) => {
        let popupContent = `
            <div class="custom-popup">
                <b>${point.studentFullName ? point.studentFullName : `תחנת ${index === 0 ? "מוצא" : "יעד"} - בית ספר ${school}`}</b><br>
                כתובת: ${point.street} ${point.houseNumber}, ${point.city}
            </div>`;

        if (point.studentFullName && mode === "escort") {
            popupContent += `
                <div class="attendance-buttons">
                נוכחות:
                    <button class="attendance-btn v-btn" data-student-id="${point.studentId}" data-present="true">V</button>
                    <button class="attendance-btn x-btn" data-student-id="${point.studentId}" data-present="false">X</button>
                </div>`;
        }

        return popupContent;
    };

    useEffect(() => {
        if (map && routeDetails.length > 0) {
            let marker, popup, popupContent;

            let schoolIsFirst = false; //flag
            console.log('schoolMarker', schoolMarker);
            if (routeDetails[0].studentId == '') {
                marker = new tt.Marker({ element: schoolMarker.current })
                    .setLngLat([routeDetails[0].longitude, routeDetails[0].latitude])
                    .addTo(map);
                popup = new tt.Popup({ offset: 35 });
                popupContent = createPopupContent(routeDetails[0], 0);
                popup.setHTML(popupContent);
                marker.setPopup(popup);
                popup.addTo(map);
                schoolIsFirst = true;
            }
            else {
                marker = new tt.Marker({ element: schoolMarker.current })
                    .setLngLat([routeDetails[routeDetails.length - 1].longitude, routeDetails[routeDetails.length - 1].latitude])
                    .addTo(map);
                popup = new tt.Popup({ offset: 35 });
                popupContent = createPopupContent(routeDetails[routeDetails.length - 1], routeDetails.length - 1);
                popup.setHTML(popupContent);
                marker.setPopup(popup);
                popup.addTo(map);
            }

            //Add markers for each route point
            for (let i = 0; i < routeDetails.length; i++) {
                if (schoolIsFirst || (!schoolIsFirst && i + 1 == routeDetails.length)) {
                    continue;
                }
                let point = routeDetails[i];
                marker = new tt.Marker()
                    .setLngLat([point.longitude, point.latitude])
                    .addTo(map);

                popup = new tt.Popup({ offset: 35 });
                popupContent = createPopupContent(point, i);
                popup.setHTML(popupContent);
                marker.setPopup(popup);
                popup.addTo(map);

            }


            // Event delegation for dynamically added buttons
            document.addEventListener('click', function (event) {
                if (event.target.matches('.attendance-btn')) {
                    const studentId = event.target.getAttribute('data-student-id');
                    const isPresent = event.target.getAttribute('data-present') === 'true';
                    updateAttendance(studentId, isPresent);
                }
            }, false);

            console.log("routeDetails", routeDetails);
            drawRoute(routeDetails);
        }
    }, [map, routeDetails, mode]);


    // Function to update attendance - for later 
    const updateAttendance = (point, isPresent) => {
        console.log("point", point, "ispresent", isPresent);
    };

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

                //תוספת סימולטר של בני
                //response.routes[0].legs[0].points;
                //console.log("response.routes", response.routes[0].legs[0].points);
                const allPoints = extractLatLngPoints(response);
                console.log('allPoints:', allPoints);
                //

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

    //Extract all lat-lng points from the response
    const extractLatLngPoints = (response) => {
        const latLngPoints = [];

        response.routes.forEach(route => {
            route.legs.forEach(leg => {
                leg.points.forEach(point => {
                    latLngPoints.push({ lat: point.lat, lng: point.lng });
                });
            });
        });
        return latLngPoints;
    };

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
            {modeFlag && <div id='schoolMarker' ref={schoolMarker}><HomeWorkOutlinedIcon /></div>}
            <div id="map" ref={mapElement} className="mapDiv" style={{ position: "relative", top: "10px", width: '100%', height: '90%' }}></div>
        </div>
    );
}
