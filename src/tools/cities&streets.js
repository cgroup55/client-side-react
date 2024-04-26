import axios from 'axios';

// API base URL and resource IDs
const api_url = "https://data.gov.il/api/3/action/datastore_search";
const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
// Key names for city and street names
const city_name_key = "שם_ישוב";
const street_name_key = "שם_רחוב";


// Fetches cities data from the API
export const fetchCities = () => {
    return axios.get(api_url, {
        params: { resource_id: cities_resource_id },
        responseType: "json"
    })
        .then(response => {
            // Extract city names from the API response records
            const records = response?.data?.result?.records || [];
            return records.map(record => record[city_name_key].trim()).sort();
        })
        .catch(error => {
            console.error("Couldn't fetch cities", error);
            return [];
        });
};


// Fetches streets data by city from the API
export const fetchStreetsByCity = (city) => {
    return axios.get(api_url, {
        params: {
            resource_id: streets_resource_id,
            q: JSON.stringify({ [city_name_key]: city }),
            limit: 32000
        },
        responseType: "json"
    })
        .then(response => {
            // Extract street names for the given city from the API response records
            const records = response?.data?.result?.records || [];
            return records.map(record => record[street_name_key].trim()).sort();
        })
        .catch(error => {
            console.error("Couldn't fetch streets for", city, error);
            return [];
        });

};
//validation for street and city
export const validateCity = (input,cities) => {        
    let chosencity = input;    
    if (!cities.includes(chosencity)) {
        return 'יש לבחור ערך מהרשימה';
    } else {
        return '';
    }
};
export const validateStreet = (input,streets) => {
    let chosenstreet = input;
    console.log("chosenstreet",chosenstreet);
    console.log("streets",streets);
    
    if (!streets.includes(chosenstreet)) {
        return 'יש לבחור ערך מהרשימה';
    } else {
        return '';
    }
};