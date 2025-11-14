import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export const sendDetection = async (
    deviceLat: number,
    deviceLng: number,
    objectLat: number,
    objectLng: number,
    label: string,
    confidence: number
) => {
    try {
        // Lấy token từ AsyncStorage (nếu có)
        const accessToken = await AsyncStorage.getItem('accessToken');

        // Dữ liệu detection
        const detectionData = {
            deviceLocation: { lat: deviceLat, lng: deviceLng },
            objectLocation: { lat: objectLat, lng: objectLng },
            label,
            confidence,
            timestamp: new Date().toISOString()
        };

        // Gửi request POST
        const response = await axios.post(`${API_URL}/detections`, detectionData, {
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Gửi detection thành công:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('❌ Lỗi khi gửi detection:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Không thể gửi dữ liệu detection');
    }
};