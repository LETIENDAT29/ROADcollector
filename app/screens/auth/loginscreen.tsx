import { loginUser } from '@/app/api/apiUser';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }: any) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // state để ẩn/hiện mật khẩu
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const userData = await loginUser(phone, password);
            console.log('Đăng nhập thành công:', userData.message);

            // Ví dụ: lưu token, hoặc user info vào AsyncStorage nếu cần
            // await AsyncStorage.setItem('token', userData.token);

            router.replace('/(tabs)'); // điều hướng sang Home
        } catch (error: any) {
            Alert.alert('Lỗi đăng nhập', error.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="your phone number"
                placeholderTextColor="#9aa3ad" // placeholder mờ hơn
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                value={phone}
                onChangeText={setPhone}
            />

            {/* wrapper để đặt nút mắt lên trên input mật khẩu */}
            <View style={styles.passwordWrapper}>
                <TextInput
                    style={[styles.input, { paddingRight: 44 }]} // thêm padding để tránh icon
                    placeholder="Mật khẩu"
                    placeholderTextColor="#9aa3ad" // placeholder mờ hơn
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword((s) => !s)}
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={22}
                        color="#666"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#007AFF',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e6ea',
        backgroundColor: 'rgba(230,236,240,0.6)', // nền input hơi mờ
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        color: '#222',
    },
    passwordWrapper: {
        position: 'relative',
        marginBottom: 15,
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
        top: 12,
        height: 32,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 14,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
    },
    link: {
        marginTop: 15,
        textAlign: 'center',
        color: '#007AFF',
    },
});
