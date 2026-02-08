import axios from "axios";

const API_URL = "http://localhost:5000/api/repayments"; // your backend endpoint

export const getRepayments = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const getRepaymentsByLoan = async (loanId) => {
    const res = await fetch(`${API_URL}/loan/${loanId}`);
    return res.json();
};

export const getRepaymentById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const createRepayment = async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
};

export const updateRepayment = async (id, data) => {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
};

export const deleteRepayment = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
