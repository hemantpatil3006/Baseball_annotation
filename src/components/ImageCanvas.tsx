import React, { useRef } from 'react';
import { getRelativeCoordinates } from '../utils/coordinateHelpers';
import { usePolygon } from '../hooks/usePolygon';
import { PolygonLayer } from './PolygonLayer';

interface ImageCanvasProps {
    imageSrc: string;
    polygonState: ReturnType<typeof usePolygon>;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc, polygonState }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const {
        points,
        isClosed,
        mousePosition,
        addPoint,
        closePolygon,
        setMousePosition,
    } = polygonState;

    const handleContainerClick = (e: React.PointerEvent | React.TouchEvent | React.MouseEvent) => {
        if (isClosed || !containerRef.current) return;
        const point = getRelativeCoordinates(e, containerRef.current);
        addPoint(point);
    };

    const handleMouseMove = (e: React.PointerEvent | React.TouchEvent | React.MouseEvent) => {
        if (isClosed || !containerRef.current || points.length === 0) return;
        const point = getRelativeCoordinates(e, containerRef.current);
        setMousePosition(point);
    };

    const handleMouseLeave = () => {
        setMousePosition(null);
    };

    const handlePointClick = (_e: React.PointerEvent | React.TouchEvent | React.MouseEvent, index: number) => {
        if (!isClosed && index === 0 && points.length >= 3) {
            closePolygon();
        }
    };

    return (
        <div className="canvas-wrapper">
            <div
                ref={containerRef}
                className="image-container"
                onPointerDown={handleContainerClick}
                onPointerMove={handleMouseMove}
                onPointerLeave={handleMouseLeave}
                onPointerCancel={handleMouseLeave}
            >
                <img src={imageSrc} alt="Annotation target" draggable="false" />
                <PolygonLayer
                    points={points}
                    isClosed={isClosed}
                    mousePosition={mousePosition}
                    onPointClick={handlePointClick}
                />
            </div>
        </div>
    );
};
