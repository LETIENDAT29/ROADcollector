import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Polygon, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getAreasOfUser } from '../api/apiArea';

const AreaMap = () => {
  const [areas, setAreas] = useState<any[]>([]);

  useEffect(() => {
    const fetchAreasOfUser = async () => {
      try {
        const res = await getAreasOfUser();
        console.log('Khu vực của user:', res);
        setAreas(res.areas);
      } catch (error) {
        console.error('Lỗi tải khu vực:', error);
      }
    };

    fetchAreasOfUser();
  }, []);

  if (!areas.length) {
    return (
      <View style={styles.center}>
        <Text>Không có khu vực nào được gán</Text>
      </View>
    );
  }

  // Lấy trung tâm khu vực đầu tiên
  const firstArea = areas[0];
  const center = firstArea.coordinates[0];

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {areas.map((area) => (
        <React.Fragment key={area.id}>
          {/* Vẽ vùng được phân công */}
          <Polygon
            coordinates={area.coordinates}
            strokeColor="rgba(0, 255, 42, 0.8)"
            fillColor="rgba(0, 255, 13, 0.13)"
            strokeWidth={2}
          />
          {/* Đặt marker giữa khu vực */}
          <Marker coordinate={area.coordinates[0]}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>{area.name}</Text>
            </View>
          </Marker>
        </React.Fragment>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  markerText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default AreaMap;
