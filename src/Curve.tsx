import { useEffect, useRef } from 'react';

function Curve ({className, index}: {className?: string, index: string}) {
    const curveRef = useRef<SVGPolylineElement | null>(null);

    useEffect(() => {
        if (!curveRef.current) return;
        let start: number | undefined;
        let animationFrameId: number | undefined;
        let startCoords = [
            { x: 0, y: 100 },
            { x: 800, y: 100 },
        ];
        let targetCoords = [
            { x: Math.random() * 200, y: Math.random() * 200 },
            { x: 800 - Math.random() * 200, y: Math.random() * 200 },
        ];
        let timer = Math.random() * 1000 + 2000;

        const updateCurve = (timestamp: number) => {
            if (!start) {
            start = timestamp;
            }
            const elapsed = timestamp - start;
            const element = curveRef.current;
            if (!element) return;

            const progress = elapsed / timer;

            const coords = startCoords.map((coord, i) => ({
            x: coord.x + (targetCoords[i].x - coord.x) * progress,
            y: coord.y + (targetCoords[i].y - coord.y) * progress,
            }));

            element.setAttribute(
            'd',
            `M0 100 C${coords[0].x} ${coords[0].y}, ${coords[1].x} ${coords[1].y}, 800 100`
            );

            if (elapsed < timer) {
            animationFrameId = requestAnimationFrame(updateCurve);
            } else {
            start = undefined;
            animationFrameId = undefined;
            startCoords = [...targetCoords]
            targetCoords = [
                { x: Math.random() * 200, y: Math.random() * 200 },
                { x: 800 - Math.random() * 200, y: Math.random() * 200 },
            ];
            timer = Math.random() * 1000 + 2000;
            animationFrameId = requestAnimationFrame(updateCurve);
            }
        };

        animationFrameId = requestAnimationFrame(updateCurve);

        return () => {
            cancelAnimationFrame(animationFrameId!);
        };
    }, []);

    return (
        <svg width="800" height="200" className={className}>
            <path ref={curveRef} className={`glow-curve ${index}-curve`} d="M0 0 C 50 150, 350 150, 350 150"></path>
        </svg>
    )
};

export default Curve;

