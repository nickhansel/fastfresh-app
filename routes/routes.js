const url = "https://sea-lion-app-3lfjg.ondigitalocean.app" ;

import axios from "axios" ;

export const getSeller = async () => {
    const response = await axios.get(`${url}/seller`);
    return response.data;
}

export const getItems = async () => {
    const response = await axios.get(`${url}/item`);
    return response.data;
}

export const getOrders = async () => {
    const response = await axios.get(`${url}/order`);
    return response.data;
}

export const createOrder = async (order) => {
    const response = await axios.post(`${url}/order`, order);
    return response.data;
}
