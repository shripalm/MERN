import axios from 'axios'

const req = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
})
req.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});


export const loginUser = async ({ email, password }) => {
    return await req.post('/users/login', { email, password })
}

export const signUpUser = async ({ userName, email, password }) => {
    return await req.post('/users/register', { userName, email, password })
}