import { useState, useCallback } from 'react';
import type { Point } from '../utils/coordinateHelpers';

export const usePolygon = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [isClosed, setIsClosed] = useState(false);
    const [mousePosition, setMousePosition] = useState<Point | null>(null);

    const addPoint = useCallback((point: Point) => {
        if (isClosed) return;
        setPoints((prev) => [...prev, point]);
    }, [isClosed]);

    const closePolygon = useCallback(() => {
        if (points.length >= 3) {
            setIsClosed(true);
            setMousePosition(null);
        }
    }, [points]);

    const removeLastPoint = useCallback(() => {
        if (isClosed) return;
        setPoints((prev) => prev.slice(0, -1));
    }, [isClosed]);

    const reset = useCallback(() => {
        setPoints([]);
        setIsClosed(false);
        setMousePosition(null);
    }, []);

    return {
        points,
        isClosed,
        mousePosition,
        addPoint,
        closePolygon,
        removeLastPoint,
        reset,
        setMousePosition,
    };
};
