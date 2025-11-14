import { View, Text } from "react-native";

interface Detection {
    bbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    score: number;
    classId: number;
}

interface DetectionOverlayProps {
    detections: Detection[];
    width: number;
    height: number;
}

export default function DetectionOverlay({
    detections,
    width,
    height,
}: DetectionOverlayProps) {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width,
                height,
            }}
        >
            {detections.map((det, i) => {
                const { x, y, width: w, height: h } = det.bbox;

                return (
                    <View
                        key={i}
                        style={{
                            position: "absolute",
                            borderColor: "red",
                            borderWidth: 2,
                            left: x,
                            top: y,
                            width: w,
                            height: h,
                        }}
                    >
                        <Text
                            style={{
                                color: "yellow",
                                backgroundColor: "rgba(0,0,0,0.5)",
                            }}
                        >
                            {det.classId} {Math.round(det.score * 100)}%
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}
