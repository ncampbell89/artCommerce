import Axios from './Axios';

const setAuthJwt = token => {
    if(token) {
        // The path of standard headers from Axios. We set the header for authorization. Its tacked on the jwt.
        Axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthJwt;

// This attaches the JWT token to axios