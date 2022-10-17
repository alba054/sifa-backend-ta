import axios from 'axios';
import { SERVER_URL } from '../utils/const/api';

const instance = axios.create({
    baseURL: SERVER_URL
})

export default instance;