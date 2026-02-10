import axios from "axios";

const API_URL = "http://localhost:5000/api/contracts";

export const getContracts = () => axios.get(API_URL).then(res => res.data);
export const getContractById = (id) => axios.get(`${API_URL}/${id}`).then(res => res.data);

const config = { headers: { "Content-Type": "multipart/form-data" } };

export const createContract = (formData) => axios.post(API_URL, formData, config).then(res => res.data);
export const updateContract = (id, formData) => axios.put(`${API_URL}/${id}`, formData, config).then(res => res.data);
export const deleteContract = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);
