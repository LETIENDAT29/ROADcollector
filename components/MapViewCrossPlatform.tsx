// // MapViewCrossPlatform.tsx
// import React, { useMemo } from "react";
// import { Platform, View, StyleSheet, Text } from "react-native";

// /**
//  * Cross-platform Map view:
//  * - Web: react-map-gl + maplibre-gl
//  * - Native: @maplibre/maplibre-react-native (requires dev-client / native build)
//  *
//  * Props: center coordinate, zoom, optional markers array
//  */

// type MarkerItem = {
//   id: string;
//   latitude: number;
//   longitude: number;
//   title?: string;
// };

// type Props = {
//   center?: { latitude: number; longitude: number };
//   zoom?: number;
//   markers?: MarkerItem[];
//   height?: number | string;
// };

// export default function MapViewCrossPlatform({
//   center = { latitude: 10.762622, longitude: 106.660172 },
//   zoom = 14,
//   markers = [],
//   height = "100%",
// }: Props) {
//   // Web implementation
//   if (Platform.OS === "web") {
//     // dynamic import to avoid SSR / metro issues
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const ReactMapGL = require("react-map-gl").default;
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const maplibregl = require("maplibre-gl");

//     const initialViewState = useMemo(
//       () => ({
//         longitude: center.longitude,
//         latitude: center.latitude,
//         zoom,
//       }),
//       [center.latitude, center.longitude, zoom]
//     );

//     return (
//       <View style={[styles.container, { height }]}>
//         <ReactMapGL
//           mapLib={maplibregl}
//           initialViewState={initialViewState}
//           style={{ width: "100%", height: "100%" }}
//           mapStyle="https://demotiles.maplibre.org/style.json"
//         >
//           {markers.map((m) => (
//             <div
//               key={m.id}
//               style={{
//                 transform: "translate(-50%, -50%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <div
//                 title={m.title}
//                 style={{
//                   width: 16,
//                   height: 16,
//                   borderRadius: "50%",
//                   background: "#ff3b30",
//                   boxShadow: "0 0 6px rgba(0,0,0,0.3)",
//                 }}
//               />
//             </div>
//           ))}
//         </ReactMapGL>
//       </View>
//     );
//   }

//   // Native implementation (React Native)
//   // dynamic require so Metro won't try to load native lib on web
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   const MapLibreGL = require("@maplibre/maplibre-react-native");

//   return (
//     <View style={[styles.container, { height }]}>
//       {/* MapView from maplibre-react-native */}
//       <MapLibreGL.MapView style={styles.map}>
//         <MapLibreGL.Camera
//           zoomLevel={zoom}
//           centerCoordinate={[center.longitude, center.latitude]}
//         />

//         {/* markers as PointAnnotation */}
//         {markers.map((m) => (
//           <MapLibreGL.PointAnnotation
//             key={m.id}
//             id={m.id}
//             coordinate={[m.longitude, m.latitude]}
//           >
//             <View style={styles.nativeMarker} />
//             {m.title && (
//               <MapLibreGL.Callout title={m.title}>
//                 <View>
//                   <Text>{m.title}</Text>
//                 </View>
//               </MapLibreGL.Callout>
//             )}
//           </MapLibreGL.PointAnnotation>
//         ))}
//       </MapLibreGL.MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { width: "100%", flex: 1, backgroundColor: "#eee" },
//   map: { flex: 1 },
//   nativeMarker: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: "#ff3b30",
//     borderWidth: 2,
//     borderColor: "#fff",
//   },
// });
