import axios from "axios";

const API_URL = "http://localhost:5000/api/repayments";

const handleResponse = (promise) => promise.then(res => res.data);

export const getRepayments = () => handleResponse(axios.get(API_URL));
export const getRepaymentsByLoan = (loanId) => handleResponse(axios.get(`${API_URL}/loan/${loanId}`));
export const getRepaymentById = (id) => handleResponse(axios.get(`${API_URL}/${id}`));
export const createRepayment = (data) => handleResponse(axios.post(API_URL, data));
export const updateRepayment = (id, data) => handleResponse(axios.put(`${API_URL}/${id}`, data));
export const deleteRepayment = (id) => handleResponse(axios.delete(`${API_URL}/${id}`));
