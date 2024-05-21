//adress a calling to tomtom geocode conversion method for translating an adress to geocode
export const getGeocodeAddress = async (address) => {
    const geoUrl = createGeocodeUrl(address);
    try {
        const response = await fetch(geoUrl);
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
            const location = data.results[0].position;
            const { lat, lon } = location;
            console.log('Latitude:', lat);
            console.log('Longitude:', lon);
            return { lat, lon };
        } else {
            console.log('No results found for the provided address.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching geocode data:', error);
        return null;
    }
}



//creates the proper url to sync to Tomtom geocode service
function createGeocodeUrl(address) {
    const apiKey = 'VjHNmfvNkTdJy9uC06GGCO5vPjwSAzZI'; // API key for tomtom use
    const baseUrl = 'https://api.tomtom.com/search/2/geocode/';
    const encodedAddress = encodeURIComponent(address);
    const url = `${baseUrl}${encodedAddress}.json?key=${apiKey}`;
    return url;
}