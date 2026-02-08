import axios from "axios";
const API_URL = "http://localhost:5000/api/interestrates";

export const getInterestRates = async () => (await axios.get(API_URL)).data;
export const getInterestRateById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const createInterestRate = async (interestRate) => (await axios.post(API_URL, interestRate)).data;
export const updateInterestRate = async (id, interestRate) => (await axios.put(`${API_URL}/${id}`, interestRate)).data;
export const deleteInterestRate = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
