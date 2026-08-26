import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/transactions';

export const getTransactions = () => {
    return axios.get(API_BASE_URL);
};

export const createTransaction = (transactionData) => {
    return axios.post(API_BASE_URL, transactionData);
};