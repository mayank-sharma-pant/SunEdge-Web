"use client";

export function AtmosphericDepth({
    color = "blue",
    position = "center",
    opacity = 1,
    className = ""
}: {
    color?: "blue" | "purple" | "cyan",
    position?: "center" | "left" | "right" | "top",
    opacity?: number,
    className?: string
}) {
    const colorMap = {
        blue: "from-blue-500/10 via-blue-600/5 to-transparent",
        purple: "from-purple-500/8 via-purple-600/4 to-transparent",
        cyan: "from-cyan-500/10 via-cyan-600/5 to-transparent"
    };

    const posMap = {
        center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        left: "top-1/2 left-[10%] -translate-y-1/2",
        right: "top-1/2 right-[10%] -translate-y-1/2",
        top: "top-[10%] left-1/2 -translate-x-1/2"
    };

    return (
        <div className={`absolute pointer-events-none select-none overflow-hidden h-full w-full z-0 ${className}`} style={{ opacity }}>
            <div className={`absolute w-[800px] h-[800px] rounded-full bg-radial-gradient ${colorMap[color]} blur-[120px] ${posMap[position]}`} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/[0.02] to-transparent" />
        </div>
    );
}
