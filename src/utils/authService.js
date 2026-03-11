import axios from 'axios';

// base URL will be proxied by Vite during development
const API = axios.create({ baseURL: '/api' });

export const registerUser = async (data) => {
  const resp = await API.post('/auth/register', data);
  return resp.data;
};

export const loginUser = async (data) => {
  const resp = await API.post('/auth/login', data);
  return resp.data;
};

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const getPendingVendors = async () => {
  const resp = await API.get('/admin/vendors/pending', authHeaders());
  return resp.data;
};

export const approveVendor = async (vendorId) => {
  const resp = await API.patch(`/admin/vendors/${vendorId}/approve`, {}, authHeaders());
  return resp.data;
};

export const rejectVendor = async (vendorId) => {
  const resp = await API.patch(`/admin/vendors/${vendorId}/reject`, {}, authHeaders());
  return resp.data;
};

export const getAllUsers = async () => {
  const resp = await API.get('/admin/users', authHeaders());
  return resp.data;
};

export const toggleUserStatus = async (userId) => {
  const resp = await API.patch(`/admin/users/${userId}/toggle-status`, {}, authHeaders());
  return resp.data;
};

export const deleteUserById = async (userId) => {
  const resp = await API.delete(`/admin/users/${userId}`, authHeaders());
  return resp.data;
};

export const getAllOrders = async () => {
  const resp = await API.get('/admin/orders', authHeaders());
  return resp.data;
};

export default {
  registerUser,
  loginUser,
  getPendingVendors,
  approveVendor,
  rejectVendor,
  getAllUsers,
  toggleUserStatus,
  deleteUserById,
  getAllOrders,
};