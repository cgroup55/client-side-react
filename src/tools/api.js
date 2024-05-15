
const LOCAL_URL = "https://localhost:7058";
const SERVER_URL = "https://proj.ruppin.ac.il/cgroup55/test2/tar1";

const BASE_URL = window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1" ? LOCAL_URL : SERVER_URL;


//basic functions that take care of CRUD actions and will be used all over contexts

//other specific functions that will request special data from DBS -
// will be in the required context
export async function create(url, data) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`,
            {
                method: 'POST',
                body: data ? JSON.stringify(data) : "",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json;',
                }
            });
        if (res.ok) {
            return await res.json();
        }
        else {
            return null;
        }
    } catch (err) { console.log(err) }
}

export async function update(url, data) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`,
            {
                method: 'PUT',
                body: data ? JSON.stringify(data) : "",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json;',
                }
            });
        if (res.ok) {
            return await res.json();
        }
        else {
            return null;
        }
    } catch (err) { console.log(err) }
}


export async function read(url) {
    try {
        let res = await fetch(`${BASE_URL}/${url}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json;',
                }
            });
        if (res.ok) {
            return await res.json();
        }
        else {
            return null;
        }
    } catch (err) { console.log(err) }
}


