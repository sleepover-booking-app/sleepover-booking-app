import { getUserData } from "../util.js";

const host = 'https://parseapi.back4app.com';

const appID = 'iZXbKuSH4i8o7ZgGcXixrK3Q80avdf3qvhT15sM3';
const apiKey = 'k7mOj9IleJQFoTDDyw7r54cpwGsWK0Vl1wYuWupJ';

async function request (method, url ='/', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': appID,
            'X-Parse-JavaScript-Key': apiKey
        }
    };

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

   const userData = getUserData();

   if(userData) {
    options.headers['X-Parse-Session-Token'] = userData.sessionToken;
   }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response;
        }

        const result = await response.json();

        if(response.ok != true) {
            console.log(result);
            throw new Error(result.message || result.error)
        }

        return result;

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');