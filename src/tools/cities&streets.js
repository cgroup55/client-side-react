import axios from 'axios';

const api_url = "https://data.gov.il/api/3/action/datastore_search";
const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
const city_name_key = "שם_ישוב";
const street_name_key = "שם_רחוב";

export const fetchCities = () => {
    return axios.get(api_url, {
        params: { resource_id: cities_resource_id },
        responseType: "json"
    })
    .then(response => {
        const records = response?.data?.result?.records || [];
        return records.map(record => record[city_name_key].trim()).sort();
    })
    .catch(error => {
        console.error("Couldn't fetch cities", error);
        return [];
    });
};

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
        const records = response?.data?.result?.records || [];
        return records.map(record => record[street_name_key].trim()).sort();
    })
    .catch(error => {
        console.error("Couldn't fetch streets for", city, error);
        return [];
    });
};
