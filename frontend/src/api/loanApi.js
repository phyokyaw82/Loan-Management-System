import axios from "axios";
const API_URL = "http://localhost:5000/api/loans";

export const getLoans = async () => (await axios.get(API_URL)).data;
export const getLoanById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const createLoan = async (loan) => (await axios.post(API_URL, loan)).data;
export const updateLoan = async (id, loan) => (await axios.put(`${API_URL}/${id}`, loan)).data;
export const deleteLoan = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
