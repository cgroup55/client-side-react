const BASE_URL = "https://localhost:7039";

//crud יהיו לנו כאן את 4 פונ ה-
//עדכון ומחיקה בגנון של יצירה
//אם יהיו פונ מיוחדות שאין ב4 האלה הן ישבו בתוך הקונטקסט עצמו..
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
