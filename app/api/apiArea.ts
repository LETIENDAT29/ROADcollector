// src/api/areaApi.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';
// ✅ Lấy tất cả khu vực
export const getAllAreas = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.get(`${API_URL}/areas/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi lấy khu vực:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể lấy khu vực');
  }
};

// ✅ Tạo hoặc gán khu vực
export const assignArea = async (data: any) => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/areas`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi gán khu vực:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể gán khu vực');
  }
};

// ✅ Lấy khu vực của user hiện tại
export const getAreasOfUser = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) throw new Error('Không tìm thấy token. Vui lòng đăng nhập lại.');

    const response = await axios.get(`${API_URL}/areas/areasuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Dữ liệu sẽ gồm { user, areas: [...] }
  } catch (error: any) {
    console.error('Lỗi khi lấy khu vực của user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Không thể lấy khu vực của user');
  }
};
