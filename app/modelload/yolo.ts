// src/utils/yolo.ts
import FastTflite from "react-native-fast-tflite";

export interface Detection {
    bbox: { x: number; y: number; width: number; height: number };
    score: number;
    classId: number;
}

let model: any = null;

/**
 * Load YOLOv8 TFLite model
 */
export const loadModel = async () => {
    if (!model) {
        // FastTflite là constructor → truyền path tới tệp tflite
        model = new FastTflite(require("../../assets/model/best_float32.tflite"));
    }
    return model;
};

/**
 * Decode YOLOv8 output
 * output: [x, y, w, h, score, class, x, y, w, h, ...]
 */
export const decodeYOLO = (
    output: number[],
    frameWidth: number,
    frameHeight: number,
    scoreThreshold = 0.4
): Detection[] => {
    const detections: Detection[] = [];

    for (let i = 0; i < output.length; i += 6) {
        const x = output[i + 0];
        const y = output[i + 1];
        const w = output[i + 2];
        const h = output[i + 3];
        const score = output[i + 4];
        const cls = output[i + 5];

        if (score < scoreThreshold) continue;

        // Chuyển từ YOLO center x,y → bbox góc trái
        detections.push({
            bbox: {
                x: x - w / 2,
                y: y - h / 2,
                width: w,
                height: h,
            },
            score,
            classId: cls,
        });
    }

    return detections;
};

/**
 * Run YOLOv8 model
 * frame: có thể là Image, Bitmap, hoặc input phù hợp FastTflite
 */
export const runYOLO = async (
    frame: any,
    frameWidth: number,
    frameHeight: number
): Promise<Detection[]> => {
    if (!model) throw new Error("Model chưa được load. Gọi loadModel() trước.");

    // Chạy inference
    const outputs = model.run(frame);

    if (!outputs || !outputs[0]) return [];

    // Decode output
    return decodeYOLO(outputs[0], frameWidth, frameHeight);
};
