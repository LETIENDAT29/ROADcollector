import { Platform } from 'react-native';

const LOCAL_IP = '192.168.1.87'; // ⚠️ Thay bằng IP LAN của máy tính bạn

export const API_URL =
    Platform.OS === 'android'
        ? 'http://10.0.2.2:3000/api' // Android Emulator
        : `http://${LOCAL_IP}:3000/api`; // iOS Simulator + thiết bị thật