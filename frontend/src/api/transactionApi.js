import axios from "axios";
const API_URL = "http://localhost:5000/api/transactions";

export const getTransactions = async () => (await axios.get(API_URL)).data;
export const getTransactionById = async (id) => (await axios.get(`${API_URL}/${id}`)).data;
export const getTransactionsByLoan = async (loanId) => (await axios.get(`${API_URL}/loan/${loanId}`)).data;
export const createTransaction = async (transaction) => (await axios.post(API_URL, transaction)).data;
export const updateTransaction = async (id, transaction) => (await axios.put(`${API_URL}/${id}`, transaction)).data;
export const deleteTransaction = async (id) => (await axios.delete(`${API_URL}/${id}`)).data;
