import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export const loginUser = async (phone: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { phone, password });
    const { accessToken, user } = response.data;
    if (accessToken) {
      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
    }
    return response.data;
  } catch (error: any) {
    console.error('Lỗi đăng nhập:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
  }
};

export const getProfile = async (accessToken: any) => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi lấy thông tin người dùng:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể lấy thông tin người dùng');
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  } catch (error: any) {
    console.error('Lỗi đăng xuất:', error.response?.data || error.message);
    throw new Error('Đăng xuất thất bại');
  }
};

export const getAllUsers = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/auth/alluser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // format tuỳ theo response backend
  } catch (error: any) {
    console.error('Lỗi khi lấy danh sách người dùng:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể lấy danh sách người dùng');
  }
};
