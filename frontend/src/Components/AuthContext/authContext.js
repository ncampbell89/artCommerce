import React from 'react';

export default React.createContext({
    isAuth: false,
    userProfileInfo: null,
    toggleAuth: () => {} // this calls the toggleAuth in App.js
});