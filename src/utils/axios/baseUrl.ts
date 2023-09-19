
import axios from 'axios';
import interceptors from './interceptors';


const baseUrl = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL: 'https://huddledown.link/api',
});

export default interceptors(baseUrl);