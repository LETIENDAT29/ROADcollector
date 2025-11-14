// app.config.js
export default ({ config }) => {
    const isDevClient = process.env.APP_VARIANT === 'development';

    return {
        ...config,
        name: isDevClient ? 'ROADcollector (Dev)' : 'ROADcollector',
        plugins: [
            'expo-router',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                    dark: { backgroundColor: '#000000' },
                },
            ],
            [
                'expo-camera',
                {
                    cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
                    microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
                },
            ],
            // CHỈ THÊM expo-dev-client KHI CHẠY --dev-client
            ...(isDevClient ? ['expo-dev-client'] : []),
        ],
        ios: {
            ...config.ios,
            bundleIdentifier: isDevClient
                ? 'com.datletien.ROADcollector.dev'
                : 'com.datletien.ROADcollector',
        },
        android: {
            ...config.android,
            package: isDevClient
                ? 'com.datletien.ROADcollector.dev'
                : 'com.datletien.ROADcollector',
        },
    };
};

// Tiendat09@