import axios from 'axios'

const req = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
})

req.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('bToken');
    config.headers.Authorization = (token ? token : '');
    config.headers.ContentType = 'application/json';
    return config;
});


export const loginUser = async ({ email, password }) => {
    return await req.post('/user/login', { email, password })
}

export const registerUser = async ({ userName, number, email, password }) => {
    return await req.post('/user/register', { userName, number, email, password })
}

export const getAllProductUser = async () => {
    return await req.post('/user/listProducts', {})
}

export const getAllOrderUser = async () => {
    return await req.post('/user/viewMyOrders', {})
}

export const orderProduct = async ({pid, paymentMethod}) => {
    return await req.post('/user/orderProduct', {pid, paymentMethod})
}