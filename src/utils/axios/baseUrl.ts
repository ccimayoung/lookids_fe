
import axios from 'axios';
import interceptors from './interceptors';


const baseUrl = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'http://49.50.165.8:8080',
});

export default interceptors(baseUrl);