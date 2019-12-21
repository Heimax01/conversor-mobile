import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL:'https://conversor-backend.herokuapp.com',
    
    
});

export default api;
