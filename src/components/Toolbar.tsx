import React, { useState } from 'react';
import { usePolygon } from '../hooks/usePolygon';

interface ToolbarProps {
    polygonState: ReturnType<typeof usePolygon>;
}

export const Toolbar: React.FC<ToolbarProps> = ({ polygonState }) => {
    const { points, isClosed, reset } = polygonState;
    const [showJson, setShowJson] = useState(false);
    const [copied, setCopied] = useState(false);

    const formatPoint = (p: { x: number, y: number }) => `    { "x": ${p.x}, "y": ${p.y} }`;
    const formattedJson = `{
  "points": [
${points.map(formatPoint).join(',\n')}
  ],
  "closed": ${isClosed},
  "image": "baseball.jpg"
}`;

    const handleExport = () => {
        // Show modal instead of instantly downloading
        setShowJson(true);
        setCopied(false);
    };

    const handleDownload = () => {
        const blob = new Blob([formattedJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'annotation.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedJson);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="toolbar">
            <h1>Polygon Annotation UI</h1>

            <div className="controls">
                <button
                    className={`btn ${!isClosed ? 'active-tool' : 'outline'}`}
                    onClick={() => isClosed && reset()}
                    title={isClosed ? "Click to start drawing a new polygon" : "Currently Drawing"}
                >
                    Draw Polygon
                </button>
                <button className="btn outline danger" onClick={reset}>
                    Reset
                </button>
                <button className="btn primary" onClick={handleExport} disabled={points.length === 0}>
                    Export
                </button>
            </div>

            {showJson && (
                <div className="modal-overlay" onClick={() => setShowJson(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Annotation Complete</h3>
                        <pre>{formattedJson}</pre>
                        <div className="modal-actions">
                            <button className="btn outline" onClick={handleDownload}>
                                Download
                            </button>
                            <button className="btn primary" onClick={handleCopy}>
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </button>
                            <button className="btn outline" onClick={() => setShowJson(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
