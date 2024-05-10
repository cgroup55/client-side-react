import React, { useEffect } from 'react';
import tt from '@tomtom-international/web-sdk-maps';

export default function Map() {

    let times=0;
   let cent=[34.90899,32.17828];
    useEffect(() => { 
        console.log(++times);///how many times does the page re-render?
        const map = tt.map({
            key: 'VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI',
            container: 'map',
            center:cent,
            zoom: 12
        });
        

        //component unmount
        return () => {
            map.remove();
        };
    }, []); // Empty dependency array ensures this effect runs only once after the component is mounted


    return (
        <>
        
            <div id="map" style={{width:'80vw',height:'350px'}}></div>
        </>
    )
}
