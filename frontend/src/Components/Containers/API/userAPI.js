import Axios from '../../Axios/Axios';
import setAuthJwt from '../../Axios/setAuthJWT';
import jwt_decode from 'jwt-decode';

export const handleSignUpAPI = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post('/users/createuser', data) // data is this.state in signup.js
             .then(result => {
                 resolve(result)
             })
             .catch(error => {
                 reject(error)
             })
    })
}

export const handleSignInAPI = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post('/users/loginuser', data) 
             .then(result => {
                 resolve(result)
             })
             .catch(error => {
                 reject(error)
             })
    })
}

// export const handleSignInAPI = (data) => {
//     return new Promise((resolve, reject) => {
//         Axios.post('/users/loginuser', data)
//         .then(result => {
//             console.log(result.data);
//             // we grab the token from the array 'result.data'
//             const { token } = result.data;
//             setAuthJwt(token);

//             // to view the key in the inspector. It's stored in the local storage
//             localStorage.setItem('jwtToken', token);

//             // decoded shows more explicity about the json web token
//             // {id: "5c5c5cac1ed139024dd47fa9", email: "test", iat: 1549558760, exp: 1549562360}
//             const decoded = jwt_decode(token);
//             resolve(decoded);
//         })
//         .catch(error => {
//             reject(error)
//         })
//     })
// }

export const JWTexpirationAndLogin = () => {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem('jwtToken');
        if(token) {
            const currentTime = Date.now() / 1000;
            const decoded = jwt_decode(token);
            // decoded: {id: "5c5c5cac1ed139024dd47fa9", email: "test", iat: 1549558760, exp: 1549562360}

            if(decoded.exp < currentTime) {
                localStorage.removeItem('jwtToken');
                setAuthJwt(null)
                reject(null)
            } else {
                setAuthJwt(token)
                resolve(token)
            }
        } else {
            localStorage.removeItem('jwtToken');
            setAuthJwt(null)
        }
    });
}

// export const handleSignOutAPI = () => {
//     return new Promise((resolve, reject) => {
//         Axios.get('/users/logoutuser')
//         .then(result => resolve(result))
//         .catch(error => reject(error));
//     })
// }