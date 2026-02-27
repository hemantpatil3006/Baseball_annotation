import React, { useMemo } from 'react';
import type { Point } from '../utils/coordinateHelpers';

interface PolygonLayerProps {
    points: Point[];
    isClosed: boolean;
    mousePosition: Point | null;
    onPointClick: (e: React.PointerEvent | React.TouchEvent | React.MouseEvent, index: number) => void;
}

export const PolygonLayer: React.FC<PolygonLayerProps> = ({
    points,
    isClosed,
    mousePosition,
    onPointClick,
}) => {
    const pointsString = useMemo(() => {
        return points.map((p) => `${p.x},${p.y}`).join(' ');
    }, [points]);

    const activeLinePoints = useMemo(() => {
        if (points.length === 0 || isClosed || !mousePosition) return '';
        const lastPoint = points[points.length - 1];
        return `${lastPoint.x},${lastPoint.y} ${mousePosition.x},${mousePosition.y}`;
    }, [points, isClosed, mousePosition]);

    const isPolygonClosable = points.length >= 3 && !isClosed;

    return (
        <svg
            className="polygon-layer"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        >
            {activeLinePoints && (
                <polyline
                    points={activeLinePoints}
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                />
            )}

            {points.length > 0 && (
                isClosed ? (
                    <polygon
                        points={pointsString}
                        fill="rgba(59, 130, 246, 0.3)"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2"
                    />
                ) : (
                    <polyline
                        points={pointsString}
                        fill="none"
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="2"
                    />
                )
            )}

            {points.map((p, i) => {
                const isFirst = i === 0;
                const canCloseOnThis = isFirst && isPolygonClosable;

                return (
                    <g key={i} style={{ pointerEvents: 'auto' }}>
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r={canCloseOnThis ? 8 : 4}
                            fill={isFirst ? '#ef4444' : '#fff'}
                            stroke="rgb(59, 130, 246)"
                            strokeWidth="2"
                            className={canCloseOnThis ? 'closable-point' : ''}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                onPointClick(e, i);
                            }}
                            style={{
                                cursor: canCloseOnThis ? 'pointer' : 'default',
                                transition: 'all 0.2s',
                            }}
                        >
                            {canCloseOnThis && <title>Click to close polygon</title>}
                        </circle>
                    </g>
                );
            })}
        </svg>
    );
};
