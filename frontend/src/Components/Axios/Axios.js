import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 600000 // 10 minutes
});

export default Axios;