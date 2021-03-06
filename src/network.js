import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {BASE_URL} from './constants';

const shopApiInstance = axios.create({
    baseURL: BASE_URL

});

shopApiInstance.interceptors.response.use(
    response => {
    let newAccessToken;
    const currentToken = shopApiInstance.defaults.headers.common['Authorization'] && shopApiInstance.defaults.headers.common['Authorization'].split(' ')[1];
    if (currentToken) {
        const currentDecodedToken = jwt_decode(currentToken);
        const {exp} = currentDecodedToken;
        if (exp * 1000 < Date.now()) {
            console.log('token expired')
            if (response.headers['shop-refreshed-access-token']){
                newAccessToken = response.headers['shop-refreshed-access-token']
                setBearerToken(newAccessToken);
                localStorage.setItem('token', newAccessToken);
                console.info('access token renewed')
            }
        } else {
            console.info('token still good')
        }
    }
    
    return response;
  }, 
  error => {
    return Promise.reject(error);
  });

const setBearerToken = token => {
    shopApiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(`Set bearer token, ${token}`);
}

export {shopApiInstance, setBearerToken};
