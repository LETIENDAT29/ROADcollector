// YOLOv8 decode for TFLite output
export function decodeYolo(output: any, imageWidth: any, imageHeight: any, scoreThreshold = 0.4, iouThreshold = 0.45) {
    const boxes = [];

    for (let i = 0; i < output.length; i++) {
        const [x, y, w, h, score, classId] = output[i];

        if (score < scoreThreshold) continue;

        const bbox = {
            x: x - w / 2,
            y: y - h / 2,
            width: w,
            height: h
        };

        boxes.push({
            bbox,
            score,
            classId
        });
    }

    // Apply NMS
    return nonMaxSuppression(boxes, iouThreshold);
}

function nonMaxSuppression(boxes: any, iouThreshold: any) {
    if (boxes.length === 0) return [];

    boxes.sort((a: any, b: any) => b.score - a.score);

    const result = [];

    while (boxes.length) {
        const best = boxes.shift();
        result.push(best);

        boxes = boxes.filter((box: any) => iou(best.bbox, box.bbox) < iouThreshold);
    }

    return result;
}

function iou(a: any, b: any) {
    const x1 = Math.max(a.x, b.x);
    const y1 = Math.max(a.y, b.y);
    const x2 = Math.min(a.x + a.width, b.x + b.width);
    const y2 = Math.min(a.y + a.height, b.y + b.height);

    const interArea = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);

    if (interArea === 0) return 0;

    const areaA = a.width * a.height;
    const areaB = b.width * b.height;

    return interArea / (areaA + areaB - interArea);
}
