import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Map from './Map';
import { readById } from '../tools/api.js';

const RouteVizualization = () => {
    const location = useLocation();
    const line = location.state.fixedLine;
    console.log('line in Route page:', line);

    const linenumber = line.line_code;
    const url = 'api/Transportation_Line/LineRouteInfo';

    const [routeDetails, setRouteDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchRouteDetails = async () => {
            if (linenumber !== undefined) {
                try {
                    console.log("linenumber in useEffect", linenumber);
                    const res = await readById(url, 'linecod', linenumber);
                    console.log('res from db:', res);
                    if (res) {
                        console.log("details from server", res);
                        setRouteDetails(res);
                    } else {
                        console.error('No route details found for the given line number');
                    }
                } catch (error) {
                    console.error('Error fetching route details:', error);
                    setError('Error fetching route details');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchRouteDetails();
    }, [linenumber]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
        <h3 className="bold" style={{ textAlign: 'center' }}>תצוגת מסלול אופטימלי </h3>
        <div className='row'style={{justifyContent:'center'}}>
        <div className='col-12 line_details' >
            <span>קו מספר: {line.line_code}</span>
            <span style={{marginRight: '70px' }}>מלווה: {line.escort_incharge}</span>
            <span style={{ marginRight: '70px' }}>חברת הסעה: {line.transportation_company}</span>
            <span style={{marginRight: '70px'}}>מוסד לימודי: {line.school_of_line}</span>
        </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <Map routeDetails={routeDetails} mode="route" />
            </div>
        </div>
    </div>
    
    );
};

export default RouteVizualization;
