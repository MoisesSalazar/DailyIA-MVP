import axios from 'axios';

let authToken = '';

export function setAuthToken(token) {
    authToken = token;
}

export async function makeRequest(method, url, data = null, headers = {}) {
    const finalHeaders = {
        ...headers,
        Authorization: `Bearer ${authToken}`
    };

    try {
        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers: finalHeaders
        });
        return response.data;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
}
