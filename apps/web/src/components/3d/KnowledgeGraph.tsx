
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useTheme } from 'next-themes';

// Dynamic import wrapper handled in parent for SSR safety

const MOCK_DATA = {
    nodes: [
        { id: 'Rverity', group: 1, val: 20 },
        { id: 'VSCode', group: 2, val: 10 },
        { id: 'Cursor', group: 2, val: 10 },
        { id: 'Claude', group: 2, val: 10 },
        { id: 'Memory', group: 3, val: 5 },
        { id: 'Context', group: 3, val: 5 },
        { id: 'Auth', group: 3, val: 5 },
        { id: 'VectorDB', group: 4, val: 8 },
        { id: 'Redis', group: 4, val: 8 },
    ],
    links: [
        { source: 'Rverity', target: 'VSCode' },
        { source: 'Rverity', target: 'Cursor' },
        { source: 'Rverity', target: 'Claude' },
        { source: 'VSCode', target: 'Context' },
        { source: 'Cursor', target: 'Memory' },
        { source: 'Claude', target: 'VectorDB' },
        { source: 'Memory', target: 'Redis' },
        { source: 'VectorDB', target: 'Auth' },
    ]
};

export interface KnowledgeGraphProps {
    memories?: Array<{
        id: string;
        payload: {
            content: string;
            source: string;
            tags: string[];
            timestamp: string;
        };
    }>;
}

export default function KnowledgeGraph({ memories = [] }: KnowledgeGraphProps) {
    const fgRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Transform memories into graph data
    const data = useMemo(() => {
        const nodes: any[] = [];
        const links: any[] = [];
        const sources = new Set<string>();

        // Create central hub
        nodes.push({ id: 'Rverity', group: 1, val: 20 });

        memories.forEach(mem => {
            // Add source node if not exists (e.g., 'vscode', 'cursor')
            if (!sources.has(mem.payload.source)) {
                sources.add(mem.payload.source);
                nodes.push({
                    id: mem.payload.source,
                    group: 2,
                    val: 10
                });
                // Link source to Rverity hub
                links.push({ source: 'Rverity', target: mem.payload.source });
            }

            // Add memory node
            nodes.push({
                id: mem.id,
                name: mem.payload.content,
                group: 3,
                val: 5
            });

            // Link memory to its source
            links.push({ source: mem.payload.source, target: mem.id });

            // Link tags
            mem.payload.tags.forEach(tag => {
                const tagId = `tag-${tag}`;
                // Check if tag node exists, if not add it (simple check by iteration or just push unique)
                // For simplicity/perf with small graphs, we can just push and dedupe or use a Map.
                // Using find here for readability on small datasets
                if (!nodes.find(n => n.id === tagId)) {
                    nodes.push({ id: tagId, name: `#${tag}`, group: 4, val: 3 });
                }
                links.push({ source: mem.id, target: tagId });
            });
        });

        // Add some initial data if empty so it looks cool
        if (memories.length === 0) {
            return {
                nodes: [
                    { id: 'Rverity', group: 1, val: 20 },
                    { id: 'Waiting for Data...', group: 2, val: 5 }
                ],
                links: []
            };
        }

        return { nodes, links };
    }, [memories]);

    useEffect(() => {
        // Resize observer to handle responsive parent
        const observeTarget = containerRef.current;
        if (!observeTarget) return;

        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const { width, height } = entries[0].contentRect;
                setDimensions({ width, height });
            }
        });

        resizeObserver.observe(observeTarget);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        // Add some rotation
        let angle = 0;
        const interval = setInterval(() => {
            if (fgRef.current) {
                angle += 0.001;
                fgRef.current.cameraPosition({
                    x: 200 * Math.sin(angle),
                    z: 200 * Math.cos(angle)
                });
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const FG = ForceGraph3D as any;

    return (
        <div
            ref={containerRef}
            className="w-full h-full rounded-2xl overflow-hidden bg-black/50 border border-cyan-500/20 shadow-inner shadow-cyan-500/10 relative"
        >
            {dimensions.width > 0 && (
                <FG
                    ref={fgRef}
                    graphData={data}
                    nodeLabel={(node: any) => node.name || node.id}
                    nodeAutoColorBy="group"
                    nodeResolution={16}
                    nodeVal="val"
                    linkOpacity={0.5}
                    linkWidth={1}
                    linkColor={() => '#06b6d4'} // Cyan links
                    backgroundColor="#00000000" // Transparent
                    showNavInfo={false}
                    width={dimensions.width}
                    height={dimensions.height}
                    onNodeClick={(node: any) => {
                        // Focus on node
                        const distance = 40;
                        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
                        fgRef.current.cameraPosition(
                            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
                            node,
                            3000
                        );
                    }}
                />
            )}
        </div>
    );
}
