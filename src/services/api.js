import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});


export {api}
