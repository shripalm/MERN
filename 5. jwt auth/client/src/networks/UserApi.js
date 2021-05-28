import {create} from 'axios'

const req = create({
    baseURL: 'http://127.0.0.1:5000/api',
})

req.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});

export const loginUser = async ({ email, password }) => {
    return await req.post('/user/login', { email, password })
}

export const signUpUser = async ({ userName, email, password }) => {
    return await req.post('/user/register', { userName, email, password })
}