import axios from "axios";

const API_URL = "http://localhost:5000/api/contracts";

export const getContracts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const getContractById = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
};

export const createContract = async (formData) => {
    const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

export const updateContract = async (id, formData) => {
    const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
};

export const deleteContract = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};
