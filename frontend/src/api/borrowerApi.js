import axios from "axios";
const API_URL = "http://localhost:5000/api/borrowers";

export const getBorrowers = async () => (await axios.get(API_URL)).data;
export const getBorrowerById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const createBorrower = async (borrower) => (await axios.post(API_URL, borrower)).data;
export const updateBorrower = async (id, borrower) => (await axios.put(`${API_URL}/${id}`, borrower)).data;
export const deleteBorrower = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
