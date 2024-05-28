import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Map from './Map';
import { readById } from '../tools/api.js';

const RouteVizualization = () => {
    const location = useLocation();
    const linenumber = location.state.line_code;
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
            <div className='row'>
                <div className='col-8'>
                <Map routeDetails={routeDetails} mode="route" />
                </div>  
                <div className='col-4' style={{}}>
                    
                </div>  
            </div>
        </div>
    );
};

export default RouteVizualization;
