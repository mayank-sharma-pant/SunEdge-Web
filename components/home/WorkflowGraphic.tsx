"use client";

import { motion } from "framer-motion";

export function WorkflowGraphic() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-8 bg-[#060D1E]/80">
            <svg viewBox="0 0 600 400" className="w-full h-full relative z-10 overflow-visible">
                {/* Logic Grid Background */}
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59,130,246,0.07)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#grid)" />

                {/* Primary Data Flow Paths */}
                <motion.path
                    d="M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300"
                    stroke="rgba(56,182,255,0.1)"
                    strokeWidth="1.5"
                    fill="none"
                />
                <motion.path
                    d="M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300"
                    stroke="#38B6FF"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.path
                    d="M 100 200 C 150 200 150 300 200 300 H 400 C 450 300 450 100 500 100"
                    stroke="rgba(123,92,255,0.1)"
                    strokeWidth="1.5"
                    fill="none"
                />
                <motion.path
                    d="M 100 200 C 150 200 150 300 200 300 H 400 C 450 300 450 100 500 100"
                    stroke="#7B5CFF"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Definitive Step Nodes */}
                {[
                    { x: 100, y: 200, label: "Assessment", color: "#38B6FF" },
                    { x: 250, y: 100, label: "Strategy", color: "#7B5CFF" },
                    { x: 350, y: 300, label: "Execution", color: "#38B6FF" },
                    { x: 500, y: 200, label: "Support", color: "#7B5CFF" },
                ].map((node, i) => (
                    <motion.g key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
                        {/* Outer Glow Ring */}
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r="12"
                            fill="none"
                            stroke={node.color}
                            strokeWidth="0.5"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Core Node */}
                        <circle cx={node.x} cy={node.y} r="4" fill={node.color} />
                        <circle cx={node.x} cy={node.y} r="8" stroke={node.color} strokeWidth="1" fill="none" opacity="0.3" />

                        {/* Node Label (Technical Style) */}
                        <text
                            x={node.x}
                            y={node.y + 25}
                            textAnchor="middle"
                            fill="rgba(200,215,255,0.45)"
                            fontSize="8"
                            fontWeight="bold"
                            className="uppercase tracking-[0.2em]"
                        >
                            {node.label}
                        </text>
                    </motion.g>
                ))}

                {/* Floating Data Packets */}
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={i}
                        r="2"
                        fill="#fff"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            offsetDistance: "100%"
                        }}
                        transition={{
                            duration: 3,
                            delay: i * 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            offsetDistance: "0%",
                            offsetPath: "path('M 100 200 C 150 200 150 100 200 100 H 400 C 450 100 450 300 500 300')",
                        }}
                    />
                ))}
            </svg>

            {/* Precision Frame Overlay */}
            <div className="absolute inset-4 border border-blue-500/10 pointer-events-none" />
            <div className="absolute top-4 left-4 w-4 h-[1px] bg-blue-500/40" />
            <div className="absolute top-4 left-4 w-[1px] h-4 bg-blue-500/40" />
            <div className="absolute bottom-4 right-4 w-4 h-[1px] bg-purple-500/40" />
            <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-purple-500/40" />
        </div>
    );
}
